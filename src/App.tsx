// import logo from "./logo.svg";

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store/store';

import { PersistGate } from 'redux-persist/integration/react';
import { AppRoutes } from './AppRoutes';
import { I18nPropvider } from './i18nProvider';
import ELocaleFile from './gpt-ai-flow-common/enum-app/ELocale';

const { store, persistor } = configureStore();

// persistor.purge();

function App() {
  const [locale, setLocale] = useState(ELocaleFile.ELocale.EN);

  return (
    <Provider store={store}>
      {/* @ts-ignore */}
      <PersistGate loading={null} persistor={persistor}>
        <I18nPropvider locale={locale}>
          <div className="App">
            <AppRoutes />
          </div>
        </I18nPropvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
