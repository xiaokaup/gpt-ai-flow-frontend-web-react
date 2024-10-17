import '../../../../../../../styles/global.css';
import '../../../../../../../styles/layout.scss';

import { Dispatch, SetStateAction, useState } from 'react';

import { Input } from 'antd';
import { MinusCircleOutlined, EditOutlined } from '@ant-design/icons';

import { IGetT_frontend_output } from '../../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import {
  IAICommands_v4,
  IAICommandsResults_v4,
} from '../../../../../../../gpt-ai-flow-common/interface-app/2_component/IProMode/IProModeAICommands';

const { TextArea } = Input;

interface InstructionInputColumn_v3_CustomizeTextArea_input {
  t: IGetT_frontend_output;
  index: number;
  aiCommands: IAICommands_v4[];
  setAiCommands: Dispatch<SetStateAction<IAICommands_v4[]>>;
  removeRequestControllerItem: (uuid: string) => void;
  setAiComandsResults: Dispatch<SetStateAction<IAICommandsResults_v4[]>>;
}

export const InstructionInputColumn_v3_CustomizeTextArea = (
  props: InstructionInputColumn_v3_CustomizeTextArea_input,
) => {
  const { t, index, aiCommands, setAiCommands, removeRequestControllerItem, setAiComandsResults } = props;

  const thisAiCommand = aiCommands[index];

  const [editingInstructionAiFlowIndex, setEditingInstructionAiFlowIndex] = useState<number | null>(null);
  const [editingInstructionAiFlowValue, setEditingInstructionAiFlowValue] = useState<string>('');

  const onCustomizeInstructionInputChange = (paraIndex: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);

    setEditingInstructionAiFlowIndex(paraIndex);
    setEditingInstructionAiFlowValue(e.target.value);
  };
  const onCustomizeInstructionInputBlur = (paraIndex: number) => (e: React.FocusEvent<HTMLTextAreaElement>) => {
    console.log('Blur:', e.target.value);

    const newAiCommands = [...aiCommands];
    newAiCommands[paraIndex].aiFlowInstance.defaultValue = e.target.value;
    newAiCommands[paraIndex].aiFlowInstance.value = e.target.value;
    setAiCommands(newAiCommands);

    setEditingInstructionAiFlowIndex(null);
    setEditingInstructionAiFlowValue('');
  };

  return (
    <div
      className="row"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <EditOutlined style={{ fontSize: 16, marginRight: 4 }} />
      </div>
      <TextArea
        name="customizeInstruction"
        autoSize
        value={
          index === editingInstructionAiFlowIndex ? editingInstructionAiFlowValue : thisAiCommand.aiFlowInstance.value
        }
        onChange={onCustomizeInstructionInputChange(index)}
        onBlur={onCustomizeInstructionInputBlur(index)}
        placeholder={t.get('Custom prompt command')}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MinusCircleOutlined
          onClick={() => {
            console.log('删除指令');

            removeRequestControllerItem(aiCommands[index].uuid);

            setAiCommands((prevState) => {
              const newState = [...prevState];
              newState.splice(index, 1);
              return newState;
            });

            setAiComandsResults((prevState) => {
              const newState = [...prevState];
              newState.splice(index, 1);
              return newState;
            });
          }}
          style={{
            fontSize: 18,
            marginLeft: 6,
            cursor: 'pointer',
          }}
        />
      </div>
    </div>
  );
};
