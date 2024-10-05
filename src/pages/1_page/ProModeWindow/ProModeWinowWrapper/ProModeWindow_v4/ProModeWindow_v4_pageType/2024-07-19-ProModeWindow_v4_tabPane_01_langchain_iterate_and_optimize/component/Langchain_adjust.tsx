import expressionIcon from '../../../../../../../../../assets/icons-customize/2024-06-15-icon-communication-expression/megaphone.png';
import responseIcon from '../../../../../../../../../assets/icons-customize/2024-06-15-communication-response/text-notification.png';

import { useState } from 'react';

import { AutoComplete, AutoCompleteProps, DatePicker, Form, Input, InputNumber, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { IGetT_frontend_output } from '../../../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import {
  IPromode_v4_tabPane_context_for_type_langchain_formItems,
  IFormItem,
  IAdjust_for_type_langchain,
} from '../../../../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/interface-type/03-langchain';
import { EProMode_v4_tabPane_context_contextType } from '../../../../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/EProMode_v4_tabPane';

const { TextArea } = Input;

export const Langchain_adjust = (props: {
  t: IGetT_frontend_output;
  isAdjustCall: boolean;
  adjustSelected: IPromode_v4_tabPane_context_for_type_langchain_formItems<IAdjust_for_type_langchain>;
  adjust: IAdjust_for_type_langchain;
  setAdjust: (newItem: IAdjust_for_type_langchain) => void;
  contextSelected_type: EProMode_v4_tabPane_context_contextType;
  swtichContextSelected_by_type: (newItem: EProMode_v4_tabPane_context_contextType) => void;
}) => {
  const { t, isAdjustCall, adjustSelected, adjust, setAdjust, contextSelected_type, swtichContextSelected_by_type } =
    props;

  const [form] = Form.useForm();

  const [autoCompleteOptions_for_textArea, setAutoCompleteOptions_for_textArea] = useState<
    AutoCompleteProps['options']
  >([]);

  return (
    <div className="row subContainer">
      <div className="row flex items-center">
        <h1>{t.get('Content adjust')}</h1>

        <div className="row icons_button">
          {contextSelected_type === EProMode_v4_tabPane_context_contextType.EXPRESS && (
            <img
              id="reset-messages-history-button"
              src={expressionIcon}
              alt="reset messages history"
              className="button ml-2 mt-2 resetMessagesHistoryButton"
              style={{
                fontSize: 18,
                width: 36,
                border: '1px solid #d9d9d9',
                borderRadius: '.25rem',
                padding: 4,
                cursor: 'pointer',

                flex: '0 1 auto',
              }}
              onClick={() => {
                console.log('click expression icon');
                swtichContextSelected_by_type(EProMode_v4_tabPane_context_contextType.RESPONSE);
              }}
            />
          )}
          {contextSelected_type === EProMode_v4_tabPane_context_contextType.RESPONSE && (
            <img
              id="reset-messages-history-button"
              src={responseIcon}
              alt="reset messages history"
              className="button ml-2 mt-2 resetMessagesHistoryButton"
              style={{
                fontSize: 18,
                width: 36,
                border: '1px solid #d9d9d9',
                borderRadius: '.25rem',
                padding: 4,
                cursor: 'pointer',

                flex: '0 1 auto',
              }}
              onClick={() => {
                console.log('click response icon');
                swtichContextSelected_by_type(EProMode_v4_tabPane_context_contextType.EXPRESS);
              }}
            />
          )}
        </div>
      </div>
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
              minNum = 1,
              maxNum = 4,
              isDisabledWhenAdjustCall,
              autoCompleteOptions,
            } = item;

            if (componentType === 'InputNumber') {
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
                  >
                    <InputNumber
                      min={minNum}
                      max={maxNum}
                      onChange={(value) => {
                        const newItem = {
                          ...adjust,
                          [name]: String(value),
                        };
                        setAdjust(newItem);
                      }}
                    />
                  </Form.Item>
                </Tooltip>
              );
            }

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
                    <Input
                      onChange={(event) => {
                        const newItem = {
                          ...adjust,
                          [name]: event.target.value,
                        };
                        setAdjust(newItem);
                      }}
                    />
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
            if (componentType === 'DatePicker') {
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
                  >
                    <DatePicker
                      onChange={(date, dates) => {
                        const newItem = {
                          ...adjust,
                          [name]: dates.toLocaleString(),
                        };
                        setAdjust(newItem);
                      }}
                    />
                  </Form.Item>
                </Tooltip>
              );
            }

            return <>None for componentType: {componentType}</>;
          })}

          {/* <Form.Item name="title" label={t.get('Title')}>
            <Input
              onChange={(event) => {
                setAdjust({
                  ...adjust,
                  title: event.target.value,
                });
              }}
            />
          </Form.Item>

          <Form.Item name="content" label={t.get('Content')}>
            <TextArea
              autoSize
              onChange={(event) => {
                setAdjust({
                  ...adjust,
                  content: event.target.value,
                });
              }}
            />
          </Form.Item>

          <Form.Item name="feedback" label={t.get('Input')}>
            <TextArea
              autoSize={{ minRows: 4 }}
              onChange={(event) => {
                setAdjust({
                  ...adjust,
                  feedback: event.target.value,
                });
              }}
            />
          </Form.Item> */}
        </Form>
      </div>
    </div>
  );
};
