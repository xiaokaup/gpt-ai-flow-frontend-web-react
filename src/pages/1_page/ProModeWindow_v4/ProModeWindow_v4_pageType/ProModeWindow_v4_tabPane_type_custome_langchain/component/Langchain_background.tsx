import React, { useState } from 'react';
import { DatePicker, Form, Input, Tooltip } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, RedoOutlined } from '@ant-design/icons';

import { IGetT_frontend_output } from '../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import {
  IPromode_v4_tabPane_context_for_type_langchain_formItems,
  IFormItem,
  IBackground_for_type_langchain,
} from '../../../../../../gpt-ai-flow-common/interface-app/solution_ProMode_v4/type/03-custome-langchain/IProMode_v4_context_type_langchain';

// const { RangePicker } = DatePicker;
const { TextArea } = Input;

export const Langchain_background = (props: {
  t: IGetT_frontend_output;
  backgroundSelected: IPromode_v4_tabPane_context_for_type_langchain_formItems<IBackground_for_type_langchain>;
  background: IBackground_for_type_langchain;
  setBackground: (newItem: IBackground_for_type_langchain) => void;
  onResetAll: () => void;
}) => {
  const { t, backgroundSelected, background, setBackground, onResetAll } = props;

  const [form] = Form.useForm();

  const [isShow, setIsShow] = useState(true);

  return (
    <div className="row subContainer">
      <div className="block_title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="left" style={{ display: 'flex' }}>
          {isShow && (
            <>
              <h1>{t.get('Background')}</h1>
              <Tooltip title={t.get('Hide {text}', { text: t.get('Background') })}>
                <EyeOutlined style={{ fontSize: 18, marginLeft: '.4rem' }} onClick={() => setIsShow(false)} />
              </Tooltip>
            </>
          )}

          {!isShow && (
            <>
              <h1 style={{ margin: 0 }}>{t.get('Background')}</h1>
              <Tooltip title={t.get('Show {text}', { text: t.get('Background') })}>
                <EyeInvisibleOutlined style={{ fontSize: 18, marginLeft: '.4rem' }} onClick={() => setIsShow(true)} />
              </Tooltip>
            </>
          )}
        </div>
        <div className="right">
          <Tooltip title={t.get('Reset all')}>
            <RedoOutlined
              style={{
                fontSize: 18,
                border: '1px solid #d9d9d9',
                borderRadius: '.25rem',
                padding: 4,
                cursor: 'pointer',

                marginLeft: 6,

                flex: '0 1 auto',
              }}
              onClick={() => {
                onResetAll();
                form.resetFields();
              }}
            />
          </Tooltip>
        </div>
      </div>
      {isShow && (
        <div className="row">
          <Form form={form} initialValues={background}>
            {backgroundSelected.formItems.map((item: IFormItem<IBackground_for_type_langchain>) => {
              const { componentType, label, name, isAutoSize_minRows, tooltip } = item;
              if (componentType === 'Input') {
                return (
                  <Tooltip title={tooltip}>
                    <Form.Item name={name} label={t.get(label)}>
                      <Input
                        onChange={(event) => {
                          setBackground({
                            ...background,
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
                          setBackground({
                            ...background,
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
                          setBackground({
                            ...background,
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
          </Form>
        </div>
      )}
    </div>
  );
};
