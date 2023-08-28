import '../../../../styles/global.css';

import React, { useEffect } from 'react';

import { Button, Form, Input, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { IUserDB } from '../../../../gpt-ai-flow-common/interface-database/IUserDB';
import TSettingsWindow_2_userFile from './TSettingsWindow_2_user';
import { useDispatch } from 'react-redux';
import { authLoginByEmailAndPasswordAction } from '../../../../store/actions/userActions';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';
// import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
// import { STORE_USER } from "../../../../tools/4_base/TConstant";
// import { EUserPageCase } from ".";
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserInfo } from '../../../../hooks/useUserInfo';

interface ISettingsWindow_2_user_2_login_input {
  // setPageCase: (paraPageCase: EUserPageCase) => void;
}
export const SettingsWindow_2_user_2_login = (props: ISettingsWindow_2_user_2_login_input) => {
  // const { setPageCase } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useUserInfo();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/proMode');
    }
  }, [isAuthenticated, navigate]);

  const onEmailAndPasswordSignInFinish = async (values: { email: string; password: string }) => {
    try {
      const userInfo = await dispatch(
        authLoginByEmailAndPasswordAction(values.email, values.password, CONSTANTS_GPT_AI_FLOW_COMMON) as any
      );

      navigate('/proMode');
      window.location.reload();
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
        padding: '2rem',
        background: '#fff',
        border: '1px solid #E8E8E8',
        borderRadius: '.4rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="row">
        <h2>登录</h2>
      </div>
      <div className="row block_email_and_password">
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
                登录
              </Button>
              <span style={{ marginLeft: 20 }}>
                <Button
                  type="default"
                  onClick={() => {
                    navigate('/signUp');
                  }}
                >
                  注册
                </Button>
              </span>
              <br />
              <span
                style={{ marginLeft: 4, color: '#7C7C7C', cursor: 'pointer' }}
                onClick={() => {
                  navigate('/forgetPassword');
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
