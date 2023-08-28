import '../../../styles/global.css';

import React from 'react';

import { Button, Form, Input, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
// import { EUserPageCase } from ".";
import { IUserDB } from '../../../gpt-ai-flow-common/interface-database/IUserDB';
// import TSettingsWindow_2_user from "./TSettingsWindow_2_user";

interface SettingsWindow_2_user_5_forgetPassword_input {
  // setPageCase: (paraPageCase: EUserPageCase) => void;
}
export const SettingsWindow_2_user_5_forgetPassword = (props: SettingsWindow_2_user_5_forgetPassword_input) => {
  // const { setPageCase } = props;

  const onFinish = async (values: any) => {
    try {
      // await TSettingsWindow_2_user.resetPasswordWithEmail(
      //   values.email,
      //   // window.env,
      //   {}
      // );

      message.success({
        content: <span>一封包含新密码的电子邮件已经发到你的邮箱中</span>,
        key: 'auth',
        duration: 3,
      });

      // setPageCase(EUserPageCase.LOGIN);
    } catch (error: Error | any) {
      message.error({
        content: <span>{error.message}</span>,
        key: 'auth',
        duration: 3,
      });
    }
  };

  const onFinishFailed = (errorInfo: Error | any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      className="row"
      style={{
        marginTop: 12,
        marginLeft: 12,
      }}
    >
      <div className="forgetpassowrd_page_content">
        <div
          style={{
            marginTop: 40,
          }}
        >
          <div style={{ fontSize: 18, width: 500, padding: '20px 10px' }}>
            请输入与您的账户关联的电子邮件地址，我们将向您发送重置密码的链接。
          </div>

          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ width: 520, marginTop: 20 }}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: '请输入邮件',
                },
                { type: 'email', message: '请输入正确的邮件' },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder={'邮件'} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <span style={{ marginLeft: 20 }}>
                <Button
                  type="default"
                  onClick={() => {
                    // setPageCase(EUserPageCase.LOGIN);
                  }}
                >
                  登录
                </Button>
              </span>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
