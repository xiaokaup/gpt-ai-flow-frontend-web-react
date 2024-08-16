import { IStoreStorage_settings_local } from '../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';

export const SAVE_LOCAL = 'SAVE_LOCAL';
export const saveLocalAction =
  (newLocalSettings: IStoreStorage_settings_local) =>
  async (
    dispatch: any,
    // getState: () => IReduxRootState
  ) => {
    dispatch({ type: SAVE_LOCAL, payload: newLocalSettings });
  };
