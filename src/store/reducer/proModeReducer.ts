import CONSTANTS_GPT_AI_FLOW_COMMON from '../../gpt-ai-flow-common/config/constantGptAiFlow';
import { EOpenAiModelType } from '../../gpt-ai-flow-common/enum-backend/EOpenAIModelType';
import IProMode_v3File from '../../gpt-ai-flow-common/interface-backend/IProMode_v3';

import TCryptoJSFile from '../../gpt-ai-flow-common/tools/TCrypto-js';
import { SYNC_PROMODE_DATA, UPDATE_PROMODE_DATA } from '../actions/proModeActions';
import { USER_LOGOUT } from '../actions/userActions';

import { IAction } from '../store';

export interface IProModeReducerState {
  openAIApiKey: string;
  chatMode: {
    model_type: EOpenAiModelType;
  };
  proMode: {
    model_type: EOpenAiModelType;
  };
}

const initialState = TCryptoJSFile.encrypt(
  IProMode_v3File.IProMode_v3_default,
  CONSTANTS_GPT_AI_FLOW_COMMON.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string
);

export const proModeReducer = (state: string = initialState, action: IAction) => {
  const { type, payload } = action;
  switch (type) {
    case SYNC_PROMODE_DATA:
      return TCryptoJSFile.encrypt(
        payload,
        CONSTANTS_GPT_AI_FLOW_COMMON.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string
      );
    case UPDATE_PROMODE_DATA:
      return TCryptoJSFile.encrypt(
        payload,
        CONSTANTS_GPT_AI_FLOW_COMMON.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string
      );
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
