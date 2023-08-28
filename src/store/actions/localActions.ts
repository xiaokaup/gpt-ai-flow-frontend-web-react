import { IReduxRootState } from '../reducer';
import { ILocalReducerState } from '../reducer/localReducer';

export const SAVE_LOCAL = 'SAVE_LOCAL';
export const saveLocalAction =
  (localInfo: ILocalReducerState) => async (dispatch: any, getState: () => IReduxRootState) => {
    dispatch({ type: SAVE_LOCAL, payload: localInfo });
  };
