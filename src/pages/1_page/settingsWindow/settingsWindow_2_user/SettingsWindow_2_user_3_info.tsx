import '../../../../styles/global.css';
import '../../../../styles/layout.scss';

import { useEffect } from 'react';

import { Button, Descriptions } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogoutAction } from '../../../../store/actions/userActions';
import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { to_deprecate_IUserData as IUserData } from '../../../../gpt-ai-flow-common/interface-app/3_unit/to_deprecate_IUserData';

interface ISettingsWindow_2_user_3_info_input {
  t: IGetT_frontend_output;
  userData: IUserData;
  isAuthenticated: boolean;
}
export const SettingsWindow_2_user_3_info = (props: ISettingsWindow_2_user_3_info_input) => {
  const { t, userData, isAuthenticated } = props;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/app/login');
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
          title={t.get('Personal Information')}
          // layout="vertical"
          // column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          {/* <Descriptions.Item label={t('Account type')}>
            {internalRoles?.join(',') ?? 'User'}
          </Descriptions.Item> */}
          <Descriptions.Item label={t.get('First Name')}>{userData.firstName}</Descriptions.Item>
          <Descriptions.Item label={t.get('Last Name')}>{userData.lastName}</Descriptions.Item>
          <Descriptions.Item label={t.get('Display Name')}>{userData.displayName}</Descriptions.Item>
          <Descriptions.Item label={t.get('Email')}>{userData.email}</Descriptions.Item>
          {/* {(userData.roles ?? []).length > 0 && (
            <Descriptions.Item label={t.get('Role')} span={3}>
              {(userData.roles ?? []).join(', ')}
            </Descriptions.Item>
          )}
          {(userData.serviceCategories ?? []).length > 0 && (
            <Descriptions.Item label={t.get('Service Type')} span={3}>
              {(userData.serviceCategories ?? []).map((item) => item.replace(/-build-in/g, '')).join(', ')}
            </Descriptions.Item>
          )} */}
        </Descriptions>
      </div>

      <div className="row">
        <Button
          onClick={() => {
            navigate('/app/changePassword');
          }}
        >
          {t.get('Change password')}
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
              navigate('/app/login');
              window.location.reload();
            }, 1000);
          }}
          style={{ cursor: 'pointer', marginTop: 10, marginBottom: 14 }}
        >
          {t.get('Logout')}
        </Button>
      </div>
    </div>
  );
};
