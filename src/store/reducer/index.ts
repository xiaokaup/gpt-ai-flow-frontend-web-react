import { combineReducers } from 'redux';

import { ISubscriptionDB_v2 } from '../../gpt-ai-flow-common/interface-database/ISubscriptionDB_v2';
import { IInputsCache } from '../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import { IStoreStorageLocalSettings } from '../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { IUserData } from '../../gpt-ai-flow-common/interface-app/3_unit/IUserData';

import { ICounterReducerState, counterReducer } from './CounterReducer';
import { userReducer } from './userReducer';
import { localReducer } from './localReducer';
import { proModeReducer } from './proModeReducer';
import { subscriptionReducer } from './SubscriptionReducer';
import { inputsCacheReduer } from './inputsCacheReducer';

export interface IReduxRootState {
  counterInfo: ICounterReducerState;
  user: IUserData;
  local: IStoreStorageLocalSettings;
  proModeSet: string; // OK, not IProMode_v3
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
