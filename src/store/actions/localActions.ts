import { IReduxRootState } from '../reducer';

interface ILocalSettings {}

export const SAVE_LOCAL_SETTINGS = 'SAVE_LOCAL_SETTINGS';
export const saveLocalSettingsAction =
  (localSettings: ILocalSettings) => async (dispatch: any, getState: () => IReduxRootState) => {
    dispatch({ type: SAVE_LOCAL_SETTINGS, payload: localSettings });
  };
