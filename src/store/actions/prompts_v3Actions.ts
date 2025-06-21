import { Dispatch } from 'redux';
import { IPrompt_v3 } from '../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3';
import { IPrompt_v3_type_persona } from '../../gpt-ai-flow-common/interface-app/2_component/IPrompt_v3/IPrompt_v3_type_persona';
import { IPrompt_v3_for_promptsFactory } from '../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3_for_promptsFactory';

export const UPDATE_USER_PROMPTS_V3 = 'UPDATE_PROMPTS_V3_USER';
export const updateUserPrompts_v3 =
  (newItem: (IPrompt_v3 | IPrompt_v3_type_persona)[]) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_USER_PROMPTS_V3, payload: newItem });
  };

export const UPDATE_PROMPTS_V3_ELEMENTS = 'UPDATE_PROMPTS_V3_ELEMENTS';
export const udpatePrompts_v3_elements = (newItem: IPrompt_v3_for_promptsFactory[]) => async (dispatch: Dispatch) => {
  dispatch({ type: UPDATE_PROMPTS_V3_ELEMENTS, payload: newItem });
};
