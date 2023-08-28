import { EOpenAiModel } from '../../gpt-ai-flow-common/interface-app/IAIFlow';
import { SAVE_LOCAL } from '../actions/localActions';
import { IAction } from '../store';

const initialState: ILocalReducerState = {
  openAIApiKey: '',
  chatMode: {
    model_type: EOpenAiModel.GPT_3_point_5_TURBO,
  },
  proMode: {
    model_type: EOpenAiModel.GPT_3_point_5_TURBO,
  },
};

export interface ILocalReducerState {
  openAIApiKey: string;
  chatMode: {
    model_type: EOpenAiModel;
  };
  proMode: {
    model_type: EOpenAiModel;
  };
}

export const localReducer = (state: ILocalReducerState = initialState, action: IAction) => {
  const { type, payload } = action;
  switch (type) {
    case SAVE_LOCAL:
      return payload;
    default:
      return state;
  }
};
