import { combineReducers } from 'redux';

import { to_deprecate_ISubscriptionDB_v2 } from '../../gpt-ai-flow-common/interface-database/ISubscriptionDB_v2';
import { to_deprecate_IInputsCache } from '../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import { IStoreStorage_settings_local } from '../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { to_deprecate_IUserData } from '../../gpt-ai-flow-common/interface-app/3_unit/to_deprecate_IUserData';

import { ICounterReducerState, counterReducer } from './CounterReducer';
import { userReducer } from './userReducer';
import { localReducer } from './localReducer';
import { proModeReducer } from './proModeReducer';
import { subscriptionReducer } from './SubscriptionReducer';
import { inputsCacheReduer } from './inputsCacheReducer';

export interface IReduxRootState {
  counterInfo: ICounterReducerState;
  user: to_deprecate_IUserData;
  local: IStoreStorage_settings_local;
  proModeSet: string; // OK, not IProMode_v3
  // subscription: ISubscirptionMix;
  subscription_v2: to_deprecate_ISubscriptionDB_v2;
  inputsCache: to_deprecate_IInputsCache;
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
