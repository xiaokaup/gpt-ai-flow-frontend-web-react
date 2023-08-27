import { combineReducers } from 'redux';
import { ICounterReducerState, counterReducer } from './CounterReducer';
import { IUserData } from '../../gpt-ai-flow-common/interface-app/IUserData';

export interface IReduxRootState {
  counterInfo: ICounterReducerState;
  user: IUserData;
}

export const createRootReducer = () =>
  combineReducers({
    counterReducer: counterReducer,
  });
