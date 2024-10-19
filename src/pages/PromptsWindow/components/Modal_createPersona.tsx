import { Button, Form, message, Drawer } from 'antd';

import { FormInstance, useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';

import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IPrompt_v3_IPersonaModel } from '../../../gpt-ai-flow-common/interface-app/2_component/IPrompt_v3/IPrompt_v3_IPersonaModel';

interface IDrawer_createPersona_input {
  t: IGetT_frontend_output;
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  createPrompt_v3_form: FormInstance<IPrompt_v3_IPersonaModel>;
}
export const Drawer_createPersona = (props: IDrawer_createPersona_input) => {
  const { t, isShow, setIsShow, createPrompt_v3_form } = props;

  const [form] = useForm();

  const closeDrawer = () => {
    setIsShow(false);
    // form.setFieldsValue(null);
  };

  const onFinishInDrawer = (values: IPrompt_v3_IPersonaModel['metadata']) => {
    console.log('Success:', values);

    const { occupation, coreValues, uniqueSkill, personalityTrait, appearance, additionalInfo } = values;
    if (!occupation && !coreValues && !uniqueSkill && !personalityTrait && !appearance && !additionalInfo) {
      message.error(t.get('Please fill in at least one input field'));
      return;
    }

    // Calculate newValue
    const newValue = `
      ${t.get('Occupation')}: ${occupation}
      ${t.get('Core values')}: ${coreValues}
      ${t.get('Unique skills')}: ${uniqueSkill}
      ${t.get('Personality traits')}: ${personalityTrait}
      ${t.get('Appearance')}: ${appearance}
      ${t.get('Additional information')}: ${additionalInfo}
    `;

    const createPrompt_v3_modal_values: IPrompt_v3_IPersonaModel = createPrompt_v3_form.getFieldsValue();
    const newPrompts_v3 = {
      ...createPrompt_v3_modal_values,
      value: newValue, // Update IPrompt_v3.value
      metadata: { ...createPrompt_v3_modal_values.metadata, ...values },
    };
    createPrompt_v3_form.setFieldsValue(newPrompts_v3);

    setIsShow(false);
  };

  const onTableFinishFailedInAiFlowModal = (errorInfo: any) => {
    console.log(t.get('Add failed'), ':', errorInfo);
  };

  // useEffect(() => {
  //   form.setFieldsValue(modalInitialValues);
  // }, [form, modalInitialValues]);

  return (
    <div className="modal_create_prompts_v3">
      <Drawer
        title={t.get('Create') + t.get('persona')}
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
              {t.get('Create')}
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
