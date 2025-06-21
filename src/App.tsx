/* eslint-disable @typescript-eslint/ban-ts-comment */
// import logo from "./logo.svg";

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import {
  Provider,
  // useDispatch,
  // useSelector
} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { configureStore } from './store/store';
// import { saveLocalAction } from './store/actions/localActions';
// import { IReduxRootState } from './store/reducer';

import { AppRoutes } from './AppRoutes';

// import IStoreStorageFile, { IStoreStorage_settings_local } from './gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
// import { useLocalSettings } from './gpt-ai-flow-common/hooks/useLocalSettings';
// import { ELocale } from './gpt-ai-flow-common/enum-app/ELocale';
import CONSTANTS_GPT_AI_FLOW_COMMON from './gpt-ai-flow-common/config/constantGptAiFlow';

const { store, persistor } = configureStore();

// persistor.purge();

// const AppInStoreProvider = () => {
//   const dispatch = useDispatch();
//   const localSettingsFromStore: IStoreStorage_settings_local = useSelector((state: IReduxRootState) => {
//     return state.local ?? IStoreStorageFile.IStoreStorage_settings_local_default;
//   });
//   const { localSettings } = useLocalSettings({
//     localSettingsFromStorage: localSettingsFromStore,
//     onLocalSettingsChange(newItem: IStoreStorage_settings_local) {
//       const newLocalSettings = { ...localSettings, ...newItem };
//       dispatch(saveLocalAction(newLocalSettings) as any);
//     },
//   });
//   const { locale } = localSettings;

//   return <AppRoutes />;
// };

function App() {
  return (
    <Provider store={store}>
      {/* @ts-ignore */}
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId={CONSTANTS_GPT_AI_FLOW_COMMON.GOOGLE_OAUTH_CLIENT_ID as string}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
