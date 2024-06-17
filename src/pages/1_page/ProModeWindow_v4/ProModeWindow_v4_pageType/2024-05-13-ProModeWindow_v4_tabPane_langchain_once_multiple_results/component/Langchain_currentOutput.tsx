import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import CopyToClipboard from 'react-copy-to-clipboard';

import { Button, Form, Input, Tooltip, message } from 'antd';
import { EditOutlined, CopyOutlined } from '@ant-design/icons';

import iconCleanRight from '../../../../../../../assets/icons-customize/icon-clean-right/icon-clean-right-24x24.png';

import { IGetT_frontend_output } from '../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IMessage } from '../../../../../../gpt-ai-flow-common/interface-app/3_unit/IMessage';

const { TextArea } = Input;

export const Langchain_currentOutput = (props: {
  t: IGetT_frontend_output;
  title: string;
  currentOutput: IMessage;
  setCurrentOutput: (newItem: IMessage) => void;
  onResetAll: () => void;
}) => {
  const { t, title, currentOutput, setCurrentOutput, onResetAll } = props;

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
      <div
        className="block_title"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        <div className="column_1" style={{ display: 'flex' }}>
          <h1>{title}</h1>
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

        <div className="column_2">
          <Tooltip title={t.get('Reset all')}>
            <img
              id="reset-messages-history-button"
              src={iconCleanRight}
              alt="reset messages history"
              className="button resetMessagesHistoryButton"
              style={{
                fontSize: 18,
                width: 30,
                border: '1px solid #d9d9d9',
                borderRadius: '.25rem',
                padding: 4,
                cursor: 'pointer',

                marginTop: 8,

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
