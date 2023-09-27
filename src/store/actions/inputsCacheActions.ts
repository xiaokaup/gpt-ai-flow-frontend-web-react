import { IInputsCache } from '../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import { IReduxRootState } from '../reducer';

export const UPDATE_INPUTS_CACHE = 'UPDATE_INPUTS_CACHE';
export const updateInputsCache = (newItem: IInputsCache) => async (dispatch: any, getState: () => IReduxRootState) => {
  dispatch({ type: UPDATE_INPUTS_CACHE, payload: newItem });
};
