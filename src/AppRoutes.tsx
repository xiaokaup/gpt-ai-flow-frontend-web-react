import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Route, Routes } from 'react-router-dom';

import { useUserData } from './gpt-ai-flow-common/hooks/useUserData';
import { EStripePrice_nickname } from './gpt-ai-flow-common/enum-app/EStripe';
import { getT } from './gpt-ai-flow-common/i18nProvider/localesFrontendFactory';
import CONSTANTS_GPT_AI_FLOW_COMMON from './gpt-ai-flow-common/config/constantGptAiFlow';
import { IUserData, IUserData_default } from './gpt-ai-flow-common/interface-app/3_unit/IUserData';
import IStoreStorageFile, { IStoreStorageLocalSettings } from './gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { get_stripePriceNicknamesFromAllSbuscriptions_by_userId_backend_v3 } from './gpt-ai-flow-common/tools/3_unit/TBackendProductItem';

import { NewsPage } from './pages/1_page/NewsPage';
import { AuthPage } from './pages/1_page/AuthPages';
import { LogoutPage } from './pages/1_page/LogoutPage';
// import { CounterComponent } from './CounterComponent';
import { SettingsWindow } from './pages/1_page/settingsWindow';
import { ProModeWindow_warpper } from './pages/1_page/ProModeWindow/ProModeWinowWrapper';
import { ProModeWindowFeatures } from './pages/1_page/ProModeWindow/Features/ProModeWindowFeatures';
import { SettingsWindow_2_user_2_login } from './pages/1_page/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_2_login';
import { SettingsWindow_2_user_1_signup } from './pages/1_page/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_1_signup';
import { SettingsWindow_2_user_5_forgetPassword } from './pages/1_page/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_5_forgetPassword';
import { SettingsWindow_2_user_4_changePassword } from './pages/1_page/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_4_changePassword';

import { IReduxRootState } from './store/reducer';
import { updateSpecificUserData } from './store/actions/userActions';

