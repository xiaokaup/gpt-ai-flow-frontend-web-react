import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout, AppLayoutCenter } from './AppLayout';
import { CounterComponent } from './CounterComponent';
import { SettingsWindow_2_user_1_signup } from './pages/1_page/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_1_signup';
import { SettingsWindow_2_user_2_login } from './pages/1_page/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_2_login';
import { SettingsWindow_2_user_3_info } from './pages/1_page/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_3_info';
import { SettingsWindow_2_user_5_forgetPassword } from './pages/1_page/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_5_forgetPassword';
import { SettingsWindow_2_user_4_changePassword } from './pages/1_page/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_4_changePassword';
import { SettingsWindow_1_local } from './pages/1_page/settingsWindow/settingsWindow_1_local';
import ProModeWindow from './pages/1_page/proModeWindow';
import { SettingsWindow_4_proMode_EUR } from './pages/1_page/settingsWindow/settingsWindow_4_proMode/SettingsWindow_4_proMode_EUR';
import { SettingsWindow_6_about } from './pages/1_page/settingsWindow/SettingsWindow_6_about';
import { useUserInfo } from './hooks/useUserInfo';

export const AppRoutes = () => {
  const { userData, isAuthenticated } = useUserInfo();

  const router = createBrowserRouter([
    // {
    //   path: '/counter',
    //   element: (
    //     <AppLayout>
    //       <CounterComponent />
    //     </AppLayout>
    //   ),
    // },
    {
      path: '/',
      element: (
        <AppLayoutCenter>
          <SettingsWindow_2_user_2_login />
        </AppLayoutCenter>
      ),
    },
    {
      path: '/signUp',
      element: (
        <AppLayoutCenter>
          <SettingsWindow_2_user_1_signup />
        </AppLayoutCenter>
      ),
    },
    {
      path: '/login',
      element: (
        <AppLayoutCenter>
          <SettingsWindow_2_user_2_login />
        </AppLayoutCenter>
      ),
    },
    {
      path: '/info',
      element: (
        <AppLayout>
          <SettingsWindow_2_user_3_info userData={userData} isAuthenticated={isAuthenticated} />
          <SettingsWindow_1_local />
          <SettingsWindow_4_proMode_EUR />
          <SettingsWindow_6_about />
        </AppLayout>
      ),
    },
    {
      path: '/changePassword',
      element: (
        <AppLayoutCenter>
          <SettingsWindow_2_user_4_changePassword userData={userData} isAuthenticated={isAuthenticated} />
        </AppLayoutCenter>
      ),
    },
    {
      path: '/forgetPassword',
      element: (
        <AppLayoutCenter>
          <SettingsWindow_2_user_5_forgetPassword />
        </AppLayoutCenter>
      ),
    },
    {
      path: '/proMode',
      element: (
        <AppLayoutCenter>
          <ProModeWindow />
        </AppLayoutCenter>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};
