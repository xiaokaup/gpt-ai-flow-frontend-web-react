/* eslint-disable react/jsx-pascal-case */
import { useState } from 'react';
import { Select } from 'antd';

import { ERegion } from '../../../../gpt-ai-flow-common/enum-app/ERegion';
import { useUserInfo } from '../../../../hooks/useUserInfo';
import ITokenDBFile from '../../../../gpt-ai-flow-common/interface-database/ITokenDB';
import { useUserSubscriptionInfo, useUserSubscriptionInfo_output } from '../../../../hooks/useUserSubscriptionInfo';

// @ts-ignore
import { SettingsWindow_4_proMode_EUR } from './SettingsWindow_4_proMode_EUR';
// @ts-ignore
import { SettingsWindow_4_proMode_CNY } from './SettingsWindow_4_proMode_CNY';
import React from 'react';

export const SettingsWindow_4_proMode = () => {
  const [region, setRegion] = useState<ERegion>(ERegion.DEFAULT);

  const { userData } = useUserInfo();
  const { id: userId, token: { accessToken: userAccessToken } = ITokenDBFile.ITokenDB_default } = userData;

  if (!userId) {
    return (
      <div id="settingsWindowContainer" className="container" style={{ padding: '.4rem' }}>
        请先注册用户并登录
      </div>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const userSubscriptionInfoHookResult: useUserSubscriptionInfo_output = useUserSubscriptionInfo({
    userId,
    accessToken: userAccessToken,
  });

  const hanleRegionSelectChange = (value: string) => {
    console.log(`selected ${value}`);
    setRegion(value as ERegion);
  };

  return (
    <div id="settingsWindowContainer" className="container" style={{ padding: '.4rem' }}>
      <div className="row">
        <Select
          defaultValue={region}
          style={{ width: 120 }}
          onChange={hanleRegionSelectChange}
          options={[
            { label: '国内', value: ERegion.ZH },
            { label: '海外', value: ERegion.OVERSEAS },
          ]}
        />
      </div>
      {/* {region === ERegion.ZH && (
        <div className="row">
          <SettingsWindow_4_proMode_CNY
            userData={userData}
            userSubscriptionInfoHookResult={userSubscriptionInfoHookResult}
          />
        </div>
      )} */}
      {region === ERegion.OVERSEAS && (
        <div className="row">
          <SettingsWindow_4_proMode_EUR
            userData={userData}
            userSubscriptionInfoHookResult={userSubscriptionInfoHookResult}
          />
        </div>
      )}
    </div>
  );
};
