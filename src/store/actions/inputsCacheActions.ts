import { to_deprecate_IInputsCache, IInputsCache_v2 } from '../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';

export const UPDATE_INPUTS_CACHE = 'UPDATE_INPUTS_CACHE';
export const updateInputsCache = (newItem: to_deprecate_IInputsCache | IInputsCache_v2) => async (dispatch: any) => {
  dispatch({ type: UPDATE_INPUTS_CACHE, payload: newItem });
};
