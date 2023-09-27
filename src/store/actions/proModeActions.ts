import TBackendProModeDataFile from '../../gpt-ai-flow-common/tools/3_unit/TBackendProModeData';
import { IConstantGptAiFlowHandler } from '../../gpt-ai-flow-common/config/constantGptAiFlow';
import { IReduxRootState } from '../reducer';

export const SYNC_PROMODE_DATA = 'SYNC_PROMODE_DATA';
export const sync_proModeDataAction =
  (
    userId: string,
    accessToken: string,
    getDecryptObj: (ciphertext: string, key: string) => any,
    env: IConstantGptAiFlowHandler
  ) =>
  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  async (dispatch: any, getState: () => IReduxRootState) => {
    try {
      const results = await TBackendProModeDataFile.sync_proModeData(userId, accessToken, getDecryptObj, env);

      dispatch({ type: SYNC_PROMODE_DATA, payload: results });

      return results;
    } catch (error) {
      console.log('getUserProfile error', error);
    }
  };
