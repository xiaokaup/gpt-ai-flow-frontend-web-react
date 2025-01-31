import React from 'react';
import { DatePicker, Form, Input, InputNumber, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { IGetT_frontend_output } from '../../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import {
  IProMode_v4_tabPane_context_for_type_langchain_formItems,
  IFormItem,
} from '../../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/03-langchain';
import { IAdjust_morePostsChain } from '../../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/03-langchain/02-once-multiple-results/2024-07-03-rewritingTools/2024-05-13-IProMode_v4_morePostsChain';
import { useLastFocusedElement } from '../../../../../../../gpt-ai-flow-common/contexts/LastFocusedElementContext';

const { TextArea } = Input;

export const Langchain_adjust = (props: {
  t: IGetT_frontend_output;
  isAdjustCall: boolean;
  adjustSelected: IProMode_v4_tabPane_context_for_type_langchain_formItems<IAdjust_morePostsChain>;
  adjust: IAdjust_morePostsChain;
  setAdjust: (newItem: IAdjust_morePostsChain) => void;
}) => {
  const { t, isAdjustCall, adjustSelected, adjust, setAdjust } = props;

  const { setLastFocusedElement } = useLastFocusedElement();

  const [form] = Form.useForm();

  return (
    <div className="row subContainer">
      <h1 style={{ marginTop: 0 }}>{t.get('Content adjust')}</h1>
      <div className="row">
        <Form form={form} initialValues={adjust}>
          {adjustSelected.formItems.map((item: IFormItem<IAdjust_morePostsChain>) => {
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
                      onFocus={() => {
                        setLastFocusedElement({
                          form,
                          name,
                          element: 'InputNumber',
                          updateItems: setAdjust,
                        });
                      }}
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
                    label={t.get(label)}
                    rules={
                      isRequired
                        ? [{ required: true, message: t.getHTML('Please input your {text}', { text: t.get(label) }) }]
                        : []
                    }
                  >
                    <Input
                      onFocus={() => {
                        setLastFocusedElement({
                          form,
                          name,
                          element: 'Input',
                          updateItems: setAdjust,
                        });
                      }}
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
                    label={t.get(label)}
                    rules={
                      isRequired
                        ? [{ required: true, message: t.getHTML('Please input your {text}', { text: t.get(label) }) }]
                        : []
                    }
                  >
                    <TextArea
                      disabled={isDisabledWhenAdjustCall && isAdjustCall}
                      autoSize={{ minRows: isAutoSize_minRows ?? 1 }}
                      onFocus={() => {
                        setLastFocusedElement({
                          form,
                          name,
                          element: 'TextArea',
                          updateItems: setAdjust,
                        });
                      }}
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
                      onFocus={() => {
                        setLastFocusedElement({
                          form,
                          name,
                          element: 'DatePicker',
                          updateItems: setAdjust,
                        });
                      }}
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
              onFocus={() => {
                setLastFocusedElement({
                  form,
                  name,
                  element: 'Input',
                  updateItems: setAdjust,
                });
              }}
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
              onFocus={() => {
                setLastFocusedElement({
                  form,
                  name,
                  element: 'TextArea',
                  updateItems: setAdjust,
                });
              }}
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
              onFocus={() => {
                setLastFocusedElement({
                  form,
                  name,
                  element: 'TextArea',
                  updateItems: setAdjust,
                });
              }}
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
