import { combineReducers } from 'redux';
import { ICounterReducerState, counterReducer } from './CounterReducer';
import { IUserData } from '../../gpt-ai-flow-common/interface-app/IUserData';
import { userReducer } from './userReducer';

export interface IReduxRootState {
  counterInfo: ICounterReducerState;
  user: IUserData;
}

export const createRootReducer = () =>
  combineReducers({
    counter: counterReducer,
    user: userReducer,
  });
