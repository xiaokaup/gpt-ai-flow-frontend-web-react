import { combineReducers } from 'redux';

import { IUserData } from '../../gpt-ai-flow-common/interface-app/IUserData';
// import { ISubscirptionMix } from '../../gpt-ai-flow-common/interface-app/3_unit/ISubscriptionMix';
import { ISubscriptionDB_v2 } from '../../gpt-ai-flow-common/interface-database/ISubscriptionDB_v2';
import { IInputsCache } from '../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';

import { ICounterReducerState, counterReducer } from './CounterReducer';
import { userReducer } from './userReducer';
import { ILocalReducerState, localReducer } from './localReducer';
import { proModeReducer } from './proModeReducer';
import { subscriptionReducer } from './SubscriptionReducer';
import { inputsCacheReduer } from './inputsCacheReducer';

export interface IReduxRootState {
  counterInfo: ICounterReducerState;
  user: IUserData;
  local: ILocalReducerState;
  proModeSet: string;
  // subscription: ISubscirptionMix;
  subscription_v2: ISubscriptionDB_v2;
  inputsCache: IInputsCache;
}

export const createRootReducer = () =>
  combineReducers({
    counter: counterReducer,
    user: userReducer,
    local: localReducer,
    proModeSet: proModeReducer,
    subscription: subscriptionReducer,
    inputsCache: inputsCacheReduer,
  });
