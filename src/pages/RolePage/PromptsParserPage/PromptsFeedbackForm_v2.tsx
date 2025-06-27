import { Dispatch, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { Input, Button, Form, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IPrompt, IPrompt_default } from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt';
import { ILLMOptions } from '../../../gpt-ai-flow-common/interface-app/3_unit/ILLMModels';
import { IProMode_module_request_v4_subVersion_2_for_web_v2 } from '../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-call/IProMode_module_request_v4_subVersion_2';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { EAIFlowRole } from '../../../gpt-ai-flow-common/enum-app/EAIFlow';
import { IToolOptions_default } from '../../../gpt-ai-flow-common/interface-app/3_unit/ITools';
import { EProMode_v4_module_contextType } from '../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/EProMode_v4_module';
import TCryptoJSFile from '../../../gpt-ai-flow-common/tools/TCrypto-web';
import TBackendLangchainFile from '../../../gpt-ai-flow-common/ProMode_v4/tools-ProMode_v4/TBackendLangchain';

interface IPromptsFactoryForm {
  t: IGetT_frontend_output;
  userAccessToken: string;
  llmOptions: ILLMOptions;
  feedbackForm_data: IPrompt;
  setFeedbackForm_data: Dispatch<React.SetStateAction<IPrompt & { feedback?: string }>>;
}
export const PromptsFeedbackForm_v2 = (props: IPromptsFactoryForm) => {
  const { t, userAccessToken, llmOptions, feedbackForm_data, setFeedbackForm_data } = props;

  const [form] = useForm();

  const [requestController, setRequestController] = useState<AbortController>(new AbortController());
  const [isCalling, setIsCalling] = useState<boolean>(false);

  const [feedback, setFeedback] = useState<string>('');
  const [previousPrompt, setPreviousPrompt] = useState<IPrompt>(IPrompt_default);

  const onFinish = (values: IPrompt) => {
    console.log('Success:', values);

    console.log("click 'rewrite' button");

    if (!feedbackForm_data.content || feedbackForm_data.content.trim() === '') {
      message.error(t.get('Please enter your {text}', { text: t.get('Prompt') }));
      return;
    }

    try {
      setIsCalling(true);

      const newRequestController = new AbortController();
      setRequestController(newRequestController);
      const { signal } = newRequestController;

      const urlSlug = '/v1.0/post/langchain/chains/rewritePrompt/';
      const bodyData: IProMode_module_request_v4_subVersion_2_for_web_v2 = {
        contextType: EProMode_v4_module_contextType.PROMPTS_FACTORY_V2,
        history: [],
        input: JSON.stringify({
          prompt: {
            role: EAIFlowRole.USER,
            content: feedbackForm_data.content,
          } as IPrompt,
          feedback: feedback || '',
          previousPrompt: previousPrompt.content || '',
        }),
        llmOptions,
        toolOptions: IToolOptions_default,
      };
      // console.log('urlSlug', urlSlug);
      // console.log('bodyData', bodyData);

      TBackendLangchainFile.postProMode_moduleChain_v4_subVersion_2(
        urlSlug,
        bodyData,
        () => {
          console.log('afterReceiveResponseFunc');
        },
        () => {
          console.log('beforeSendRequestFunc');
        },
        (writingResultText: string) => {
          console.log('updateResultFromRequestFunc', writingResultText);
        },
        (resultText: string) => {
          console.log('AfterRequestFunc', resultText);

          setPreviousPrompt({
            ...feedbackForm_data,
            role: EAIFlowRole.ASSISTANT,
            content: feedbackForm_data.content,
          });

          const newData = {
            ...props.feedbackForm_data,
            content: resultText,
          };
          setFeedbackForm_data(newData);
          form.setFieldValue('content', resultText);

          setIsCalling(false);
        },
        userAccessToken,
        t.currentLocale,
        CONSTANTS_GPT_AI_FLOW_COMMON,
        TCryptoJSFile.encrypt_v2(CONSTANTS_GPT_AI_FLOW_COMMON.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string),
        signal,
      ).catch((error) => {
        console.error('Error during request:', error);
        setIsCalling(false);
        message.error(error instanceof Error ? error.message : String(error));
      });
    } catch (error) {
      console.error('Error during request:', error);
      setIsCalling(false);
      message.error(error instanceof Error ? error.message : String(error));
    }
  };

  const onTableFinishFailedInAiFlowModal = (errorInfo: any) => {
    console.log(t.get('Add failed'), ':', errorInfo);
  };

  return (
    <div className="PromptsFactoryForm_container">
      <div className="previous_prompt_block pb-2">
        {previousPrompt.content && <TextArea autoSize disabled value={previousPrompt.content} />}
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
        onFinish={onFinish}
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
            value={feedbackForm_data.content}
            onChange={(e) => {
              const newData = {
                ...props.feedbackForm_data,
                content: e.target.value,
              };
              setFeedbackForm_data(newData);
              form.setFieldValue('content', e.target.value); // Update form value
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
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value);
              form.setFieldValue('feedback', e.target.value); // Update form value
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
          <div>
            <Button type="primary" htmlType="submit" disabled={isCalling}>
              {t.get('Rewrite')}
            </Button>

            {isCalling && (
              <Button
                className="ml-[1rem]"
                onClick={() => {
                  requestController.abort();
                  setIsCalling(false);
                }}
              >
                {t.get('Stop')}
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
