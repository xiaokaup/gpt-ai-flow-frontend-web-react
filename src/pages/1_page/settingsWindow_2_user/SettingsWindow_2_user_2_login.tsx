import '../../../styles/global.css';

import React from 'react';

import { Button, Form, Input, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { IUserDB } from '../../../gpt-ai-flow-common/interface-database/IUserDB';
import TSettingsWindow_2_userFile from './TSettingsWindow_2_user';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
// import { STORE_USER } from "../../../../tools/4_base/TConstant";
// import { EUserPageCase } from ".";

interface ISettingsWindow_2_user_2_login_input {
  // setPageCase: (paraPageCase: EUserPageCase) => void;
}
export const SettingsWindow_2_user_2_login = (props: ISettingsWindow_2_user_2_login_input) => {
  // const { setPageCase } = props;

  const onEmailAndPasswordSignInFinish = async (values: { email: string; password: string }) => {
    try {
      const userAndTokenData: IUserDB = await TSettingsWindow_2_userFile.authLoginByEmailAndPassword(
        values.email,
        values.password,
        CONSTANTS_GPT_AI_FLOW_COMMON
      );
      if (!userAndTokenData) {
        throw new Error('用户的邮箱未被注册在或密码错误，如果多次有问题，请联系管理员');
      }
      // Set userInfo in store
      // window.electron.store.set(STORE_USER, userAndTokenData);
      // setPageCase(EUserPageCase.INFO);
    } catch (error: any) {
      message.error({
        content: error?.message,
        key: 'auth',
        duration: 3,
      });
    }
  };

  const onEmailAndPasswordSignInFaild = (errorInfo: any) => {
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
      <div className="block_email_and_password">
        <Form
          name="normal_login"
          className="login-form"
          layout="horizontal"
          initialValues={{ remember: true }}
          onFinish={onEmailAndPasswordSignInFinish}
          onFinishFailed={onEmailAndPasswordSignInFaild}
          style={{ width: 300 }}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: '请输入你的邮箱',
              },
              {
                type: 'email',
                message: '请以正确的格式输入',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder={'邮箱'} />
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

          <Form.Item>
            <div>
              <Button className="login_button login_button_with_password_provider" type="primary" htmlType="submit">
                登陆
              </Button>
              <span style={{ marginLeft: 20 }}>
                <Button
                  type="default"
                  onClick={() => {
                    // setPageCase(EUserPageCase.SIGNUP);
                  }}
                >
                  注册
                </Button>
              </span>
              <br />
              <span
                style={{ marginLeft: 4, color: '#7C7C7C', cursor: 'pointer' }}
                onClick={() => {
                  // setPageCase(EUserPageCase.FORGET_PASSWORD)
                }}
              >
                忘记密码
              </span>
            </div>

            {/* <div>
              <a href="/user/forgetpassword">
                <Button
                  type="text"
                  size="small"
                  style={{
                    padding: 0,
                    // color: color_gray
                  }}
                >
                  Forgot password
                </Button>
              </a>
            </div> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
