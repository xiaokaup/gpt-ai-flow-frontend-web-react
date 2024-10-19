import { Dispatch, SetStateAction } from 'react';
import { Modal, Input, Button, Form, message, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';

import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IPrompt_v3 } from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3';
import { FieldNamesType } from 'antd/es/cascader';
import { IPrompt_v3_IPersonaModel } from '../../../gpt-ai-flow-common/interface-app/2_component/IPrompt_v3/IPrompt_v3_IPersonaModel';

interface IModal_createPersona_input {
  t: IGetT_frontend_output;
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  prompts_v3_user: IPrompt_v3[];
  setPrompts_v3_user: Dispatch<SetStateAction<IPrompt_v3[]>>;
  createPrompt_v3_form: FormInstance<IPrompt_v3>;
}
export const Modal_createPersona = (props: IModal_createPersona_input) => {
  const { t, isShow, setIsShow, prompts_v3_user, setPrompts_v3_user, createPrompt_v3_form } = props;

  const [form] = useForm();

  const closeModal = () => {
    setIsShow(false);
    form.setFieldsValue(null);
  };

  const onFinishInModal = (values: IPrompt_v3_IPersonaModel<FieldNamesType>['metadata']) => {
    console.log('Success:', values);

    const { occupation, coreValues, uniqueSkill, personalityTrait, appearance, additionalInfo } = values;
    if (!occupation && !coreValues && !uniqueSkill && !personalityTrait && !appearance && !additionalInfo) {
      message.error(t.get('Please fill in at least one input field'));
      return;
    }

    // Calculate newValue
    const newValue = 'hahah';

    const createPrompt_v3_modal_values: IPrompt_v3 = createPrompt_v3_form.getFieldsValue();
    createPrompt_v3_form.setFieldsValue({
      ...createPrompt_v3_modal_values,
      value: newValue, // Update IPrompt_v3.value
      metadata: { ...createPrompt_v3_modal_values.metadata, ...values },
    });

    setIsShow(false);

    // const { name, category } = values;

    // if (!category || category?.length === 0) {
    //   message.error(t.get('Please enter your {text}', { text: t.get('Category') }));
    //   return;
    // }
    // if (prompts_v3_user.find((prompt) => prompt.name === name)) {
    //   message.error(t.get('The prompt name already exists'));
    //   return;
    // }

    // const newItem: IPrompt_v3 = values;

    // const newPrompts_v3_user = [newItem, ...prompts_v3_user];

    // setPrompts_v3_user(newPrompts_v3_user);
    // // window.electron.ipcRenderer.sendMessage('ipc-refresh-all-prompts_v3-in-mainWindow', newPrompts_v3_user);

    // form.resetFields();
    // closeModal();

    // message.success(t.get('The prompt has been added to My prompts'));
  };

  const onTableFinishFailedInAiFlowModal = (errorInfo: any) => {
    console.log(t.get('Add failed'), ':', errorInfo);
  };

  // useEffect(() => {
  //   form.setFieldsValue(modalInitialValues);
  // }, [form, modalInitialValues]);

  return (
    <div className="modal_create_prompts_v3">
      <Modal
        open={isShow}
        title={t.get('Create') + t.get('persona')}
        onCancel={() => {
          closeModal();
        }}
        footer={null}
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
          onFinish={onFinishInModal}
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
                closeModal();
              }}
            >
              {t.get('Cancel')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
