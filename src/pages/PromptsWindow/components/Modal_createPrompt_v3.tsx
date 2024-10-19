import { Dispatch, SetStateAction } from 'react';
import { Modal, Input, Button, Form, message, Select } from 'antd';
import { FormInstance, useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';

import { EPrompts_v3_category } from '../../../gpt-ai-flow-common/enum-app/EPrompts_v3';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IPrompt_v3 } from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3';

interface IModal_createPrompt_v3_input {
  t: IGetT_frontend_output;
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  prompts_v3_user: IPrompt_v3[];
  setPrompts_v3_user: Dispatch<SetStateAction<IPrompt_v3[]>>;
  setIsShowModal_create_persona: (isShow: boolean) => void;
  createPrompt_v3_form: FormInstance<any>;
}
export const Modal_createPrompt_v3 = (props: IModal_createPrompt_v3_input) => {
  const {
    t,
    isShow,
    setIsShow,
    prompts_v3_user,
    setPrompts_v3_user,
    setIsShowModal_create_persona,
    createPrompt_v3_form: form,
  } = props;

  const closeModal = () => {
    setIsShow(false);
    form.setFieldsValue(null);
  };

  const onFinishInModal = (values: IPrompt_v3) => {
    console.log('Success:', values);

    const { name, category } = values;

    if (!category || category?.length === 0) {
      message.error(t.get('Please enter your {text}', { text: t.get('Category') }));
      return;
    }
    if (prompts_v3_user.find((prompt) => prompt.name === name)) {
      message.error(t.get('The prompt name already exists'));
      return;
    }

    const newItem: IPrompt_v3 = values;

    const newPrompts_v3_user = [newItem, ...prompts_v3_user];

    setPrompts_v3_user(newPrompts_v3_user);
    // window.electron.ipcRenderer.sendMessage('ipc-refresh-all-prompts_v3-in-mainWindow', newPrompts_v3_user);

    form.resetFields();
    closeModal();

    message.success(t.get('The prompt has been added to My prompts'));
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
        title={t.get('Create') + t.get('prompt')}
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
          <Form.Item
            label={t.get('Name')}
            name="name"
            rules={[
              {
                required: true,
                message: t.getHTML('Please enter your {text}', {
                  text: t.get('Name'),
                }),
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item label={t.get('Tags')} name="tags">
            <Select mode="tags" />
          </Form.Item> */}
          <Form.Item
            label={
              <div>
                <span>{t.get('Value')} </span>
                <Button
                  type="primary"
                  className="ml-2"
                  size="small"
                  onClick={() => {
                    setIsShowModal_create_persona(true);
                  }}
                >
                  {t.get('Create') + t.get('persona')}
                </Button>
              </div>
            }
            name="value"
            rules={[
              {
                required: true,
                message: t.getHTML('Please enter your {text}', {
                  text: t.get('Value'),
                }),
              },
            ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <TextArea autoSize />
          </Form.Item>

          <Form.Item label={t.get('Category')} name="category">
            <Select mode="multiple">
              {/* {getEPrompts_v3_category_for_select_options().map((oneSelectValue: string) => {
                return <Select.Option value={oneSelectValue}>{t.get(oneSelectValue)}</Select.Option>;
              })} */}
              <Select.Option value={EPrompts_v3_category.CONTEXT_PERSONA}>
                {t.get(EPrompts_v3_category.CONTEXT_PERSONA)}
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label={t.get('Tags')} name="tags">
            <Select mode="tags">
              {/*  */}
              {/* <Select.Option value="demo">Demo</Select.Option> */}
            </Select>
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
