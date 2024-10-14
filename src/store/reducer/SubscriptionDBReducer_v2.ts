import ISubscriptionDB_v2File, {
  to_deprecate_ISubscriptionDB_v2,
} from '../../gpt-ai-flow-common/interface-database/ISubscriptionDB_v2';
import { UPDATE_SUBSCRIPTION_DATA_V2 } from '../actions/subscriptionDBActions_v2';
import { USER_LOGOUT } from '../actions/userActions';
import { IAction } from '../store';

const initialState: to_deprecate_ISubscriptionDB_v2 = ISubscriptionDB_v2File.ISubscriptionDB_v2_default;

export const subscriptionDBReducer_v2 = (state: to_deprecate_ISubscriptionDB_v2 = initialState, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    // case GET_SUBSCRIPTION_DATA_V2:
    //   return payload;
    case UPDATE_SUBSCRIPTION_DATA_V2:
      return payload;
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
