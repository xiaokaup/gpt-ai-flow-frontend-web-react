import { combineReducers } from "redux";
import { counterReducer } from "./CounterReducer";

export const createRootReducer = () =>
  combineReducers({
    counterReducer: counterReducer,
  });
