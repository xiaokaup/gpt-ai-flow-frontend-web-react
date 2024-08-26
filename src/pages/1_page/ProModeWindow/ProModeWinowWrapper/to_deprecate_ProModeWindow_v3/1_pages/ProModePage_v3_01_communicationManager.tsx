import '../../../../../../styles/global.css';
import '../../../../../../styles/layout.scss';

import iconSuccessful from '../../../../../../../assets/icons-customize/icon-status-successful/icon-status-successful-512x512.png';
import iconWrong from '../../../../../../../assets/icons-customize/icon-status-wrong/icon-status-wrong-512x512.png';

import { useEffect, useState } from 'react';
import { Button, Select, message } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, EditOutlined } from '@ant-design/icons';

import TString from '../../../../../../gpt-ai-flow-common/tools/TString';
import {
  EProMode_v3_01_communicationManager_contextType,
  EProMode_v3_01_communicationManager_contextTypeStage,
} from '../../../../../../gpt-ai-flow-common/interface-backend/IProMode_v3/IProMode_v3_01_communicationManager';
import { IProMode_v3_contextTypeStages } from '../../../../../../gpt-ai-flow-common/interface-backend/IProMode_v3/index_types';
import { IGetT_frontend_output } from '../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IProMode_v3_oneProMode } from '../../../../../../gpt-ai-flow-common/interface-backend/IProMode_v3/IProMode_v3_oneProMode';
import { IProMode_v3_onePromode_oneContext_oneStage_examples } from '../../../../../../gpt-ai-flow-common/interface-backend/IProMode_v3/IProMode_v3_onePromode_oneContext_oneStage_examples';

import { DynamicFormForContextPrompt } from '../3_unit/DynamicFormForContextPrompt';
import { ProModeAIFlowRow_v3 } from '../2_component/ProModeAIFlowRow_v3';

interface IProModePage_communication_input {
  t: IGetT_frontend_output;
  PROMODE_DATA: IProMode_v3_oneProMode<
    EProMode_v3_01_communicationManager_contextType,
    EProMode_v3_01_communicationManager_contextTypeStage
  >;
}

