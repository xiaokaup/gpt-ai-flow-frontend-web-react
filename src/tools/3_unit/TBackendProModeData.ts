import { IConstantGptAiFlowHandler } from '../../gpt-ai-flow-common/config/constantGptAiFlow';
import IProMode_v2File, { IProMode_v2 } from '../../gpt-ai-flow-common/interface-backend/IProMode_v2';
import TCryptoJSFile from '../../gpt-ai-flow-common/tools/TCrypto-js';
import { getApiKeyHeadersForNodeBackend } from '../2_component/TAuth';
import { fetchWithRetry } from '../4_base/TRequest';

// === Request - start ===
const getProModeDataFromBackend = async (
  userId: string,
  accessToken: string,
  getDecryptObj: (ciphertext: string, key: string) => any,
  env: IConstantGptAiFlowHandler
): Promise<IProMode_v2> => {
  const url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v1.0/get/user/${userId}/proModes/`;

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
    .then((encryptedProModeSet: string) => {
      console.log('encryptedProModeSet', encryptedProModeSet);

      console.log(
        'env.BACKEND_AI_FLOW.AI_FLOW_COMMANDS_SYMMETRIC_ENCRYPTION_KEY',
        env.BACKEND_AI_FLOW.AI_FLOW_COMMANDS_SYMMETRIC_ENCRYPTION_KEY
      );
      const proModeSet: IProMode_v2 = TCryptoJSFile.decrypt(
        encryptedProModeSet,
        env.BACKEND_AI_FLOW.AI_FLOW_COMMANDS_SYMMETRIC_ENCRYPTION_KEY as string
      );

      console.log('proModeSet', proModeSet);

      return proModeSet;
    })
    .catch((error) => {
      console.log('error', error);
    });

  if (!results) {
    return IProMode_v2File.IProMode_v2_default;
  }

  return results;
};
// === Request - end ===

const TBackendProModeDataFile = {
  getProModeDataFromBackend,
};

export default TBackendProModeDataFile;
