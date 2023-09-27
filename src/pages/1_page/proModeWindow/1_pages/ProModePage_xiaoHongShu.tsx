import '../../../../styles/global.css';
import '../../../../styles/layout.scss';

import React, { useState } from 'react';
import { Button, Select, message } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, EditOutlined } from '@ant-design/icons';

import iconSuccessful from '../../../../../assets/icons-customize/icon-status-successful/icon-status-successful-512x512.png';
import iconWrong from '../../../../../assets/icons-customize/icon-status-wrong/icon-status-wrong-512x512.png';

import TString from '../../../../gpt-ai-flow-common/tools/TString';
import {
  IProMode_v2_xiaoHongShu,
  EProMode_v2_xiaoHongShu_contextType,
} from '../../../../gpt-ai-flow-common/interface-backend/IProMode_v2/IProMode_v2_xiaoHongShu';
import { DynamicFormForContextPrompt } from '../3_unit/DynamicFormForContextPrompt';
import { ProModeAIFlowRow_v3 } from '../2_component/ProModeAIFlowRow_v3';

interface IProModePage_xiaoHongShu_input {
  PROMODE_DATA: IProMode_v2_xiaoHongShu;
  defaultContextType: EProMode_v2_xiaoHongShu_contextType;
  defaultContextTypesForSelect: EProMode_v2_xiaoHongShu_contextType[];
}

export const ProModePage_xiaoHongShu = (props: IProModePage_xiaoHongShu_input) => {
  const { PROMODE_DATA, defaultContextType, defaultContextTypesForSelect } = props;

  // console.log('props', props);

  const [rowCount, setRowCount] = useState<number>(1);

  // === Search trigger for all children component - start ===
  const [clickSearchAllResultsButtonCount, setClickSearchAllResultsButtonCount] = useState<number>(0);
  const [clickStopSearchAllResultsButtonCount, setClickStopSearchAllResultsButtonCount] = useState<number>(0);

  const searchAllResultsForPannel = () => {
    setClickSearchAllResultsButtonCount((prevState) => prevState + 1);
  };
  const stopSearchAllResultsForPannel = () => {
    setClickStopSearchAllResultsButtonCount((preState) => preState + 1);
  };
  // === Search trigger for all children component - end ===

  // === Context input - start ===
  const contextPrompts = PROMODE_DATA.context;

  const [contextType, setContextType] = useState<EProMode_v2_xiaoHongShu_contextType>(defaultContextType);
  const [contextPrompt, setContextPrompt] = useState<string>(contextPrompts[contextType].value);
  const contextPromptHavePlaceHolder = TString.hasPlaceholder(contextPrompt);
  const [handledContextPrompt, setHandledContextPrompt] = useState<string>(contextPrompts[contextType].value);

  const [showContextInputs, setShowContextInputs] = useState<boolean>(false);
  const [isContextInputsDirty, setIsContextInputsDirty] = useState<boolean>(false);

  const handleContextTypeChange = (paraContextPromptType: EProMode_v2_xiaoHongShu_contextType) => {
    console.log(`selected ${paraContextPromptType}`);
    setContextType(paraContextPromptType);
    setContextPrompt(contextPrompts[paraContextPromptType].value);
    setHandledContextPrompt(contextPrompts[paraContextPromptType].value);

    setIsContextInputsDirty(false);

    if (TString.hasPlaceholder(contextPrompts[paraContextPromptType].defaultValue)) {
      message.warning('点击右侧修改 📝 按钮填写具体场景信息', 5);
    }
  };

  // === Context input - end ===

  return (
    <div className="panel_container">
      <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="column panel_buttons_group">
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => {
              console.log('click stopSearchAllResultsForPannel');
              stopSearchAllResultsForPannel();
            }}
          >
            停止全部结果
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 8 }}
            onClick={() => {
              console.log('click searchAllResultsForPannel');
              searchAllResultsForPannel();
            }}
          >
            获取全部结果
          </Button>
        </div>
        <div className="column" style={{ display: 'flex', alignItems: 'center' }}>
          场景
          {isContextInputsDirty && <img src={iconWrong} alt="" style={{ width: 18, marginLeft: '.4rem' }} />}
          {!isContextInputsDirty && (
            <img src={iconSuccessful} alt="" style={{ width: 18, marginLeft: '.2rem', marginRight: '.2rem' }} />
          )}
          :
          <Select
            defaultValue={contextType}
            style={{ width: 150, marginLeft: '.4rem' }}
            onChange={handleContextTypeChange}
            options={defaultContextTypesForSelect.map((item) => {
              return {
                label: contextPrompts[item].name,
                value: item,
              };
            })}
          />{' '}
          {contextPromptHavePlaceHolder && !showContextInputs && (
            <EditOutlined style={{ fontSize: 18, marginLeft: '.4rem' }} onClick={() => setShowContextInputs(true)} />
          )}
          {contextPromptHavePlaceHolder && showContextInputs && (
            <EditOutlined style={{ fontSize: 18, marginLeft: '.4rem' }} onClick={() => setShowContextInputs(false)} />
          )}
        </div>
      </div>

      <div className="row">
        {/* {!showContextInputs && (
          <div className="row" style={{ display: 'flex' }}>
            <div className="column">{contextPrompt}</div>
            <div className="column">{handledContextPrompt}</div>
          </div>
        )} */}
        <DynamicFormForContextPrompt
          containerStyle={showContextInputs ? {} : { display: 'none' }}
          contextPromptWithPlaceholder={contextPrompt}
          setHandledContextPrompt={setHandledContextPrompt}
          setIsContextInputsDirty={setIsContextInputsDirty}
        />
      </div>

      <div className="row panel_body">
        {[...Array(rowCount)].map((_, rowIndex) => {
          return (
            <div className="row" key={rowIndex}>
              <ProModeAIFlowRow_v3
                clickSearchAllResultsButtonCount={clickSearchAllResultsButtonCount}
                clickStopSearchAllResultsButtonCount={clickStopSearchAllResultsButtonCount}
                handledContextPrompt={handledContextPrompt}
                defaulInstructionAiCommands={PROMODE_DATA.instruction[contextType]}
                defaultOutputIndicatorAiCommands={PROMODE_DATA.outputIndicator[contextType]}
                aiCommandsSettings={PROMODE_DATA.defaultAiCommandsSettings[contextType]}
              />
              <hr style={{ margin: 10 }} />
            </div>
          );
        })}
      </div>

      <div className="row panel_bottom_buttons_group">
        <PlusCircleOutlined
          onClick={() => {
            setRowCount((prevState) => prevState + 1);
          }}
          style={{ fontSize: 18, marginLeft: 6, cursor: 'pointer' }}
        />
        <MinusCircleOutlined
          onClick={() => {
            setRowCount((prevState) => prevState - 1);
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
