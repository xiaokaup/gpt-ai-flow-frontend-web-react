import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Route, Routes } from 'react-router-dom';

import { getT } from './gpt-ai-flow-common/i18nProvider/localesFrontendFactory';
import CONSTANTS_GPT_AI_FLOW_COMMON from './gpt-ai-flow-common/config/constantGptAiFlow';
import IStoreStorageFile, {
  IStoreStorage_settings_local,
} from './gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { useStripePriceNicknames_for_allSubscriptions } from './gpt-ai-flow-common/hooks/useStripePriceNicknames_for_allSubscriptions';
import { ITokenDB_default } from './gpt-ai-flow-common/interface-database/ITokenDB';

import { NewsPage } from './pages/NewsPage';
import { AuthPage } from './pages/AuthPages';
import { LogoutPage } from './pages/LogoutPage';
// import { CounterComponent } from './CounterComponent';
import { SettingsWindow } from './pages/settingsWindow';
import { ProModeWindow_warpper } from './pages/ProModeWindow/ProModeWinowWrapper';
import { ProModeWindowFeatures } from './pages/ProModeWindow/Features/ProModeWindowFeatures';
import { SettingsWindow_2_user_2_login } from './pages/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_2_login';
import { SettingsWindow_2_user_1_signup } from './pages/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_1_signup';
import { SettingsWindow_2_user_5_forgetPassword } from './pages/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_5_forgetPassword';
import { SettingsWindow_2_user_4_changePassword } from './pages/settingsWindow/settingsWindow_2_user/SettingsWindow_2_user_4_changePassword';
import { PromptsWindowWrapper } from './pages/PromptsWindow/PromptsWindowWrapper';

import { IReduxRootState } from './store/reducer';
import { updateSpecificUserDB } from './store/actions/userActions';

import { AppLayout, AppLayoutCenter } from './AppLayout';
import { ProModeWindow_v5 } from './pages/betaPages/to_plan_ProModeWindow_v5';
import { IUserDB, IUserDB_default } from './gpt-ai-flow-common/interface-database/IUserDB';
import { useUserDB } from './gpt-ai-flow-common/hooks/useUserDB';
import BEN_CAO_TANG_PAGE from './pages/ToolsPage/pdfPage/benCaoTang';
import { VisualizationPage } from './pages/betaPages/VisualizationPage/VisualizationPage';
import { DutyGeniePage } from './pages/RolePage/DutyGeniePage';

export const AppRoutes = () => {
  const dispatch = useDispatch();

  const userDBFromStorage: IUserDB = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserDB_default;
  });
  const localSettingsFromStore: IStoreStorage_settings_local = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorageFile.IStoreStorage_settings_local_default;
  });
  const { locale } = localSettingsFromStore;
  const t = getT(locale);

  const { userDB, isAuthenticated } = useUserDB({
    userDBFromStorage,
    onUserDBChange: (newUserDB_without_token: IUserDB) => {
      dispatch(updateSpecificUserDB(newUserDB_without_token) as any);
    },
    t,
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });

  const { Token: { accessToken } = ITokenDB_default } = userDB;

  const { stripePriceNicknames_from_allSbuscriptions, isModelEdition } = useStripePriceNicknames_for_allSubscriptions({
    accessToken,
    locale,
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });
  // console.log('stripePriceNicknames_from_allSbuscriptions:', stripePriceNicknames_from_allSbuscriptions);

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
                <SettingsWindow_2_user_4_changePassword t={t} userDB={userDB} isAuthenticated={isAuthenticated} />
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
                <SettingsWindow
                  t={t}
                  userDB={userDB}
                  isAuthenticated={isAuthenticated}
                  isModelEdition={isModelEdition}
                />
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
                <SettingsWindow_2_user_4_changePassword t={t} userDB={userDB} isAuthenticated={isAuthenticated} />
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
        <Route path="beta">
          <Route
            path="features"
            element={
              <div className="App h-full">
                <AppLayoutCenter
                  isAuthenticated={isAuthenticated}
                  stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
                >
                  <ProModeWindow_v5 t={t} locale={locale} />
                </AppLayoutCenter>
              </div>
            }
          />
          <Route
            path="visualization"
            element={
              <div className="App">
                <AppLayoutCenter
                  isAuthenticated={isAuthenticated}
                  stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
                >
                  <VisualizationPage />
                </AppLayoutCenter>
              </div>
            }
          />
        </Route>
        <Route path="modules">
          <Route
            path="dutygenie"
            element={
              <div className="App">
                <AppLayoutCenter
                  isAuthenticated={isAuthenticated}
                  stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
                >
                  <DutyGeniePage t={t} userAccessToken={accessToken} />
                </AppLayoutCenter>
              </div>
            }
          />
        </Route>
        <Route path="tools">
          <Route
            path="benCaoTang"
            element={
              <div className="App h-full">
                <AppLayoutCenter
                  isAuthenticated={isAuthenticated}
                  stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
                >
                  <BEN_CAO_TANG_PAGE />
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
                <SettingsWindow
                  t={t}
                  userDB={userDB}
                  isAuthenticated={isAuthenticated}
                  isModelEdition={isModelEdition}
                />
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
        <Route
          path="prompts-factory"
          element={
            <div className="App">
              <AppLayoutCenter
                isAuthenticated={isAuthenticated}
                stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
              >
                <PromptsWindowWrapper
                  userDB={userDB}
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
      <AppLayoutCenter isAuthenticated={false} stripePriceNicknames_from_allSbuscriptions={[]}>
        <h2>Nothing to see here!</h2>
      </AppLayoutCenter>
    </div>
  );
}
