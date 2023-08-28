// import logo from "./logo.svg";

import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store/store';

import { PersistGate } from 'redux-persist/integration/react';
import { AppRoutes } from './AppRoutes';

const { store, persistor } = configureStore();

// persistor.purge();

function App() {
  return (
    <Provider store={store}>
      {/* @ts-ignore */}
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <AppRoutes />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
