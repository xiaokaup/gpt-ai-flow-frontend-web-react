import { combineReducers } from 'redux';
import { ICounterReducerState, counterReducer } from './CounterReducer';
import { IUserData } from '../../gpt-ai-flow-common/interface-app/IUserData';
import { userReducer } from './userReducer';
import { ILocalReducerState, localReducer } from './localReducer';
import { proModeReducer } from './proModeReducer';
import { ISubscirptionMix } from '../../gpt-ai-flow-common/interface-app/3_unit/ISubscriptionMix';
import { subscriptionReducer } from './SubscriptionReducer';

export interface IReduxRootState {
  counterInfo: ICounterReducerState;
  user: IUserData;
  local: ILocalReducerState;
  proModeSet: string;
  subscriptionInfo: ISubscirptionMix;
}

export const createRootReducer = () =>
  combineReducers({
    counter: counterReducer,
    user: userReducer,
    local: localReducer,
    proModeSet: proModeReducer,
    subscriptionInfo: subscriptionReducer,
  });
