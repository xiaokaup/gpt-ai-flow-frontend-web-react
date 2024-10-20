import { Dispatch } from 'redux';
import { IPrompt_v3 } from '../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3';
import { IPrompt_v3_type_persona } from '../../gpt-ai-flow-common/interface-app/2_component/IPrompt_v3/IPrompt_v3_type_persona';

export const UPDATE_USER_PROMPTS_V3 = 'UPDATE_USER_PROMPTS_V3';
export const updateUserPrompts_v3 =
  (newItem: (IPrompt_v3 | IPrompt_v3_type_persona)[]) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_USER_PROMPTS_V3, payload: newItem });
  };
