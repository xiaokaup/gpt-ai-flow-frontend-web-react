import { IReduxRootState } from '../reducer';
import { ILocalReducerState } from '../reducer/localReducer';

export const UPDATE_INPUTS_CACHE = 'UPDATE_INPUTS_CACHE';
export const updateInputsCache =
  (localInfo: ILocalReducerState) => async (dispatch: any, getState: () => IReduxRootState) => {
    dispatch({ type: UPDATE_INPUTS_CACHE, payload: localInfo });
  };
