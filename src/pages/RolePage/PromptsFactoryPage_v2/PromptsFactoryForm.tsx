import { Input, Button, Select, Form, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useForm } from 'antd/es/form/Form';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import {
  EPrompt_v3_for_promptsFactory_type,
  IPrompt_v3_for_promptsFactory,
} from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3_for_promptsFactory';
import { Dispatch } from 'react';

interface IPromptsFactoryForm {
  t: IGetT_frontend_output;
  prompt: IPrompt_v3_for_promptsFactory;
  setShowForm: Dispatch<React.SetStateAction<boolean>>;
  // setShowForm_data: Dispatch<React.SetStateAction<IPrompt_v3_for_promptsFactory | null>>;
}
export const PromptsFactoryForm = (props: IPromptsFactoryForm) => {
  const { t, setShowForm, prompt } = props;

  const [form] = useForm();

  const onFinishInModal = (values: IPrompt_v3_for_promptsFactory) => {
    console.log('Success:', values);

    const { type } = values;

    if (!type) {
      message.error(t.get('Please enter your {text}', { text: t.get('Type') }));
      return;
    }

    // if (!category || category?.length === 0) {
    //   message.error(t.get('Please enter your {text}', { text: t.get('Category') }));
    //   return;
    // }
    // if (prompts_v3_user.find((prompt) => prompt.name === name)) {
    //   message.error(t.get('The prompt name already exists'));
    //   return;
    // }

    // const newItem: IPrompt_v3_type_persona = values;

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

  return (
    <div className="PromptsFactoryForm_container">
      <Form
        form={form}
        layout="vertical"
        name="PromptsFactoryForm"
        initialValues={prompt}
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

        <Form.Item label={t.get('Type')} name="type">
          <Select>
            {/* {getEPrompts_v3_category_for_select_options().map((oneSelectValue: string) => {
                return <Select.Option value={oneSelectValue}>{t.get(oneSelectValue)}</Select.Option>;
              })} */}
            <Select.Option value={EPrompt_v3_for_promptsFactory_type.CONTEXT}>
              {t.get(EPrompt_v3_for_promptsFactory_type.CONTEXT)}
            </Select.Option>
            <Select.Option value={EPrompt_v3_for_promptsFactory_type.SUBJECT}>
              {t.get(EPrompt_v3_for_promptsFactory_type.SUBJECT)}
            </Select.Option>
            <Select.Option value={EPrompt_v3_for_promptsFactory_type.METHOD}>
              {t.get(EPrompt_v3_for_promptsFactory_type.METHOD)}
            </Select.Option>
            <Select.Option value={EPrompt_v3_for_promptsFactory_type.AUDIENCE}>
              {t.get(EPrompt_v3_for_promptsFactory_type.AUDIENCE)}
            </Select.Option>
            <Select.Option value={EPrompt_v3_for_promptsFactory_type.OBJECTIVE}>
              {t.get(EPrompt_v3_for_promptsFactory_type.OBJECTIVE)}
            </Select.Option>
            <Select.Option value={EPrompt_v3_for_promptsFactory_type.DURATION}>
              {t.get(EPrompt_v3_for_promptsFactory_type.DURATION)}
            </Select.Option>
            <Select.Option value={EPrompt_v3_for_promptsFactory_type.STYLE}>
              {t.get(EPrompt_v3_for_promptsFactory_type.STYLE)}
            </Select.Option>
            <Select.Option value={EPrompt_v3_for_promptsFactory_type.TONE}>
              {t.get(EPrompt_v3_for_promptsFactory_type.TONE)}
            </Select.Option>
            <Select.Option value={EPrompt_v3_for_promptsFactory_type.RULE}>
              {t.get(EPrompt_v3_for_promptsFactory_type.RULE)}
            </Select.Option>
            <Select.Option value={EPrompt_v3_for_promptsFactory_type.INSTRUCTION}>
              {t.get(EPrompt_v3_for_promptsFactory_type.INSTRUCTION)}
            </Select.Option>
            <Select.Option value={EPrompt_v3_for_promptsFactory_type.OUTPUT}>
              {t.get(EPrompt_v3_for_promptsFactory_type.OUTPUT)}
            </Select.Option>
            <Select.Option value={EPrompt_v3_for_promptsFactory_type.EXAMPLE}>
              {t.get(EPrompt_v3_for_promptsFactory_type.EXAMPLE)}
            </Select.Option>
            <Select.Option value={EPrompt_v3_for_promptsFactory_type.OTHER}>
              {t.get(EPrompt_v3_for_promptsFactory_type.OTHER)}
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={t.get('Name')}
          name="title"
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

        <Form.Item
          label={t.get('Content')}
          name="content"
          rules={[
            {
              required: true,
              message: t.getHTML('Please enter your {text}', {
                text: t.get('Content'),
              }),
            },
          ]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <TextArea autoSize />
        </Form.Item>

        <Form.Item
          className="hidden"
          label={t.get('Status')}
          name="status"
          rules={[
            {
              required: true,
              message: t.getHTML('Please enter your {text}', {
                text: t.get('Status'),
              }),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={t.get('Tags')} name="tags">
          <Select mode="tags" />
        </Form.Item>

        <Form.Item
        // wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button type="primary" htmlType="submit">
            {t.get('Submit')}
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            onClick={() => {
              setShowForm(false);
            }}
          >
            {t.get('Cancel')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
