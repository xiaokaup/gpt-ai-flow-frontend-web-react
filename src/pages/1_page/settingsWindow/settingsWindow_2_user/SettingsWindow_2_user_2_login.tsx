import '../../../../styles/global.css';

import { translate } from '../../../../gpt-ai-flow-common/i18nProvider/translate';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button, Form, Input, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import { authLoginByEmailAndPasswordAction } from '../../../../store/actions/userActions';
import { IReduxRootState } from 'store/reducer';

import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import IUserDataFile, { IUserData } from '../../../../gpt-ai-flow-common/interface-app/IUserData';
import { useUserData } from '../../../../gpt-ai-flow-common/hooks/useUserData';

interface ISettingsWindow_2_user_2_login_input {}
export const SettingsWindow_2_user_2_login = (props: ISettingsWindow_2_user_2_login_input) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDataFromStorage: IUserData = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserDataFile.IUserData_default;
  });

  const { isAuthenticated } = useUserData({
    userDataFromStorage,
    onUserDataChange: (newUserData_without_token: IUserData) => {},
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/proMode');
    }
  }, [isAuthenticated, navigate]);

  const onEmailAndPasswordSignInFinish = async (values: { email: string; password: string }) => {
    try {
      const userAndTokenData = await dispatch(
        authLoginByEmailAndPasswordAction(values.email, values.password, CONSTANTS_GPT_AI_FLOW_COMMON) as any
      );

      if (!userAndTokenData) {
        throw new Error('用户的邮箱未被注册在或密码错误，如果多次有问题，请联系管理员');
      }

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
        <h2>{translate('Login')}</h2>
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
                {translate('Login')}
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
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
