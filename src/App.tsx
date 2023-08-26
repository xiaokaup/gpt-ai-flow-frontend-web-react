// import logo from "./logo.svg";
// import "./App.css";

import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./store/store";

import { AppLayout } from "./AppLayout";
// import { CounterComponent } from "./CounterComponent";
import { PersistGate } from "redux-persist/integration/react";
import { CounterComponent } from "./CounterComponent";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const { store, persistor } = configureStore();

// persistor.purge();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <h1>Hello World</h1>
        {/* @ts-ignore */}
        <Link to="about">About Us</Link>
      </AppLayout>
    ),
  },
  {
    path: "/about",
    element: <AppLayout>About</AppLayout>,
  },
  {
    path: "/counter",
    element: (
      <AppLayout>
        <CounterComponent />
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
