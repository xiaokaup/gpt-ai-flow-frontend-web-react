import '../../../../../../styles/global.css';
import '../../../../../../styles/layout.scss';

import iconSuccessful from '../../../../../../../assets/icons-customize/icon-status-successful/icon-status-successful-512x512.png';
import iconWrong from '../../../../../../../assets/icons-customize/icon-status-wrong/icon-status-wrong-512x512.png';

import { Dispatch, SetStateAction } from 'react';
import { Select, message } from 'antd';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { IAIFlow } from '../../../../../../gpt-ai-flow-common/interface-app/IAIFlow';
import {
  IInstructionINputCommandsResults_v3,
  IInstructionInputCommands_v3,
} from '../../../../../../gpt-ai-flow-common/interface-app/ProMode/IProModeAIFlowRow_v3';
import TString from '../../../../../../gpt-ai-flow-common/tools/TString';

interface InstructionInputColumn_v3_InstructionSelect_input {
  index: number;
  item: IInstructionInputCommands_v3;
  instructionCommandsSelectOptions: IAIFlow[];
  aiCommands: IInstructionInputCommands_v3[];
  setAiCommands: Dispatch<SetStateAction<IInstructionInputCommands_v3[]>>;
  removeRequestControllerItem: (uuid: string) => void;
  setAiComandsResults: Dispatch<SetStateAction<IInstructionINputCommandsResults_v3[]>>;
  toggleAiCommandsIsShowInputsForm: () => void;
}

export const InstructionInputColumn_v3_InstructionSelect = (
  props: InstructionInputColumn_v3_InstructionSelect_input
) => {
  const {
    index,
    item,
    instructionCommandsSelectOptions,
    aiCommands,
    setAiCommands,
    removeRequestControllerItem,
    setAiComandsResults,
    toggleAiCommandsIsShowInputsForm,
  } = props;

  const onInstructionCommandsSelectChange = (index: number) => (value: string) => {
    console.log(`onInstructionCommandsSelectChange selected ${value}`);
    const newComands = [...aiCommands];

    const oneInstruction = instructionCommandsSelectOptions.find((item) => item.uuid === value);
    if (!oneInstruction) {
      message.error('指令不存在');
      return;
    }

    newComands[index].aiFlowInstance = oneInstruction;

    const hasPlaceholder = TString.hasPlaceholder(oneInstruction.defaultValue); // Update hasPlaceHolder for IInstructionInputCommands_v3 after select a new aiFlow
    newComands[index].hasPlaceholder = hasPlaceholder;
    newComands[index].isDirty = hasPlaceholder ? true : false;
    newComands[index].isShowInputsForm = hasPlaceholder;

    setAiCommands(newComands);
  };

  return (
    <div
      className="row"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <PlusCircleOutlined style={{ fontSize: 16, marginRight: 4 }} />
      </div>
      <Select
        disabled={!item.aiFlowInstance.isActive}
        showSearch
        placeholder="选择指令提示"
        optionFilterProp="children"
        value={item.aiFlowInstance.uuid}
        onChange={onInstructionCommandsSelectChange(index)}
        onSearch={(value: string) => {
          console.log('search:', value);
        }}
        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
        options={[
          ...instructionCommandsSelectOptions.map((item) => {
            return {
              value: item.uuid,
              label: item.name,
            };
          }),
        ]}
        style={{ flex: '1 1 auto' }}
      />

      {item.isDirty && <img src={iconWrong} alt="" style={{ width: 18, height: 18, marginLeft: '.2rem' }} />}
      {!item.isDirty && <img src={iconSuccessful} alt="" style={{ width: 18, height: 18, marginLeft: '.2rem' }} />}

      {item.hasPlaceholder && (
        <EditOutlined style={{ fontSize: 18, marginLeft: '.2rem' }} onClick={toggleAiCommandsIsShowInputsForm} />
      )}

      <DeleteOutlined
        onClick={() => {
          console.log('删除 Instruction 指令');

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
  );
};
