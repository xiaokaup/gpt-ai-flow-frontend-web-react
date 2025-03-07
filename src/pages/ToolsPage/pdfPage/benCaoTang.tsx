import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';

const { Title } = Typography;

const FOLLOW_PARIS_SERVERLESS_API_ENDPIONT_HTTPS = 'https://lc1mso46oi.execute-api.us-east-1.amazonaws.com/prod';

const BEN_CAO_TANG_PAGE = () => {
  const [form] = Form.useForm();
  const [resultLink, setResultLink] = useState('');

  const handleSubmit = (values) => {
    const link = `${FOLLOW_PARIS_SERVERLESS_API_ENDPIONT_HTTPS}/services/bencaotang/generate-stacker-format-a4`;
    const queryParams = new URLSearchParams(values).toString();
    setResultLink(`${link}?${queryParams}`);
  };

  return (
    <>
      <Title level={1}>本草堂</Title>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="product_title" label="产品标题" rules={[{ required: true, message: '请输入产品标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="product_ingredients" label="成份" rules={[{ required: true, message: '请输入成分' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="product_expired_date" label="过期日期" rules={[{ required: true, message: '请输入过期日期' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="product_usage_and_dosage"
          label="使用及剂量"
          rules={[{ required: true, message: '请输入使用及剂量' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
      {resultLink && (
        <a id="resultLink" href={resultLink} target="_blank" rel="noopener noreferrer">
          点击这里查看产品信息
        </a>
      )}
    </>
  );
};

export default BEN_CAO_TANG_PAGE;
