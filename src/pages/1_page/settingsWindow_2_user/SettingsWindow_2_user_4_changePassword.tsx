import "../../../styles/global.css";

import React, { useState } from "react";

import { Button, Form, Input, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { EUserPageCase } from ".";
import { IUserDB } from "../../../gpt-ai-flow-common/interface-database/IUserDB";
// import TSettingsWindow_2_user from "./TSettingsWindow_2_user";
import IUserDataFile, {
  IUserData,
} from "../../../gpt-ai-flow-common/interface-app/IUserData";
// import { STORE_USER_TOKEN_ACCESSTOKEN } from "../../../tools/4_base/TConstant";
// import { useUserInfo } from "../../../hooks/useUserInfo";

interface SettingsWindow_2_user_4_changePassword_input {
  setPageCase: (paraPageCase: EUserPageCase) => void;
}
export const SettingsWindow_2_user_4_changePassword = (
  props: SettingsWindow_2_user_4_changePassword_input
) => {
  const { setPageCase } = props;

  // const { userData } = useUserInfo();
  // const accessToken: string = window.electron.store.get(
  //   STORE_USER_TOKEN_ACCESSTOKEN
  // );
  const [userData, setUserData] = useState<IUserData>(
    IUserDataFile.IUserData_default
  );
  const accessToken = "";

  const onFinish = async (values: any) => {
    // console.log('Success:', values);
    try {
      // const userAndTokenData: IUserDB =
      //   await TSettingsWindow_2_user.authLoginByEmailAndPassword(
      //     userData.email,
      //     values.password,
      //     // window.env
      //     {}
      //   );

      // if (!userAndTokenData || !userAndTokenData.id) {
      //   message.error("出现了一些问题，请重新登录再试一次");
      //   return;
      // }

      // await TSettingsWindow_2_user.updateUserPassword_v1(
      //   userAndTokenData.id,
      //   values.newPassword,
      //   accessToken,
      //   // window.env
      //   {}
      // );

      setPageCase(EUserPageCase.INFO);
      message.success("密码修改成功");
    } catch (error: Error | any) {
      message.error({
        content: <span>密码不正确</span>,
        key: "auth",
        duration: 3,
      });
      //   message.error({
      //     content: <span>{error.message}</span>,
      //     key: 'auth',
      //     duration: 3,
      //   });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("失败:", errorInfo);
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
      <div className="signup_page_content">
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
                  message: "请输入你的密码",
                },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder={"密码"} />
            </Form.Item>
            <Form.Item
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "请输入你的新密码",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder={"新密码"}
              />
            </Form.Item>

            <Form.Item>
              <div>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
                <span style={{ marginLeft: 20 }}>
                  <Button
                    type="default"
                    onClick={() => setPageCase(EUserPageCase.INFO)}
                  >
                    返回
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
