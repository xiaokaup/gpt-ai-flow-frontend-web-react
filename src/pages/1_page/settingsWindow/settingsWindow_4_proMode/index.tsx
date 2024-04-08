import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Select } from 'antd';

import { IReduxRootState } from 'store/reducer';
import { udpateSubscriptionDBAction_v2 } from '../../../../store/actions/subscriptionDBActions_v2';

import { ERegionDB_code } from '../../../../gpt-ai-flow-common/enum-database/ERegionDB';
import ITokenDBFile from '../../../../gpt-ai-flow-common/interface-database/ITokenDB';
import IUserDataFile, { IUserData } from '../../../../gpt-ai-flow-common/interface-app/IUserData';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { useUserData } from '../../../../gpt-ai-flow-common/hooks/useUserData';
import ISubscriptionDB_v2File, {
  ISubscriptionDB_v2,
} from '../../../../gpt-ai-flow-common/interface-database/ISubscriptionDB_v2';
import {
  IUseSubscriptionDB_v2Data_output,
  useSubscription_v2Data,
} from '../../../../gpt-ai-flow-common/hooks/useSubscription_v2Data';
import IRegionDBFile from '../../../../gpt-ai-flow-common/interface-database/IRegionDB';
import { IGetT_output } from '../../../../gpt-ai-flow-common/i18nProvider/messages/localesFactory';

import { SettingsWindow_4_proMode_EUR } from './SettingsWindow_4_proMode_EUR';
import { SettingsWindow_4_proMode_CNY } from './SettingsWindow_4_proMode_CNY';

interface ISettingsWindow_4_proMode_login_input {
  t: IGetT_output;
  userData: IUserData;
  dispatch: any;
}
const SettingsWindow_4_proMode_login = (props: ISettingsWindow_4_proMode_login_input) => {
  const { t, userData, dispatch } = props;

  const { id: userId, token: { accessToken: userAccessToken } = ITokenDBFile.ITokenDB_default } = userData;

  const subscriptionDataFromStorage: ISubscriptionDB_v2 = useSelector((state: IReduxRootState) => {
    return state.subscription_v2 ?? ISubscriptionDB_v2File.ISubscriptionDB_v2_default;
  });

  const useSubscription_v2DataOutput: IUseSubscriptionDB_v2Data_output = useSubscription_v2Data({
    userId: userId as number,
    accessToken: userAccessToken,
    subscription_v2DataFromStorage: subscriptionDataFromStorage,
    onSubscription_v2DataChange: (newItem: ISubscriptionDB_v2) => {
      dispatch(udpateSubscriptionDBAction_v2(newItem) as any);
    },
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });

  const { subscription_v2Data } = useSubscription_v2DataOutput;
  const { Region } = subscription_v2Data ?? ISubscriptionDB_v2File.ISubscriptionDB_v2_default;
  const { code: regionCodeFromStorage = ERegionDB_code.ZH } = Region ?? IRegionDBFile.IRegionDB_default;

  const [regionCode, setRegionCode] = useState<ERegionDB_code>(regionCodeFromStorage);

  const hanleRegionSelectChange = (value: string) => {
    console.log(`selected ${value}`);
    setRegionCode(value as ERegionDB_code);
  };

  useEffect(() => {
    setRegionCode(regionCodeFromStorage);
  }, [regionCodeFromStorage]);

  return (
    <div id="settingsWindowContainer" className="container">
      <div className="row">
        <Select
          defaultValue={regionCode}
          style={{ width: 120 }}
          value={regionCode}
          onChange={hanleRegionSelectChange}
          options={[
            { label: t.get('Domestic'), value: ERegionDB_code.ZH },
            { label: t.get('Overseas'), value: ERegionDB_code.EN },
          ]}
        />
      </div>
      {regionCode === ERegionDB_code.ZH && (
        <div className="row">
          <SettingsWindow_4_proMode_CNY
            t={t}
            userData={userData}
            useSubscription_v2DataOutput={useSubscription_v2DataOutput}
          />
        </div>
      )}
      {regionCode === ERegionDB_code.EN && (
        <div className="row">
          <SettingsWindow_4_proMode_EUR
            t={t}
            userData={userData}
            useSubscription_v2DataOutput={useSubscription_v2DataOutput}
          />
        </div>
      )}
    </div>
  );
};

export const SettingsWindow_4_proMode = (props: { t: IGetT_output }) => {
  const dispatch = useDispatch();

  const { t } = props;

  const userDataFromStorage: IUserData = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserDataFile.IUserData_default;
  });

  const { userData } = useUserData({
    userDataFromStorage,
    onUserDataChange: (newUserData_without_token: IUserData) => {},
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });
  const { id: userId, token: { accessToken: userAccessToken } = ITokenDBFile.ITokenDB_default } = userData;

  if (!userId) {
    return (
      <div id="settingsWindowContainer" className="container" style={{ padding: '.4rem' }}>
        {t.get('Please register a user and log in first')}
      </div>
    );
  }

  return <SettingsWindow_4_proMode_login t={t} userData={userData} dispatch={dispatch} />;
};
