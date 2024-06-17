import { Select, message } from 'antd';
import context from 'antd/es/app/context';
import { t } from 'i18next';
import React, { useState } from 'react';
import { EProMode_v4_tabPane_context_type } from '../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/EProMode_v4_tabPane_context_type';
import {
  IPromode_v4_tabPane_context,
  IBackground_for_type_langchain,
  IAdjust_for_type_langchain,
} from '../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/interface-type/03-langchain';
import { EOpenAiModel_type } from '../../../gpt-ai-flow-common/enum-backend/EOpenAIModelType';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IProMode_v4_tabPane } from '../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4';
import { IInputsCache } from '../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import { EProMode_v4_tabPane_type } from '../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/EProMode_v4_tabPane_type';
import { ProModeWindow_v4_tabPane_type_custome_langchain_iterate_and_optimize } from './ProModeWindow_v4_pageType/2024-05-12-ProModeWindow_v4_tabPane_langchain_iterate_and_optimize';
import { IAdjust_IMessage } from '../../../gpt-ai-flow-common/interface-app/2_component/IMessageExchange/IAdjust';
import { useCreativityValueContext } from '../../../gpt-ai-flow-common/contexts/CreativityValueProviderContext';
import { ProModeWindow_v4_tabPane_type_custome_langchain_iterate_and_optimize_v5 } from './ProModeWindow_v4_pageType/2024-05-12-ProModeWindow_v4_tabPane_langchain_iterate_and_optimize/index_v5';

export interface IProModeWindow_v4_wrapper_input {
  t: IGetT_frontend_output;
  tabPane: IProMode_v4_tabPane<IPromode_v4_tabPane_context<IBackground_for_type_langchain, IAdjust_for_type_langchain>>;
  userAccessToken: string;
  modelSecret: string;
  proModeModelType: EOpenAiModel_type;
  inputsCache: IInputsCache;
  setInputsCache: React.Dispatch<React.SetStateAction<IInputsCache>>;
}
export const ProModeWindow_v4_wrapper = (props: IProModeWindow_v4_wrapper_input) => {
  const { t, tabPane, userAccessToken, modelSecret, proModeModelType, inputsCache, setInputsCache } = props;
  const { urlSlug, context } = tabPane;
  //   console.log('context', context);

  const creativityValue = useCreativityValueContext();

  const [selectedContextType, setSelectedContextType] = useState<EProMode_v4_tabPane_context_type>(
    context.length > 0 ? context[0].type : EProMode_v4_tabPane_context_type.GENERAL,
  );
  const [contextSelected, setContextSelected] = useState<IPromode_v4_tabPane_context<
    IBackground_for_type_langchain,
    IAdjust_for_type_langchain
  > | null>(context.length > 0 ? context[0] : null);
  //   console.log('contextSelected', contextSelected);
  if (!contextSelected) {
    message.error('contextSelected is null');
    return null;
  }
  const { mode } = contextSelected;

  const swtichContextSelected_by_type = (newType: EProMode_v4_tabPane_context_type) => {
    setSelectedContextType(newType);
    setContextSelected(context.find((item) => item.type === newType) ?? null);
  };

  return (
    <div className="tabPane_wrapper_context_container">
      <div>ProModeWindow_v4_wrapper</div>
      <div className="row" style={{ paddingLeft: '1rem' }}>
        <Select
          defaultValue={contextSelected?.type}
          value={selectedContextType}
          style={{ width: 120 }}
          onChange={(value: string) => {
            console.log(`selected ${value}`);
            swtichContextSelected_by_type(value as EProMode_v4_tabPane_context_type);
          }}
          options={context.map(
            (item: IPromode_v4_tabPane_context<IBackground_for_type_langchain, IAdjust_for_type_langchain>) => {
              return {
                label: t.get(item.label),
                value: item.type,
              };
            },
          )}
        />
      </div>
      <div className="row tabPane_context_container">
        {mode && mode === EProMode_v4_tabPane_type.LANGCHAIN_01_CUSTOME_ITERATE_AND_OPTIMIZE && (
          <ProModeWindow_v4_tabPane_type_custome_langchain_iterate_and_optimize_v5
            creativityValue={creativityValue}
            contextSelected={contextSelected}
            swtichContextSelected_by_type={swtichContextSelected_by_type}
            // IProModeWindow_v4_wrapper_input
            t={t}
            tabPane={
              tabPane as IProMode_v4_tabPane<
                IPromode_v4_tabPane_context<IBackground_for_type_langchain, IAdjust_IMessage>
              >
            }
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
