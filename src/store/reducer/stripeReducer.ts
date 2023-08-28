import IStripeFile, { IStripeSubscriptionInfo } from '../../gpt-ai-flow-common/interface-app/IStripe';
import { STRIPE_GET_SUBSCRIPTION_NICKNAME_AND_STATUS } from '../actions/stripeActions';
import { USER_LOGOUT } from '../actions/userActions';
import { IAction } from '../store';

const initialState: IStripeSubscriptionInfo = IStripeFile.IStripeSubscriptionInfo_default;

export const stripeReducer = (state: IStripeSubscriptionInfo = initialState, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case STRIPE_GET_SUBSCRIPTION_NICKNAME_AND_STATUS:
      return payload;
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
