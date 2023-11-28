import '../../../../styles/global.css';
import '../../../../styles/layout.scss';

import React, { useEffect, useState } from 'react';
import { Button, Select, message } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, EditOutlined } from '@ant-design/icons';

import iconSuccessful from '../../../../../assets/icons-customize/icon-status-successful/icon-status-successful-512x512.png';
import iconWrong from '../../../../../assets/icons-customize/icon-status-wrong/icon-status-wrong-512x512.png';

import TString from '../../../../gpt-ai-flow-common/tools/TString';
import { IProMode_v3_oneProMode } from '../../../../gpt-ai-flow-common/interface-backend/IProMode_v3';
import {
  EProMode_v3_10_seoManager_contextType,
  EProMode_v3_10_seoManager_contextTypeStage,
} from '../../../../gpt-ai-flow-common/interface-backend/IProMode_v3/IProMode_v3_10_seoManager';
import { IProMode_v3_contextTypeStages } from '../../../../gpt-ai-flow-common/interface-backend/IProMode_v3/index_types';

import { DynamicFormForContextPrompt } from '../3_unit/DynamicFormForContextPrompt';
import { ProModeAIFlowRow_v3 } from '../2_component/ProModeAIFlowRow_v3';

interface IProModePage_copyWriting_input {
  PROMODE_DATA: IProMode_v3_oneProMode<
    EProMode_v3_10_seoManager_contextType,
    EProMode_v3_10_seoManager_contextTypeStage
  >;
}

export const ProModePage_v3_10_seoManager = (props: IProModePage_copyWriting_input) => {
  const { PROMODE_DATA } = props;

  const DEFAULT_CONTEXT_TYPE = PROMODE_DATA.default.defaultContextType;
  const DEFAULT_CONTEXT_TYPE_STAGE = PROMODE_DATA.default.defaultContextTypeStage;

  const proModeData = PROMODE_DATA;
  const defaultContextType = DEFAULT_CONTEXT_TYPE;
  const defaultContextTypeStage = DEFAULT_CONTEXT_TYPE_STAGE;
  const contexts = proModeData.context;
  const contextDefault = contexts[EProMode_v3_10_seoManager_contextType.DEFAULT];
  const contextDefaultStageDefault =
    contexts[EProMode_v3_10_seoManager_contextType.DEFAULT].stages[EProMode_v3_10_seoManager_contextTypeStage.DEFAULT];

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
  const [contextType, setContextType] = useState<EProMode_v3_10_seoManager_contextType>(defaultContextType);
  const [contextTypeStage, setContextTypeStage] =
    useState<EProMode_v3_10_seoManager_contextTypeStage>(defaultContextTypeStage);
  const [defautContext, setDefaultContext] = useState<string>(
    ((contexts[contextType] ?? contextDefault).stages[contextTypeStage] ?? contextDefaultStageDefault).defaultValue
  );
  const defaultContextHavePlaceHolder = TString.hasPlaceholder(defautContext);
  const [contextHandled, setContextHandled] = useState<string>(
    ((contexts[contextType] ?? contextDefault).stages[contextTypeStage] ?? contextDefaultStageDefault).value
  );

  const [showContextInputs, setShowContextInputs] = useState<boolean>(false);
  const [isContextInputsDirty, setIsContextInputsDirty] = useState<boolean>(false);
  // === Context input - end ===

  // === Contexts and stages - start ===
  const defaultContextTypesForSelect = Object.keys(contexts);
  const [contextTypeStagesListForSelect, setContextTypeStagesListForSelect] = useState<IProMode_v3_contextTypeStages[]>(
    Object.keys(contexts[contextType]?.stages ?? {}) as IProMode_v3_contextTypeStages[]
  );
  // === Contexts and stages - end ===

  useEffect(() => {
    // Refresh contextTypeStagesList
    setContextTypeStagesListForSelect(
      Object.keys(contexts[contextType]?.stages ?? {}) as IProMode_v3_contextTypeStages[]
    );

    // Update contextDefaultValue and contextValue
    const selectedDefaultValue = contexts[contextType]?.stages[contextTypeStage]?.defaultValue;
    const selectedValue = contexts[contextType]?.stages[contextTypeStage]?.value;

    if (!selectedDefaultValue || !selectedValue) {
      setContextTypeStage(EProMode_v3_10_seoManager_contextTypeStage.DEFAULT);
      return;
    }

    if (selectedDefaultValue && selectedValue) {
      setDefaultContext(selectedDefaultValue);
      setContextHandled(selectedValue);

      if (TString.hasPlaceholder(selectedDefaultValue)) {
        message.warning('点击右侧修改 📝 按钮填写具体场景信息', 5);
      }
    }

    setIsContextInputsDirty(false);
  }, [contextType, contextTypeStage]);

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
            阶段 :
            <Select
              defaultValue={contextTypeStage}
              value={contextTypeStage}
              style={{ width: 150, marginLeft: '.4rem' }}
              onChange={(paraContextTypeStage: EProMode_v3_10_seoManager_contextTypeStage) => {
                console.log(`selected context stage: ${paraContextTypeStage}`);
                setContextTypeStage(paraContextTypeStage);
              }}
              options={contextTypeStagesListForSelect
                .map((item) => {
                  return {
                    label: contexts[contextType]?.stages[item as EProMode_v3_10_seoManager_contextTypeStage]?.name,
                    value: item,
                    disabled:
                      contexts[contextType]?.stages[item as EProMode_v3_10_seoManager_contextTypeStage]?.disable,
                  };
                })
                .filter((item) => !item.disabled || item.label)}
            />
            {defaultContextHavePlaceHolder && !showContextInputs && (
              <EditOutlined style={{ fontSize: 18, marginLeft: '.4rem' }} onClick={() => setShowContextInputs(true)} />
            )}
            {defaultContextHavePlaceHolder && showContextInputs && (
              <EditOutlined style={{ fontSize: 18, marginLeft: '.4rem' }} onClick={() => setShowContextInputs(false)} />
            )}
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
              value={contextType}
              style={{ width: 150, marginLeft: '.4rem' }}
              onChange={(paraContextType: EProMode_v3_10_seoManager_contextType) => {
                console.log(`selected context: ${paraContextType}`);
                setContextType(paraContextType);
              }}
              options={defaultContextTypesForSelect
                .map((item) => {
                  return {
                    label: contexts[item as EProMode_v3_10_seoManager_contextType]?.name,
                    value: item,
                    disabled: contexts[item as EProMode_v3_10_seoManager_contextType]?.disable,
                  };
                })
                .filter((item) => !item.disabled || item.label)}
            />
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
                contexthandled={contextHandled}
                defaulInstructionAiCommands={proModeData.instruction[contextType][contextTypeStage] ?? []}
                defaultOutputIndicatorAiCommands={proModeData.outputIndicator[contextType][contextTypeStage] ?? []}
                aiCommandsSettings={proModeData.defaultAiCommandsSettings[contextType][contextTypeStage] ?? []}
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
