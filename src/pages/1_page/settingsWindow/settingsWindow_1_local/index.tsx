import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IReduxRootState } from 'store/reducer';

import { Tabs, TabsProps } from 'antd';

import { SettingsWindow_1_local_basic } from './SettingsWindow_1_local_1_basic';

import ITokenDB from '../../../../gpt-ai-flow-common/interface-database/ITokenDB';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import IUserDataFile, { IUserData } from '../../../../gpt-ai-flow-common/interface-app/IUserData';
import { useUserData } from '../../../../gpt-ai-flow-common/hooks/useUserData';
import ISubscriptionMixFile, {
  ISubscirptionMix,
} from '../../../../gpt-ai-flow-common/interface-app/3_unit/ISubscriptionMix';
import { useSubscriptionData } from '../../../../gpt-ai-flow-common/hooks/useSubscriptionData';

enum ESettingsWindow_1_local_tabKey {
  BASIC = 'basic',
  SHORTCUT = 'shortcut',
}

export const SettingsWindow_1_local = () => {
  const userDataFromStorage: IUserData = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserDataFile.IUserData_default;
  });

  const { userData } = useUserData({
    userDataFromStorage,
    onUserDataChange: (newUserData: IUserData) => {},
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });
  const { id: userId, token: { accessToken: userAccessToken } = ITokenDB.ITokenDB_default } = userData;

  if (!userId) {
    return (
      <div id="settingsWindowContainer" className="container" style={{ padding: '.4rem' }}>
        请先注册用户并登录
      </div>
    );
  }

  const subscriptionDataFromStorage: ISubscirptionMix = useSelector((state: IReduxRootState) => {
    return state.subscriptionInfo ?? ISubscriptionMixFile.ISubscriptionMix_default;
  });
  const {
    // init: initStripeSubscriptionInfo,
    subscriptionData,
    // check: { hasAvailableSubscription, hasNoAvailableSubscription },
  } = useSubscriptionData({
    userId,
    accessToken: userAccessToken,
    subscriptionDataFromStorage,
    onSubscriptionDataChange: (newItem: ISubscirptionMix) => {},
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });

  const [selectedTabKey, setSelectedTabKey] = useState<ESettingsWindow_1_local_tabKey>(
    ESettingsWindow_1_local_tabKey.BASIC
  );

  const tabItems: TabsProps['items'] = [
    {
      key: ESettingsWindow_1_local_tabKey.BASIC,
      label: `基本`,
      children: <SettingsWindow_1_local_basic userSubscriptionInfo={subscriptionData} />,
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
