import '../../../../styles/global.css';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button, Form, Input, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';

import { IUserData } from '../../../../gpt-ai-flow-common/interface-app/IUserData';
import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import {
  authLoginByEmailAndPasswordAction,
  userUpdateUserPasswordActionAction_v1,
} from '../../../../store/actions/userActions';

interface SettingsWindow_2_user_4_changePassword_input {
  t: IGetT_frontend_output;
  userData: IUserData;
  isAuthenticated: boolean;
}
export const SettingsWindow_2_user_4_changePassword = (props: SettingsWindow_2_user_4_changePassword_input) => {
  const { t, userData, isAuthenticated } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const onFinish = async (values: any) => {
    // console.log('Success:', values);

    try {
      const userAndTokenData: IUserData = await dispatch(
        authLoginByEmailAndPasswordAction(userData.email, values.password, CONSTANTS_GPT_AI_FLOW_COMMON) as any
      );

      if (!userAndTokenData || !userAndTokenData.id || !userAndTokenData.token) {
        message.error(t.get('There were some problems, please log in again and try once more'));
        return;
      }

      await dispatch(
        userUpdateUserPasswordActionAction_v1(
          t,
          userAndTokenData.id,
          values.newPassword,
          userAndTokenData.token.accessToken,
          CONSTANTS_GPT_AI_FLOW_COMMON
        ) as any
      );

      message.success(t.get('Password successfully changed'));
      navigate('/info');
      window.location.reload();
    } catch (error: Error | any) {
      message.error({
        content: <span>{error.message}</span>,
        key: 'auth',
        duration: 3,
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
        <h2>{t.get('Change password')}</h2>
      </div>
      <div className="row signup_page_content">
        <div
          style={
            {
              // marginTop: 40,
              // display: 'flex',
              // flexDirection: 'column',
              // alignItems: 'center',
            }
          }
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ width: 300 }}
          >
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: t.getHTML('Please enter your {text}', { text: t.get('Password') }),
                },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder={t.get('Password')} />
            </Form.Item>
            <Form.Item
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: t.getHTML('Please enter your {text}', { text: t.get('New password') }),
                },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder={t.get('New password')} />
            </Form.Item>

            <Form.Item>
              <div>
                <Button type="primary" htmlType="submit">
                  {t.get('Submit')}
                </Button>
                <span style={{ marginLeft: 20 }}>
                  <Button
                    type="default"
                    onClick={() => {
                      navigate('/info');
                    }}
                  >
                    {t.get('Return')}
                  </Button>
                </span>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
