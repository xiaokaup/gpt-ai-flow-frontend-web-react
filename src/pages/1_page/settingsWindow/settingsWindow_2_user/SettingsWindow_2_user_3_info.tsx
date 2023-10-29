import '../../../../styles/global.css';
import '../../../../styles/layout.scss';

import React, { useEffect } from 'react';

import { Button, Descriptions } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogoutAction } from '../../../../store/actions/userActions';
import { IUserData } from '../../../../gpt-ai-flow-common/interface-app/IUserData';

interface ISettingsWindow_2_user_3_info_input {
  userData: IUserData;
  isAuthenticated: boolean;
}
export const SettingsWindow_2_user_3_info = (props: ISettingsWindow_2_user_3_info_input) => {
  const { userData, isAuthenticated } = props;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // const { setPageCase, setIsAuthenticated } = props;

  return (
    <div className="row">
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
          {(userData.roles ?? []).length > 0 && (
            <Descriptions.Item label="角色" span={3}>
              {(userData.roles ?? []).join(', ')}
            </Descriptions.Item>
          )}
          {(userData.serviceCategories ?? []).length > 0 && (
            <Descriptions.Item label="服务类型" span={3}>
              {(userData.serviceCategories ?? []).map((item) => item.replace(/-build-in/g, '')).join(', ')}
            </Descriptions.Item>
          )}
        </Descriptions>
      </div>

      <div className="row">
        <Button
          onClick={() => {
            navigate('/changePassword');
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
            setTimeout(() => {
              navigate('/login');
              window.location.reload();
            }, 1000);
          }}
          style={{ cursor: 'pointer', marginTop: 10, marginBottom: 14 }}
        >
          登出
        </Button>
      </div>
    </div>
  );
};
