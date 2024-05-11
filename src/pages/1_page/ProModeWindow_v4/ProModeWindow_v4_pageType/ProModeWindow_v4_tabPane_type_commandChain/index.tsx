import '../../../../../styles/global.css';
import '../../../../../styles/layout.scss';

import { useCallback, useEffect, useState } from 'react';
import { Button, Select, message } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, EditOutlined } from '@ant-design/icons';

import iconSuccessful from '../../../../../../assets/icons-customize/icon-status-successful/icon-status-successful-512x512.png';
import iconWrong from '../../../../../../assets/icons-customize/icon-status-wrong/icon-status-wrong-512x512.png';

import { IGetT_frontend_output } from '../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { DynamicFormForContextPrompt_v4 } from './3_unit/DynamicFormForContextPrompt_v4';
import TStringFile from '../../../../../gpt-ai-flow-common/tools/TString';
import React from 'react';
import { ProModeAiFlowRow_v4 } from './2_componnet/ProModeAiFlowRow_v4';
import { IUserData } from '../../../../../gpt-ai-flow-common/interface-app/IUserData';
import { IStoreStorageLocalSettings } from '../../../../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { IAIFlow_v2 } from '../../../../../gpt-ai-flow-common/interface-app/2_component/IAIFlow_v2';
import { IProMode_v4_tabPane } from '../../../../../gpt-ai-flow-common/interface-app/solution_ProMode_v4/IProMode_v4';
import { convert_IAIFlow_v2_to_IAICommands_v4_new } from '../../../../../gpt-ai-flow-common/interface-app/2_component/TAIFlow_v2';
import {
  IPromode_v4_tabPane_context_type_commandChain,
  IProMode_v4_tabPane_example,
  IPromode_v4_tabPane_context_default,
  IPromode_v4_tabPane_context_stage,
} from '../../../../../gpt-ai-flow-common/interface-app/solution_ProMode_v4/type/01-commandChain/IProMode_v4_context_type_commandChain';

