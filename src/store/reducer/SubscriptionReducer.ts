import ISubscriptionMixFile, {
  to_deprecate_ISubscirptionMix,
} from '../../gpt-ai-flow-common/interface-app/3_unit/to-delete-ISubscriptionMix';
import { USER_LOGOUT } from '../actions/userActions';
import { IAction } from '../store';

const initialState: to_deprecate_ISubscirptionMix = ISubscriptionMixFile.ISubscriptionMix_default;

export const subscriptionReducer = (state: to_deprecate_ISubscirptionMix = initialState, action: IAction) => {
  const { type } = action;

  switch (type) {
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
