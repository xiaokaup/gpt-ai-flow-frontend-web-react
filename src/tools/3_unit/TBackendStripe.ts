import { fetchWithRetry } from '../../tools/4_base/TRequest';
import { getApiKeyHeadersForNodeBackend } from '../../tools/2_component/TAuth';
import { IStripeSubscriptionInfo } from '../../gpt-ai-flow-common/interface-app/IStripe';
import { IConstantGptAiFlowHandler } from '../../gpt-ai-flow-common/config/constantGptAiFlow';

export const getSubscriptionNicknameAndStatus = async (
  userId: string,
  stripeCustomerId: string,
  accessToken: string,
  env: IConstantGptAiFlowHandler
): Promise<IStripeSubscriptionInfo> => {
  const url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v1.0/get/user/${userId}/stripe/${stripeCustomerId}/getSubscriptionNicknameAndStatus/`;

  const results = await fetchWithRetry(url, {
    method: 'GET',
    ...getApiKeyHeadersForNodeBackend(
      {
        accessToken,
      },
      env
    ),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('data.results', data.results);
      return data.results;
    })
    .catch((error) => {
      console.log('error', error);
    });

  console.log('getSubscriptionNicknameAndStatus', results);

  return results;
};

export const createSubscirptionByStripeCustomerId = async (
  userId: string,
  stripeCustomerId: string,
  priceId: string,
  accessToken: string,
  env: IConstantGptAiFlowHandler
) => {
  const url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v1.0/get/user/${userId}/createSubscirptionByStripeCustomerId/for/${stripeCustomerId}/with/${priceId}/`;

  const results = await fetchWithRetry(url, {
    method: 'GET',
    ...getApiKeyHeadersForNodeBackend(
      {
        accessToken,
      },
      env
    ),
  })
    .then((res) => res.json())
    .then((data) => {
      return data.results;
    })
    .catch((error) => {
      console.log('error', error);
    });

  return results;
};

export default {
  getSubscriptionNicknameAndStatus,
  createSubscirptionByStripeCustomerId,
};
