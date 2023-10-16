import '../../../../styles/global.css';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { IReduxRootState } from 'store/reducer';
import {
  authRegisterByEmailAndPasswordAction_v0,
  getUserProfileByEmailAction_v2,
} from '../../../../store/actions/userActions';

import { Button, Form, Input, message } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';

import { IUserDB } from '../../../../gpt-ai-flow-common/interface-database/IUserDB';
import React, { useEffect } from 'react';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { useUserData } from '../../../../gpt-ai-flow-common/hooks/useUserData';
import IUserDataFile, { IUserData } from '../../../../gpt-ai-flow-common/interface-app/IUserData';

export const SettingsWindow_2_user_1_signup = () => {
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
      navigate('/info');
    }
  }, [isAuthenticated, navigate]);

  const onFinish = async (values: any) => {
    try {
      if (values.confirm_password !== values.password) {
        message.error('请确认两次输入的密码是相同的');
        return;
      }

      // const userFound: IUserDB = await TSettingsWindow_2_user.getUserProfileByEmail_v2(
      //   values.email,
      //   // window.env
      //   {}
      // );

      const userFound: IUserDB = (await dispatch(
        getUserProfileByEmailAction_v2(values.email, CONSTANTS_GPT_AI_FLOW_COMMON) as any
      )) as any;

      if (userFound?.id) {
        return new Error('这个电子邮件已经注册');
      }

      const newUser = await dispatch(
        authRegisterByEmailAndPasswordAction_v0(
          values.email,
          values.password,
          values.first_name,
          values.last_name,
          CONSTANTS_GPT_AI_FLOW_COMMON
        ) as any
      );

      if (!newUser?.id) {
        return new Error('注册失败，请再试一次或尝试另一个电子邮件地址');
      }

      message.success('用户创建成功');
      navigate('/login');
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
        padding: '2rem',
        background: '#fff',
        border: '1px solid #E8E8E8',
        borderRadius: '.4rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="row">
        <h2>注册</h2>
      </div>
      <div className="row">
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
                    navigate('/login');
                  }}
                >
                  登录
                </Button>
              </span>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
