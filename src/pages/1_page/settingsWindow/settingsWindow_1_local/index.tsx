import React, { useState } from 'react';

import { Tabs, TabsProps } from 'antd';
import { SettingsWindow_1_local_basic } from './SettingsWindow_1_local_1_basic';
import { useUserInfo } from '../../../../hooks/useUserInfo';
import { useUserStripeinfo } from '../../../../hooks/useUserStripeInfo';
import ITokenDB from '../../../../gpt-ai-flow-common/interface-database/ITokenDB';

enum ESettingsWindow_1_local_tabKey {
  BASIC = 'basic',
  SHORTCUT = 'shortcut',
}

export const SettingsWindow_1_local = () => {
  const { userData } = useUserInfo();
  const {
    id: userId,
    email: userEmail,
    token: { accessToken: userAccessToken } = ITokenDB.ITokenDB_default,
    stripeCustomerId = '',
  } = userData;

  if (!userId) {
    return (
      <div id="settingsWindowContainer" className="container" style={{ padding: '.4rem' }}>
        请先注册用户并登录
      </div>
    );
  }

  const {
    init: initStripeSubscriptionInfo,
    stripeSubscriptionInfo,
    check: { hasAvailableSubscription, hasNoAvailableSubscription },
  } = useUserStripeinfo({
    userId,
    stripeCustomerId,
    accessToken: userAccessToken,
  });

  const [selectedTabKey, setSelectedTabKey] = useState<ESettingsWindow_1_local_tabKey>(
    ESettingsWindow_1_local_tabKey.BASIC
  );

  const tabItems: TabsProps['items'] = [
    {
      key: ESettingsWindow_1_local_tabKey.BASIC,
      label: `基本`,
      children: <SettingsWindow_1_local_basic stripeSubscriptionInfo={stripeSubscriptionInfo} />,
    },
  ];

  return (
    <div
      id="SettingsWIndow_1_local"
      className="row"
      style={{
        marginTop: 12,
        marginLeft: 12,
        padding: '2rem',
        background: '#fff',
        border: '1px solid #E8E8E8',
        borderRadius: '.4rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Tabs
        defaultActiveKey={selectedTabKey}
        items={tabItems}
        onChange={(key: string) => {
          console.log(`${key} tab`);
          setSelectedTabKey(key as ESettingsWindow_1_local_tabKey);
        }}
      />
    </div>
  );
};
