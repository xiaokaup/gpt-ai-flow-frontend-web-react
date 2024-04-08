import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import CONSTANTS_GPT_AI_FLOW_COMMON from './gpt-ai-flow-common/config/constantGptAiFlow';
import { useUserData } from './gpt-ai-flow-common/hooks/useUserData';
import IUserDataFile, { IUserData } from './gpt-ai-flow-common/interface-app/IUserData';

import { AppLayout, AppLayoutCenter } from './AppLayout';
import { IReduxRootState } from './store/reducer';
import { updateSpecificUserData } from './store/actions/userActions';
// import { CounterComponent } from './CounterComponent';

import { SettingsWindow_2_user_1_signup } from './pages/1_page/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_1_signup';
import { SettingsWindow_2_user_2_login } from './pages/1_page/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_2_login';
import { SettingsWindow_2_user_5_forgetPassword } from './pages/1_page/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_5_forgetPassword';
import { SettingsWindow_2_user_4_changePassword } from './pages/1_page/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_4_changePassword';

import ProModeWindow from './pages/1_page/proModeWindow';
import { LogoutPage } from './pages/1_page/LogoutPage';
import { SettingsWindow } from './pages/1_page/settingsWindow';
import IStoreStorageFile, { IStoreStorageLocalSettings } from './gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { getT } from './gpt-ai-flow-common/i18nProvider/messages/localesFactory';

export const AppRoutes = () => {
  const dispatch = useDispatch();

  const userDataFromStorage: IUserData = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserDataFile.IUserData_default;
  });
  const localSettingsFromStore: IStoreStorageLocalSettings = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorageFile.IStoreStorageLocalSettings_default;
  });
  const { locale } = localSettingsFromStore;
  const t = getT(locale);

  const { userData, isAuthenticated } = useUserData({
    userDataFromStorage,
    onUserDataChange: (newUserData_without_token: IUserData) => {
      dispatch(updateSpecificUserData(newUserData_without_token) as any);
    },
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
          <SettingsWindow_2_user_2_login t={t} />
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
          <SettingsWindow_2_user_2_login t={t} />
        </AppLayoutCenter>
      ),
    },
    {
      path: '/info',
      element: (
        <AppLayout isAuthenticated={isAuthenticated}>
          <SettingsWindow userData={userData} isAuthenticated={isAuthenticated} />
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
          <ProModeWindow t={t} />
        </AppLayoutCenter>
      ),
    },
    {
      path: '/logout',
      element: (
        <AppLayoutCenter isAuthenticated={isAuthenticated}>
          <LogoutPage t={t} />
        </AppLayoutCenter>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};
