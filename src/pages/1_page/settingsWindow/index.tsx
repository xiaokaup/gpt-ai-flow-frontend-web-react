import React from 'react';
import { useSelector } from 'react-redux';

import { IReduxRootState } from '../../../store/reducer';

import { IUserData } from '../../../gpt-ai-flow-common/interface-app/3_unit/IUserData';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import {
  IStoreStorageLocalSettings,
  IStoreStorageLocalSettings_default,
} from '../../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';

import { SettingsWindow_7_about } from './SettingsWindow_7_about';
import { SettingsWindow_1_local } from './settingsWindow_1_local';
import { SettingsWindow_2_user_3_info } from './settingsWindow_2_user/SettingsWindow_2_user_3_info';
import { SettingsWindow_4_proMode } from './settingsWindow_4_proMode';
// import { SettingsWindow_6_referralReward } from './SettingsWindow_6_referralReward';

interface ISettingsWindow_input {
  t: IGetT_frontend_output;
  userData: IUserData;
  isAuthenticated: boolean;
}
export const SettingsWindow = (props: ISettingsWindow_input) => {
  const { t, userData, isAuthenticated } = props;
  // const { id: userId = 0, token: { accessToken } = { accessToken: '' } } = userData;

  const localFromStore: IStoreStorageLocalSettings = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorageLocalSettings_default;
  });
  const { locale } = localFromStore;

  const containerStyle = {
    marginTop: 12,
    marginLeft: 12,
    padding: '2rem',
    background: '#fff',
    border: '1px solid #E8E8E8',
    borderRadius: '.4rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.05)',
  };

  return (
    <>
      <div style={containerStyle}>
        <SettingsWindow_2_user_3_info t={t} userData={userData} isAuthenticated={isAuthenticated} />
      </div>
      <div style={containerStyle}>
        <SettingsWindow_1_local t={t} />
      </div>
      <div style={containerStyle}>
        <SettingsWindow_4_proMode t={t} localeForSettingsWindow={locale} />
      </div>
      <div style={containerStyle}>
        <SettingsWindow_7_about t={t} />
      </div>
      {/* <div style={containerStyle}>
        <SettingsWindow_6_referralReward t={t} userId={userId.toString()} accessToken={accessToken} />
      </div> */}
    </>
  );
};
