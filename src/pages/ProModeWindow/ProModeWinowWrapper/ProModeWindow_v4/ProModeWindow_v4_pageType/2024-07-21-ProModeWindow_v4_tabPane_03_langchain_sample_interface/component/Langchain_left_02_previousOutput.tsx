import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import copyToClipboard from 'copy-to-clipboard';

import { Button, Form, Input, message } from 'antd';
import { EditOutlined, EyeOutlined, EyeInvisibleOutlined, CopyOutlined } from '@ant-design/icons';

import { IGetT_frontend_output } from '../../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IMessage_for_simpleInterface } from '../../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-call/ILangchain_type_request_v4_simpleInterface';

const { TextArea } = Input;

interface ILangchain_left_02_previousOutput_input {
  t: IGetT_frontend_output;
  previousOutput: IMessage_for_simpleInterface;
  setPreviousOutput: (newItem: IMessage_for_simpleInterface) => void;
}
export const Langchain_left_02_previousOutput = (props: ILangchain_left_02_previousOutput_input) => {
  const { t, previousOutput: previousOutputFromProps, setPreviousOutput } = props;

  const previousOutput = useMemo(() => previousOutputFromProps, [previousOutputFromProps]);

  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    form.setFieldsValue(previousOutput);
  }, [previousOutput, form]);

  const onFinish = (values: IMessage_for_simpleInterface) => {
    setPreviousOutput({
      ...previousOutput,
      ...values,
    });
    setIsEditing(false);
  };

  return (
    <div className="row subContainer">
      <div className="block_title" style={{ display: 'flex', paddingLeft: '1rem', paddingRight: '1rem' }}>
        <h1>{t.get('Previous post')}</h1>
        <EditOutlined style={{ fontSize: 18, marginLeft: '.4rem' }} onClick={() => setIsEditing(!isEditing)} />

        {isShow && <EyeOutlined style={{ fontSize: 18, marginLeft: '.4rem' }} onClick={() => setIsShow(false)} />}
        {!isShow && (
          <EyeInvisibleOutlined style={{ fontSize: 18, marginLeft: '.4rem' }} onClick={() => setIsShow(true)} />
        )}

        <CopyOutlined
          style={{ fontSize: 16, marginLeft: '0.4rem' }}
          onClick={() => {
            copyToClipboard(previousOutput.content);

            message.success({
              content: <span>{t.get('Copy successful')} !</span>,
              key: 'copy',
              duration: 3,
            });
          }}
        />
      </div>

      {isShow && isEditing && (
        <div className="row editing" style={{ padding: '1rem' }}>
          <Form form={form} initialValues={previousOutput} onFinish={onFinish}>
            {/* <Form.Item name="title" label="Title">
              <Input
                onChange={(event) => {
                  setPreviousOutput({
                    ...previousOutput,
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

      {isShow && !isEditing && previousOutput.content && (
        <div
          className="row view"
          style={{
            userSelect: 'text',
            border: '1px solid #d9d9d9',
            borderRadius: '.25rem',
            padding: '.4rem',
          }}
        >
          <ReactMarkdown>{previousOutput.content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};
