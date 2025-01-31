import { Button } from 'antd';

import { EProMode_v4_module_contextType } from '../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/EProMode_v4_module';
import {
  IAdjust_for_type_langchain,
  IBackground_for_type_langchain,
} from '../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/03-langchain';
import { IChatMessage } from '../../../../../gpt-ai-flow-common/interface-app/3_unit/IChatMessage';
import { IInputsCache_v2 } from '../../../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import { ESocialPlatform_moduleName } from '../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/03-langchain/01-iterate-and-optimize/00-prototype-2024-12-02-socialPlatform/ESocialPlatofrm';

interface IProMode_debug_v4_subVersion_2_input {
  contextType: EProMode_v4_module_contextType | ESocialPlatform_moduleName;
  background: IBackground_for_type_langchain;
  adjust: IAdjust_for_type_langchain;
  chatMessages: IChatMessage[];
  currentVersionNum: number;
  inputsCache_v2: IInputsCache_v2;
}

export const ProMode_debug_v4_subVersion_2 = (props: IProMode_debug_v4_subVersion_2_input) => {
  const { contextType, background, adjust, chatMessages, currentVersionNum, inputsCache_v2 } = props;

  return (
    <>
      <div className="row @DEV">
        <Button
          type="primary"
          onClick={() => {
            console.log('contextType', contextType);
          }}
        >
          contextType
        </Button>

        <Button
          type="primary"
          onClick={() => {
            console.log('background', background);
            console.log('adjust', adjust);
          }}
          style={{ marginLeft: '1rem' }}
        >
          background and adjust
        </Button>

        <Button
          type="primary"
          onClick={() => {
            console.log('inputsCache_v2', inputsCache_v2);
          }}
          style={{ marginLeft: '1rem' }}
        >
          inputsCache_v2
        </Button>
      </div>
      <div>
        <pre>
          currentVersionNum: {currentVersionNum}
          <br />
          <code>{JSON.stringify(chatMessages, null, 2)}</code>
        </pre>
      </div>
    </>
  );
};
