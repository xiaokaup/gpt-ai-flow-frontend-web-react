import '../../../../styles/global.css';
import '../../../../styles/layout.scss';

import React, { useState } from 'react';
import { Button, Select, message } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, EditOutlined } from '@ant-design/icons';

import iconSuccessful from '../../../../../assets/icons-customize/icon-status-successful/icon-status-successful-512x512.png';
import iconWrong from '../../../../../assets/icons-customize/icon-status-wrong/icon-status-wrong-512x512.png';

import TString from '../../../../gpt-ai-flow-common/tools/TString';
import { IProMode_v3_oneProMode } from '../../../../gpt-ai-flow-common/interface-backend/IProMode_v3';
import {
  EProMode_v3_08_productManager_contextType,
  EProMode_v3_08_productManager_contextTypeStage,
} from '../../../../gpt-ai-flow-common/interface-backend/IProMode_v3/IProMode_v3_08_productManager';
import {
  IProMode_v3_contextTypes,
  IProMode_v3_contextTypeStages,
} from '../../../../gpt-ai-flow-common/interface-backend/IProMode_v3/index_types';

import { DynamicFormForContextPrompt } from '../3_unit/DynamicFormForContextPrompt';
import { ProModeAIFlowRow_v3 } from '../2_component/ProModeAIFlowRow_v3';

interface IProModePage_copyWriting_input {
  PROMODE_DATA: IProMode_v3_oneProMode<
    EProMode_v3_08_productManager_contextType,
    EProMode_v3_08_productManager_contextTypeStage
  >;
}

export const ProModePage_v3_08_productManager = (props: IProModePage_copyWriting_input) => {
  const { PROMODE_DATA } = props;

  const DEFAULT_CONTEXT_TYPE = PROMODE_DATA.default.defaultContextType;
  const DEFAULT_CONTEXT_TYPE_STAGE = PROMODE_DATA.default.defaultContextTypeStage;

  const proModeData = PROMODE_DATA;
  const defaultContextType = DEFAULT_CONTEXT_TYPE;
  const defaultContextTypeStage = DEFAULT_CONTEXT_TYPE_STAGE;
  const contextPrompts = proModeData.context;
  const defaultContextTypesForSelect = Object.keys(contextPrompts) as IProMode_v3_contextTypes[];
  const defaultContextTypeStagesForSelect = Object.keys(
    contextPrompts[defaultContextType].stages
  ) as IProMode_v3_contextTypeStages[];

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
  const [contextType, setContextType] = useState<EProMode_v3_08_productManager_contextType>(defaultContextType);
  const [contextTypeStage, setContextTypeStage] =
    useState<EProMode_v3_08_productManager_contextTypeStage>(defaultContextTypeStage);
  const [defautContext, setDefaultContext] = useState<string>(
    contextPrompts[contextType].stages[contextTypeStage].defaultValue
  );
  const defaultContextHavePlaceHolder = TString.hasPlaceholder(defautContext);
  const [contextHandled, setContextHandled] = useState<string>(
    contextPrompts[contextType].stages[contextTypeStage].value
  );

  const [showContextInputs, setShowContextInputs] = useState<boolean>(false);
  const [isContextInputsDirty, setIsContextInputsDirty] = useState<boolean>(false);

  const handleContextTypeChange = (paraContextType: EProMode_v3_08_productManager_contextType) => {
    console.log(`selected ${paraContextType}`);
    setContextType(paraContextType);
    const selectedDefaultValue = contextPrompts[paraContextType].stages[contextTypeStage].defaultValue;
    setDefaultContext(selectedDefaultValue);
    setContextHandled(contextPrompts[paraContextType].stages[contextTypeStage].value);

    setIsContextInputsDirty(false);

    if (TString.hasPlaceholder(selectedDefaultValue)) {
      message.warning('点击右侧修改 📝 按钮填写具体场景信息', 5);
    }
  };

  const handleContextTypeStageChange = (paraContextTypeStage: EProMode_v3_08_productManager_contextTypeStage) => {
    console.log(`selected ${paraContextTypeStage}`);
    setContextTypeStage(paraContextTypeStage);
    const selectedDefaultValue = contextPrompts[contextType].stages[paraContextTypeStage].defaultValue;
    setDefaultContext(selectedDefaultValue);
    setContextHandled(contextPrompts[contextType].stages[paraContextTypeStage].value);

    setIsContextInputsDirty(false);

    if (TString.hasPlaceholder(selectedDefaultValue)) {
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
        <div className="column" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
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
                  label: contextPrompts[item as EProMode_v3_08_productManager_contextType].name,
                  value: item,
                };
              })}
            />
          </div>
          <div className="column" style={{ display: 'flex', alignItems: 'center' }}>
            阶段 :
            <Select
              defaultValue={contextTypeStage}
              style={{ width: 150, marginLeft: '.4rem' }}
              onChange={handleContextTypeStageChange}
              options={defaultContextTypeStagesForSelect.map((item) => {
                return {
                  label:
                    contextPrompts[contextType].stages[item as EProMode_v3_08_productManager_contextTypeStage].name,
                  value: item,
                };
              })}
            />{' '}
            {defaultContextHavePlaceHolder && !showContextInputs && (
              <EditOutlined style={{ fontSize: 18, marginLeft: '.4rem' }} onClick={() => setShowContextInputs(true)} />
            )}
            {defaultContextHavePlaceHolder && showContextInputs && (
              <EditOutlined style={{ fontSize: 18, marginLeft: '.4rem' }} onClick={() => setShowContextInputs(false)} />
            )}
          </div>
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
          contextPromptWithPlaceholder={defautContext}
          setHandledContextPrompt={setContextHandled}
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
                handledContextPrompt={contextHandled}
                defaulInstructionAiCommands={proModeData.instruction[contextType][contextTypeStage]}
                defaultOutputIndicatorAiCommands={proModeData.outputIndicator[contextType][contextTypeStage]}
                aiCommandsSettings={proModeData.defaultAiCommandsSettings[contextType][contextTypeStage]}
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
