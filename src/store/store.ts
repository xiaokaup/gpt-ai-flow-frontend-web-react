import { createStore, applyMiddleware, compose } from "redux";
import { createRootReducer } from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "@react-native-async-storage/async-storage";

import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

const rootReducer = createRootReducer();

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ['someSpecificReducerName'], // only persist specific reducers
  // blacklist: ['anotherReducerName'],    // do not persist these reducers
};

export function configureStore(initialState = {}) {
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const storeComposeEnhancers =
    (typeof window !== "undefined" &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  let settingMiddleware;

  settingMiddleware = applyMiddleware(thunk, createLogger());

  const store = createStore(
    persistedReducer,
    initialState,
    storeComposeEnhancers(settingMiddleware)
  );
  const persistor = persistStore(store);

  return { store, persistor };
}
