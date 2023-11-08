import '../../../styles/global.css';
import '../../../styles/drag.css';
import '../../../styles/layout.scss';

import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Alert, Button, Select, Slider, Tabs, message } from 'antd';

import { IReduxRootState } from '../../../store/reducer';
import { udpateSubscriptionDBAction_v2 } from '../../../store/actions/subscriptionDBActions_v2';
import { updateSpecificUserData } from '../../../store/actions/userActions';

import ITokenDB from '../../../gpt-ai-flow-common/interface-database/ITokenDB';
import { useProModeSetDataUI } from './useProModeSetDataUI';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { CreativityValueProvider } from '../../../gpt-ai-flow-common/contexts/CreativityValueProviderContext';
import { useUserData } from '../../../gpt-ai-flow-common/hooks/useUserData';
import IUserDataFile, { IUserData } from '../../../gpt-ai-flow-common/interface-app/IUserData';
import { EServiceCategoryDB_name } from '../../../gpt-ai-flow-common/enum-database/EServiceCategoryDB';
import ISubscriptionDB_v2File, {
  ISubscriptionDB_v2,
} from '../../../gpt-ai-flow-common/interface-database/ISubscriptionDB_v2';
import {
  IUseSubscriptionDB_v2Data_output,
  useSubscription_v2Data,
} from '../../../gpt-ai-flow-common/hooks/useSubscription_v2Data';
import { EProductDB_name } from '../../../gpt-ai-flow-common/enum-database/EProductDB';
import { SubscriptionDB_v2ValueProvider } from '../../../gpt-ai-flow-common/contexts/SubscriptionDB_v2ProviderContext';

