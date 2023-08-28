import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { CounterComponent } from './CounterComponent';
import { SettingsWindow_2_user_1_signup } from './pages/1_page/settingsWindow_2_user/SettingsWindow_2_user_1_signup';
import { SettingsWindow_2_user_2_login } from './pages/1_page/settingsWindow_2_user/SettingsWindow_2_user_2_login';
import { SettingsWindow_2_user_3_info } from './pages/1_page/settingsWindow_2_user/SettingsWindow_2_user_3_info';
import { SettingsWindow_2_user_5_forgetPassword } from './pages/1_page/settingsWindow_2_user/SettingsWindow_2_user_5_forgetPassword';
import { SettingsWindow_2_user_4_changePassword } from './pages/1_page/settingsWindow_2_user/SettingsWindow_2_user_4_changePassword';

export const AppRoutes = () => {
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
        <AppLayout>
          <SettingsWindow_2_user_2_login />
        </AppLayout>
      ),
    },
    {
      path: '/signUp',
      element: (
        <AppLayout>
          <SettingsWindow_2_user_1_signup />
        </AppLayout>
      ),
    },
    {
      path: '/login',
      element: (
        <AppLayout>
          <SettingsWindow_2_user_2_login />
        </AppLayout>
      ),
    },
    {
      path: '/info',
      element: (
        <AppLayout>
          <SettingsWindow_2_user_3_info />
        </AppLayout>
      ),
    },
    {
      path: '/changePassword',
      element: (
        <AppLayout>
          <SettingsWindow_2_user_4_changePassword />
        </AppLayout>
      ),
    },
    {
      path: '/forgetPassword',
      element: (
        <AppLayout>
          <SettingsWindow_2_user_5_forgetPassword />
        </AppLayout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};