export const ProModePage_v3_01_communicationManager = (props: IProModePage_communication_input) => {
  const { t, PROMODE_DATA } = props;

  const DEFAULT_CONTEXT_TYPE = PROMODE_DATA.default.defaultContextType;
  const DEFAULT_CONTEXT_TYPE_STAGE = PROMODE_DATA.default.defaultContextTypeStage;

  const proModeData = PROMODE_DATA;
  const defaultContextType = DEFAULT_CONTEXT_TYPE;
  const defaultContextTypeStage = DEFAULT_CONTEXT_TYPE_STAGE;
  const contexts = proModeData.context;
  const contextDefault = contexts[EProMode_v3_01_communicationManager_contextType.DEFAULT];
  const contextDefaultStageDefault =
    contexts[EProMode_v3_01_communicationManager_contextType.DEFAULT].stages[
      EProMode_v3_01_communicationManager_contextTypeStage.DEFAULT
    ];

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
  const [contextType, setContextType] = useState<EProMode_v3_01_communicationManager_contextType>(defaultContextType);
  const [contextTypeStage, setContextTypeStage] =
    useState<EProMode_v3_01_communicationManager_contextTypeStage>(defaultContextTypeStage);
  const [defautContext, setDefaultContext] = useState<string>(
    ((contexts[contextType] ?? contextDefault).stages[contextTypeStage] ?? contextDefaultStageDefault).defaultValue,
  );
  const defaultContextHavePlaceHolder = TString.hasPlaceholder(defautContext);
  const [contextHandled, setContextHandled] = useState<string>(
    ((contexts[contextType] ?? contextDefault).stages[contextTypeStage] ?? contextDefaultStageDefault).defaultValue,
  );
  const [contextExamples, setContextExamples] = useState<IProMode_v3_onePromode_oneContext_oneStage_examples[]>([]);

  const [showContextInputs, setShowContextInputs] = useState<boolean>(false);
  const [isContextInputsDirty, setIsContextInputsDirty] = useState<boolean>(false);
  // === Context input - end ===

  // === Contexts and stages - start ===
  const defaultContextTypesForSelect = Object.keys(contexts);
  const [contextTypeStagesListForSelect, setContextTypeStagesListForSelect] = useState<IProMode_v3_contextTypeStages[]>(
    Object.keys(contexts[contextType]?.stages ?? {}) as IProMode_v3_contextTypeStages[],
  );
  // === Contexts and stages - end ===

  useEffect(() => {
    // Refresh contextTypeStagesList
    setContextTypeStagesListForSelect(
      Object.keys(contexts[contextType]?.stages ?? {}) as IProMode_v3_contextTypeStages[],
    );

    // Update contextDefaultValue and contextValue
    const selectedDefaultValue = contexts[contextType]?.stages[contextTypeStage]?.defaultValue;
    const selectedValue = contexts[contextType]?.stages[contextTypeStage]?.value;
    const selectedExamples = contexts[contextType]?.stages[contextTypeStage]?.examples ?? [];

    if (!selectedDefaultValue) {
      setContextTypeStage(EProMode_v3_01_communicationManager_contextTypeStage.DEFAULT);
      return;
    }

    if (selectedDefaultValue && selectedValue) {
      setDefaultContext(selectedDefaultValue);
      setContextHandled(selectedValue);
      setContextExamples(selectedExamples);

      if (TString.hasPlaceholder(selectedDefaultValue)) {
        message.warning(t.get('Click on the Modify 📝 button on the right to fill in specific context information'), 5);
      }
    }

    setIsContextInputsDirty(false);
  }, [contextType, contextTypeStage, contexts]);

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
            {t.get('Stop All Results')}
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 8 }}
            onClick={() => {
              console.log('click searchAllResultsForPannel');
              searchAllResultsForPannel();
            }}
          >
            {t.get('Get all results')}
          </Button>
        </div>
        <div className="column" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="column" style={{ display: 'flex', alignItems: 'center' }}>
            {t.get('Stage')} :
            <Select
              defaultValue={contextTypeStage}
              value={contextTypeStage}
              style={{ width: 150, marginLeft: '.4rem' }}
              onChange={(paraContextTypeStage: EProMode_v3_01_communicationManager_contextTypeStage) => {
                console.log(`selected context stage: ${paraContextTypeStage}`);
                setContextTypeStage(paraContextTypeStage);
              }}
              options={contextTypeStagesListForSelect
                .map((item) => {
                  return {
                    label:
                      contexts[contextType]?.stages[item as EProMode_v3_01_communicationManager_contextTypeStage]?.name,
                    value: item,
                    disabled:
                      contexts[contextType]?.stages[item as EProMode_v3_01_communicationManager_contextTypeStage]
                        ?.disable,
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
            {t.get('Context')}
            {isContextInputsDirty && <img src={iconWrong} alt="" style={{ width: 18, marginLeft: '.4rem' }} />}
            {!isContextInputsDirty && (
              <img src={iconSuccessful} alt="" style={{ width: 18, marginLeft: '.2rem', marginRight: '.2rem' }} />
            )}
            :
            <Select
              defaultValue={contextType}
              value={contextType}
              style={{ width: 150, marginLeft: '.4rem' }}
              onChange={(paraContextType: EProMode_v3_01_communicationManager_contextType) => {
                console.log(`selected context: ${paraContextType}`);
                setContextType(paraContextType);
              }}
              options={defaultContextTypesForSelect
                .map((item) => {
                  return {
                    label: contexts[item as EProMode_v3_01_communicationManager_contextType]?.name,
                    value: item,
                    disabled: contexts[item as EProMode_v3_01_communicationManager_contextType]?.disable,
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
          t={t}
          containerStyle={showContextInputs ? {} : { display: 'none' }}
          contextPromptWithPlaceholder={defautContext}
          setContextHandled={setContextHandled}
          setShowContextInputs={setShowContextInputs}
          setIsContextInputsDirty={setIsContextInputsDirty}
        />
      </div>

      <div className="row panel_body">
        {[...Array(rowCount)].map((_, rowIndex) => {
          return (
            <div className="row" key={rowIndex}>
              <ProModeAIFlowRow_v3
                t={t}
                clickSearchAllResultsButtonCount={clickSearchAllResultsButtonCount}
                clickStopSearchAllResultsButtonCount={clickStopSearchAllResultsButtonCount}
                contextHandled={contextHandled}
                contextExamples={contextExamples}
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
