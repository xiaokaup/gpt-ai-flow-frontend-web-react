import '../../../../../../styles/global.css';
import '../../../../../../styles/layout.scss';

import React, { Dispatch, SetStateAction, useState } from 'react';

import { Input } from 'antd';
import { MinusCircleOutlined, EditOutlined } from '@ant-design/icons';

import {
  IAICommandsResults_v4,
  IAICommands_v4,
} from '../../../../../../gpt-ai-flow-common/interface-app/ProMode/IProModeAICommands';

const { TextArea } = Input;

interface InstructionInputColumn_v3_CustomizeTextArea_input {
  index: number;
  item: IAICommands_v4;
  aiCommands: IAICommands_v4[];
  setAiCommands: Dispatch<SetStateAction<IAICommands_v4[]>>;
  removeRequestControllerItem: (uuid: string) => void;
  setAiComandsResults: Dispatch<SetStateAction<IAICommandsResults_v4[]>>;
}

export const InstructionInputColumn_v3_CustomizeTextArea = (
  props: InstructionInputColumn_v3_CustomizeTextArea_input
) => {
  const { index, item, aiCommands, setAiCommands, removeRequestControllerItem, setAiComandsResults } = props;

  const [editingInstructionAiFlowIndex, setEditingInstructionAiFlowIndex] = useState<number | null>(null);
  const [editingInstructionAiFlowValue, setEditingInstructionAiFlowValue] = useState<string>('');

  const onCustomizeInstructionInputChange = (index: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);

    setEditingInstructionAiFlowIndex(index);
    setEditingInstructionAiFlowValue(e.target.value);
  };
  const onCustomizeInstructionInputBlur = (index: number) => (e: React.FocusEvent<HTMLTextAreaElement>) => {
    console.log('Blur:', e.target.value);

    const newCommands = [...aiCommands];
    newCommands[index].aiFlowInstance.value = e.target.value;
    setAiCommands(newCommands);

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
        value={index === editingInstructionAiFlowIndex ? editingInstructionAiFlowValue : item.aiFlowInstance.value}
        onChange={onCustomizeInstructionInputChange(index)}
        onBlur={onCustomizeInstructionInputBlur(index)}
        placeholder="自定义指令"
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
