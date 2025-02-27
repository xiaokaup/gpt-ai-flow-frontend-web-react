import '../../../styles/global.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

import { Button, Form, Input, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import { GoogleLogin } from '@react-oauth/google';

import { IReduxRootState } from '../../../store/reducer';
import { USER_LOGIN } from '../../../store/actions/userActions';

import TBackendAuthFile from '../../../gpt-ai-flow-common/tools/3_unit/TBackendAuth';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IUserDB, IUserDB_default } from '../../../gpt-ai-flow-common/interface-database/IUserDB';
import { useUserDB } from '../../../gpt-ai-flow-common/hooks/useUserDB';

const getSuccessLoginRedirectUrl = (
  navigate: NavigateFunction,
  hasFromQuery: boolean,
  isFromLittleRedBook: boolean,
) => {
  if (!hasFromQuery) {
    navigate('/app/proMode/features');
    window.location.reload();
    return;
  }
  if (hasFromQuery && isFromLittleRedBook) {
    navigate(
      `/app/proMode?version=v4&role=xiaoHongShu-platform&tabPane_uuid=writingPostAgent%20-%20xiaoHongShu%20platform`,
    );
    window.location.reload();
    return;
  }

  window.location.reload();
};

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
  const from = query.get('from');
  const hasFromQuery = !!from;
  const isFromLittleRedBook = from === 'littleRedBook';

  const userDBFromStorage: IUserDB = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserDB_default;
  });

  const { isAuthenticated } = useUserDB({
    userDBFromStorage,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onUserDBChange: (_newUserDB_without_token: IUserDB) => {},
    t,
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });

  useEffect(() => {
    if (isAuthenticated) {
      getSuccessLoginRedirectUrl(navigate, hasFromQuery, isFromLittleRedBook);
    }
  }, [isAuthenticated, navigate]);

  const onEmailAndPasswordSignInFinish = async (values: { email: string; password: string }) => {
    try {
      const authUserDB: IUserDB = await TBackendAuthFile.authLoginByEmailAndPassword(
        values.email,
        values.password,
        t.currentLocale,
        CONSTANTS_GPT_AI_FLOW_COMMON,
      );

      if (!authUserDB) {
        throw new Error(
          t.get(
            "The user's email is not registered or the password is incorrect. If the problem persists, please contact the administrator",
          ),
        );
      }

      dispatch({ type: USER_LOGIN, payload: authUserDB });

      await new Promise((resolve) => setTimeout(resolve, 200)); // add a delay

      getSuccessLoginRedirectUrl(navigate, hasFromQuery, isFromLittleRedBook);
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
        {!hasFromQuery && <h2>{t.get('Login')}</h2>}
        {hasFromQuery && isFromLittleRedBook && (
          <div className="mt-4 mb-8">
            <div className="flex items-center">
              <img
                className="w-16 rounded-sm"
                src="https://www.gptaiflow.tech//img/icons/2024-11-13-img-36-logo-xiaoHongShu.png"
                alt="icon-little-red-book"
              />
              <div className="flex flex-col space-y-2">
                <span className="text-2xl font-bold ml-4">
                  {t.get('Join the Little Red Book record beautiful life')}
                </span>
                <span className="text-xl ml-4">
                  {t.get('Create, Connect, and Grow Your Presence on Little Red Book')}
                </span>
              </div>
            </div>
            <p style={{ marginLeft: 4, color: '#7C7C7C', cursor: 'pointer' }}>
              {t.get('Join 1000+ users discovering real Chinese social experiences')}
            </p>
          </div>
        )}
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

            // console.log('onSuccess googleLogin results', userDB);
            if (!userDB || !userDB.id || !userDB.Token?.accessToken) {
              message.error(t.get('Google Login Failed'));
              return;
            }

            if (isCallerElectron) {
              console.log('trigger for electron');
              const link = document.createElement('a');
              link.href = `gpt-ai-flow-app://id=${userDB.id}&accessToken=${userDB.Token?.accessToken}`;
              document.body.appendChild(link);
              link.click();
            }

            dispatch({ type: USER_LOGIN, payload: userDB });

            await new Promise((resolve) => setTimeout(resolve, 200)); // add a delay

            getSuccessLoginRedirectUrl(navigate, hasFromQuery, isFromLittleRedBook);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
      {(!caller || (caller && !isCallerElectron)) && (
        <>
          <hr className="my-8" />
          <div className="row block_email_and_password flex justify-center">
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
                <div className="block_buttons">
                  <div className="block_buttons_login_and_sign_up">
                    <Button
                      className="login_button login_button_with_password_provider"
                      type="primary"
                      htmlType="submit"
                    >
                      {t.get('Login')}
                    </Button>
                    <span style={{ marginLeft: 20 }}>
                      <Button
                        type="default"
                        onClick={() => {
                          if (!hasFromQuery) {
                            navigate('/app/signUp');
                          }
                          if (hasFromQuery && isFromLittleRedBook) {
                            navigate(`/app/signUp?from=${from}`);
                          }
                        }}
                      >
                        {t.get('Sign Up')}
                      </Button>
                    </span>
                  </div>
                  <div className="block_buttons_forgetPassword mt-2">
                    <span
                      style={{ marginLeft: 4, color: '#7C7C7C', cursor: 'pointer' }}
                      onClick={() => {
                        navigate('/app/forgetPassword');
                      }}
                    >
                      {t.get('Forget password')}
                    </span>
                  </div>
                </div>
              </Form.Item>
            </Form>
          </div>
        </>
      )}
    </div>
  );
};
