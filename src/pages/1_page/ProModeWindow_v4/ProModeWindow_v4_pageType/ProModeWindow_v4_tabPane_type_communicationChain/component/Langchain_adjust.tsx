import React from 'react';
import { DatePicker, Form, Input, Tooltip } from 'antd';

import { IGetT_frontend_output } from '../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IAdjust_for_IMessage } from '../../../../../../gpt-ai-flow-common/interface-app/3_unit/IMessage';
import {
  IFormItem,
  IPromode_v4_tabPane_context_for_type_langchain_formItems,
} from '../../../../../../gpt-ai-flow-common/interface-app/solution_ProMode_v4/type/langchain/IProMode_v4_context_type_langchain';

const { TextArea } = Input;

export const Langchain_adjust = (props: {
  t: IGetT_frontend_output;
  adjustSelected: IPromode_v4_tabPane_context_for_type_langchain_formItems<IAdjust_for_IMessage>;
  adjust: IAdjust_for_IMessage;
  setAdjust: (newItem: IAdjust_for_IMessage) => void;
}) => {
  const { t, adjustSelected, adjust, setAdjust } = props;

  const [form] = Form.useForm();

  return (
    <div className="row subContainer">
      <h1 style={{ marginTop: 0 }}>{t.get('Content adjust')}</h1>
      <div className="row">
        <Form form={form} initialValues={adjust}>
          {adjustSelected.formItems.map((item: IFormItem<IAdjust_for_IMessage>) => {
            const { componentType, label, name, isAutoSize_minRows, tooltip } = item;
            if (componentType === 'Input') {
              return (
                <Tooltip title={tooltip}>
                  <Form.Item name={name} label={t.get(label)}>
                    <Input
                      onChange={(event) => {
                        setAdjust({
                          ...adjust,
                          [name]: event.target.value,
                        });
                      }}
                    />
                  </Form.Item>
                </Tooltip>
              );
            }
            if (componentType === 'TextArea') {
              return (
                <Tooltip title={tooltip}>
                  <Form.Item name={name} label={t.get(label)}>
                    <TextArea
                      autoSize={{ minRows: isAutoSize_minRows ?? 2 }}
                      onChange={(event) => {
                        setAdjust({
                          ...adjust,
                          [name]: event.target.value,
                        });
                      }}
                    />
                  </Form.Item>
                </Tooltip>
              );
            }
            if (componentType === 'DatePicker') {
              return (
                <Tooltip title={tooltip}>
                  <Form.Item name={name} label={t.get(label)}>
                    <DatePicker
                      onChange={(date, dates) => {
                        setAdjust({
                          ...adjust,
                          [name]: dates.toLocaleString(),
                        });
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
