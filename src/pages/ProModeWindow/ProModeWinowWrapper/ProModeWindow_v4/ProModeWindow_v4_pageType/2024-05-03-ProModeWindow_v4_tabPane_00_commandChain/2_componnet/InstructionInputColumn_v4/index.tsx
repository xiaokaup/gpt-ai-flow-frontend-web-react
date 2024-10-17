import '../../../../../../../../styles/global.css';
import '../../../../../../../../styles/layout.scss';

import iconFormat from '../../../../../../../../../assets/icons-customize/icon-format/icon-format-36x36.png';

import React from 'react';

import { PlusCircleOutlined, EditOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

import { EAIFlow_type } from '../../../../../../../../gpt-ai-flow-common/enum-app/EAIFlow';
import TString from '../../../../../../../../gpt-ai-flow-common/tools/TString';
import { IGetT_frontend_output } from '../../../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { DynamicFormForSelectValue_v4 } from '../../3_unit/DynamicFormForSelectValue_v4';
import { IInputRow_v4_InstructionSelect } from './InputRow_v4_InstructionSelect';
import { InputRow_v4_OutputIndicatorSelect } from './InputRow_v4_OutputIndicatorSelect';
import { InputRow_v4_CustomizeTextArea } from './InputRow_v4_CustomizeTextArea';
import { IStoreStorage_settings_local } from '../../../../../../../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { IAIFlow_v2 } from '../../../../../../../../gpt-ai-flow-common/interface-app/2_component/IAIFlow_v2';
import { to_deprecate_IUserData as IUserData } from '../../../../../../../../gpt-ai-flow-common/interface-app/3_unit/to_deprecate_IUserData';
import {
  IAICommands_v4_new,
  IAICommands_v4_new_resultRow,
} from '../../../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/IProModeAICommands_v4_new';

interface InstructionInputColumn_v4_input {
  t: IGetT_frontend_output;
  contextStageSelected_instructions: IAIFlow_v2[];
  contextStageSelected_outputIndicator: IAIFlow_v2[];
  addRequestControllerItem: (uuid: string, value: AbortController) => void;
  removeRequestControllerItem: (uuid: string) => void;
  aiCommands: IAICommands_v4_new[];
  setAiCommands: React.Dispatch<React.SetStateAction<IAICommands_v4_new[]>>;
  setAiComandsResults: React.Dispatch<React.SetStateAction<IAICommands_v4_new_resultRow[]>>;
  webCase: {
    userData: IUserData;
    localDataFromStorage: IStoreStorage_settings_local;
  };
}

export const InstructionInputColumn_v4 = (props: InstructionInputColumn_v4_input) => {
  const {
    t,
    contextStageSelected_instructions,
    contextStageSelected_outputIndicator,
    addRequestControllerItem,
    removeRequestControllerItem,
    aiCommands,
    setAiCommands,
    setAiComandsResults,
  } = props;

  // === instructionOuputIndicatorAiFlowCommandList - start ===
  // @NOTE: Web case not have buildIn aiFlows
  const aiFlows_type_instruction_selectOptions = [...contextStageSelected_instructions];

  // === instructionOuputIndicatorAiFlowCommandList - end ===

  // === OutputIndicator result - start ===
  // @NOTE: Web case not have buildIn aiFlows
  const aiFlows_type_outputIndicator_selectOptions = [...contextStageSelected_outputIndicator];
  // === OutputIndicator result - end ===

  const toggleAiCommandsIsShowInputsForm = (index: number) => {
    const newAiCommands = [...aiCommands];
    newAiCommands[index].isShowInputsForm = !newAiCommands[index].isShowInputsForm;
    setAiCommands(newAiCommands);
  };

  // console.log('aiCommands', aiCommands);

  return (
    <>
      <div className="row">{t.get('Instruction set')}</div>
      <div className="row">
        <div className="row row_instructions_ouputIndicator_ai_flow_commands">
          {aiCommands.map((item: IAICommands_v4_new, index: number) => {
            if (item.aiFlowInstance.type === EAIFlow_type.INSTRUCTION) {
              return (
                <div className="row" key={`${index}-${item.uuid}`}>
                  <IInputRow_v4_InstructionSelect
                    t={t}
                    index={index}
                    aiFlows_type_instruction_selectOptions={aiFlows_type_instruction_selectOptions}
                    aiCommands={aiCommands}
                    setAiCommands={setAiCommands}
                    removeRequestControllerItem={removeRequestControllerItem}
                    setAiComandsResults={setAiComandsResults}
                    toggleAiCommandsIsShowInputsForm={() => {
                      toggleAiCommandsIsShowInputsForm(index);
                    }}
                  />
                  {item.hasPlaceholder && (
                    <DynamicFormForSelectValue_v4
                      t={t}
                      containerStyle={item.isShowInputsForm ? {} : { display: 'none' }}
                      contextSelectValueWithPlaceholder={item.aiFlowInstance.value}
                      setAiCommandValue={(value: string) => {
                        const newAiCommands = [...aiCommands];
                        newAiCommands[index].value = value;
                        setAiCommands(newAiCommands);
                      }}
                      setAICommandIsDirty={(value: boolean) => {
                        const newAiCommands = [...aiCommands];
                        newAiCommands[index].isDirty = value;
                        setAiCommands(newAiCommands);
                      }}
                      toggleAiCommandIsShowInputsForm={() => {
                        toggleAiCommandsIsShowInputsForm(index);
                      }}
                    />
                  )}
                </div>
              );
            }

            if (item.aiFlowInstance.type === EAIFlow_type.CUSTOMIZE) {
              return (
                <div className="row" key={`${index}-${item.uuid}`}>
                  <InputRow_v4_CustomizeTextArea
                    t={t}
                    index={index}
                    aiCommands={aiCommands}
                    setAiCommands={setAiCommands}
                    removeRequestControllerItem={removeRequestControllerItem}
                    setAiComandsResults={setAiComandsResults}
                  />
                </div>
              );
            }

            if (item.aiFlowInstance.type === EAIFlow_type.OUTPUT_INDICATOR) {
              return (
                <div className="row" key={`${index}-${item.uuid}`}>
                  <InputRow_v4_OutputIndicatorSelect
                    t={t}
                    index={index}
                    ouputIndicatorCommandsSelectOptions={aiFlows_type_outputIndicator_selectOptions}
                    aiCommands={aiCommands}
                    setAiCommands={setAiCommands}
                    removeRequestControllerItem={removeRequestControllerItem}
                    setAiComandsResults={setAiComandsResults}
                    toggleAiCommandsIsShowInputsForm={() => {
                      toggleAiCommandsIsShowInputsForm(index);
                    }}
                  />
                  {item.hasPlaceholder && (
                    <DynamicFormForSelectValue_v4
                      t={t}
                      containerStyle={item.isShowInputsForm ? {} : { display: 'none' }}
                      contextSelectValueWithPlaceholder={item.aiFlowInstance.value}
                      setAiCommandValue={(value: string) => {
                        const newAiCommands = [...aiCommands];
                        newAiCommands[index].value = value;
                        setAiCommands(newAiCommands);
                      }}
                      setAICommandIsDirty={(value: boolean) => {
                        const newAiCommands = [...aiCommands];
                        newAiCommands[index].isDirty = value;
                        setAiCommands(newAiCommands);
                      }}
                      toggleAiCommandIsShowInputsForm={() => {
                        toggleAiCommandsIsShowInputsForm(index);
                      }}
                    />
                  )}
                </div>
              );
            }

            return <></>;
          })}
        </div>

        <div className="row">
          <PlusCircleOutlined
            onClick={() => {
              console.log('点击 增加指令 按钮');
              const uuid = uuidv4();
              addRequestControllerItem(uuid, new AbortController());

              const hasPlaceHolder = TString.hasPlaceholder_v2(aiFlows_type_instruction_selectOptions[0].value);
              setAiCommands([
                ...aiCommands,
                {
                  uuid,
                  value: aiFlows_type_instruction_selectOptions[0].value,
                  isTemporary: false,
                  hasPlaceholder: hasPlaceHolder,
                  isDirty: !!hasPlaceHolder,
                  isShowInputsForm: hasPlaceHolder,
                  aiFlowInstance: aiFlows_type_instruction_selectOptions[0],
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
                  value: '',

                  isTemporary: true,
                  hasPlaceholder: false,
                  isDirty: false,
                  isShowInputsForm: false,

                  aiFlowInstance: {
                    uuid,
                    type: EAIFlow_type.CUSTOMIZE,
                    name: '',
                    value: '',
                    tags: [],
                  },
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
              const hasPlaceHolder = TString.hasPlaceholder_v2(aiFlows_type_outputIndicator_selectOptions[0].value);
              setAiCommands([
                ...aiCommands,
                {
                  uuid,
                  value: aiFlows_type_outputIndicator_selectOptions[0].value,
                  isTemporary: false,
                  hasPlaceholder: hasPlaceHolder,
                  isDirty: !!hasPlaceHolder,
                  isShowInputsForm: hasPlaceHolder,
                  aiFlowInstance: aiFlows_type_outputIndicator_selectOptions[0],
                },
              ]);
            }}
          />
        </div>
      </div>
    </>
  );
};
