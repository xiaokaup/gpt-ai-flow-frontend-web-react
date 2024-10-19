import { IPrompt_v3_type_persona } from '../../gpt-ai-flow-common/interface-app/2_component/IPrompt_v3/IPrompt_v3_IPersonaModel';
import { IPrompt_v3, IPrompts_v3_default } from '../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3';
import { IAction } from '../store';

const initialState = {
  user: IPrompts_v3_default,
};

export interface IPrompts_v3ReducerState {
  user: (IPrompt_v3 | IPrompt_v3_type_persona)[];
}

export const prompts_v3Reducer = (state: IPrompts_v3ReducerState = initialState, action: IAction) => {
  const { type, payload } = action;
  switch (type) {
    case 'UPDATE_USER_PROMPTS_V3':
      return { ...state, user: payload };
    default:
      return state;
  }
};
