import { ISubscirptionMix } from '../../gpt-ai-flow-common/interface-app/3_unit/ISubscriptionMix';
import { IConstantGptAiFlowHandler } from '../../gpt-ai-flow-common/config/constantGptAiFlow';
import { getApiKeyHeadersForNodeBackend } from '../2_component/TAuth';
import { fetchWithRetry } from '../4_base/TRequest';

export const getSubscriptionInfo = async (
  userId: string,
  accessToken: string,
  env: IConstantGptAiFlowHandler
): Promise<ISubscirptionMix> => {
  const url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v1.0/get/subscription/by/userId/${userId}`;

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

export const startATrialSubscriptionForCNY = async (
  userId: string,
  accessToken: string,
  env: IConstantGptAiFlowHandler
): Promise<ISubscirptionMix> => {
  const url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v1.0/get/startATrialSubscriptionForCNY/for/userId/${userId}/`;

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

const TBackendSubscriptionFile = {
  getSubscriptionInfo,
};

export default TBackendSubscriptionFile;
