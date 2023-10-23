import React from 'react';
import { useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import CONSTANTS_GPT_AI_FLOW_COMMON from './gpt-ai-flow-common/config/constantGptAiFlow';
import { useUserData } from './gpt-ai-flow-common/hooks/useUserData';
import IUserDataFile, { IUserData } from './gpt-ai-flow-common/interface-app/IUserData';

import { AppLayout, AppLayoutCenter } from './AppLayout';
import { IReduxRootState } from './store/reducer';
// import { CounterComponent } from './CounterComponent';

import { SettingsWindow_2_user_1_signup } from './pages/1_page/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_1_signup';
import { SettingsWindow_2_user_2_login } from './pages/1_page/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_2_login';
import { SettingsWindow_2_user_3_info } from './pages/1_page/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_3_info';
import { SettingsWindow_2_user_5_forgetPassword } from './pages/1_page/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_5_forgetPassword';
import { SettingsWindow_2_user_4_changePassword } from './pages/1_page/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_4_changePassword';
import { SettingsWindow_1_local } from './pages/1_page/settingsWindow/settingsWindow_1_local';
import ProModeWindow from './pages/1_page/proModeWindow';
import { SettingsWindow_6_about } from './pages/1_page/settingsWindow/SettingsWindow_6_about';
import { SettingsWindow_4_proMode } from './pages/1_page/settingsWindow/settingsWindow_4_proMode';
import { LogoutPage } from './pages/1_page/LogoutPage';

export const AppRoutes = () => {
  const userDataFromStorage: IUserData = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserDataFile.IUserData_default;
  });

  const { userData, isAuthenticated } = useUserData({
    userDataFromStorage,
    onUserDataChange: (newUserData_without_token: IUserData) => {},
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });

  const router = createBrowserRouter([
    // {
    //   path: '/counter',
    //   element: (
    //     <AppLayout isAuthenticated={isAuthenticated}>
    //       <CounterComponent />
    //     </AppLayout>
    //   ),
    // },
    {
      path: '/',
      element: (
        <AppLayoutCenter isAuthenticated={isAuthenticated}>
          <SettingsWindow_2_user_2_login />
        </AppLayoutCenter>
      ),
    },
    {
      path: '/signUp',
      element: (
        <AppLayoutCenter isAuthenticated={isAuthenticated}>
          <SettingsWindow_2_user_1_signup />
        </AppLayoutCenter>
      ),
    },
    {
      path: '/login',
      element: (
        <AppLayoutCenter isAuthenticated={isAuthenticated}>
          <SettingsWindow_2_user_2_login />
        </AppLayoutCenter>
      ),
    },
    {
      path: '/info',
      element: (
        <AppLayout isAuthenticated={isAuthenticated}>
          <SettingsWindow_2_user_3_info userData={userData} isAuthenticated={isAuthenticated} />
          <SettingsWindow_1_local />
          <SettingsWindow_6_about />
          <SettingsWindow_4_proMode />
        </AppLayout>
      ),
    },
    {
      path: '/changePassword',
      element: (
        <AppLayoutCenter isAuthenticated={isAuthenticated}>
          <SettingsWindow_2_user_4_changePassword userData={userData} isAuthenticated={isAuthenticated} />
        </AppLayoutCenter>
      ),
    },
    {
      path: '/forgetPassword',
      element: (
        <AppLayoutCenter isAuthenticated={isAuthenticated}>
          <SettingsWindow_2_user_5_forgetPassword />
        </AppLayoutCenter>
      ),
    },
    {
      path: '/proMode',
      element: (
        <AppLayoutCenter isAuthenticated={isAuthenticated}>
          <ProModeWindow />
        </AppLayoutCenter>
      ),
    },
    {
      path: '/logout',
      element: (
        <AppLayoutCenter isAuthenticated={isAuthenticated}>
          <LogoutPage />
        </AppLayoutCenter>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};
