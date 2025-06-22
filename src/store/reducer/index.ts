import { combineReducers } from 'redux';

import { to_deprecate_ISubscriptionDB_v2 } from '../../gpt-ai-flow-common/interface-database/ISubscriptionDB_v2';
import { IInputsCache_v2, to_deprecate_IInputsCache } from '../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import { IStoreStorage_settings_local } from '../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { IPrompt_v3 } from '../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3';

import { ICounterReducerState, counterReducer } from './CounterReducer';
import { userReducer } from './userReducer';
import { localReducer } from './localReducer';
import { proModeReducer } from './proModeReducer';
import { subscriptionReducer } from './SubscriptionReducer';
import { inputsCacheReducer } from './inputsCacheReducer';
import { prompts_v3Reducer } from './prompts_v3Reducer';
import { IPrompt_v3_type_persona } from '../../gpt-ai-flow-common/interface-app/2_component/IPrompt_v3/IPrompt_v3_type_persona';
import { IUserDB } from '../../gpt-ai-flow-common/interface-database/IUserDB';
import { IPrompt_v3_for_promptsFactory } from '../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3_for_promptsFactory';

export interface IReduxRootState {
  counterInfo: ICounterReducerState;
  user: IUserDB;
  local: IStoreStorage_settings_local;
  proModeSet: string; // For IProMode_v3
  // subscription: ISubscirptionMix;
  subscription_v2: to_deprecate_ISubscriptionDB_v2;
  inputsCache: to_deprecate_IInputsCache | IInputsCache_v2;
  prompts_v3: {
    user: (IPrompt_v3 | IPrompt_v3_type_persona)[];
    elements: IPrompt_v3_for_promptsFactory[];
  };
}

export const createRootReducer = () =>
  combineReducers({
    counter: counterReducer,
    user: userReducer,
    local: localReducer,
    proModeSet: proModeReducer,
    subscription: subscriptionReducer,
    inputsCache: inputsCacheReducer,
    prompts_v3: prompts_v3Reducer,
  });
