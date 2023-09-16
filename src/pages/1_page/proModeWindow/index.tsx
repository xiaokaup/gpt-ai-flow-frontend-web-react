import '../../../styles/global.css';
import '../../../styles/drag.css';
import '../../../styles/layout.scss';

import React from 'react';
import { useRef, useState, useEffect } from 'react';

import { Alert, Button, Select, Tabs, message } from 'antd';

import { EUserRolePermissionDB_name } from '../../../gpt-ai-flow-common/enum-database/EUserRolePermissionDB';
import ITokenDB from '../../../gpt-ai-flow-common/interface-database/ITokenDB';

import { useProModeSetDataUI } from './useProModeSetDataUI';
import { useUserInfo } from '../../../hooks/useUserInfo';
import { useUserStripeinfo } from '../../../hooks/useUserStripeInfo';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { ESubscriptionName } from '../../../gpt-ai-flow-common/enum-app/ESubscription';
import { useUserSubscriptionInfo } from '../../../hooks/useUserSubscriptionInfo';

export interface ITabPanel {
  key: EUserRolePermissionDB_name;
  label: string;
  value: EUserRolePermissionDB_name;
  children: React.ReactNode;
  disabled: boolean;
}

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const ProModeWindow = () => {
  // === Stripe subscription - start ===
  const { userData, isBetaUser } = useUserInfo();
  const {
    id: userId,
    stripeCustomerId,
    token: { accessToken: userAccessToken } = ITokenDB.ITokenDB_default,
    userRoles = [],
    userRolePermissions = [],
  } = userData;

  if (!userId) {
    return <>请先到设置界面登录用户，并确认套餐是否为正常状态</>;
  }

  const {
    userSubscriptionInfo,
    check: { hasAvailableSubscription, hasNoAvailableSubscription },
  } = useUserSubscriptionInfo({
    userId,
    accessToken: userAccessToken,
  });

  const userRolePermissionsWithStripeSubscriptionInfo = userRolePermissions;

  if (hasAvailableSubscription || isBetaUser) {
    userRolePermissionsWithStripeSubscriptionInfo.push(
      ...CONSTANTS_GPT_AI_FLOW_COMMON.PROMODE_PAYMENT_PROMODE_PERMISSIONS
    );
  }

  // === ProMode Data - start ===
  const { defaultTabPanels } = useProModeSetDataUI({
    userRolePermissionsWithStripeSubscriptionInfo,
  });
  // === ProMode Data - end ===

  const userDefaultTabs: ITabPanel[] = [];
  const itemFound = defaultTabPanels.find((item) => item.value === EUserRolePermissionDB_name.COMMUNICATION);
  itemFound && userDefaultTabs.push(itemFound);

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

    const newActiveTabPanelKey = `${newTabPanelIndex.current++}`;
    const { label, value, children } = newTabPanel;

    setTabPanels([
      ...tabPanels,
      {
        key: newActiveTabPanelKey as EUserRolePermissionDB_name,
        label: `${newActiveTabPanelKey}-${label}`,
        value,
        children,
        disabled:
          userSubscriptionInfo.name !== ESubscriptionName.NONE
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
      <div className="container">
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

        {hasNoAvailableSubscription && !isBetaUser && (
          <div className="row">
            <Alert
              message={
                <span>
                  John是一位忙碌的职场人士，但在订阅我们产品后，他发现了平衡工作和生活的新秘诀。
                  <a href="https://www.gptaiflow.com/business/prices" target="_blank">
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
        </div>
      </div>
    </div>
  );
};

export default ProModeWindow;
