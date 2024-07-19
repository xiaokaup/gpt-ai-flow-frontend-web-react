import { useState } from 'react';
import { Button, Select, Tag, message } from 'antd';

import { IInputsCache } from '../../../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import { ELLM_name } from '../../../../../gpt-ai-flow-common/enum-backend/ELLM';
import { IGetT_frontend_output } from '../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import {
  IPromode_v4_tabPane_context,
  IBackground_for_type_langchain,
  IAdjust_for_type_langchain,
} from '../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/interface-type/03-langchain';
import { IProMode_v4_tabPane } from '../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4';
import { useCreativityValueContext } from '../../../../../gpt-ai-flow-common/contexts/CreativityValueProviderContext';
import { EProMode_v4_tabPane_type } from '../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/EProMode_v4_tabPane_type';
import { EProMode_v4_tabPane_context_type } from '../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/EProMode_v4_tabPane_context_type';

import { ProModeWindow_v4_tabPane_langchain_01_iterate_and_optimize_v5 } from './ProModeWindow_v4_pageType/2024-07-19-ProModeWindow_v4_tabPane_langchain_01_iterate_and_optimize/index_v5';
import { ProModeWindow_v4_tabPane_langchain_02_once_multiple_results_v5 } from './ProModeWindow_v4_pageType/2024-07-19-ProModeWindow_v4_tabPane_langchain_02_once_multiple_results/index_v5';

export interface IProModeWindow_v4_wrapper_input {
  t: IGetT_frontend_output;
  tabPane: IProMode_v4_tabPane<IPromode_v4_tabPane_context<IBackground_for_type_langchain, IAdjust_for_type_langchain>>;
  userAccessToken: string;
  modelSecret: string;
  proModeModelType: ELLM_name;
  inputsCache: IInputsCache;
  setInputsCache: React.Dispatch<React.SetStateAction<IInputsCache>>;
}
export const ProModeWindow_v4_wrapper = (props: IProModeWindow_v4_wrapper_input) => {
  const { t, tabPane, userAccessToken, modelSecret, proModeModelType, inputsCache, setInputsCache } = props;
  const { uuid, context } = tabPane;

  const creativityValue = useCreativityValueContext();

  const [selectedContextType, setSelectedContextType] = useState<EProMode_v4_tabPane_context_type>(
    context.length > 0 ? context[0].contextType : EProMode_v4_tabPane_context_type.GENERAL,
  );
  const [contextSelected, setContextSelected] = useState<IPromode_v4_tabPane_context<
    IBackground_for_type_langchain,
    IAdjust_for_type_langchain
  > | null>(context.length > 0 ? context[0] : null);
  // console.log('contextSelected', contextSelected);
  if (!contextSelected) {
    message.error('contextSelected is null');
    return null;
  }
  const { mode } = contextSelected;

  const swtichContextSelected_by_type = (newType: EProMode_v4_tabPane_context_type) => {
    setSelectedContextType(newType);
    setContextSelected(context.find((item) => item.contextType === newType) ?? null);
  };

  return (
    <div className="tabPane_wrapper_context_container">
      <div className="float-right">v5</div>
      <div className="row" style={{ paddingLeft: '1rem' }}>
        <Select
          defaultValue={contextSelected?.contextType}
          value={selectedContextType}
          style={{ width: 210 }}
          onChange={(value: string) => {
            console.log(`selected ${value}`);
            swtichContextSelected_by_type(value as EProMode_v4_tabPane_context_type);
          }}
          options={context.map(
            (item: IPromode_v4_tabPane_context<IBackground_for_type_langchain, IAdjust_for_type_langchain>) => {
              return {
                label: t.get(item.label),
                value: item.contextType,
              };
            },
          )}
        />
        {uuid === 'writingPostAgent' && (
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
                  swtichContextSelected_by_type(
                    EProMode_v4_tabPane_context_type.BETA_WRITING_POST_AGENT_AND_REVIEW_POST_AGENT,
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
        )}
      </div>
      <div className="row tabPane_context_container">
        {mode === EProMode_v4_tabPane_type.LANGCHAIN_01_CUSTOME_ITERATE_AND_OPTIMIZE && (
          <ProModeWindow_v4_tabPane_langchain_01_iterate_and_optimize_v5
            creativityValue={creativityValue}
            contextSelected={contextSelected}
            swtichContextSelected_by_type={swtichContextSelected_by_type}
            // IProModeWindow_v4_wrapper_input
            t={t}
            userAccessToken={userAccessToken}
            modelSecret={modelSecret}
            proModeModelType={proModeModelType}
            inputsCache={inputsCache}
            setInputsCache={setInputsCache}
          />
        )}

        {mode === EProMode_v4_tabPane_type.LANGCHAIN_02_CUSTOME_ONCE_MULTIPLE_RESUTLS && (
          <ProModeWindow_v4_tabPane_langchain_02_once_multiple_results_v5
            creativityValue={creativityValue}
            contextSelected={contextSelected}
            // swtichContextSelected_by_type={swtichContextSelected_by_type}
            // IProModeWindow_v4_wrapper_input
            t={t}
            userAccessToken={userAccessToken}
            modelSecret={modelSecret}
            proModeModelType={proModeModelType}
            inputsCache={inputsCache}
            setInputsCache={setInputsCache}
          />
        )}
      </div>
    </div>
  );
};
