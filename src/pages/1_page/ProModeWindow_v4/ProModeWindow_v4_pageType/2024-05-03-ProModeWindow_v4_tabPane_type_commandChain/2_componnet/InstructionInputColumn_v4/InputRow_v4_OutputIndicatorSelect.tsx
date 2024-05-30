import '../../../../../../../styles/global.css';
import '../../../../../../../styles/layout.scss';

import React, { Dispatch, SetStateAction } from 'react';
import { Select, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import iconFormat from '../../../../../../../../assets/icons-customize/icon-format/icon-format-36x36.png';
import iconSuccessful from '../../../../../../../../assets/icons-customize/icon-status-successful/icon-status-successful-512x512.png';
import iconWrong from '../../../../../../../../assets/icons-customize/icon-status-wrong/icon-status-wrong-512x512.png';

import TString from '../../../../../../../gpt-ai-flow-common/tools/TString';
import { IGetT_frontend_output } from '../../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IAIFlow_v2 } from '../../../../../../../gpt-ai-flow-common/interface-app/2_component/IAIFlow_v2';
import {
  IAICommands_v4_new,
  IAICommands_v4_new_resultRow,
} from '../../../../../../../gpt-ai-flow-common/interface-app/ProMode_v4/IProModeAICommands_v4_new';

interface IInputRow_v4_OutputIndicatorSelect_input {
  t: IGetT_frontend_output;
  index: number;
  ouputIndicatorCommandsSelectOptions: IAIFlow_v2[];
  aiCommands: IAICommands_v4_new[];
  setAiCommands: Dispatch<SetStateAction<IAICommands_v4_new[]>>;
  removeRequestControllerItem: (uuid: string) => void;
  setAiComandsResults: Dispatch<SetStateAction<IAICommands_v4_new_resultRow[]>>;
  toggleAiCommandsIsShowInputsForm: () => void;
}

export const InputRow_v4_OutputIndicatorSelect = (props: IInputRow_v4_OutputIndicatorSelect_input) => {
  const {
    t,
    index,
    ouputIndicatorCommandsSelectOptions,
    aiCommands,
    setAiCommands,
    removeRequestControllerItem,
    setAiComandsResults,
    toggleAiCommandsIsShowInputsForm,
  } = props;

  const thisAiCommand = aiCommands[index];

  const onOutputIndicatorCommandsSelectChange = (paraIndex: number) => (value: string) => {
    console.log(`selected ${value}`);
    const newAiCommands = [...aiCommands];

    const oneOuputIndicator = ouputIndicatorCommandsSelectOptions.find((item) => item.uuid === value);
    if (!oneOuputIndicator) {
      message.error(t.get('Command does not exist'));
      return;
    }
    newAiCommands[paraIndex].aiFlowInstance = oneOuputIndicator;

    // newAiCommands[paraIndex].uuid = oneOuputIndicator.uuid;
    newAiCommands[paraIndex].value = oneOuputIndicator.value;

    const hasPlaceholder = TString.hasPlaceholder_v2(oneOuputIndicator.value); // Update hasPlaceHolder for IAICommands_v4 after select a new aiFlow
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
        <img id="iconFormat" src={iconFormat} alt="icon format" style={{ width: 16, marginRight: 4 }} />
      </div>
      <Select
        disabled={thisAiCommand.aiFlowInstance.isDisabled}
        showSearch
        placeholder={t.get('Select Output Prompts')}
        optionFilterProp="children"
        value={thisAiCommand.aiFlowInstance.uuid}
        onChange={onOutputIndicatorCommandsSelectChange(index)}
        onSearch={(value: string) => {
          console.log('search:', value);
        }}
        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
        options={[
          ...ouputIndicatorCommandsSelectOptions.map((item) => {
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

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <DeleteOutlined
          onClick={() => {
            console.log('删除 输出提示');

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
