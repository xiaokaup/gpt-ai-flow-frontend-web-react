import { Dispatch, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { Input, Button, Select, Form, message } from 'antd';
import { FormInstance, useForm } from 'antd/es/form/Form';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import {
  EPrompt_v3_for_promptsFactory_type,
  IPrompt_v3_for_promptsFactory,
  IPrompt_v3_for_promptsFactory_default,
} from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3_for_promptsFactory';
import { IPrompt, IPrompt_default } from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt';

interface IPromptsFactoryForm {
  t: IGetT_frontend_output;
  feedbackForm_data: IPrompt & { feedback?: string };
  setFeedbackForm_data: Dispatch<React.SetStateAction<IPrompt & { feedback?: string }>>;

  // setShowForm: Dispatch<React.SetStateAction<boolean>>;
  // prompt: IPrompt_v3_for_promptsFactory;
}
export const PromptsFeedbackForm_v2 = (props: IPromptsFactoryForm) => {
  const { t, feedbackForm_data, setFeedbackForm_data } = props;

  const [form] = useForm();

  const [previousPrompt, setPreviousPrompt] = useState<IPrompt & { feedback?: string }>(IPrompt_default);

  const onFinishInModal = (values: IPrompt_v3_for_promptsFactory & { oldTitle: string }) => {
    console.log('Success:', values);
  };

  const onTableFinishFailedInAiFlowModal = (errorInfo: any) => {
    console.log(t.get('Add failed'), ':', errorInfo);
  };

  return (
    <div className="PromptsFactoryForm_container">
      <div className="previous_prompt_block pb-2">
        {previousPrompt.content && <TextArea disabled value={previousPrompt.content || 'ee'} />}
      </div>
      <Form
        form={form}
        layout="vertical"
        name="PromptsFactoryForm"
        initialValues={{ ...feedbackForm_data }}
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        autoComplete="off"
        onFinish={onFinishInModal}
        onFinishFailed={onTableFinishFailedInAiFlowModal}
      >
        <Form.Item
          className="hidden"
          label={t.get('Role')}
          name="role"
          rules={[
            {
              required: true,
              message: t.getHTML('Please enter your {text}', {
                text: t.get('Role'),
              }),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          // label={t.get('Content')}

          name="content"
          rules={[
            {
              required: true,
              message: t.getHTML('Please enter your {text}', {
                text: t.get('Prompt'),
              }),
            },
          ]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <TextArea
            autoSize={{ minRows: 12 }}
            onChange={(e) => {
              setFeedbackForm_data({
                ...props.feedbackForm_data,
                content: e.target.value,
              });
            }}
          />
          <div>
            <label
              htmlFor="input_textarea"
              className="text-gray-500"
            >{`${t.get('Please input your {text}', { text: t.get('Prompt') })} ☝️`}</label>
          </div>
        </Form.Item>

        <Form.Item
          // label={t.get('Feedback')}
          name="feedback"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <TextArea
            autoSize={{ minRows: 2 }}
            onChange={(e) => {
              setFeedbackForm_data({
                ...props.feedbackForm_data,
                feedback: e.target.value,
              });
            }}
          />
          <label
            htmlFor="input_textarea"
            className="text-gray-500"
          >{`${t.get('Please input your {text}', { text: t.get('Feedback') })}`}</label>
        </Form.Item>

        <Form.Item

        // wrapperCol={{ offset: 8, span: 16 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <Button type="primary" htmlType="submit">
                {t.get('Rewrite')}
              </Button>
            </div>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
