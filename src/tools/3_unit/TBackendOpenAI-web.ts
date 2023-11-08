import CONSTANTS_GPT_AI_FLOW_COMMON, {
  IConstantGptAiFlowHandler,
} from '../../gpt-ai-flow-common/config/constantGptAiFlow';
import {
  IBackendOpenAI_dataField_encrypted_input,
  ISendChatGPTRequestAsStreamToBackendProxy_dataField_input,
  ISendChatGPTRequestAsStreamToBackendProxy_output,
  // ISendChatGPTRequestForGetVectorToBackendProxy_dataField_input,
  // ISendChatGPTRequestForGetVectorToBackendProxy_output,
} from '../../gpt-ai-flow-common/interface-backend/IBackendOpenAI';
import TCryptoJSFile, { ITCryptoJSFile } from '../../gpt-ai-flow-common/tools/TCrypto-js';
import { getApiKeyHeadersForNodeBackend } from '../../gpt-ai-flow-common/tools/2_component/TAuth';
import TAppLimitFile from '../../gpt-ai-flow-common/tools/4_base/TAppLimit';
import { EProductDB_version } from '../../gpt-ai-flow-common/enum-database/EProductDB';

const sendChatGPTRequestAsStreamToBackendProxy = async (
  data: ISendChatGPTRequestAsStreamToBackendProxy_dataField_input,
  beforeSendRequestAsStreamFunc: () => void,
  updateResultFromRequestAsStreamFunc: (resultText: string) => void,
  AfterRequestAsStreamFunc: () => void,
  accessToken: string,
  env: IConstantGptAiFlowHandler,
  signal?: AbortSignal
): Promise<ISendChatGPTRequestAsStreamToBackendProxy_output> => {
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

  let url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v1.0/openai/v4.4.0/streamChat`;
  if (data.subscriptionData?.Product_Limit?.Product?.version === EProductDB_version.OFFICIAL_MODAL) {
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

// @TODELETE: for software only, not for web
// const sendChatGPTRequestForResumeMessagesToBackendProxy_used_in_main = async (
//   data: ISendChatGPTRequestAsStreamToBackendProxy_dataField_input,
//   accessToken: string,
//   env: IConstantGptAiFlowHandler,
//   TCryptoFile: ITCryptoJSFile
// ): Promise<ISendChatGPTRequestAsStreamToBackendProxy_output> => {
//   const options: any = {
//     method: 'POST',
//     ...getApiKeyHeadersForNodeBackend(
//       {
//         accessToken,
//       },
//       env
//     ),
//     body: JSON.stringify({
//       data: TCryptoFile.encrypt(data, env.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string),
//     } as IBackendOpenAI_dataField_encrypted_input),
//   };

//   let url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v1.0/openai/v4.4.0/generateResume`;
//   if (data.subscriptionData?.version === ESubscriptionVersion.OFFICIAL_MODAL) {
//     url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v1.0/openai/v4.4.0/generateResumeWithOfficialKey`;
//   }

//   const response = await fetch(url, options);

//   const tmp = await response.json();

//   return {
//     status: response.status,
//     statusText: response.statusText,
//     results: tmp?.results,
//   };
// };

// @TODELETE: for software only, not for web
// const sendChatGPTRequestForGetVectorToBackendProxy = async (
//   data: ISendChatGPTRequestForGetVectorToBackendProxy_dataField_input,
//   accessToken: string,
//   env: IConstantGptAiFlowHandler,
//   TCryptoFile: ITCryptoJSFile
// ): Promise<number[] | Error> => {
//   const options: any = {
//     method: 'POST',
//     ...getApiKeyHeadersForNodeBackend(
//       {
//         accessToken,
//       },
//       env
//     ),
//     body: JSON.stringify({
//       data: TCryptoFile.encrypt(data, env.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string),
//     } as IBackendOpenAI_dataField_encrypted_input),
//   };

//   let url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v1.0/openai/v4.4.0/getVector`;
//   if (data.subscriptionData.version === ESubscriptionVersion.OFFICIAL_MODAL) {
//     url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v1.0/openai/v4.4.0/getVectorWithOfficialKey`;
//   }

//   const response = await fetch(url, options);
//   const dataResults = (await response.json()) as ISendChatGPTRequestForGetVectorToBackendProxy_output;

//   return dataResults.results;
// };

const TBackendOpenAIFile = {
  sendChatGPTRequestAsStreamToBackendProxy,
};

export default TBackendOpenAIFile;
