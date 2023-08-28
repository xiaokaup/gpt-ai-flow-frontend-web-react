import '../../../styles/global.css';
import '../../../styles/layout.scss';

import React, { useEffect } from 'react';

import { Button, Descriptions } from 'antd';
import { useUserInfo } from '../../../hooks/useUserInfo';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogoutAction } from '../../../store/actions/userActions';
// import { STORE_USER } from "../../../tools/4_base/TConstant";
// import { useUserInfo } from "../../../hooks/useUserInfo";

interface ISettingsWindow_2_user_3_info_input {
  // setPageCase: (paraPageCase: EUserPageCase) => void;
  // setIsAuthenticated: (isAuthenticated: boolean) => void;
}
export const SettingsWindow_2_user_3_info = (props: ISettingsWindow_2_user_3_info_input) => {
  // const { userData } = useUserInfo();

  const dispatch = useDispatch();

  const { isAuthenticated, userData } = useUserInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // const { setPageCase, setIsAuthenticated } = props;

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
      {/* <div>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      </div> */}

      <div className="row block_user_info">
        <Descriptions
          title={'个人资料'}
          // layout="vertical"
          // column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          {/* <Descriptions.Item label={t('Account type')}>
            {internalRoles?.join(',') ?? 'User'}
          </Descriptions.Item> */}
          <Descriptions.Item label={'姓'}>{userData.firstName}</Descriptions.Item>
          <Descriptions.Item label={'名字'}>{userData.lastName}</Descriptions.Item>
          <Descriptions.Item label={'昵称'}>{userData.displayName}</Descriptions.Item>
          <Descriptions.Item label={'邮箱'}>{userData.email}</Descriptions.Item>
          {(userData.userRoles ?? []).length > 0 && (
            <Descriptions.Item label="角色" span={3}>
              {(userData.userRoles ?? []).join(', ')}
            </Descriptions.Item>
          )}
          {(userData.userRolePermissions ?? []).length > 0 && (
            <Descriptions.Item label="权限" span={3}>
              {(userData.userRolePermissions ?? []).map((item) => item.replace(/-build-in/g, '')).join(', ')}
            </Descriptions.Item>
          )}
        </Descriptions>
      </div>

      <div className="row">
        <Button
          onClick={() => {
            // setPageCase(EUserPageCase.CHANGE_PASSWORD);
          }}
        >
          修改密码
        </Button>
      </div>

      <div className="row">
        <Button
          type="link"
          onClick={() => {
            // window.electron.store.set(STORE_USER, IUserDB_default);
            // setIsAuthenticated(false);
            // setTimeout(() => {
            //   setPageCase(EUserPageCase.LOGIN);
            // }, 1000);

            dispatch(userLogoutAction() as any);
            navigate('/login');
          }}
          style={{ cursor: 'pointer', marginTop: 10, marginBottom: 14 }}
        >
          登出
        </Button>
      </div>
    </div>
  );
};
