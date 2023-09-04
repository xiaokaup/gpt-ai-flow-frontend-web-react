import CONSTANTS_GPT_AI_FLOW_COMMON, {
  IConstantGptAiFlowHandler,
} from '../../gpt-ai-flow-common/config/constantGptAiFlow';
import { EStripeSubscriptionVersion } from '../../gpt-ai-flow-common/enum-app/EStripeSubscription';
import {
  ISendChatGPTRequestToBackend_encrypted_input,
  ISendChatGPTRequestToBackend_input,
  ISendChatGPTRequestToBackend_ouput,
} from '../../gpt-ai-flow-common/interface-backend/IBackendOpenAI';
import TCryptoJSFile from '../../gpt-ai-flow-common/tools/TCrypto-js';
import TLimitFile from '../../gpt-ai-flow-common/tools/TLimit';
import { getApiKeyHeadersForNodeBackend } from '../../tools/2_component/TAuth';

// export const sendChatGPTRequestAsJsonToBackendProxy = async (
//   data: ISendChatGPTRequestToBackend_input,
//   env: IConstantGptAiFlowHandler,
//   signal?: AbortSignal
// ): Promise<ISendChatGPTRequestToBackend_ouput> => {
//   const options: any = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   };

//   if (signal) {
//     options.signal = signal;
//   }

//   const response = await fetch(
//     `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/legacy/openai/travelWithContext`,
//     options
//   );

//   const tmp = await response.json();

//   return {
//     status: response.status,
//     statusText: response.statusText,
//     result: tmp?.result,
//   };
// };

export const sendChatGPTRequestAsStreamToBackendProxy = async (
  data: ISendChatGPTRequestToBackend_input,
  beforeSendRequestAsStreamFunc: () => void,
  updateResultFromRequestAsStreamFunc: (resultText: string) => void,
  AfterRequestAsStreamFunc: () => void,
  accessToken: string,
  env: IConstantGptAiFlowHandler,
  signal?: AbortSignal
): Promise<ISendChatGPTRequestToBackend_ouput> => {
  const options: any = {
    method: 'POST',
    ...getApiKeyHeadersForNodeBackend(
      {
        accessToken,
      },
      env
    ),
    body: JSON.stringify({
      data: TCryptoJSFile.encrypt(data, CONSTANTS_GPT_AI_FLOW_COMMON.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string),
    } as ISendChatGPTRequestToBackend_encrypted_input),
  };

  if (signal) {
    options.signal = signal;
  }

  let url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v1.0/openai/v4.4.0/streamChat`;
  if (data.userStripeSubscriptionInfo.version === EStripeSubscriptionVersion.OFFICIAL_MODAL) {
    url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v1.0/openai/v4.4.0/streamChatWithOfficialKey`;
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    console.error('Error calling stream-chat API:', response.status, response.statusText);
    const results = await response.json();
    throw new Error(results?.message ?? response.statusText);
  }

  if (!response.body) {
    throw new Error('No response body');
  }

  let resultText = '';
  if (response.body) {
    beforeSendRequestAsStreamFunc();

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const text = decoder.decode(value);

      resultText += text;
      resultText = TLimitFile.limitGPTAndOpenAICharacters(resultText);
      updateResultFromRequestAsStreamFunc(resultText);
    }

    AfterRequestAsStreamFunc();
  }

  return {
    status: response.status,
    statusText: response.statusText,
    results: resultText,
  };
};

export const sendChatGPTRequestForResumeMessagesToBackendProxy_used_in_main = async (
  data: ISendChatGPTRequestToBackend_input,
  accessToken: string,
  env: IConstantGptAiFlowHandler,
  TCrypto: any
): Promise<ISendChatGPTRequestToBackend_ouput> => {
  const options: any = {
    method: 'POST',
    ...getApiKeyHeadersForNodeBackend(
      {
        accessToken,
      },
      env
    ),
    body: JSON.stringify({
      data: TCrypto.encrypt(data, env.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string),
    } as ISendChatGPTRequestToBackend_encrypted_input),
  };

  let url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v1.0/openai/v4.4.0/generateResume`;
  if (data.userStripeSubscriptionInfo.version === EStripeSubscriptionVersion.OFFICIAL_MODAL) {
    url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v1.0/openai/v4.4.0/generateResumeWithOfficialKey`;
  }

  const response = await fetch(url, options);

  const tmp = await response.json();

  return {
    status: response.status,
    statusText: response.statusText,
    results: tmp?.results,
  };
};
