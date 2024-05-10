import CONSTANTS_GPT_AI_FLOW_COMMON, {
  IConstantGptAiFlowHandler,
} from '../../gpt-ai-flow-common/config/constantGptAiFlow';
import {
  ISendChatGPTRequestAsStreamToBackendProxy_dataField_input,
  IChatGPTStreamResponse_output,
  // ISendChatGPTRequestForGetVectorToBackendProxy_dataField_input,
  // ISendChatGPTRequestForGetVectorToBackendProxy_output,
} from '../../gpt-ai-flow-common/interface-backend/IBackendOpenAI';
import TCryptoJSFile from '../../gpt-ai-flow-common/tools/TCrypto-js';
import { AuthService } from '../../gpt-ai-flow-common/tools/2_class/SAuth';
import TAppLimitFile from '../../gpt-ai-flow-common/tools/4_base/TAppLimit';
import { EProductDB_version } from '../../gpt-ai-flow-common/enum-database/EProductDB';

const sendChatGPTRequestAsStreamToBackendProxy_to_delete = async (
  data: ISendChatGPTRequestAsStreamToBackendProxy_dataField_input,
  beforeSendRequestAsStreamFunc: () => void,
  updateResultFromRequestAsStreamFunc: (resultText: string) => void,
  AfterRequestAsStreamFunc: () => void,
  accessToken: string,
  env: IConstantGptAiFlowHandler,
  signal?: AbortSignal
): Promise<IChatGPTStreamResponse_output> => {
  const options: any = {
    method: 'POST',
    ...AuthService.getApiKeyHeadersForNodeBackend(
      {
        accessToken,
      },
      env
    ),
    body: JSON.stringify({
      data: TCryptoJSFile.encrypt(data, CONSTANTS_GPT_AI_FLOW_COMMON.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string),
    }),
  };

  if (signal) {
    options.signal = signal;
  }

  let url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v1.0/openai/v4.4.0/streamChat`;

  const subscriptionIsExpired =
    data.subscriptionData?.expiredAt && new Date(data.subscriptionData?.expiredAt) < new Date();
  if (
    !subscriptionIsExpired &&
    data.subscriptionData?.Product_Limit?.Product?.version === EProductDB_version.OFFICIAL_MODAL
  ) {
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

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const text = decoder.decode(value);

      resultText += text;
      resultText = TAppLimitFile.limitGPTAndOpenAICharacters(resultText);
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

const TBackendOpenAIFile = {
  sendChatGPTRequestAsStreamToBackendProxy: sendChatGPTRequestAsStreamToBackendProxy_to_delete,
};

export default TBackendOpenAIFile;
