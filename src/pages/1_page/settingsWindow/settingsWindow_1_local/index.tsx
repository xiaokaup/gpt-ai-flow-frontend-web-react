import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Tabs, TabsProps } from 'antd';

import { IReduxRootState } from 'store/reducer';
import { udpateSubscriptionDBAction_v2 } from '../../../../store/actions/subscriptionDBActions_v2';

import ITokenDB from '../../../../gpt-ai-flow-common/interface-database/ITokenDB';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import IUserDataFile, { IUserData } from '../../../../gpt-ai-flow-common/interface-app/IUserData';
import { useUserData } from '../../../../gpt-ai-flow-common/hooks/useUserData';
import ISubscriptionDB_v2File, {
  ISubscriptionDB_v2,
} from '../../../../gpt-ai-flow-common/interface-database/ISubscriptionDB_v2';
import { useSubscription_v2Data } from '../../../../gpt-ai-flow-common/hooks/useSubscription_v2Data';
import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

import { SettingsWindow_1_local_basic } from './SettingsWindow_1_local_1_basic';

enum ESettingsWindow_1_local_tabKey {
  BASIC = 'basic',
  SHORTCUT = 'shortcut',
}

interface ISettingsWindow_1_local_input {
  t: IGetT_frontend_output;
}
export const SettingsWindow_1_local = (props: ISettingsWindow_1_local_input) => {
  const dispatch = useDispatch();

  const { t } = props;

  const userDataFromStorage: IUserData = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserDataFile.IUserData_default;
  });

  const { userData } = useUserData({
    userDataFromStorage,
    onUserDataChange: (newUserData_without_token: IUserData) => {},
    locale: t.currentLocale,
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });
  const { id: userId, token: { accessToken: userAccessToken } = ITokenDB.ITokenDB_default } = userData;

  if (!userId) {
    return (
      <div id="settingsWindowContainer" className="container" style={{ padding: '.4rem' }}>
        {t.get('Please register a user and log in first')}
      </div>
    );
  }

  const subscription_v2DataFromStorage: ISubscriptionDB_v2 = useSelector((state: IReduxRootState) => {
    return state.subscription_v2 ?? ISubscriptionDB_v2File.ISubscriptionDB_v2_default;
  });
  const { subscription_v2Data } = useSubscription_v2Data({
    userId,
    accessToken: userAccessToken,
    subscription_v2DataFromStorage: subscription_v2DataFromStorage,
    onSubscription_v2DataChange: (newItem: ISubscriptionDB_v2) => {
      dispatch(udpateSubscriptionDBAction_v2(newItem) as any);
    },
    locale: t.currentLocale,
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });

  const [selectedTabKey, setSelectedTabKey] = useState<ESettingsWindow_1_local_tabKey>(
    ESettingsWindow_1_local_tabKey.BASIC
  );

  const tabItems: TabsProps['items'] = [
    {
      key: ESettingsWindow_1_local_tabKey.BASIC,
      label: t.get('Basic'),
      children: <SettingsWindow_1_local_basic t={t} userData={userData} subscription_v2Data={subscription_v2Data} />,
    },
  ];

  return (
    <div id="SettingsWIndow_1_local" className="row">
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
