import '../../../../styles/global.css';

import { Button, Form, Input, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
// import { EUserPageCase } from ".";
// import { IUserDB } from '../../../../gpt-ai-flow-common/interface-database/IUserDB';
import { useNavigate } from 'react-router-dom';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
// import TSettingsWindow_2_user from './TSettingsWindow_2_user';
import { useDispatch } from 'react-redux';
import { userResetPasswordWithEmailAction } from '../../../store/actions/userActions';
// import TSettingsWindow_2_user from "./TSettingsWindow_2_user";

interface SettingsWindow_2_user_5_forgetPassword_input {
  // setPageCase: (paraPageCase: EUserPageCase) => void;
  t: IGetT_frontend_output;
}
export const SettingsWindow_2_user_5_forgetPassword = (props: SettingsWindow_2_user_5_forgetPassword_input) => {
  const { t } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      const userResults = await dispatch(
        userResetPasswordWithEmailAction(t, values.email, t.currentLocale, CONSTANTS_GPT_AI_FLOW_COMMON) as any,
      );

      if (!userResults) {
        return new Error(t.get('This email was not registered in, please try again or try another email address'));
      }

      message.success({
        content: <span>{t.get('An email containing the new password has been sent to your mailbox')}</span>,
        key: 'auth',
        duration: 3,
      });

      navigate('/app/login');
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
        padding: '2rem',
        background: '#fff',
        border: '1px solid #E8E8E8',
        borderRadius: '.4rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="row">
        <h2>{t.get('Forget password')}</h2>
      </div>
      <div className="row forgetpassowrd_page_content">
        <div
          style={{
            marginTop: 40,
          }}
        >
          <div style={{ fontSize: 18, width: 500, padding: '20px 10px' }}>
            {t.get(
              'Please enter the email address associated with your account, and we will send you a link to reset your password',
            )}
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
                  message: t.getHTML('Please enter your {text}', { text: t.get('Email') }),
                },
                { type: 'email', message: t.getHTML('Please enter the correct email') },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder={t.get('Email')} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {t.get('Submit')}
              </Button>
              <span style={{ marginLeft: 20 }}>
                <Button
                  type="default"
                  onClick={() => {
                    // setPageCase(EUserPageCase.LOGIN);
                    navigate('/app/login');
                  }}
                >
                  {t.get('Return')}
                </Button>
              </span>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
