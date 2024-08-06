import TBackendProModeDataFile from '../../gpt-ai-flow-common/tools/3_unit/TBackendProMode';
import { IConstantGptAiFlowHandler } from '../../gpt-ai-flow-common/config/constantGptAiFlow';
import { IProMode_v3 } from '../../gpt-ai-flow-common/interface-backend/IProMode_v3';
import { EServiceCategoryDB_name } from '../../gpt-ai-flow-common/enum-database/to_deprecate_EServiceCategoryDB';
import { ELocale } from '../../gpt-ai-flow-common/enum-app/ELocale';

export const SYNC_PROMODE_DATA = 'SYNC_PROMODE_DATA';
export const sync_proModeDataAction =
  (
    userId: string,
    accessToken: string,
    getDecryptObj: (ciphertext: string, key: string) => any,
    locale: ELocale,
    env: IConstantGptAiFlowHandler,
  ) =>
  async (dispatch: any) => {
    try {
      const results = await TBackendProModeDataFile.sync_proModeData(userId, accessToken, getDecryptObj, locale, env);

      dispatch({ type: SYNC_PROMODE_DATA, payload: results });

      return results;
    } catch (error) {
      console.log('getUserProfile error', error);
    }
  };

export const UPDATE_PROMODE_DATA = 'UPDATE_PROMODE_DATA';
export const updateProModeDataAction =
  (newPromodeSetData: Omit<IProMode_v3, EServiceCategoryDB_name.DEFAULT>) => async (dispatch: any) => {
    dispatch({ type: UPDATE_PROMODE_DATA, payload: newPromodeSetData });
  };
