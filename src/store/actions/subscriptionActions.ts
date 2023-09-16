import { IConstantGptAiFlowHandler } from '../../gpt-ai-flow-common/config/constantGptAiFlow';
import { ISubscirptionMix } from '../../gpt-ai-flow-common/interface-app/3_unit/ISubscriptionMix';
import TBackendSubscriptionFile from '../../tools/3_unit/TBackendSubscription';

export const GET_SUBSCRIPTION_INFO = 'GET_SUBSCRIPTION_INFO';
export const getSubscriptionInfoAction =
  (userId: string, accessToken: string, env: IConstantGptAiFlowHandler) => async (dispatch: any) => {
    const results: ISubscirptionMix = await TBackendSubscriptionFile.getSubscriptionInfo(userId, accessToken, env);

    dispatch({ type: GET_SUBSCRIPTION_INFO, payload: results });

    return results;
  };
