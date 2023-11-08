import { ISubscriptionDB_v2 } from '../../gpt-ai-flow-common/interface-database/ISubscriptionDB_v2';
import TBackendSubscription_v2 from '../../gpt-ai-flow-common/tools/3_unit/TBackendSubscription_v2';
import { IConstantGptAiFlowHandler } from '../../gpt-ai-flow-common/config/constantGptAiFlow';

export const GET_SUBSCRIPTION_DATA_V2 = 'GET_SUBSCRIPTION_DATA_V2';
export const getSubscriptionDBAction_v2 =
  (userId: string, accessToken: string, env: IConstantGptAiFlowHandler) => async (dispatch: any) => {
    const results: ISubscriptionDB_v2 = await TBackendSubscription_v2.getSubscription_v2(userId, accessToken, env);

    dispatch({ type: GET_SUBSCRIPTION_DATA_V2, payload: results });

    return results;
  };

export const UPDATE_SUBSCRIPTION_DATA_V2 = 'UPDATE_SUBSCRIPTION_DATA_V2';
export const udpateSubscriptionDBAction_v2 = (newItem: ISubscriptionDB_v2) => async (dispatch: any) => {
  const results = { ...newItem };

  dispatch({ type: UPDATE_SUBSCRIPTION_DATA_V2, payload: results });

  return results;
};
