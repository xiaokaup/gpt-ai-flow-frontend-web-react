import { IConstantGptAiFlowHandler } from '../../gpt-ai-flow-common/config/constantGptAiFlow';
import { IReduxRootState } from '../reducer';
import TBackendProModeDataFile from '../../tools/3_unit/TBackendProModeData';
import TCryptoJSFile from '../../gpt-ai-flow-common/tools/TCrypto-js';

export const SYNC_PROMODE_DATA = 'SYNC_PROMODE_DATA';
export const sync_proModeDataAction =
  (
    userId: string,
    accessToken: string,
    getDecryptObj: (ciphertext: string, key: string) => any,
    env: IConstantGptAiFlowHandler
  ) =>
  async (dispatch: any, getState: () => IReduxRootState) => {
    try {
      const results = await TBackendProModeDataFile.getProModeDataFromBackend(userId, accessToken, getDecryptObj, env);

      dispatch({ type: SYNC_PROMODE_DATA, payload: results });

      return results;
    } catch (error) {
      console.log('getUserProfile error', error);
    }
  };
