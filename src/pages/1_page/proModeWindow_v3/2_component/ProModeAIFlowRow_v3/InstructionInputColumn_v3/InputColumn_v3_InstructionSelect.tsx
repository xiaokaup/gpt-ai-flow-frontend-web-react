import '../../../../../../styles/global.css';
import '../../../../../../styles/layout.scss';

import iconSuccessful from '../../../../../../../assets/icons-customize/icon-status-successful/icon-status-successful-512x512.png';
import iconWrong from '../../../../../../../assets/icons-customize/icon-status-wrong/icon-status-wrong-512x512.png';

import { Dispatch, SetStateAction } from 'react';
import { Select, message } from 'antd';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { IAIFlow } from '../../../../../../gpt-ai-flow-common/interface-app/2_component/IAIFlow';
import TString from '../../../../../../gpt-ai-flow-common/tools/TString';
import { IGetT_frontend_output } from '../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import {
  IAICommands_v4,
  IAICommandsResults_v4,
} from '../../../../../../gpt-ai-flow-common/interface-app/2_component/ProMode/IProModeAICommands';

interface InstructionInputColumn_v3_InstructionSelect_input {
  t: IGetT_frontend_output;
  index: number;
  instructionCommandsSelectOptions: IAIFlow[];
  aiCommands: IAICommands_v4[];
  setAiCommands: Dispatch<SetStateAction<IAICommands_v4[]>>;
  removeRequestControllerItem: (uuid: string) => void;
  setAiComandsResults: Dispatch<SetStateAction<IAICommandsResults_v4[]>>;
  toggleAiCommandsIsShowInputsForm: () => void;
}

export const InstructionInputColumn_v3_InstructionSelect = (
  props: InstructionInputColumn_v3_InstructionSelect_input,
) => {
  const {
    t,
    index,
    instructionCommandsSelectOptions,
    aiCommands,
    setAiCommands,
    removeRequestControllerItem,
    setAiComandsResults,
    toggleAiCommandsIsShowInputsForm,
  } = props;

  const thisAiCommand = aiCommands[index];

  const onInstructionCommandsSelectChange = (paraIndex: number) => (value: string) => {
    console.log(`onInstructionCommandsSelectChange selected ${value}`);
    const newAiCommands = [...aiCommands];

    const oneInstruction = instructionCommandsSelectOptions.find((item) => item.uuid === value);
    if (!oneInstruction) {
      message.error(t.get('Command does not exist'));
      return;
    }

    newAiCommands[paraIndex].aiFlowInstance = oneInstruction;

    const hasPlaceholder = TString.hasPlaceholder(oneInstruction.defaultValue); // Update hasPlaceHolder for IAICommands_v4 after select a new aiFlow
    newAiCommands[paraIndex].hasPlaceholder = hasPlaceholder;
    newAiCommands[paraIndex].isDirty = !!hasPlaceholder;
    newAiCommands[paraIndex].isShowInputsForm = hasPlaceholder;

    setAiCommands(newAiCommands);
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
        disabled={!thisAiCommand.aiFlowInstance.isActive}
        showSearch
        placeholder={t.get('Select command prompts')}
        optionFilterProp="children"
        value={thisAiCommand.aiFlowInstance.uuid}
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

      {thisAiCommand.isDirty && <img src={iconWrong} alt="" style={{ width: 18, height: 18, marginLeft: '.2rem' }} />}
      {!thisAiCommand.isDirty && (
        <img src={iconSuccessful} alt="" style={{ width: 18, height: 18, marginLeft: '.2rem' }} />
      )}

      {thisAiCommand.hasPlaceholder && (
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
