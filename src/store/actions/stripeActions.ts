import { IConstantGptAiFlowHandler } from '../../gpt-ai-flow-common/config/constantGptAiFlow';
import { getSubscriptionNicknameAndStatus } from '../../tools/3_unit/TBackendStripe';

export const STRIPE_GET_SUBSCRIPTION_NICKNAME_AND_STATUS = 'STRIPE_GET_SUBSCRIPTION_NICKNAME_AND_STATUS';
export const getSubscriptionNicknameAndStatusAction =
  (userId: string, stripeCustomerId: string, accessToken: string, env: IConstantGptAiFlowHandler) =>
  async (dispatch: any) => {
    const results = await getSubscriptionNicknameAndStatus(userId, stripeCustomerId, accessToken, env);

    dispatch({ type: STRIPE_GET_SUBSCRIPTION_NICKNAME_AND_STATUS, payload: results });

    return results;
  };
