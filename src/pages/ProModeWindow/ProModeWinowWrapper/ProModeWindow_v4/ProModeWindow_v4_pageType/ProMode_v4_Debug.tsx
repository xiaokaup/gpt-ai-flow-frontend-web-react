import { Button } from 'antd';

import { EProMode_v4_module_contextType } from '../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/EProMode_v4_module';
import { ILangchainMessageExchange } from '../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/03-langchain';

interface IProMode_v4_Debug_input {
  chatHistory: ILangchainMessageExchange[];
  currentVersionNum: number;
  contextType: EProMode_v4_module_contextType;
  messageExchangeData: ILangchainMessageExchange;
}

export const ProMode_v4_Debug = (props: IProMode_v4_Debug_input) => {
  const { chatHistory, currentVersionNum, contextType, messageExchangeData } = props;

  return (
    <>
      <div className="row @DEV">
        <Button
          type="primary"
          onClick={() => {
            console.log('chatHistory', chatHistory);
          }}
        >
          chatHistory
        </Button>

        <Button
          type="primary"
          onClick={() => {
            console.log('currentVersionNum', currentVersionNum);
          }}
          style={{ marginLeft: '1rem' }}
        >
          currentVersionNum
        </Button>

        <Button
          type="primary"
          onClick={() => {
            console.log('contextType', contextType);
            console.log('messageExchangeData', messageExchangeData);
          }}
          style={{ marginLeft: '1rem' }}
        >
          messageExchangeData
        </Button>

        <Button
          type="primary"
          onClick={() => {
            console.log('currentVersionNum', currentVersionNum);
          }}
          style={{ marginLeft: '1rem' }}
        >
          inputsCache
        </Button>
      </div>
      <div>
        <pre>
          <code>{JSON.stringify(messageExchangeData, null, 2)}</code>
        </pre>
      </div>
    </>
  );
};
