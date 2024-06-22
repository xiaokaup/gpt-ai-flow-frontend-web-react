import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IGetT_frontend_output } from '../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { useLocation } from 'react-router-dom';
import { IUserData } from '../../gpt-ai-flow-common/interface-app/3_unit/IUserData';
import { getUser } from '../../gpt-ai-flow-common/tools/3_unit/TBackendUser';
import { USER_LOGIN } from '../../store/actions/userActions';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../gpt-ai-flow-common/config/constantGptAiFlow';

interface IAuthPage_input {
  t: IGetT_frontend_output;
}
export const AuthPage = (props: IAuthPage_input) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = props;

  const query = new URLSearchParams(useLocation().search);
  const userId = query.get('id');
  const accessToken = query.get('accessToken');

  const init = async () => {
    const userDataFound: IUserData = await getUser(userId, accessToken, t.currentLocale, CONSTANTS_GPT_AI_FLOW_COMMON);
    console.log('userDataFound', userDataFound);
    dispatch({ type: USER_LOGIN, payload: userDataFound });
    setTimeout(() => {
      navigate('/proMode');
      window.location.reload();
    }, 200);
  };

  useEffect(() => {
    console.log('Auth...');
    if (userId && accessToken) {
      init();
    } else {
      navigate('/login');
    }
  }, [userId, accessToken]);

  return <div>{t.get('Auth')}...</div>;
};
