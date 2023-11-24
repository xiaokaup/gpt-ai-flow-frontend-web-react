import { IReduxRootState } from '../reducer';
import { IStoreStorageLocalSettings } from '../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';

export const SAVE_LOCAL = 'SAVE_LOCAL';
export const saveLocalAction =
  (newLocalSettings: IStoreStorageLocalSettings) => async (dispatch: any, getState: () => IReduxRootState) => {
    dispatch({ type: SAVE_LOCAL, payload: newLocalSettings });
  };
