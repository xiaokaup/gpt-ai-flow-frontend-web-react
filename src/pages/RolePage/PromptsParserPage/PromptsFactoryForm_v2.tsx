import { Input, Button, Select, Form, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { FormInstance } from 'antd/es/form/Form';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import {
  EPrompt_v3_for_promptsFactory_type,
  IPrompt_v3_for_promptsFactory,
  IPrompt_v3_for_promptsFactory_default,
} from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3_for_promptsFactory';
import { Dispatch } from 'react';

interface IPromptsFactoryForm {
  t: IGetT_frontend_output;
  form: FormInstance<any>;
  formTitle: string;
  setShowForm: Dispatch<React.SetStateAction<boolean>>;
  showForm_data: IPrompt_v3_for_promptsFactory;
  prompts_v3_elements: IPrompt_v3_for_promptsFactory[];
  setPrompts_v3_elements: Dispatch<React.SetStateAction<IPrompt_v3_for_promptsFactory[]>>;
}
export const PromptsFactoryForm_v2 = (props: IPromptsFactoryForm) => {
  const { t, form, formTitle, setShowForm, showForm_data, prompts_v3_elements, setPrompts_v3_elements } = props;

  const onFinishInModal = (values: IPrompt_v3_for_promptsFactory & { oldTitle: string }) => {
    console.log('Success:', values);

    const { type } = values;

    if (!type) {
      message.error(t.get('Please enter your {text}', { text: t.get('Type') }));
      return;
    }

    if (formTitle === t.get('Create')) {
      const findPrompt = prompts_v3_elements.find((item: IPrompt_v3_for_promptsFactory) => item.title === values.title);
      if (findPrompt) {
        message.error(t.get('The prompt name already exists'));
        return;
      }

      const newItem: IPrompt_v3_for_promptsFactory = values;

      const newPrompts_v3_elements = [newItem, ...prompts_v3_elements];

      setPrompts_v3_elements(newPrompts_v3_elements);

      setShowForm(false);
      message.success(t.get('The prompt has been added to My prompts'));
    } else if (formTitle === t.get('Edit')) {
      const findPrompt = prompts_v3_elements.find(
        (item: IPrompt_v3_for_promptsFactory) => item.title === values.oldTitle,
      );
      if (!findPrompt) {
        message.error(t.get("The prompt name doesn't exist"));
        return;
      }

      const newPrompts_v3_elements = prompts_v3_elements.map((item: IPrompt_v3_for_promptsFactory) => {
        if (item.title === values.oldTitle) {
          return { ...item, ...values };
        }
        return item;
      });

      setPrompts_v3_elements(newPrompts_v3_elements);

      setShowForm(false);
      message.success(t.get('The prompt has been updated'));
    }
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
        initialValues={{ ...showForm_data, oldTitle: showForm_data.title }}
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
            <Select.Option value={EPrompt_v3_for_promptsFactory_type.ROLE}>
              {t.get(EPrompt_v3_for_promptsFactory_type.ROLE)}
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

        <Form.Item className="hidden" label={t.get('Name')} name="oldTitle">
          <Input />
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
          <div className="flex justify-between items-center">
            <div>
              <Button type="primary" htmlType="submit">
                {t.get('Submit')}
              </Button>
              <Button
                className="ml-[1rem]"
                onClick={() => {
                  setShowForm(false);
                }}
              >
                {t.get('Cancel')}
              </Button>
            </div>

            <div>
              <Button
                className="ml-[1rem]"
                onClick={() => {
                  form.setFieldsValue(IPrompt_v3_for_promptsFactory_default);
                }}
              >
                {t.get('Reset')}
              </Button>
              {formTitle === t.get('Edit') && (
                <Button
                  danger
                  className="ml-[1rem]"
                  onClick={() => {
                    const newPrompts_v3_elements = prompts_v3_elements.filter(
                      (item: IPrompt_v3_for_promptsFactory) => item.title !== showForm_data.title,
                    );
                    console.log('newPrompts_v3_elements', newPrompts_v3_elements);

                    setPrompts_v3_elements(newPrompts_v3_elements);

                    setShowForm(false);
                    message.success(t.get('The prompt has been deleted'));
                  }}
                >
                  {t.get('Delete')}
                </Button>
              )}
            </div>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
