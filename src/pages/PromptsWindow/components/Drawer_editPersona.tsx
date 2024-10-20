import { Button, Form, message, Drawer } from 'antd';
import { FormInstance, useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';

import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import {
  IPrompt_v3_type_persona,
  IPrompt_v3_IPersonaModel_default,
} from '../../../gpt-ai-flow-common/interface-app/2_component/IPrompt_v3/IPrompt_v3_type_persona';

interface IModal_editPersona_input {
  t: IGetT_frontend_output;
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
export const Drawer_editPersona = (props: IModal_editPersona_input) => {
  const { t, isShow, setIsShow, thisPrompt_v3, editPrompt_v3_from, webCase } = props;

  const [form] = useForm();

  const closeDrawer = () => {
    setIsShow(false);
    form.setFieldsValue(null);
  };

  const onFinishInDrawer = (values: IPrompt_v3_type_persona['metadata']) => {
    console.log('Success:', values);

    const { occupation, coreValues, uniqueSkill, personalityTrait, appearance, additionalInfo } = values;
    if (!occupation && !coreValues && !uniqueSkill && !personalityTrait && !appearance && !additionalInfo) {
      message.error(t.get('Please fill in at least one input field'));
      return;
    }

    // Calculate newValue
    let newValue = '"""';
    if (occupation) newValue += `${t.get('Occupation')}: ${occupation}\n`;
    if (coreValues) newValue += `${t.get('Core values')}: ${coreValues}\n`;
    if (uniqueSkill) newValue += `${t.get('Unique skills')}: ${uniqueSkill}\n`;
    if (personalityTrait) newValue += `${t.get('Personality traits')}: ${personalityTrait}\n`;
    if (appearance) newValue += `${t.get('Appearance')}: ${appearance}\n`;
    if (additionalInfo) newValue += `${t.get('Additional information')}: ${additionalInfo}\n`;
    newValue += '"""';

    const createPrompt_v3_modal_values: IPrompt_v3_type_persona = editPrompt_v3_from.getFieldsValue();
    const newPrompts_v3 = {
      ...createPrompt_v3_modal_values,
      value: newValue, // Update IPrompt_v3.value
      metadata: { ...createPrompt_v3_modal_values.metadata, ...values },
    };
    editPrompt_v3_from.setFieldsValue(newPrompts_v3);

    setIsShow(false);
    // const { category } = values;

    // if (!category || category?.length === 0) {
    //   message.error(t.get('Please enter your {text}', { text: t.get('Category') }));
    //   return;
    // }
    // const prompts_v3_user_without_thisPrompt_v3 = prompts_v3_user.filter(
    //   (prompt) => prompt.name !== thisPrompt_v3?.name,
    // );

    // const newItem: IPrompt_v3 = values;

    // const newPrompts_v3_user = [newItem, ...prompts_v3_user_without_thisPrompt_v3];

    // setPrompts_v3_user(newPrompts_v3_user);
    // // window.electron.ipcRenderer.sendMessage('ipc-refresh-all-prompts_v3-in-mainWindow', newPrompts_v3_user);

    // form.resetFields();
    // closeModal();

    // message.success(t.get('The prompt has been updated'));
  };

  const onTableFinishFailedInAiFlowModal = (errorInfo: any) => {
    console.log(t.get('Add failed'), ':', errorInfo);
  };

  // useEffect(() => {
  //   form.setFieldsValue(thisPrompt_v3);
  // }, [form, thisPrompt_v3]);

  return (
    <div className="modal_create_prompts_v3">
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
          onFinish={onFinishInDrawer}
          onFinishFailed={onTableFinishFailedInAiFlowModal}
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
            <Button type="primary" htmlType="submit">
              {t.get('Save')}
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
