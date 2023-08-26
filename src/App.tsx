// import logo from "./logo.svg";
// import "./App.css";

import { Provider } from "react-redux";
import { configureStore } from "./store/store";

import { AppLayout } from "./AppLayout";
// import { CounterComponent } from "./CounterComponent";
import { PersistGate } from "redux-persist/integration/react";
import { CounterComponent } from "./CounterComponent";

const { store, persistor } = configureStore();

// persistor.purge();

function App() {
  return (
    <Provider store={store}>
      {/* @ts-ignore */}
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <CounterComponent />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
