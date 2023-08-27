import { IConstantGptAiFlowHandler } from '../../gpt-ai-flow-common/config/constantGptAiFlow';
import { removeEmptyValues } from '../4_base/TEmpty';

export const getApiKeyHeadersForNodeBackend = (
  customerHeaders: {
    accessToken?: string;
    admin_api_key?: string;
  },
  env: IConstantGptAiFlowHandler
) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      api_key: env.BACKEND_NODE.BACKEND_NODE_HTTPS_API_KEY,
      ...removeEmptyValues(customerHeaders),
    },
  };
};
