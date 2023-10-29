import React from 'react';

import { IUserData } from '../../../gpt-ai-flow-common/interface-app/IUserData';

import { SettingsWindow_7_about } from './SettingsWindow_7_about';
import { SettingsWindow_1_local } from './settingsWindow_1_local';
import { SettingsWindow_2_user_3_info } from './settingsWindow_2_user/SettingsWindow_2_user_3_info';
import { SettingsWindow_4_proMode } from './settingsWindow_4_proMode';

interface ISettingsWindow_input {
  userData: IUserData;
  isAuthenticated: boolean;
}
export const SettingsWindow = (props: ISettingsWindow_input) => {
  const { userData, isAuthenticated } = props;

  return (
    <>
      <SettingsWindow_2_user_3_info userData={userData} isAuthenticated={isAuthenticated} />
      <SettingsWindow_1_local />
      <SettingsWindow_7_about />
      <SettingsWindow_4_proMode />
    </>
  );
};
