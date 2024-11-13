import { useState } from 'react';

import TextArea from 'antd/es/input/TextArea';
import { Button, Form, message, Drawer } from 'antd';
import { FormInstance, useForm } from 'antd/es/form/Form';

import { LoadingOutlined } from '@ant-design/icons';

import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import {
  IPrompt_v3_type_persona,
  IPrompt_v3_IPersonaModel_default,
} from '../../../../gpt-ai-flow-common/interface-app/2_component/IPrompt_v3/IPrompt_v3_type_persona';
import CONSTANTS_GPT_AI_FLOW_COMMON, {
  IConstantGptAiFlowHandler,
} from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { ELocale } from '../../../../gpt-ai-flow-common/enum-app/ELocale';
import { EProMode_v4_module_contextType } from '../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/EProMode_v4_module';
import { getILangchain_for_type_langchain_request_v3_subV2_default } from '../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-call/ILangchain_type_request_v3';
import { postProMode_v4_langchain_tabPane_chains_v2 } from '../../../../gpt-ai-flow-common/ProMode_v4/tools-ProMode_v4/TBackendLangchain';
import TCryptoJSFile from '../../../../gpt-ai-flow-common/tools/TCrypto-web';
import { ILLMOptions } from '../../../../gpt-ai-flow-common/interface-backend/ILLMOptions';

interface IDrawer_editPersona_input {
  t: IGetT_frontend_output;
  llmOptions: ILLMOptions;
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  thisPrompt_v3: IPrompt_v3_type_persona;
  editPrompt_v3_from: FormInstance<IPrompt_v3_type_persona>;
  webCase: {
    t: IGetT_frontend_output;
    locale: ELocale;
    accessToken: string;
    env: IConstantGptAiFlowHandler;
  };
}
export const Drawer_editPersona = (props: IDrawer_editPersona_input) => {
  const { t, llmOptions, isShow, setIsShow, thisPrompt_v3, editPrompt_v3_from, webCase } = props;

  const [form] = useForm();

  const [isCalling, setIsCalling] = useState(false);

  const closeDrawer = () => {
    setIsShow(false);
    // form.setFieldsValue(null);
  };

  const onFinish = async (values: IPrompt_v3_type_persona['metadata']) => {
    console.log('Success:', values);

    const { occupation, coreValues, uniqueSkill, personalityTrait, appearance, additionalInfo } = values;
    if (!occupation && !coreValues && !uniqueSkill && !personalityTrait && !appearance && !additionalInfo) {
      message.error(t.get('Please fill in at least one input field'));
      return;
    }

    setIsCalling(true);

    const urlSlug = '/v1.0/post/langchain/chains/personaChain/';
    const response = await postProMode_v4_langchain_tabPane_chains_v2<{
      personaData: IPrompt_v3_type_persona['metadata'];
    }>(
      urlSlug,
      {
        ...getILangchain_for_type_langchain_request_v3_subV2_default<{
          personaData: IPrompt_v3_type_persona['metadata'];
        }>({
          personaData: {
            occupation,
            coreValues,
            uniqueSkill,
            personalityTrait,
            appearance,
            additionalInfo,
          },
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

    const createPrompt_v3_drawer_values: IPrompt_v3_type_persona = editPrompt_v3_from.getFieldsValue();
    const newPrompts_v3 = {
      ...createPrompt_v3_drawer_values,
      value: newValue, // Update IPrompt_v3.value
      metadata: { ...createPrompt_v3_drawer_values.metadata, ...values },
    };
    editPrompt_v3_from.setFieldsValue(newPrompts_v3);

    setIsCalling(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log(t.get('Add failed'), ':', errorInfo);
  };

  return (
    <div className="drawer_create_prompts_v3">
      <Drawer
        open={isShow}
        title={t.get('Edit') + t.get('prompt')}
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
          initialValues={{
            ...IPrompt_v3_IPersonaModel_default.metadata,
            ...thisPrompt_v3.metadata,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label={t.get('Occupation')} name="occupation">
            <TextArea autoSize />
          </Form.Item>

          <Form.Item label={t.get('Core values')} name="coreValues" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
            <TextArea autoSize />
          </Form.Item>

          <Form.Item
            label={t.get('Unique skills')}
            name="uniqueSkill"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <TextArea autoSize />
          </Form.Item>

          <Form.Item
            label={t.get('Personality traits')}
            name="personalityTrait"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <TextArea autoSize />
          </Form.Item>

          <Form.Item label={t.get('Appearance')} name="appearance" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
            <TextArea autoSize />
          </Form.Item>

          <Form.Item
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
              {t.get('Save')} {isCalling && <LoadingOutlined />}
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
