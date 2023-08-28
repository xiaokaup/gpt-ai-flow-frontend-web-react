import { combineReducers } from 'redux';
import { ICounterReducerState, counterReducer } from './CounterReducer';
import { IUserData } from '../../gpt-ai-flow-common/interface-app/IUserData';
import { userReducer } from './userReducer';
import { ILocalReducerState, localReducer } from './localReducer';
import { proModeReducer } from './proModeReducer';
import { stripeReducer } from './stripeReducer';
import { IStripeSubscriptionInfo } from '../../gpt-ai-flow-common/interface-app/IStripe';

export interface IReduxRootState {
  counterInfo: ICounterReducerState;
  user: IUserData;
  local: ILocalReducerState;
  proModeSet: string;
  stripe: IStripeSubscriptionInfo;
}

export const createRootReducer = () =>
  combineReducers({
    counter: counterReducer,
    user: userReducer,
    local: localReducer,
    proModeSet: proModeReducer,
    stripe: stripeReducer,
  });
