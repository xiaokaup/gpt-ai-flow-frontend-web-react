// import logo from "./logo.svg";

import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store/store';

import { PersistGate } from 'redux-persist/integration/react';
import { AppRoutes } from './AppRoutes';
import { I18nPropvider } from './gpt-ai-flow-common/i18nProvider';
import { useLocalInfo } from './hooks/useLocalInfo';

const { store, persistor } = configureStore();

// persistor.purge();

const AppInStoreProvider = () => {
  const { localData } = useLocalInfo();
  const { locale } = localData;

  return (
    <I18nPropvider locale={locale}>
      <div className="App">
        <AppRoutes />
      </div>
    </I18nPropvider>
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
