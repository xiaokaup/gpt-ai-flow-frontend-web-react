import React from 'react';
import { DatePicker, Form, Input, InputNumber, Tooltip } from 'antd';

import { IGetT_frontend_output } from '../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import {
  IPromode_v4_tabPane_context_for_type_langchain_formItems,
  IFormItem,
} from '../../../../../../gpt-ai-flow-common/interface-app/solution_ProMode_v4/type/03-custome-langchain/IProMode_v4_context_type_langchain';
import { IAdjust_for_type_morePostsChain } from 'gpt-ai-flow-common/interface-app/solution_ProMode_v4/type/03-custome-langchain/IProMode_v4_type_langchain_for_morePostsChain';

const { TextArea } = Input;

export const Langchain_adjust = (props: {
  t: IGetT_frontend_output;
  adjustSelected: IPromode_v4_tabPane_context_for_type_langchain_formItems<IAdjust_for_type_morePostsChain>;
  adjust: IAdjust_for_type_morePostsChain;
  setAdjust: (newItem: IAdjust_for_type_morePostsChain) => void;
}) => {
  const { t, adjustSelected, adjust, setAdjust } = props;

  const [form] = Form.useForm();

  return (
    <div className="row subContainer">
      <h1 style={{ marginTop: 0 }}>{t.get('Content adjust')}</h1>
      <div className="row">
        <Form form={form} initialValues={adjust}>
          {adjustSelected.formItems.map((item: IFormItem<IAdjust_for_type_morePostsChain>) => {
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
            } = item;

            if (componentType === 'InputNumber') {
              return (
                <Tooltip title={tooltip && tooltip_isNeedTranslate ? t.get(tooltip) : tooltip}>
                  <Form.Item name={name} label={t.get(label)}>
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
                    label={t.get(label)}
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
                    label={t.get(label)}
                    rules={
                      isRequired
                        ? [{ required: true, message: t.getHTML('Please input your {text}', { text: t.get(label) }) }]
                        : []
                    }
                  >
                    <TextArea
                      autoSize={{ minRows: isAutoSize_minRows ?? 2 }}
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
                  <Form.Item name={name} label={t.get(label)}>
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
