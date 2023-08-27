// import logo from "./logo.svg";
// import "./App.css";

import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store/store';

import { AppLayout } from './AppLayout';
// import { CounterComponent } from "./CounterComponent";
import { PersistGate } from 'redux-persist/integration/react';
import { CounterComponent } from './CounterComponent';

import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom';
import { SettingsWindow_2_user_1_signup } from './pages/1_page/settingsWindow_2_user/SettingsWindow_2_user_1_signup';
import { SettingsWindow_2_user_2_login } from './pages/1_page/settingsWindow_2_user/SettingsWindow_2_user_2_login';
import { SettingsWindow_2_user_3_info } from './pages/1_page/settingsWindow_2_user/SettingsWindow_2_user_3_info';

const { store, persistor } = configureStore();

// persistor.purge();

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
        <br />
        <Link to="counter">counter</Link>
        <br />
        <button
          onClick={() =>
            console.log(
              'process.env.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY',
              process.env.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY
            )
          }
        >
          check
        </button>
      </AppLayout>
    ),
  },
  {
    path: '/counter',
    element: (
      <AppLayout>
        <CounterComponent />
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
]);

function App() {
  return (
    <Provider store={store}>
      {/* @ts-ignore */}
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