import { AppLayout, AppLayoutCenter } from './AppLayout';

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

  const [stripePriceNicknames_from_allSbuscriptions, setActiveSubscriptionsNicknames] = useState<
    EStripePrice_nickname[]
  >([]);
  // console.log('productItem:', productItem);

  const init = async () => {
    const {
      Token: { accessToken },
    } = userData;

    const subscriptionsNicknamesFound: EStripePrice_nickname[] =
      await get_stripePriceNicknamesFromAllSbuscriptions_by_userId_backend_v3(
        accessToken,
        locale,
        CONSTANTS_GPT_AI_FLOW_COMMON,
      );
    setActiveSubscriptionsNicknames(subscriptionsNicknamesFound);
  };

  useEffect(() => {
    isAuthenticated && init();
  }, []);

  const Routes_v1 = () => {
    return (
      <Route path="/" element={<Layout_v1 />}>
        {/* === Routes_unauthenticated - start === */}
        <Route
          index
          element={
            <div className="App h-full">
              <AppLayoutCenter
                isAuthenticated={isAuthenticated}
                stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
              >
                <SettingsWindow_2_user_2_login t={t} />
              </AppLayoutCenter>
            </div>
          }
        />
        <Route
          path="/signUp"
          element={
            <div className="App h-full">
              <AppLayoutCenter
                isAuthenticated={isAuthenticated}
                stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
              >
                <SettingsWindow_2_user_1_signup t={t} />
              </AppLayoutCenter>
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="App h-full">
              <AppLayoutCenter
                isAuthenticated={isAuthenticated}
                stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
              >
                <SettingsWindow_2_user_2_login t={t} />
              </AppLayoutCenter>
            </div>
          }
        />
        <Route
          path="/changePassword"
          element={
            <div className="App h-full">
              <AppLayoutCenter
                isAuthenticated={isAuthenticated}
                stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
              >
                <SettingsWindow_2_user_4_changePassword t={t} userData={userData} isAuthenticated={isAuthenticated} />
              </AppLayoutCenter>
            </div>
          }
        />
        <Route
          path="/forgetPassword"
          element={
            <div className="App h-full">
              <AppLayoutCenter
                isAuthenticated={isAuthenticated}
                stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
              >
                <SettingsWindow_2_user_5_forgetPassword t={t} />
              </AppLayoutCenter>
            </div>
          }
        />
        <Route
          path="/auth"
          element={
            <div className="App">
              <AppLayoutCenter
                isAuthenticated={isAuthenticated}
                stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
              >
                <AuthPage t={t} />
              </AppLayoutCenter>
            </div>
          }
        />
        <Route
          path="/logout"
          element={
            <div className="App">
              <AppLayoutCenter
                isAuthenticated={isAuthenticated}
                stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
              >
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
              <AppLayoutCenter
                isAuthenticated={isAuthenticated}
                stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
              >
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
              <AppLayout
                isAuthenticated={isAuthenticated}
                stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
              >
                <SettingsWindow t={t} userData={userData} isAuthenticated={isAuthenticated} />
              </AppLayout>
            </div>
          }
        />
        <Route
          path="/proMode"
          element={
            <div className="App">
              <AppLayoutCenter
                isAuthenticated={isAuthenticated}
                stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
              >
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
      </Route>
    );
  };

  const Routes_v2_public = () => {
    return (
      <Route
        path="news"
        element={
          <div className="App">
            <AppLayoutCenter
              isAuthenticated={isAuthenticated}
              stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
            >
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
    );
  };

  const Routes_v2_unauth = () => {
    return (
      <>
        <Route
          index
          element={
            <div className="App h-full">
              <AppLayoutCenter
                isAuthenticated={isAuthenticated}
                stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
              >
                <SettingsWindow_2_user_2_login t={t} />
              </AppLayoutCenter>
            </div>
          }
        />
        <Route
          path="signUp"
          element={
            <div className="App h-full">
              <AppLayoutCenter
                isAuthenticated={isAuthenticated}
                stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
              >
                <SettingsWindow_2_user_1_signup t={t} />
              </AppLayoutCenter>
            </div>
          }
        />
        <Route
          path="login"
          element={
            <div className="App h-full">
              <AppLayoutCenter
                isAuthenticated={isAuthenticated}
                stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
              >
                <SettingsWindow_2_user_2_login t={t} />
              </AppLayoutCenter>
            </div>
          }
        />
        <Route
          path="changePassword"
          element={
            <div className="App h-full">
              <AppLayoutCenter
                isAuthenticated={isAuthenticated}
                stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
              >
                <SettingsWindow_2_user_4_changePassword t={t} userData={userData} isAuthenticated={isAuthenticated} />
              </AppLayoutCenter>
            </div>
          }
        />
        <Route
          path="forgetPassword"
          element={
            <div className="App h-full">
              <AppLayoutCenter
                isAuthenticated={isAuthenticated}
                stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
              >
                <SettingsWindow_2_user_5_forgetPassword t={t} />
              </AppLayoutCenter>
            </div>
          }
        />
        <Route
          path="auth"
          element={
            <div className="App">
              <AppLayoutCenter
                isAuthenticated={isAuthenticated}
                stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
              >
                <AuthPage t={t} />
              </AppLayoutCenter>
            </div>
          }
        />
        <Route path="proMode">
          <Route
            path="features"
            element={
              <div className="App">
                <AppLayoutCenter
                  isAuthenticated={isAuthenticated}
                  stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
                >
                  <ProModeWindowFeatures locale={locale} />
                </AppLayoutCenter>
              </div>
            }
          />
        </Route>
      </>
    );
  };

  const Routes_v2_auth = () => {
    return (
      <>
        <Route
          path="info"
          element={
            <div className="App">
              <AppLayout
                isAuthenticated={isAuthenticated}
                stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
              >
                <SettingsWindow t={t} userData={userData} isAuthenticated={isAuthenticated} />
              </AppLayout>
            </div>
          }
        />
        <Route path="proMode">
          <Route
            index
            element={
              <div className="App">
                <AppLayoutCenter
                  isAuthenticated={isAuthenticated}
                  stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
                >
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
        </Route>
        <Route
          path="logout"
          element={
            <div className="App">
              <AppLayoutCenter
                isAuthenticated={isAuthenticated}
                stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
              >
                <LogoutPage t={t} />
              </AppLayoutCenter>
            </div>
          }
        />
      </>
    );
  };

  return (
    <Routes>
      {Routes_v1()}

      <Route path="app">
        {Routes_v2_public()}
        {Routes_v2_unauth()}
        {Routes_v2_auth()}
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

function Layout_v1() {
  return <Outlet />;
}

function NoMatch() {
  return (
    <div className="App">
      <AppLayoutCenter
        isAuthenticated={false}
        stripePriceNicknames_from_allSbuscriptions={[EStripePrice_nickname.STARTAI_FREE]}
      >
        <h2>Nothing to see here!</h2>
      </AppLayoutCenter>
    </div>
  );
}
