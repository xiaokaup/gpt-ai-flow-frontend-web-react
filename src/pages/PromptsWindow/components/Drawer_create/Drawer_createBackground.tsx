import { useState } from 'react';

import TextArea from 'antd/es/input/TextArea';
import { Button, Form, message, Drawer } from 'antd';
import { FormInstance, useForm } from 'antd/es/form/Form';

import { LoadingOutlined } from '@ant-design/icons';

import CONSTANTS_GPT_AI_FLOW_COMMON, {
  IConstantGptAiFlowHandler,
} from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { ELocale } from '../../../../gpt-ai-flow-common/enum-app/ELocale';
import TCryptoJSFile from '../../../../gpt-ai-flow-common/tools/TCrypto-web';
import { ILLMOptions } from '../../../../gpt-ai-flow-common/interface-backend/ILLMOptions';
import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IPrompt_v3_type_background } from '../../../../gpt-ai-flow-common/interface-app/2_component/IPrompt_v3/IPrompt_v3_type_background';
import { postProMode_v4_langchain_tabPane_chains_v2 } from '../../../../gpt-ai-flow-common/ProMode_v4/tools-ProMode_v4/TBackendLangchain';
import { EProMode_v4_module_contextType } from '../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/EProMode_v4_module';
import { getILangchain_for_type_langchain_request_v3_subV2_default } from '../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-call/ILangchain_type_request_v3';

interface IDrawer_createBackground_input {
  t: IGetT_frontend_output;
  createPrompt_v3_form: FormInstance<IPrompt_v3_type_background>;
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  llmOptions: ILLMOptions;
  webCase: {
    t: IGetT_frontend_output;
    locale: ELocale;
    accessToken: string;
    env: IConstantGptAiFlowHandler;
  };
}
export const Drawer_createBackground = (props: IDrawer_createBackground_input) => {
  const { t, createPrompt_v3_form, isShow, setIsShow, llmOptions, webCase } = props;

  const [form] = useForm();

  const [isCalling, setIsCalling] = useState(false);

  const closeDrawer = () => {
    setIsShow(false);
    // form.setFieldsValue(null);
  };

  const onFinish = async (values: IPrompt_v3_type_background['metadata']) => {
    console.log('Success:', values);

    const { subject, when, where, what, context, additionalInfo } = values;
    if (!subject && !when && !where && !what && !context && !additionalInfo) {
      message.error(t.get('Please fill in at least one input field'));
      return;
    }

    setIsCalling(true);

    const urlSlug = '/v1.0/post/langchain/chains/backgroundChain/';
    const response = await postProMode_v4_langchain_tabPane_chains_v2<{
      backgroundData: IPrompt_v3_type_background['metadata'];
    }>(
      urlSlug,
      {
        ...getILangchain_for_type_langchain_request_v3_subV2_default<{
          backgroundData: IPrompt_v3_type_background['metadata'];
        }>({
          backgroundData: values,
        }),
        llmOptions,
        contextType: EProMode_v4_module_contextType.GENERAL,
      },
      () => console.log('beforeSendRequestAsStreamFunc'),
      (wrtingResultText: string) => console.log('updateResultFromRequestAsStreamFunc', wrtingResultText),
      (resultText: string) => console.log('AfterRequestAsStreamFunc', resultText),
      webCase.accessToken,
      webCase.t.currentLocale,
      webCase.env,
      TCryptoJSFile.encrypt_v2(CONSTANTS_GPT_AI_FLOW_COMMON.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string),
    );

    const newValue = response.results;

    const createPrompt_v3_drawer_values: IPrompt_v3_type_background = createPrompt_v3_form.getFieldsValue();
    const newPrompts_v3 = {
      ...createPrompt_v3_drawer_values,
      value: newValue, // Update IPrompt_v3.value
      metadata: { ...createPrompt_v3_drawer_values.metadata, ...values },
    };
    createPrompt_v3_form.setFieldsValue(newPrompts_v3);

    setIsCalling(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log(t.get('Add failed'), ':', errorInfo);
  };

  return (
    <div className="drawer_create_prompts_v3">
      <Drawer
        title={t.get('Create') + t.get('background')}
        open={isShow}
        onClose={() => {
          closeDrawer();
        }}
        mask={false}
      >
        <Form
          form={form}
          layout="vertical"
          name="basic"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          size="small"
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            className=""
            label={t.get('Subject')}
            name="subject"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <TextArea autoSize />
          </Form.Item>
          <Form.Item className="" label={t.get('Date')} name="when" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
            <TextArea autoSize />
          </Form.Item>
          <Form.Item
            className=""
            label={t.get('Address')}
            name="where"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <TextArea autoSize />
          </Form.Item>
          <Form.Item className="" label={t.get('Event')} name="what" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
            <TextArea autoSize />
          </Form.Item>
          <Form.Item
            className=""
            label={t.get('Background')}
            name="context"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <TextArea autoSize />
          </Form.Item>
          <Form.Item
            className=""
            label={t.get('Additional information')}
            name="additionalInfo"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <TextArea autoSize />
          </Form.Item>

          <Form.Item
          // wrapperCol={{ offset: 8, span: 16 }}
          >
            <Button type="primary" htmlType="submit" disabled={isCalling}>
              {t.get('Create')} {isCalling && <LoadingOutlined />}
            </Button>
            <Button
              style={{ marginLeft: 10 }}
              onClick={() => {
                closeDrawer();
              }}
            >
              {t.get('Cancel')}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};
