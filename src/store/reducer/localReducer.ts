import { ELocale } from '../../gpt-ai-flow-common/enum-app/ELocale';
import { EOpenAiModel } from '../../gpt-ai-flow-common/interface-app/IAIFlow';
import { SAVE_LOCAL } from '../actions/localActions';
import { USER_LOGOUT } from '../actions/userActions';
import { IAction } from '../store';

const initialState: ILocalReducerState = {
  locale: ELocale.DEFAULT,
  openAIApiKey: '',
  chatMode: {
    model_type: EOpenAiModel.GPT_3_point_5_TURBO,
  },
  proMode: {
    model_type: EOpenAiModel.GPT_3_point_5_TURBO,
  },
};

export interface ILocalReducerState {
  locale: ELocale;
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
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
