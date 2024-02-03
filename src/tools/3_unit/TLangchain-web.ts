import TCryptoJSFile from 'gpt-ai-flow-common/tools/TCrypto-js';
import CONSTANTS_GPT_AI_FLOW_COMMON, {
  IConstantGptAiFlowHandler,
} from '../../gpt-ai-flow-common/config/constantGptAiFlow';
import { ISendConversationalRetrievalChainToBackendProxy_dataField_input } from '../../gpt-ai-flow-common/interface-backend/IBackendLangchain';
import {
  IChatGPTStreamResponse_output,
  IBackendOpenAI_dataField_encrypted_input,
} from '../../gpt-ai-flow-common/interface-backend/IBackendOpenAI';
import { getApiKeyHeadersForNodeBackend } from '../../gpt-ai-flow-common/tools/2_component/TAuth';
import TAppLimitFile from '../../gpt-ai-flow-common/tools/4_base/TAppLimit';

const sendConversationalRetrievalChainToBackendProxy = async (
  data: ISendConversationalRetrievalChainToBackendProxy_dataField_input,
  beforeSendRequestAsStreamFunc: () => void,
  updateResultFromRequestAsStreamFunc: (resultText: string) => void,
  AfterRequestAsStreamFunc: () => void,
  accessToken: string,
  env: IConstantGptAiFlowHandler,
  signal?: AbortSignal
): Promise<IChatGPTStreamResponse_output> => {
  const { category } = data;

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
    } as IBackendOpenAI_dataField_encrypted_input),
  };

  if (signal) {
    options.signal = signal;
  }

  const url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v1.0/post/langchain/chains/conversationalRetrievalChain/${category}`;

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
      // eslint-disable-next-line no-await-in-loop
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

const TLangchainFile = {
  sendConversationalRetrievalChainToBackendProxy,
};

export default TLangchainFile;
