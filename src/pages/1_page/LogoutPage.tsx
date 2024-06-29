import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { userLogoutAction } from '../../store/actions/userActions';

import { IGetT_frontend_output } from '../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

interface ILogoutPage_input {
  t: IGetT_frontend_output;
}
export const LogoutPage = (props: ILogoutPage_input) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = props;

  useEffect(() => {
    dispatch(userLogoutAction() as any);
    setTimeout(() => {
      navigate('/app/login');
      window.location.reload();
    }, 1000);
  });

  return <div>{t.get('Logout')}...</div>;
};
