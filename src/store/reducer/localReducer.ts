import { EOpenAiModel } from '../../gpt-ai-flow-common/interface-app/IAIFlow';
import { IAction } from '../store';

const initialState: ILocalSettingsReducerState = {
  openAIApiKey: '',
  chatMode: {
    model_type: EOpenAiModel.GPT_3_point_5_TURBO,
  },
  proMode: {
    model_type: EOpenAiModel.GPT_3_point_5_TURBO,
  },
};

export interface ILocalSettingsReducerState {
  openAIApiKey: string;
  chatMode: {
    model_type: EOpenAiModel;
  };
  proMode: {
    model_type: EOpenAiModel;
  };
}

export const localReducer = (state: ILocalSettingsReducerState = initialState, action: IAction) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};
