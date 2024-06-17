import '../../../../styles/global.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Form, Input, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import { GoogleLogin } from '@react-oauth/google';

import { IReduxRootState } from '../../../../store/reducer';
import { USER_LOGIN, authLoginByEmailAndPasswordAction } from '../../../../store/actions/userActions';

import { useUserData } from '../../../../gpt-ai-flow-common/hooks/useUserData';
import TBackendAuthFile from '../../../../gpt-ai-flow-common/tools/3_unit/TBackendAuth';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IUserData, IUserData_default } from '../../../../gpt-ai-flow-common/interface-app/3_unit/IUserData';

interface ISettingsWindow_2_user_2_login_input {
  t: IGetT_frontend_output;
}
export const SettingsWindow_2_user_2_login = (props: ISettingsWindow_2_user_2_login_input) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = props;

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const caller = query.get('app');
  const isCallerElectron = caller === 'electron';

  const userDataFromStorage: IUserData = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserData_default;
  });

  const { isAuthenticated } = useUserData({
    userDataFromStorage,
    onUserDataChange: (newUserData_without_token: IUserData) => {},
    locale: t.currentLocale,
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
        authLoginByEmailAndPasswordAction(
          values.email,
          values.password,
          t.currentLocale,
          CONSTANTS_GPT_AI_FLOW_COMMON,
        ) as any,
      );

      if (!userAndTokenData) {
        throw new Error(
          t.get(
            "The user's email is not registered or the password is incorrect. If the problem persists, please contact the administrator",
          ),
        );
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
        <h2>{t.get('Login')}</h2>
      </div>
      <div className="row google_login flex justify-center">
        <GoogleLogin
          useOneTap
          onSuccess={async (credentialResponse) => {
            // console.log('credentialResponse', credentialResponse);

            const { credential: idToken } = credentialResponse;
            if (!idToken) {
              message.error(t.get('Google Login Failed'));
              return;
            }
            const userDB = await TBackendAuthFile.authLoginVerifyByGoogle(
              idToken,
              t.currentLocale,
              CONSTANTS_GPT_AI_FLOW_COMMON,
            );

            if (isCallerElectron) {
              console.log('trigger for electron');
              const link = document.createElement('a');
              link.href = `gpt-ai-flow-app://id=${userDB.id}&accessToken=${userDB.Token?.accessToken}`;
              document.body.appendChild(link);
              link.click();
            }

            // console.log('onSuccess googleLogin results', userDB);
            dispatch({ type: USER_LOGIN, payload: userDB });
            navigate('/proMode');
            window.location.reload();
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
      {(!caller || (caller && !isCallerElectron)) && (
        <>
          <hr className="my-8" />
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
                    message: t.getHTML('Please enter your {text}', { text: t.get('Email') }),
                  },
                  {
                    type: 'email',
                    message: t.getHTML('Please enter in the correct format'),
                  },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder={t.get('Email')} />
              </Form.Item>

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

              <Form.Item>
                <div>
                  <Button className="login_button login_button_with_password_provider" type="primary" htmlType="submit">
                    {t.get('Login')}
                  </Button>
                  <span style={{ marginLeft: 20 }}>
                    <Button
                      type="default"
                      onClick={() => {
                        navigate('/signUp');
                      }}
                    >
                      {t.get('Sign Up')}
                    </Button>
                  </span>
                  <br />
                  <span
                    style={{ marginLeft: 4, color: '#7C7C7C', cursor: 'pointer' }}
                    onClick={() => {
                      navigate('/forgetPassword');
                    }}
                  >
                    {t.get('Forget password')}
                  </span>
                </div>
              </Form.Item>
            </Form>
          </div>
        </>
      )}
    </div>
  );
};
