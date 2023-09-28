import '../../../../../../styles/global.css';
import '../../../../../../styles/layout.scss';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PlusCircleOutlined, EditOutlined } from '@ant-design/icons';

import iconFormat from '../../../../../../../assets/icons-customize/icon-format/icon-format-36x36.png';

import { IAIFlow, EAIFlowType, EAIFlowRole } from '../../../../../../gpt-ai-flow-common/interface-app/IAIFlow';
import {
  IAICommands_v4,
  IAICommandsResults_v4,
} from '../../../../../../gpt-ai-flow-common/interface-app/ProMode/IProModeAICommands';
import TString from '../../../../../../gpt-ai-flow-common/tools/TString';

import { DynamicFormForSelectValue } from '../../../3_unit/DynamicFormForSelectValue';

import { InstructionInputColumn_v3_InstructionSelect } from './InstructionInputColumn_v3_InstructionSelect';
import { InstructionInputColumn_v3_OutputIndicatorSelect } from './InstructionInputColumn_v3_OutputIndicatorSelect';
import { InstructionInputColumn_v3_CustomizeTextArea } from './InstructionInputColumn_v3_CustomizeTextArea';

interface InstructionInputColumn_v3_input {
  defaultInstructionAiCommands: IAIFlow[];
  defaultOutputIndicatorAiCommands: IAIFlow[];
  addRequestControllerItem: (uuid: string, value: AbortController) => void;
  removeRequestControllerItem: (uuid: string) => void;
  aiCommands: IAICommands_v4[];
  setAiCommands: React.Dispatch<React.SetStateAction<IAICommands_v4[]>>;
  setAiComandsResults: React.Dispatch<React.SetStateAction<IAICommandsResults_v4[]>>;
}

