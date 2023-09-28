import '../../../styles/global.css';
import '../../../styles/drag.css';
import '../../../styles/layout.scss';

import React from 'react';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxRootState } from 'store/reducer';

import { Alert, Button, Select, Slider, Tabs, message } from 'antd';

import { EUserRolePermissionDB_name } from '../../../gpt-ai-flow-common/enum-database/EUserRolePermissionDB';
import ITokenDB from '../../../gpt-ai-flow-common/interface-database/ITokenDB';
import { useProModeSetDataUI } from './useProModeSetDataUI';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { ESubscriptionName } from '../../../gpt-ai-flow-common/enum-app/ESubscription';
import { CreativityValueProvider } from '../../../gpt-ai-flow-common/contexts/CreativityValueProviderContext';
import { SubscriptionValueProvider } from '../../../gpt-ai-flow-common/contexts/SubscriptionProviderContext';
import { useUserData } from '../../../gpt-ai-flow-common/hooks/useUserData';
import IUserDataFile, { IUserData } from '../../../gpt-ai-flow-common/interface-app/IUserData';
import ISubscriptionMixFile, {
  ISubscirptionMix,
} from '../../../gpt-ai-flow-common/interface-app/3_unit/ISubscriptionMix';
import {
  useSubscriptionData,
  IUseSubscriptionData_output,
} from '../../../gpt-ai-flow-common/hooks/useSubscriptionData';

import { udpateSubscriptionAction } from '../../../store/actions/subscriptionActions';

export interface ITabPanel {
  key: EUserRolePermissionDB_name;
  label: string;
  value: EUserRolePermissionDB_name;
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

  const { userData, isBetaUser } = useUserData({
    userDataFromStorage,
    onUserDataChange: (newUserData: IUserData) => {},
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });

  const {
    id: userId,
    token: { accessToken: userAccessToken } = ITokenDB.ITokenDB_default,
    userRolePermissions = [],
  } = userData;

  if (!userId) {
    return <>请先到设置界面登录用户，并确认套餐是否为正常状态</>;
  }

  const subscriptionDataFromStorage: ISubscirptionMix = useSelector((state: IReduxRootState) => {
    return state.subscription ?? ISubscriptionMixFile.ISubscriptionMix_default;
  });
  const useSubscriptionDataOutput: IUseSubscriptionData_output = useSubscriptionData({
    userId,
    accessToken: userAccessToken,
    subscriptionDataFromStorage,
    onSubscriptionDataChange: (newItem: ISubscirptionMix) => {
      dispatch(udpateSubscriptionAction(newItem) as any);
    },
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });
  const {
    subscriptionData,
    check: { hasAvailableSubscription, hasNoAvailableSubscription },
  } = useSubscriptionDataOutput;

  const userRolePermissionsWithStripeSubscriptionInfo = userRolePermissions;

  if (hasAvailableSubscription || isBetaUser) {
    userRolePermissionsWithStripeSubscriptionInfo.push(
      ...CONSTANTS_GPT_AI_FLOW_COMMON.PROMODE_PAYMENT_PROMODE_PERMISSIONS
    );
  }

  // === ProMode Data - start ===
  const { defaultTabPanels } = useProModeSetDataUI({
    userDataFromStorage: userData,
    userRolePermissionsWithStripeSubscriptionInfo,
  });
  // === ProMode Data - end ===

  const userDefaultTabs: ITabPanel[] = [];
  const itemFound = defaultTabPanels.find((item) => item.value === EUserRolePermissionDB_name.COMMUNICATION);
  if (itemFound) {
    userDefaultTabs.push(itemFound);
  }

  if (hasAvailableSubscription || isBetaUser) {
    const itemsFound = defaultTabPanels.filter((item) => item.value !== EUserRolePermissionDB_name.COMMUNICATION);
    userDefaultTabs.push(...itemsFound);
  }

  // === proMode selector - start ===
  const [selectedProdMode, setSelectedProdMode] = useState<EUserRolePermissionDB_name>();

  const onProModeSelectorChange = (value: string) => {
    console.log(`selected ${value}`);
    setSelectedProdMode(value as EUserRolePermissionDB_name);
  };

  const onProModeSelectorSearch = (value: string) => {
    console.log('search:', value);
  };
  // === proMode selector - end ===

  // === tab panels - start ===
  const [activeTabPanelKey, setActiveTabPanelKey] = useState<EUserRolePermissionDB_name>(userDefaultTabs[0].key);
  const [tabPanels, setTabPanels] = useState(userDefaultTabs);
  const newTabPanelIndex = useRef(defaultTabPanels.length);

  const onTabsChange = (key: string) => {
    setActiveTabPanelKey(key as EUserRolePermissionDB_name);
  };

  const addTabPanel = (paraSelectedProdMode: EUserRolePermissionDB_name) => {
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
        key: newActiveTabPanelKey as EUserRolePermissionDB_name,
        label: `${newActiveTabPanelKey}-${label}`,
        value,
        children,
        disabled:
          subscriptionData.name !== ESubscriptionName.NONE
            ? !userRolePermissionsWithStripeSubscriptionInfo.includes(value)
            : true,
      },
    ]);
    setActiveTabPanelKey(newActiveTabPanelKey as EUserRolePermissionDB_name);
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

              if (!userRolePermissionsWithStripeSubscriptionInfo.includes(selectedProdMode)) {
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

        {hasNoAvailableSubscription && !isBetaUser && (
          <div className="row">
            <Alert
              message={
                <span>
                  John是一位忙碌的职场人士，但在订阅我们产品后，他发现了平衡工作和生活的新秘诀。
                  <a href="https://www.gptaiflow.com/business/prices-zh" target="_blank">
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
          <SubscriptionValueProvider value={useSubscriptionDataOutput}>
            <CreativityValueProvider value={creativityValue}>
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
            </CreativityValueProvider>
          </SubscriptionValueProvider>
        </div>
      </div>
    </div>
  );
};

export default ProModeWindow;
