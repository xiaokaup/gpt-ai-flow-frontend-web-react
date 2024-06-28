import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, Outlet, Route, RouterProvider, Routes } from 'react-router-dom';

import CONSTANTS_GPT_AI_FLOW_COMMON from './gpt-ai-flow-common/config/constantGptAiFlow';
import { useUserData } from './gpt-ai-flow-common/hooks/useUserData';

import { AppLayout, AppLayoutCenter } from './AppLayout';
import { IReduxRootState } from './store/reducer';
import { updateSpecificUserData } from './store/actions/userActions';
// import { CounterComponent } from './CounterComponent';

import { getT } from './gpt-ai-flow-common/i18nProvider/localesFrontendFactory';

import { SettingsWindow_2_user_1_signup } from './pages/1_page/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_1_signup';
import { SettingsWindow_2_user_2_login } from './pages/1_page/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_2_login';
import { SettingsWindow_2_user_5_forgetPassword } from './pages/1_page/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_5_forgetPassword';
import { SettingsWindow_2_user_4_changePassword } from './pages/1_page/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_4_changePassword';

import { ProModeWindow_warpper } from './pages/1_page/ProModeWindow/ProModeWinowWrapper';

import { LogoutPage } from './pages/1_page/LogoutPage';
import { SettingsWindow } from './pages/1_page/settingsWindow';
import { NewsPage } from './pages/1_page/NewsPage';
import { AuthPage } from './pages/1_page/AuthPages';

import IStoreStorageFile, { IStoreStorageLocalSettings } from './gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { IUserData, IUserData_default } from './gpt-ai-flow-common/interface-app/3_unit/IUserData';

export const AppRoutes = () => {
  const dispatch = useDispatch();

  const userDataFromStorage: IUserData = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserData_default;
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
    locale,
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });

  return (
    <Routes>
      {/* === Routes_unauthenticated - start === */}
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <div className="App h-full">
              <AppLayoutCenter isAuthenticated={isAuthenticated}>
                <SettingsWindow_2_user_2_login t={t} />
              </AppLayoutCenter>
            </div>
          }
        />
      </Route>
      <Route
        path="/signUp"
        element={
          <div className="App h-full">
            <AppLayoutCenter isAuthenticated={isAuthenticated}>
              <SettingsWindow_2_user_1_signup t={t} />
            </AppLayoutCenter>
          </div>
        }
      />
      <Route
        path="/login"
        element={
          <div className="App h-full">
            <AppLayoutCenter isAuthenticated={isAuthenticated}>
              <SettingsWindow_2_user_2_login t={t} />
            </AppLayoutCenter>
          </div>
        }
      />
      <Route
        path="/changePassword"
        element={
          <div className="App h-full">
            <AppLayoutCenter isAuthenticated={isAuthenticated}>
              <SettingsWindow_2_user_4_changePassword t={t} userData={userData} isAuthenticated={isAuthenticated} />
            </AppLayoutCenter>
          </div>
        }
      />
      <Route
        path="/forgetPassword"
        element={
          <div className="App h-full">
            <AppLayoutCenter isAuthenticated={isAuthenticated}>
              <SettingsWindow_2_user_5_forgetPassword t={t} />
            </AppLayoutCenter>
          </div>
        }
      />
      <Route
        path="/auth"
        element={
          <div className="App">
            <AppLayoutCenter isAuthenticated={isAuthenticated}>
              <AuthPage t={t} />
            </AppLayoutCenter>
          </div>
        }
      />
      <Route
        path="/logout"
        element={
          <div className="App">
            <AppLayoutCenter isAuthenticated={isAuthenticated}>
              <LogoutPage t={t} />
            </AppLayoutCenter>
          </div>
        }
      />
      {/* News infos */}
      <Route
        path="/news"
        element={
          <div className="App">
            <AppLayoutCenter isAuthenticated={isAuthenticated}>
              <NewsPage
                webCase={{
                  t,
                  locale,
                  env: CONSTANTS_GPT_AI_FLOW_COMMON,
                }}
              />
            </AppLayoutCenter>
          </div>
        }
      />
      {/* === Routes_unauthenticated - end === */}
      {/* === Routes_authenticated - start === */}
      <Route
        path="/info"
        element={
          <div className="App">
            <AppLayout isAuthenticated={isAuthenticated}>
              <SettingsWindow t={t} userData={userData} isAuthenticated={isAuthenticated} />
            </AppLayout>
          </div>
        }
      />
      <Route
        path="/proMode"
        element={
          <div className="App">
            <AppLayoutCenter isAuthenticated={isAuthenticated}>
              <ProModeWindow_warpper
                webCase={{
                  t,
                  locale,
                }}
              />
            </AppLayoutCenter>
          </div>
        }
      />
      {/* === Routes_authenticated - end === */}
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

function Layout() {
  return <Outlet />;
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
    </div>
  );
}
