import ISubscriptionMixFile, {
  ISubscirptionMix,
} from '../../gpt-ai-flow-common/interface-app/3_unit/to-delete-ISubscriptionMix';
import { USER_LOGOUT } from '../actions/userActions';
import { IAction } from '../store';

const initialState: ISubscirptionMix = ISubscriptionMixFile.ISubscriptionMix_default;

export const subscriptionReducer = (state: ISubscirptionMix = initialState, action: IAction) => {
  const { type } = action;

  switch (type) {
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
