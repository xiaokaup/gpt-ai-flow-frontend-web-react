import ISubscriptionMixFile, { ISubscirptionMix } from '../../gpt-ai-flow-common/interface-app/3_unit/ISubscriptionMix';
import { GET_SUBSCRIPTION_INFO } from '../actions/subscriptionActions';
import { USER_LOGOUT } from '../actions/userActions';
import { IAction } from '../store';

const initialState: ISubscirptionMix = ISubscriptionMixFile.ISubscriptionMix_default;

export const stripeReducer = (state: ISubscirptionMix = initialState, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SUBSCRIPTION_INFO:
      return payload;
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
