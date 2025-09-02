import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogoutAction } from '../../../store/actions/userActions';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

export const ProModeWindow_v6_logout = (props: { t: IGetT_frontend_output }) => {
  const { t } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  dispatch(userLogoutAction() as any);
  setTimeout(() => {
    navigate('/app/login');
    window.location.reload();
  }, 1000);

  return (
    <>
      {t.get(
        'Please go to the setup interface to log in the user first, and make sure that the package is in normal status',
      )}{' '}
      <Link to="/app/logout">{t.get('Logout')}</Link>
    </>
  );
};
