import { Button, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

export interface FieldData {
  key: number;
  label: string;
  value: string;
}

interface DynamicFormProps {
  t: IGetT_frontend_output;
  context: string;
  setContext: (fields: string) => void;
  fields: FieldData[];
  setFields: (fields: FieldData[]) => void;
}

export const DynamicForm = (props: DynamicFormProps) => {
  const { t, context, setContext, fields, setFields } = props;

  const [form] = Form.useForm();

  const [nextKey, setNextKey] = useState<number>(fields.length);

  const handleAddField = () => {
    setFields([...fields, { key: nextKey, label: '', value: '' }]);
    setNextKey(nextKey + 1);
  };

  const handleFieldChange = (key: number, type: 'label' | 'value', newValue: string) => {
    const updatedFields = fields.map((field) => (field.key === key ? { ...field, [type]: newValue } : field));
    setFields(updatedFields);
  };

  const handleRemoveField = (key: number) => {
    setFields(fields.filter((field) => field.key !== key));
  };

  return (
    <Form form={form} layout="vertical" style={{ width: '100%' }} initialValues={{ context, ...fields }}>
      <Form.Item label={t.get('Context')} name="context">
        <Input.TextArea
          autoSize={{ minRows: 4 }}
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder={t.get('Enter your initial context')}
        />
      </Form.Item>

      {fields.map((field) => (
        <div key={field.key} style={{ display: 'flex', marginBottom: '10px' }}>
          <Form.Item style={{ marginRight: '10px', flex: 1, marginBottom: 0 }}>
            <Input
              placeholder={t.get('Label')}
              value={field.label}
              onChange={(e) => handleFieldChange(field.key, 'label', e.target.value)}
            />
          </Form.Item>
          <Form.Item style={{ flex: 2, marginBottom: 0 }}>
            <Input.TextArea
              autoSize={{ minRows: 1 }}
              placeholder={t.get('Value')}
              value={field.value}
              onChange={(e) => handleFieldChange(field.key, 'value', e.target.value)}
            />
          </Form.Item>
          <Button type="text" danger onClick={() => handleRemoveField(field.key)} style={{ marginLeft: '10px' }}>
            X
          </Button>
        </div>
      ))}

      <Form.Item>
        <Button type="dashed" onClick={handleAddField} icon={<PlusOutlined />} style={{ width: '100%' }}>
          {t.get('Add Field')}
        </Button>
      </Form.Item>
    </Form>
  );
};
