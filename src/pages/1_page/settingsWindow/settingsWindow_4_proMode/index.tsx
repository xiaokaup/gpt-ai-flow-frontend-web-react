import React, { useState } from 'react';
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

import { SettingsWindow_4_proMode_EUR } from './SettingsWindow_4_proMode_EUR';
import { SettingsWindow_4_proMode_CNY } from './SettingsWindow_4_proMode_CNY';

export const SettingsWindow_4_proMode = () => {
  const dispatch = useDispatch();

  const [region, setRegion] = useState<ERegionDB_code>(ERegionDB_code.ZH);

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
        请先注册用户并登录
      </div>
    );
  }

  const subscriptionDataFromStorage: ISubscriptionDB_v2 = useSelector((state: IReduxRootState) => {
    return state.subscription_v2 ?? ISubscriptionDB_v2File.ISubscriptionDB_v2_default;
  });

  const useSubscription_v2DataOutput: IUseSubscriptionDB_v2Data_output = useSubscription_v2Data({
    userId,
    accessToken: userAccessToken,
    subscription_v2DataFromStorage: subscriptionDataFromStorage,
    onSubscription_v2DataChange: (newItem: ISubscriptionDB_v2) => {
      dispatch(udpateSubscriptionDBAction_v2(newItem) as any);
    },
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });

  const hanleRegionSelectChange = (value: string) => {
    console.log(`selected ${value}`);
    setRegion(value as ERegionDB_code);
  };

  return (
    <div id="settingsWindowContainer" className="container">
      <div className="row">
        <Select
          defaultValue={region}
          style={{ width: 120 }}
          onChange={hanleRegionSelectChange}
          options={[
            { label: '国内', value: ERegionDB_code.ZH },
            { label: '海外', value: ERegionDB_code.EN },
          ]}
        />
      </div>
      {region === ERegionDB_code.ZH && (
        <div className="row">
          <SettingsWindow_4_proMode_CNY
            userData={userData}
            useSubscription_v2DataOutput={useSubscription_v2DataOutput}
          />
        </div>
      )}
      {region === ERegionDB_code.EN && (
        <div className="row">
          <SettingsWindow_4_proMode_EUR
            userData={userData}
            useSubscription_v2DataOutput={useSubscription_v2DataOutput}
          />
        </div>
      )}
    </div>
  );
};