export const InstructionInputColumn_v3 = (props: InstructionInputColumn_v3_input) => {
  const {
    defaultInstructionAiCommands,
    defaultOutputIndicatorAiCommands,
    addRequestControllerItem,
    removeRequestControllerItem,
    aiCommands,
    setAiCommands,
    setAiComandsResults,
  } = props;

  // === instructionOuputIndicatorAiFlowCommandList - start ===
  const [defaultInstructionAiFlowsFromStore] = useState<IAIFlow[]>(
    // window.electron.store.get(STORE_INSTRUCTION_AI_FLOWS_PATH) as IAIFlow[]
    []
  );
  const instructionCommandsSelectOptions = [...defaultInstructionAiCommands, ...defaultInstructionAiFlowsFromStore];

  // === instructionOuputIndicatorAiFlowCommandList - end ===

  // === OutputIndicator result - start ===
  const [defaultOutputIndicatorAiFlowListFromStore] = useState<IAIFlow[]>(
    // window.electron.store.get(STORE_OUTPUT_INDICATOR_AI_FLOWS_PATH) as IAIFlow[]
    []
  );
  const ouputIndicatorCommandsSelectOptions = [
    ...defaultOutputIndicatorAiCommands,
    ...defaultOutputIndicatorAiFlowListFromStore,
  ];
  // === OutputIndicator result - end ===

  const toggleAiCommandsIsShowInputsForm = (index: number) => {
    const newList = [...aiCommands];
    newList[index].isShowInputsForm = !newList[index].isShowInputsForm;
    setAiCommands(newList);
  };

  return (
    <>
      <div className="row">指令集</div>
      <div className="row">
        <div className="row row_instructions_ouputIndicator_ai_flow_commands">
          {aiCommands.map((item: IAICommands_v4, index: number) => {
            if (item.aiFlowInstance.type === EAIFlowType.INSTRUCTION) {
              return (
                <div className="row" key={`${index}-${item.aiFlowInstance.value}`}>
                  <InstructionInputColumn_v3_InstructionSelect
                    index={index}
                    item={item}
                    instructionCommandsSelectOptions={instructionCommandsSelectOptions}
                    aiCommands={aiCommands}
                    setAiCommands={setAiCommands}
                    removeRequestControllerItem={removeRequestControllerItem}
                    setAiComandsResults={setAiComandsResults}
                    toggleAiCommandsIsShowInputsForm={() => {
                      toggleAiCommandsIsShowInputsForm(index);
                    }}
                  />
                  {item.hasPlaceholder && (
                    <DynamicFormForSelectValue
                      containerStyle={item.isShowInputsForm ? {} : { display: 'none' }}
                      contextSelectValueWithPlaceholder={item.aiFlowInstance.defaultValue}
                      setHandledSelectValue={(value: string) => {
                        const newAiCommands = [...aiCommands];
                        newAiCommands[index].aiFlowInstance.value = value;
                        setAiCommands(newAiCommands);
                      }}
                      setAICommandsIsDirty={(value: boolean) => {
                        const newList = [...aiCommands];
                        newList[index].isDirty = value;
                        setAiCommands(newList);
                      }}
                      toggleAiCommandsIsShowInputsForm={() => {
                        toggleAiCommandsIsShowInputsForm(index);
                      }}
                    />
                  )}
                </div>
              );
            }

            if (item.aiFlowInstance.type === EAIFlowType.CUSTOMIZE) {
              return (
                <div className="row" key={`${index}-${item.aiFlowInstance.value}`}>
                  <InstructionInputColumn_v3_CustomizeTextArea
                    index={index}
                    item={item}
                    aiCommands={aiCommands}
                    setAiCommands={setAiCommands}
                    removeRequestControllerItem={removeRequestControllerItem}
                    setAiComandsResults={setAiComandsResults}
                  />
                </div>
              );
            }

            if (item.aiFlowInstance.type === EAIFlowType.OUTPUT_INDICATOR) {
              return (
                <div className="row" key={`${index}-${item.aiFlowInstance.value}`}>
                  <InstructionInputColumn_v3_OutputIndicatorSelect
                    index={index}
                    item={item}
                    ouputIndicatorCommandsSelectOptions={ouputIndicatorCommandsSelectOptions}
                    aiCommands={aiCommands}
                    setAiCommands={setAiCommands}
                    removeRequestControllerItem={removeRequestControllerItem}
                    setAiComandsResults={setAiComandsResults}
                    toggleAiCommandsIsShowInputsForm={() => {
                      toggleAiCommandsIsShowInputsForm(index);
                    }}
                  />
                  {item.hasPlaceholder && (
                    <DynamicFormForSelectValue
                      containerStyle={item.isShowInputsForm ? {} : { display: 'none' }}
                      contextSelectValueWithPlaceholder={item.aiFlowInstance.defaultValue}
                      setHandledSelectValue={(value: string) => {
                        const newAiCommands = [...aiCommands];
                        newAiCommands[index].aiFlowInstance.value = value;
                        setAiCommands(newAiCommands);
                      }}
                      setAICommandsIsDirty={(value: boolean) => {
                        const newList = [...aiCommands];
                        newList[index].isDirty = value;
                        setAiCommands(newList);
                      }}
                      toggleAiCommandsIsShowInputsForm={() => {
                        toggleAiCommandsIsShowInputsForm(index);
                      }}
                    />
                  )}
                </div>
              );
            }
          })}
        </div>

        <div className="row">
          <PlusCircleOutlined
            onClick={() => {
              console.log('点击 增加指令 按钮');
              const uuid = uuidv4();
              addRequestControllerItem(uuid, new AbortController());
              const hasPlaceHolder = TString.hasPlaceholder(instructionCommandsSelectOptions[0].defaultValue);
              setAiCommands([
                ...aiCommands,
                {
                  uuid,
                  aiFlowInstance: instructionCommandsSelectOptions[0],
                  isTemporary: false,
                  hasPlaceholder: hasPlaceHolder,
                  isDirty: !!hasPlaceHolder,
                  isShowInputsForm: hasPlaceHolder,
                },
              ]);
            }}
            style={{ fontSize: 18, marginLeft: 6, cursor: 'pointer' }}
          />
          <EditOutlined
            onClick={() => {
              console.log('点击 增加自定义指令提示 按钮');
              const uuid = uuidv4();
              addRequestControllerItem(uuid, new AbortController());
              setAiCommands([
                ...aiCommands,
                {
                  uuid,
                  aiFlowInstance: {
                    uuid,
                    type: EAIFlowType.CUSTOMIZE,
                    defaultValue: '',
                    value: '',
                    isActive: true,
                    name: '',
                    summary: '',
                    tags: [],
                    role: EAIFlowRole.USER,
                  },
                  isTemporary: true,

                  hasPlaceholder: false,
                  isDirty: false,
                  isShowInputsForm: false,
                },
              ]);
            }}
            style={{ fontSize: 18, marginLeft: 6, cursor: 'pointer' }}
          />
          <img
            id="iconFormat"
            src={iconFormat}
            alt="icon format"
            style={{
              width: 18,
              height: 18,
              marginLeft: 6,
              cursor: 'pointer',

              position: 'relative',
              top: 2,
            }}
            onClick={() => {
              console.log('点击 增加输出提示 按钮');

              const uuid = uuidv4();
              addRequestControllerItem(uuid, new AbortController());
              const hasPlaceHolder = TString.hasPlaceholder(ouputIndicatorCommandsSelectOptions[0].defaultValue);
              setAiCommands([
                ...aiCommands,
                {
                  uuid,
                  aiFlowInstance: ouputIndicatorCommandsSelectOptions[0],
                  isTemporary: false,
                  hasPlaceholder: hasPlaceHolder,
                  isDirty: !!hasPlaceHolder,
                  isShowInputsForm: hasPlaceHolder,
                },
              ]);
            }}
          />
        </div>
      </div>
    </>
  );
};
