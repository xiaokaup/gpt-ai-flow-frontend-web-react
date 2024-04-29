// import logo from "./logo.svg";

import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { configureStore } from './store/store';
import { saveLocalAction } from './store/actions/localActions';
import { IReduxRootState } from './store/reducer';

import { AppRoutes } from './AppRoutes';

import IStoreStorageFile, { IStoreStorageLocalSettings } from './gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { useLocalSettings } from './gpt-ai-flow-common/hooks/useLocalSettings';
import { ELocale } from './gpt-ai-flow-common/enum-app/ELocale';

const { store, persistor } = configureStore();

// persistor.purge();

const AppInStoreProvider = () => {
  const dispatch = useDispatch();
  const localSettingsFromStore: IStoreStorageLocalSettings = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorageFile.IStoreStorageLocalSettings_default;
  });
  const { localSettings } = useLocalSettings({
    localSettingsFromStorage: localSettingsFromStore,
    onLocalSettingsChange(newItem: IStoreStorageLocalSettings) {
      const newLocalSettings = { ...localSettings, ...newItem };
      dispatch(saveLocalAction(newLocalSettings) as any);
    },
  });
  const { locale } = localSettings;

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      {/* @ts-ignore */}
      <PersistGate loading={null} persistor={persistor}>
        <AppInStoreProvider />
      </PersistGate>
    </Provider>
  );
}

export default App;
