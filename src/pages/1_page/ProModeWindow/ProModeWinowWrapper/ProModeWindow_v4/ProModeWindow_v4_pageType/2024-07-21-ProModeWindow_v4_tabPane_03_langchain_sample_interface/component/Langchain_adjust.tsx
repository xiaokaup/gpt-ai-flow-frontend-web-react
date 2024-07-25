import { useState } from 'react';

import { AutoComplete, AutoCompleteProps, Form, Input, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { IGetT_frontend_output } from '../../../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import {
  IPromode_v4_tabPane_context_for_type_langchain_formItems,
  IFormItem,
  IAdjust_for_type_langchain,
} from '../../../../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/interface-type/03-langchain';
import { EProMode_v4_tabPane_context_type } from '../../../../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/EProMode_v4_tabPane_context_type';

const { TextArea } = Input;

export const Langchain_adjust = (props: {
  t: IGetT_frontend_output;
  isAdjustCall: boolean;
  adjustSelected: IPromode_v4_tabPane_context_for_type_langchain_formItems<IAdjust_for_type_langchain>;
  adjust: IAdjust_for_type_langchain;
  setAdjust: (newItem: IAdjust_for_type_langchain) => void;
  contextSelected_type: EProMode_v4_tabPane_context_type;
  swtichContextSelected_by_type: (newItem: EProMode_v4_tabPane_context_type) => void;
}) => {
  const { t, isAdjustCall, adjustSelected, adjust, setAdjust } = props;

  const [form] = Form.useForm();

  const [autoCompleteOptions_for_input, setAutoCompleteOptions_for_input] = useState<AutoCompleteProps['options']>([]);
  const [autoCompleteOptions_for_textArea, setAutoCompleteOptions_for_textArea] = useState<
    AutoCompleteProps['options']
  >([]);

  return (
    <div className="row subContainer">
      <div className="row">
        <Form form={form} initialValues={adjust}>
          {adjustSelected.formItems.map((item: IFormItem<IAdjust_for_type_langchain>) => {
            const {
              componentType,
              label,
              name,
              isRequired,
              isAutoSize_minRows,
              tooltip,
              tooltip_isNeedTranslate,
              isDisabledWhenAdjustCall,
              autoCompleteOptions,
            } = item;

            if (componentType === 'Input') {
              return (
                <Tooltip title={tooltip && tooltip_isNeedTranslate ? t.get(tooltip) : tooltip}>
                  <Form.Item
                    name={name}
                    label={
                      tooltip && tooltip_isNeedTranslate ? (
                        <>
                          {t.get(label)}&nbsp;
                          <InfoCircleOutlined />
                        </>
                      ) : (
                        t.get(label)
                      )
                    }
                    rules={
                      isRequired
                        ? [{ required: true, message: t.getHTML('Please input your {text}', { text: t.get(label) }) }]
                        : []
                    }
                  >
                    {autoCompleteOptions && autoCompleteOptions.length > 0 && (
                      <AutoComplete
                        options={autoCompleteOptions_for_input}
                        onSelect={(value: string) => {
                          const newItem = {
                            ...adjust,
                            [name]: value,
                          };
                          setAdjust(newItem);
                        }}
                        onFocus={() => {
                          console.log('onFocus');
                          setAutoCompleteOptions_for_input(autoCompleteOptions);
                        }}
                        onSearch={(searchValue: string) => {
                          console.log('onSearch', searchValue);
                          setAutoCompleteOptions_for_input(
                            autoCompleteOptions.filter((item) => item.value.includes(searchValue)),
                          );
                        }}
                      >
                        <Input
                          onChange={(event) => {
                            const newItem = {
                              ...adjust,
                              [name]: event.target.value,
                            };
                            setAdjust(newItem);
                          }}
                        />
                      </AutoComplete>
                    )}
                    {!(autoCompleteOptions && autoCompleteOptions.length > 0) && (
                      <Input
                        onChange={(event) => {
                          const newItem = {
                            ...adjust,
                            [name]: event.target.value,
                          };
                          setAdjust(newItem);
                        }}
                      />
                    )}
                  </Form.Item>
                </Tooltip>
              );
            }
            if (componentType === 'TextArea') {
              return (
                <Tooltip title={tooltip && tooltip_isNeedTranslate ? t.get(tooltip) : tooltip}>
                  <Form.Item
                    name={name}
                    label={
                      tooltip && tooltip_isNeedTranslate ? (
                        <>
                          {t.get(label)}&nbsp;
                          <InfoCircleOutlined />
                        </>
                      ) : (
                        t.get(label)
                      )
                    }
                    rules={
                      isRequired
                        ? [{ required: true, message: t.getHTML('Please input your {text}', { text: t.get(label) }) }]
                        : []
                    }
                  >
                    {autoCompleteOptions && autoCompleteOptions.length > 0 && (
                      <AutoComplete
                        options={autoCompleteOptions_for_textArea}
                        onSelect={(value: string) => {
                          const newItem = {
                            ...adjust,
                            [name]: value,
                          };
                          setAdjust(newItem);
                        }}
                        onFocus={() => {
                          console.log('onFocus');
                          setAutoCompleteOptions_for_textArea(autoCompleteOptions);
                        }}
                        onSearch={(searchValue: string) => {
                          console.log('onSearch', searchValue);
                          setAutoCompleteOptions_for_textArea(
                            autoCompleteOptions.filter((item) => item.value.includes(searchValue)),
                          );
                        }}
                      >
                        <TextArea
                          disabled={isDisabledWhenAdjustCall && isAdjustCall}
                          autoSize={{ minRows: isAutoSize_minRows ?? 1 }}
                          onChange={(event) => {
                            const newItem = {
                              ...adjust,
                              [name]: event.target.value,
                            };
                            setAdjust(newItem);
                          }}
                        />
                      </AutoComplete>
                    )}
                    {!(autoCompleteOptions && autoCompleteOptions.length > 0) && (
                      <TextArea
                        disabled={isDisabledWhenAdjustCall && isAdjustCall}
                        autoSize={{ minRows: isAutoSize_minRows ?? 1 }}
                        onChange={(event) => {
                          const newItem = {
                            ...adjust,
                            [name]: event.target.value,
                          };
                          setAdjust(newItem);
                        }}
                      />
                    )}
                  </Form.Item>
                </Tooltip>
              );
            }

            return <>None for componentType for adjust: {componentType}</>;
          })}
        </Form>
      </div>
    </div>
  );
};
