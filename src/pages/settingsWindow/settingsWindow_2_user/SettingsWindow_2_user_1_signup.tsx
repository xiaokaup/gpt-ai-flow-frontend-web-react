import '../../../styles/global.css';

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Form, Input, Tooltip, message } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, TeamOutlined, InfoCircleOutlined } from '@ant-design/icons';

import { IReduxRootState } from '../../../store/reducer';
import {
  authRegisterByEmailAndPasswordAction_v0,
  getUserProfileByEmailAction_v2,
} from '../../../store/actions/userActions';

import { IUserDB, IUserDB_default } from '../../../gpt-ai-flow-common/interface-database/IUserDB';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { useUserData } from '../../../gpt-ai-flow-common/hooks/useUserData';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import {
  to_deprecate_IUserData as IUserData,
  to_deprecate_IUserData_default as IUserData_default,
} from '../../../gpt-ai-flow-common/interface-app/3_unit/to_deprecate_IUserData';

interface IUserRegisterForm {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirm_password: string;
  uniqueCode?: string;
}

interface ISettingsWindow_2_user_1_signup_input {
  t: IGetT_frontend_output;
}
export const SettingsWindow_2_user_1_signup = (props: ISettingsWindow_2_user_1_signup_input) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = props;

  const query = new URLSearchParams(useLocation().search);
  const uniqueCodeFromUrl = query.get('uniqueCode');
  const from = query.get('from');
  const hasFromQuery = !!from;
  const isFromLittleRedBook = from === 'littleRedBook';

  const userDataFromStorage: IUserData = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserData_default;
  });

  const { isAuthenticated } = useUserData({
    userDataFromStorage,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onUserDataChange: (newUserData_without_token: IUserData) => {},
    locale: t.currentLocale,
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app/info');
    }
  }, [isAuthenticated, navigate]);

  const onFinish = async (values: IUserRegisterForm) => {
    try {
      if (values.confirm_password !== values.password) {
        message.error(t.get('Please confirm that the passwords entered twice are the same'));
        return;
      }

      const userFound: IUserDB = (await dispatch(
        getUserProfileByEmailAction_v2(values.email, t.currentLocale, CONSTANTS_GPT_AI_FLOW_COMMON) as any,
      )) as any;

      if (userFound?.id) {
        throw new Error(t.get('This email has already been registered'));
      }

      const newUser = await dispatch(
        authRegisterByEmailAndPasswordAction_v0(
          {
            ...IUserDB_default,
            email: values.email,
            password: values.password,
            firstName: values.first_name,
            lastName: values.last_name ?? '',
          },
          t.currentLocale,
          CONSTANTS_GPT_AI_FLOW_COMMON,
          values.uniqueCode,
        ) as any,
      );

      if (!newUser?.id) {
        throw new Error(t.get('Registration failed, please try again or try another email address'));
      }

      message.success(t.get('User created successfully'));
      if (!hasFromQuery) {
        navigate('/app/login');
      }
      if (hasFromQuery && isFromLittleRedBook) {
        navigate(`/app/login?from=${from}`);
      }
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
        {!hasFromQuery && <h2>{t.get('Sign Up')}</h2>}
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
      <div className="row flex justify-center">
        <Form
          name="basic"
          initialValues={{ uniqueCode: uniqueCodeFromUrl }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ width: 300 }}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: t.getHTML('Please enter your {text}', { text: t.get('Email') }),
              },
              { type: 'email', message: t.get('Please enter in the correct format') },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder={t.get('Email')} />
          </Form.Item>

          <Form.Item
            name="first_name"
            rules={[
              {
                required: true,
                message: t.getHTML('Please enter your {text}', { text: t.get('First Name') }),
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder={t.get('First Name')} />
          </Form.Item>

          <Form.Item name="last_name">
            <Input prefix={<UserOutlined />} placeholder={t.get('Last Name')} />
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

          <Form.Item
            name="confirm_password"
            rules={[
              {
                required: true,
                message: t.getHTML('Please enter again your {text}', { text: t.get('Password') }),
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder={t.get('Confirm password')} />
          </Form.Item>

          <Form.Item name="uniqueCode" className="hidden">
            <Input
              prefix={<TeamOutlined />}
              placeholder={`${t.get('Invitation code')} (${t.get('Optional')})`}
              maxLength={6}
              suffix={
                <Tooltip title={t.getHTML('Please ensure the {text} is valid', { text: t.get('Invitation code') })}>
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
            />
          </Form.Item>

          <Form.Item>
            <div>
              <Button className="sign_up_with_password_provider_button" type="primary" htmlType="submit">
                {t.get('Submit')}
              </Button>
              <span style={{ marginLeft: 20 }}>
                <Button
                  type="default"
                  onClick={() => {
                    if (!hasFromQuery) {
                      navigate('/app/login');
                    }
                    if (hasFromQuery && isFromLittleRedBook) {
                      navigate(`/app/login?from=${from}`);
                    }
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
  );
};