interface IProModeWindow_v4_tabPane_type_langchain_input {
  t: IGetT_frontend_output;
  tabPane: IProMode_v4_tabPane<IPromode_v4_tabPane_context_type_commandChain>;
  webCase: {
    userData: IUserData;
    localDataFromStorage: IStoreStorageLocalSettings;
  };
}
export const ProModeWindow_v4_tabPane_type_langchain = (props: IProModeWindow_v4_tabPane_type_langchain_input) => {
  const { t, tabPane, webCase } = props;

  // === tabPane UI settings - start ===
  const [rowCount, setRowCount] = useState<number>(1);

  const [globalContext, setGlobalContext] = useState<string>('');
  const [globalExamples, setGlobalExamples] = useState<IProMode_v4_tabPane_example[]>([]);

  const [showContextInputs, setShowContextInputs] = useState<boolean>(false);
  const [isContextInputsDirty, setIsContextInputsDirty] = useState<boolean>(false);
  // === tabPane UI settings - end ===

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

  // === tabPane ProModeData - start ===
  const [tabPaneFromProps] = useState<IProMode_v4_tabPane<IPromode_v4_tabPane_context_type_commandChain>>(tabPane);

  const [contextSelected, setContextSelected] = useState<IPromode_v4_tabPane_context_type_commandChain>(
    IPromode_v4_tabPane_context_default
  );
  const [contextStageSelected, setContextStageSelected] = useState<IPromode_v4_tabPane_context_stage | null>();
  // === tabPane ProModeData - end ===

  const init = useCallback(() => {
    // Context default
    const contextDefault = tabPaneFromProps.context.find(
      (item: IPromode_v4_tabPane_context_type_commandChain) => item.isDefault
    );
    // console.log('contextDefault', contextDefault);
    if (!contextDefault) return;
    setContextSelected(contextDefault);
    setGlobalContext(contextDefault.value);

    // Context stage default
    const contextStageDefault = contextDefault?.stages.find(
      (item: IPromode_v4_tabPane_context_stage) => item.isDefault
    );
    // console.log('contextStageDefault', contextStageDefault);
    if (!contextStageDefault) {
      setContextStageSelected(null);
      return;
    }
    setContextStageSelected(contextStageDefault);
    if (contextStageDefault.newContextValue) setGlobalContext(contextStageDefault.newContextValue);

    // === Set examples - start ===
    let mainExamples: IProMode_v4_tabPane_example[] = contextDefault.examples;
    if (contextStageDefault.newExamples && contextStageDefault.newExamples.length > 0) {
      mainExamples = contextStageDefault.newExamples;
    }
    if (contextStageDefault.moreExamples) {
      setGlobalExamples([...mainExamples, ...contextStageDefault.moreExamples]);
    }
    // === Set examples - end ===
  }, [tabPaneFromProps.context]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (TStringFile.hasPlaceholder_v2(contextSelected.value)) {
      message.warning(
        t.get(
          'Click the edit button 📝 on the left side of the Context to fill in more specific business information.'
        ),
        5
      );
    }
  }, [contextSelected.value, t]);

  return (
    <div className="panel_container">
      <div className="row firstRow" style={{ display: 'flex', justifyContent: 'space-between' }}>
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
          {contextSelected && contextStageSelected && (
            <div className="column" style={{ display: 'flex', alignItems: 'center' }}>
              {t.get('Stage')} :
              <Select
                defaultValue={contextStageSelected.name}
                value={contextStageSelected.name}
                style={{ width: 150, marginLeft: '.4rem' }}
                onChange={(contextStage_name: string) => {
                  console.log(`selected context stage: ${contextStage_name}`);
                  const contextStageDefault = contextSelected.stages.find(
                    (item: IPromode_v4_tabPane_context_stage) => item.name === contextStage_name
                  );
                  setContextStageSelected(contextStageDefault);
                }}
                options={contextSelected?.stages
                  .map((item: IPromode_v4_tabPane_context_stage) => {
                    return {
                      label: item.name,
                      value: item.name,
                      disabled: item.isDisabled,
                    };
                  })
                  .filter((item) => !item.disabled || item.label)}
              />
              {TStringFile.hasPlaceholder_v2(contextSelected.value) && !showContextInputs && (
                <EditOutlined
                  style={{ fontSize: 18, marginLeft: '.4rem' }}
                  onClick={() => setShowContextInputs(true)}
                />
              )}
              {TStringFile.hasPlaceholder_v2(contextSelected.value) && showContextInputs && (
                <EditOutlined
                  style={{ fontSize: 18, marginLeft: '.4rem' }}
                  onClick={() => setShowContextInputs(false)}
                />
              )}
            </div>
          )}
          {contextSelected && (
            <div className="column" style={{ display: 'flex', alignItems: 'center' }}>
              {t.get('Context')}
              {isContextInputsDirty && <img src={iconWrong} alt="" style={{ width: 18, marginLeft: '.4rem' }} />}
              {!isContextInputsDirty && (
                <img src={iconSuccessful} alt="" style={{ width: 18, marginLeft: '.2rem', marginRight: '.2rem' }} />
              )}
              :
              <Select
                defaultValue={contextSelected.name}
                value={contextSelected.name}
                style={{ width: 150, marginLeft: '.4rem' }}
                onChange={(context_name: string) => {
                  console.log(`selected context: ${context_name}`);
                  const contextDefault = tabPaneFromProps.context.find((item) => item.name === context_name);
                  if (!contextDefault) return;
                  setContextSelected(contextDefault as IPromode_v4_tabPane_context_type_commandChain);
                  const contextStageDefault = contextDefault?.stages.find((item) => item.isDefault);
                  if (!contextStageDefault) {
                    setContextStageSelected(null);
                    return;
                  }
                  setContextStageSelected(contextStageDefault);
                }}
                options={tabPane.context
                  .map((item: IPromode_v4_tabPane_context_type_commandChain) => {
                    return {
                      label: item.name,
                      value: item.name,
                      disabled: item.isDisabled,
                    };
                  })
                  .filter((item) => !item.disabled || item.label)}
              />
            </div>
          )}
        </div>
      </div>

      {contextSelected && (
        <div className="row">
          {/* {!showContextInputs && (
            <div className="row" style={{ display: 'flex' }}>
              <div className="column">@DEV {globalContext}</div>
            </div>
          )} */}
          <DynamicFormForContextPrompt_v4
            t={t}
            containerStyle={showContextInputs ? {} : { display: 'none' }}
            contextSelectedValue={contextSelected.value}
            setGlobalContext={setGlobalContext}
            setShowContextInputs={setShowContextInputs}
            setIsContextInputsDirty={setIsContextInputsDirty}
          />
        </div>
      )}

      <div className="row panel_body">
        {[...Array(rowCount)].map((_, rowIndex) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div className="row" key={rowIndex}>
              <ProModeAiFlowRow_v4
                t={t}
                clickSearchAllResultsButtonCount={clickSearchAllResultsButtonCount}
                clickStopSearchAllResultsButtonCount={clickStopSearchAllResultsButtonCount}
                globalContext={globalContext}
                globalExamples={globalExamples}
                contextStageSelected_instructions={contextStageSelected?.instructions ?? []}
                contextStageSelected_outputIndicator={contextStageSelected?.outputIndicator ?? []}
                aiCommandsSettings={
                  contextStageSelected?.instructions
                    .filter((item: IAIFlow_v2) => item.isDefault)
                    .map((item: IAIFlow_v2) => convert_IAIFlow_v2_to_IAICommands_v4_new(item)) ?? []
                }
                webCase={webCase}
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
            setRowCount((prevState) => {
              if (prevState === 0) return prevState;
              return prevState - 1;
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
