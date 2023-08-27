import '../../../styles/global.css';

import { Button, Form, Input, message } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
// import { EUserPageCase } from ".";
// import TSettingsWindow_2_user from "./TSettingsWindow_2_user";
import IUserDBFile, { IUserDB } from '../../../gpt-ai-flow-common/interface-database/IUserDB';
import React from 'react';

interface ISettingsWindow_2_user_1_signup_input {
  // setPageCase: (paraPageCase: EUserPageCase) => void;
}
export const SettingsWindow_2_user_1_signup = (props: ISettingsWindow_2_user_1_signup_input) => {
  // const { setPageCase } = props;

  const onFinish = async (values: any) => {
    try {
      if (values.confirm_password !== values.password) {
        message.error('请确认两次输入的密码是相同的');
        return;
      }

      // const userFound: IUserDB =
      //   await TSettingsWindow_2_user.getUserProfileByEmail_v2(
      //     values.email,
      //     // window.env
      //     {}
      //   );

      // if (userFound?.id) {
      //   throw new Error("这个电子邮件已经注册");
      // }

      // const newUser: IUserDB =
      //   await TSettingsWindow_2_user.authRegisterByEmailAndPassword_v0(
      //     {
      //       ...IUserDBFile.IUserDB_default,
      //       email: values.email,
      //       password: values.password,
      //       firstName: values.first_name,
      //       lastName: values.last_name ?? "",
      //     },
      //     // window.env
      //     {}
      //   );

      // if (!newUser?.id) {
      //   throw new Error("注册失败，请再试一次或尝试另一个电子邮件地址");
      // }

      message.success('用户创建成功');
      // setPageCase(EUserPageCase.LOGIN);
    } catch (error: Error | any) {
      message.error({
        content: <span>{error.message}</span>,
        key: 'auth',
        duration: 3,
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('失败:', errorInfo);
  };

  return (
    <div
      className="row"
      style={{
        marginTop: 12,
        marginLeft: 12,
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
      }}
    >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: 300 }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: '请输入你的电子邮件地址',
            },
            { type: 'email', message: '请以正确的格式输入' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder={'邮件'} />
        </Form.Item>

        <Form.Item
          name="first_name"
          rules={[
            {
              required: true,
              message: '请输入你的名字',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder={'名字'} />
        </Form.Item>

        <Form.Item name="last_name">
          <Input prefix={<UserOutlined />} placeholder={'姓'} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入你的密码',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder={'密码'} />
        </Form.Item>

        <Form.Item
          name="confirm_password"
          rules={[
            {
              required: true,
              message: '请再次输入你的密码',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder={'确认密码'} />
        </Form.Item>

        <Form.Item>
          <div>
            <Button className="sign_up_with_password_provider_button" type="primary" htmlType="submit">
              提交
            </Button>
            <span style={{ marginLeft: 20 }}>
              <Button
                type="default"
                onClick={() => {
                  // setPageCase(EUserPageCase.LOGIN);
                }}
              >
                登陆
              </Button>
            </span>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
