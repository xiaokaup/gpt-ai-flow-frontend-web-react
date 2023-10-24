import '../../../../styles/global.css';

import React from 'react';

import { Button, Form, Input, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
// import { EUserPageCase } from ".";
import { useNavigate } from 'react-router-dom';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { useDispatch } from 'react-redux';
import { userResetPasswordWithEmailAction } from '../../../../store/actions/userActions';
// import TSettingsWindow_2_user from "./TSettingsWindow_2_user";

interface SettingsWindow_2_user_5_forgetPassword_input {
  // setPageCase: (paraPageCase: EUserPageCase) => void;
}
export const SettingsWindow_2_user_5_forgetPassword = (props: SettingsWindow_2_user_5_forgetPassword_input) => {
  // const { setPageCase } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      const userResults = await dispatch(
        userResetPasswordWithEmailAction(values.email, CONSTANTS_GPT_AI_FLOW_COMMON) as any
      );

      if (!userResults) {
        return new Error('这个电子邮件未被注册在，请再试一次或尝试另一个电子邮件地址');
      }

      message.success({
        content: <span>一封包含新密码的电子邮件已经发到你的邮箱中</span>,
        key: 'auth',
        duration: 3,
      });

      navigate('/login');
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
        <h2>忘记密码</h2>
      </div>
      <div className="row forgetpassowrd_page_content">
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
                    navigate('/login');
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
