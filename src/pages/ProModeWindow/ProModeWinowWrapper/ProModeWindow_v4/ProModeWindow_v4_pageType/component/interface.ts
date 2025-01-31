import {
  IPrompt as IMessage,
  IPrompt_default as IMessage_default,
} from '../../../../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt';
import {
  IAdjust_for_type_langchain,
  IAdjust_type_langchain_default,
  IBackground_for_type_langchain,
  IBackground_type_langchain_default,
} from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/03-langchain';

export interface IChatMessage extends IMessage {
  isEdit: boolean;
  background: IBackground_for_type_langchain;
  adjust: IAdjust_for_type_langchain;
}

export const IChatMessage_default: IChatMessage = {
  isEdit: false,
  background: IBackground_type_langchain_default,
  adjust: IAdjust_type_langchain_default,
  ...IMessage_default,
};
