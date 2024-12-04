import { useState } from 'react';
import { Select, message } from 'antd';

import { ELLM_name } from '../../../../gpt-ai-flow-common/enum-backend/ELLM';
import {
  to_deprecate_IInputsCache,
  IInputsCache_v2,
} from '../../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import { ILLMOption_secrets } from '../../../../gpt-ai-flow-common/interface-backend/ILLMOptions';
import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

import { ProModeWindow_v4_tabPane_langchain_01_iterate_and_optimize_v5 } from './ProModeWindow_v4_pageType/2024-11-03-ProModeWindow_v4_tabPane_01_langchain_iterate_and_optimize/index_v5';
import { ProModeWindow_v4_tabPane_langchain_02_once_multiple_results_v5 } from './ProModeWindow_v4_pageType/2024-07-19-ProModeWindow_v4_tabPane_02_langchain_once_multiple_results/index_v5';
import { ProModeWindow_v4_tabPane_langchain_03_langchain_sample_interface } from './ProModeWindow_v4_pageType/2024-07-21-ProModeWindow_v4_tabPane_03_langchain_sample_interface';
import { useCreativityValueContext } from '../../../../gpt-ai-flow-common/contexts/CreativityValueProviderContext';
import { IProMode_v4_tabPane } from '../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4';
import {
  EProMode_v4_module_contextType,
  EProMode_v4_module_mode,
} from '../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/EProMode_v4_module';
import {
  IProMode_v4_tabPane_context,
  IBackground_for_type_langchain,
  IAdjust_for_type_langchain,
} from '../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/03-langchain';
import { ESocialPlatform_moduleName } from '../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/03-langchain/01-iterate-and-optimize/00-prototype-2024-12-02-socialPlatform/enum-socialPlatofrm';

export interface IProModeWindow_v4_wrapper_input {
  t: IGetT_frontend_output;
  tabPane: IProMode_v4_tabPane<IProMode_v4_tabPane_context<IBackground_for_type_langchain, IAdjust_for_type_langchain>>;
  userAccessToken: string;
  llmOption_secrets: ILLMOption_secrets;
  llmName: ELLM_name;
  inputsCache: to_deprecate_IInputsCache;
  setInputsCache: React.Dispatch<React.SetStateAction<to_deprecate_IInputsCache>>;
  inputsCache_v2: IInputsCache_v2;
  setInputsCache_v2: React.Dispatch<React.SetStateAction<IInputsCache_v2>>;
}
export const ProModeWindow_v4_wrapper = (props: IProModeWindow_v4_wrapper_input) => {
  const {
    t,
    tabPane,
    userAccessToken,
    llmOption_secrets,
    llmName,
    inputsCache,
    setInputsCache,
    inputsCache_v2,
    setInputsCache_v2,
  } = props;
  const { context } = tabPane;

  const creativityValue = useCreativityValueContext();

  const [selectedContextType, setSelectedContextType] = useState<
    EProMode_v4_module_contextType | ESocialPlatform_moduleName
  >(context.length > 0 ? context[0].contextType : EProMode_v4_module_contextType.GENERAL);
  const [contextSelected, setContextSelected] = useState<IProMode_v4_tabPane_context<
    IBackground_for_type_langchain,
    IAdjust_for_type_langchain
  > | null>(context.length > 0 ? context[0] : null);
  // console.log('contextSelected', contextSelected);
  if (!contextSelected) {
    message.error('contextSelected is null');
    return null;
  }
  const { mode } = contextSelected;

  const switchContextSelected_by_type = (newType: EProMode_v4_module_contextType) => {
    setSelectedContextType(newType);
    setContextSelected(context.find((item) => item.contextType === newType) ?? null);
  };

  return (
    <div className="tabPane_wrapper_context_container">
      <div className="row" style={{ paddingLeft: '1rem' }}>
        <Select
          defaultValue={contextSelected?.contextType}
          value={selectedContextType}
          style={{ width: 240 }}
          onChange={(value: string) => {
            console.log(`selected ${value}`);
            switchContextSelected_by_type(value as EProMode_v4_module_contextType);
          }}
          options={context.map(
            (item: IProMode_v4_tabPane_context<IBackground_for_type_langchain, IAdjust_for_type_langchain>) => {
              return {
                label: item.label,
                value: item.contextType,
              };
            },
          )}
        />
        {/* {uuid === 'writingPostAgent' && (
          <>
            {!(
              selectedContextType.includes('agent') ||
              selectedContextType.includes('beta') ||
              selectedContextType.includes('BETA')
            ) && (
              <Button
                type="primary"
                className="ml-2"
                onClick={() => {
                  switchContextSelected_by_type(
                    EProMode_v4_module_contextType.BETA_WRITING_POST_AGENT_AND_REVIEW_POST_AGENT,
                  );
                }}
              >
                {t.get('Writing and Review Workflow')}
              </Button>
            )}
            {(selectedContextType.includes('agent') ||
              selectedContextType.includes('beta') ||
              selectedContextType.includes('BETA')) && (
              <Tag color="#108ee9" className="ml-2">
                Beta
              </Tag>
            )}
          </>
        )} */}
      </div>
      <div className="row tabPane_context_container">
        {mode === EProMode_v4_module_mode.LANGCHAIN_01_CUSTOME_ITERATE_AND_OPTIMIZE && (
          <ProModeWindow_v4_tabPane_langchain_01_iterate_and_optimize_v5
            creativityValue={creativityValue}
            contextSelected={contextSelected}
            switchContextSelected_by_type={switchContextSelected_by_type}
            // IProModeWindow_v4_wrapper_input
            t={t}
            userAccessToken={userAccessToken}
            llmOption_secrets={llmOption_secrets}
            llmName={llmName}
            inputsCache={inputsCache} // @DEPRECATED
            setInputsCache={setInputsCache} // @DEPRECATED
            inputsCache_v2={inputsCache_v2}
            setInputsCache_v2={setInputsCache_v2}
          />
        )}

        {mode === EProMode_v4_module_mode.LANGCHAIN_02_CUSTOME_ONCE_MULTIPLE_RESUTLS && (
          <ProModeWindow_v4_tabPane_langchain_02_once_multiple_results_v5
            creativityValue={creativityValue}
            contextSelected={contextSelected}
            // switchContextSelected_by_type={switchContextSelected_by_type}
            // IProModeWindow_v4_wrapper_input
            t={t}
            userAccessToken={userAccessToken}
            llmOption_secrets={llmOption_secrets}
            llmName={llmName}
            inputsCache={inputsCache} // @DEPRECATED
            setInputsCache={setInputsCache} // @DEPRECATED
            inputsCache_v2={inputsCache_v2}
            setInputsCache_v2={setInputsCache_v2}
          />
        )}

        {mode === EProMode_v4_module_mode.LANGCHAIN_03_SIMPLE_INTERFACE && (
          <ProModeWindow_v4_tabPane_langchain_03_langchain_sample_interface
            creativityValue={creativityValue}
            contextSelected={contextSelected}
            switchContextSelected_by_type={switchContextSelected_by_type}
            // IProModeWindow_v4_wrapper_input
            t={t}
            userAccessToken={userAccessToken}
            llmOption_secrets={llmOption_secrets}
            llmName={llmName}
            inputsCache={inputsCache} // @DEPRECATED
            setInputsCache={setInputsCache} // @DEPRECATED
            inputsCache_v2={inputsCache_v2}
            setInputsCache_v2={setInputsCache_v2}
          />
        )}
      </div>
    </div>
  );
};
