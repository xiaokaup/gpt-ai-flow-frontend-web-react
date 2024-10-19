import { Dispatch } from 'redux';
import { IPrompt_v3 } from '../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3';

export const UPDATE_USER_PROMPTS_V3 = 'UPDATE_USER_PROMPTS_V3';
export const updateUserPrompts_v3 = (newItem: IPrompt_v3[]) => async (dispatch: Dispatch) => {
  dispatch({ type: UPDATE_USER_PROMPTS_V3, payload: newItem });
};