export interface ITabPanel {
  key: EServiceCategoryDB_name;
  label: string;
  value: EServiceCategoryDB_name;
  children: React.ReactNode;
  disabled: boolean;
}

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const ProModeWindow = () => {
  const dispatch = useDispatch();

  const [creativityValue, setCreativityValue] = useState<number>(0.8);

  // === Stripe subscription - start ===
  const userDataFromStorage: IUserData = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserDataFile.IUserData_default;
  });

  const { userData } = useUserData({
    userDataFromStorage,
    onUserDataChange: (newUserData_without_token: IUserData) => {
      dispatch(updateSpecificUserData(newUserData_without_token) as any);
    },
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });

  const {
    id: userId,
    token: { accessToken: userAccessToken } = ITokenDB.ITokenDB_default,
    serviceCategories = [],
    isBetaUser,
  } = userData;

  if (!userId) {
    return <>请先到设置界面登录用户，并确认套餐是否为正常状态</>;
  }

  const subscriptionDataFromStorage: ISubscriptionDB_v2 = useSelector((state: IReduxRootState) => {
    return state.subscription_v2 ?? ISubscriptionDB_v2File.ISubscriptionDB_v2_default;
  });
  const useSubscriptionDB_v2DataOutput: IUseSubscriptionDB_v2Data_output = useSubscription_v2Data({
    userId,
    accessToken: userAccessToken,
    subscription_v2DataFromStorage: subscriptionDataFromStorage,
    onSubscription_v2DataChange: (newItem: ISubscriptionDB_v2) => {
      dispatch(udpateSubscriptionDBAction_v2(newItem) as any);
    },
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });
  const {
    subscription_v2Data: subscriptionData,
    check: { hasAvailableSubscription_v2 },
  } = useSubscriptionDB_v2DataOutput;

  // === ProMode Data - start ===
  const { defaultTabPanels } = useProModeSetDataUI({
    userDataFromStorage: userData,
    serviceCategories,
  });
  // === ProMode Data - end ===

  // === proMode selector - start ===
  const [selectedProdMode, setSelectedProdMode] = useState<EServiceCategoryDB_name>();

  const onProModeSelectorChange = (value: string) => {
    console.log(`selected ${value}`);
    setSelectedProdMode(value as EServiceCategoryDB_name);
  };

  const onProModeSelectorSearch = (value: string) => {
    console.log('search:', value);
  };
  // === proMode selector - end ===

  // === tab panels - start ===
  const [activeTabPanelKey, setActiveTabPanelKey] = useState<EServiceCategoryDB_name>();
  const [tabPanels, setTabPanels] = useState<ITabPanel[]>([]);
  const newTabPanelIndex = useRef(defaultTabPanels.length);

  useEffect(() => {
    if (defaultTabPanels.length > 0) {
      setActiveTabPanelKey(defaultTabPanels[0].key);
      setTabPanels(defaultTabPanels);
    }
  }, [defaultTabPanels?.length, defaultTabPanels[1]?.disabled]);

  const onTabsChange = (key: string) => {
    setActiveTabPanelKey(key as EServiceCategoryDB_name);
  };

  const addTabPanel = (paraSelectedProdMode: EServiceCategoryDB_name) => {
    const newTabPanel = defaultTabPanels.find((item) => item.value === paraSelectedProdMode);

    if (!newTabPanel) {
      message.error('未找到对应的专业界面');
      return;
    }

    newTabPanelIndex.current += 1; // Increment the property value
    const newActiveTabPanelKey = `${newTabPanelIndex.current}`;
    const { label, value, children } = newTabPanel;

    setTabPanels([
      ...tabPanels,
      {
        key: newActiveTabPanelKey as EServiceCategoryDB_name,
        label: `${newActiveTabPanelKey}-${label}`,
        value,
        children,
        disabled:
          subscriptionData.Product_Limit?.Product?.name !== EProductDB_name.DEFAULT
            ? !serviceCategories.includes(value)
            : true,
      },
    ]);
    setActiveTabPanelKey(newActiveTabPanelKey as EServiceCategoryDB_name);
  };

  const removeTabPanel = (targetKey: TargetKey) => {
    const targetIndex = tabPanels.findIndex((pane) => pane.key === targetKey);
    const newPanes = tabPanels.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeTabPanelKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      setActiveTabPanelKey(key);
    }
    setTabPanels(newPanes);
  };

  const onEditTabPanel = (targetKey: TargetKey, action: 'add' | 'remove') => {
    console.log('action in onEdit', action);
    console.log('targetKey in onEdit', targetKey);

    if (action === 'add') {
      if (!selectedProdMode) {
        message.error('请选择专业界面');
        return;
      }

      addTabPanel(selectedProdMode);
    } else {
      removeTabPanel(targetKey);
    }
  };
  // === tab panels - end ===

  return (
    <div className="drag-region" style={{ width: '100%' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div className="row top_block_add_tab">
          <Select
            showSearch
            placeholder="选择专业界面"
            optionFilterProp="children"
            onChange={onProModeSelectorChange}
            onSearch={onProModeSelectorSearch}
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            options={[
              {
                value: '',
                label: '请选择',
              },
              ...defaultTabPanels.map((item: { value: string; label: string }) => {
                return {
                  value: item.value,
                  label: item.label,
                };
              }),
            ]}
            style={{ width: 180 }}
          />

          <Button
            type="primary"
            style={{ marginLeft: 8 }}
            onClick={() => {
              if (!selectedProdMode) {
                message.error('请选择专业界面');
                return;
              }

              if (!serviceCategories.includes(selectedProdMode)) {
                message.error('你没有权限使用此面板');
                return;
              }

              addTabPanel(selectedProdMode);
            }}
          >
            添加
          </Button>
        </div>

        <div
          className="block_creativity_value_slider"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            alignItems: 'center',

            position: 'sticky',
            top: 0,

            backgroundColor: '#fff',
            zIndex: 10,
            borderBottom: '1px solid #E8E8E8',
            marginBottom: '.4rem',
          }}
        >
          <span style={{ color: '#5D6370', marginLeft: '1rem' }}>创意值: {creativityValue}</span>

          <Slider
            min={0}
            max={1.6}
            step={0.1}
            onChange={(newValue: number) => {
              setCreativityValue(newValue);
            }}
            value={creativityValue}
            marks={{
              0: '精确',
              1.6: '创造',
            }}
            style={{
              position: 'relative',
              top: 4,

              width: 200,
              marginLeft: '2rem',
              marginRight: '2rem',
            }}
          />
        </div>

        {!hasAvailableSubscription_v2 && !isBetaUser && (
          <div className="row">
            <Alert
              message={
                <span>
                  John是一位忙碌的职场人士，但在订阅我们产品后，他发现了平衡工作和生活的新秘诀。
                  <a href="https://www.app.gptaiflow.com/info" target="_blank">
                    <span style={{ color: '#1677FF' }}>点击这里</span>
                  </a>
                </span>
              }
              type="info"
              style={{ cursor: 'pointer' }}
            />
          </div>
        )}

        <div className="row bottom_block_tabs">
          <CreativityValueProvider value={creativityValue}>
            <SubscriptionDB_v2ValueProvider value={useSubscriptionDB_v2DataOutput}>
              <Tabs
                size="small"
                hideAdd
                onChange={onTabsChange}
                activeKey={activeTabPanelKey}
                type="editable-card"
                onEdit={onEditTabPanel}
              >
                {tabPanels.map((pane) => {
                  return (
                    <Tabs.TabPane tab={pane.label} key={pane.key} disabled={pane.disabled}>
                      {pane.children}
                    </Tabs.TabPane>
                  );
                })}
              </Tabs>
            </SubscriptionDB_v2ValueProvider>
          </CreativityValueProvider>
        </div>
      </div>
    </div>
  );
};

export default ProModeWindow;
