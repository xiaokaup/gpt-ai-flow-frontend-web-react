import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { message } from 'antd';

import { IReduxRootState } from '../../store/reducer';
import { USER_LOGIN } from '../../store/actions/userActions';
import { saveLocalAction } from '../../store/actions/localActions';

import {
  IStoreStorageLocalSettings,
  IStoreStorageLocalSettings_default,
} from '../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { getUser } from '../../gpt-ai-flow-common/tools/3_unit/TBackendUser';
import { IUserData } from '../../gpt-ai-flow-common/interface-app/3_unit/IUserData';
import { IGetT_frontend_output } from '../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../gpt-ai-flow-common/config/constantGptAiFlow';

interface IAuthPage_input {
  t: IGetT_frontend_output;
}
export const AuthPage = (props: IAuthPage_input) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = props;

  const localFromStore: IStoreStorageLocalSettings = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorageLocalSettings_default;
  });

  const query = new URLSearchParams(useLocation().search);
  const userId = query.get('id');
  const accessToken = query.get('accessToken');
  const openAIApiKey = query.get('openAIApiKey');

  const init = async () => {
    const userDataFound: IUserData = await getUser(userId, accessToken, t.currentLocale, CONSTANTS_GPT_AI_FLOW_COMMON);
    console.log('userDataFound', userDataFound);

    if (!userDataFound) {
      message.error(
        t.get(
          "Dear user, you must log in to your account to enjoy all the features of this software.\n\nIf you have already logged in but are still experiencing some issues, don't worry, try restarting the software to see if that helps.",
        ),
      );
      return;
    }

    dispatch({ type: USER_LOGIN, payload: userDataFound });
    dispatch<IStoreStorageLocalSettings | any>(
      saveLocalAction({
        ...localFromStore,
        openAIApiKey: openAIApiKey.trim(),
      }),
    );
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

  return <div className="p-20">{t.get('Auth')}...</div>;
};
