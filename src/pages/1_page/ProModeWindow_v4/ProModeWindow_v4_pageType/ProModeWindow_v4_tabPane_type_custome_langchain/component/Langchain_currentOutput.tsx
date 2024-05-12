import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import CopyToClipboard from 'react-copy-to-clipboard';

import { Button, Form, Input, message } from 'antd';
import { EditOutlined, CopyOutlined } from '@ant-design/icons';

import { IGetT_frontend_output } from '../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IMessage } from '../../../../../../gpt-ai-flow-common/interface-app/3_unit/IMessage';

const { TextArea } = Input;

export const Langchain_currentOutput = (props: {
  t: IGetT_frontend_output;
  currentOutput: IMessage;
  setCurrentOutput: (newItem: IMessage) => void;
}) => {
  const { t, currentOutput, setCurrentOutput } = props;

  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    form.setFieldsValue(currentOutput);
  }, [currentOutput, form]);

  const onFinish = (values: IMessage) => {
    setCurrentOutput({
      ...currentOutput,
      ...values,
    });
    setIsEditing(false);
  };

  return (
    <div className="row subContainer">
      <div className="block_title" style={{ display: 'flex', paddingLeft: '1rem', paddingRight: '1rem' }}>
        <h1>{t.get('Post')}</h1>
        <EditOutlined style={{ fontSize: 18, marginLeft: '.4rem' }} onClick={() => setIsEditing(!isEditing)} />

        <CopyToClipboard
          text={currentOutput.content}
          onCopy={() => {
            message.success({
              content: <span>{t.get('Copy successful')} !</span>,
              key: 'copy',
              duration: 3,
            });
          }}
        >
          <CopyOutlined style={{ fontSize: 16, marginLeft: '0.4rem' }} />
        </CopyToClipboard>
      </div>
      {isEditing && (
        <div className="row editing" style={{ padding: '1rem' }}>
          <Form form={form} initialValues={currentOutput} onFinish={onFinish}>
            {/* <Form.Item name="title" label="Title">
              <Input
                onChange={(event) => {
                  setCurrentOutput({
                    ...currentOutput,
                    title: event.target.value,
                  });
                }}
              />
            </Form.Item> */}

            <Form.Item name="content">
              <TextArea autoSize />
            </Form.Item>

            <Form.Item>
              <Button className="confirmChangeContent" type="primary" htmlType="submit">
                {t.get('Submit')}
              </Button>
              <Button
                type="default"
                onClick={() => {
                  setIsEditing(false);
                }}
                style={{ marginLeft: '1rem' }}
              >
                {t.get('Return')}
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
      {!isEditing && currentOutput.content && (
        <div
          className="row view"
          style={{
            userSelect: 'text',
            border: '1px solid #d9d9d9',
            borderRadius: '.25rem',
            padding: '.4rem',
            paddingLeft: '1rem',
            paddingRight: '1rem',
          }}
        >
          <ReactMarkdown>{currentOutput.content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};
