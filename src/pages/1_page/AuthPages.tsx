import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { message } from 'antd';

import { IReduxRootState } from '../../store/reducer';
import { USER_LOGIN } from '../../store/actions/userActions';
import { saveLocalAction } from '../../store/actions/localActions';

import {
  IStoreStorage_settings_local,
  IStoreStorage_settings_local_default,
} from '../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { getUser } from '../../gpt-ai-flow-common/tools/3_unit/TBackendUser';
import { to_deprecate_IUserData as IUserData } from '../../gpt-ai-flow-common/interface-app/3_unit/to_deprecate_IUserData';
import { IGetT_frontend_output } from '../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../gpt-ai-flow-common/config/constantGptAiFlow';
import { ELocale } from '../../gpt-ai-flow-common/enum-app/ELocale';
import { ELLM_name } from '../../gpt-ai-flow-common/enum-backend/ELLM';

interface IAuthPage_input {
  t: IGetT_frontend_output;
}
export const AuthPage = (props: IAuthPage_input) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = props;

  const localSettingsFromStore: IStoreStorage_settings_local = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorage_settings_local_default;
  });

  const query = new URLSearchParams(useLocation().search);
  const userId = query.get('id');
  const accessToken = query.get('accessToken');
  const openAIApiKey = query.get('openAIApiKey');
  const anthropicApiKey = query.get('anthropicApiKey');
  const googleApiKey = query.get('googleApiKey');
  const proMode_llm_name = (query.get('proMode_llm_name') as ELLM_name) ?? ELLM_name.OPENAI_GPT_3_5_TURBO;
  const locale = (query.get('locale') as ELocale) ?? ELocale.DEFAULT;
  const redirect = query.get('redirect');

  const init = async () => {
    const userDataFound: IUserData = await getUser(userId, accessToken, t.currentLocale, CONSTANTS_GPT_AI_FLOW_COMMON);

    if (!userDataFound) {
      message.error(
        t.get(
          "Dear user, you must log in to your account to enjoy all the features of this software.\n\nIf you have already logged in but are still experiencing some issues, don't worry, try restarting the software to see if that helps.",
        ),
      );
      return;
    }

    const newLocalSettingsFromStore = { ...localSettingsFromStore };

    // Init apiKeys in store
    if (!newLocalSettingsFromStore.apiKeys) {
      newLocalSettingsFromStore.apiKeys = {
        openAIApiKey: '',
        anthropicApiKey: '',
        googleApiKey: '',
      };
    }

    newLocalSettingsFromStore.apiKeys.openAIApiKey = openAIApiKey.trim();
    newLocalSettingsFromStore.apiKeys.anthropicApiKey = anthropicApiKey.trim();
    newLocalSettingsFromStore.apiKeys.googleApiKey = googleApiKey.trim();

    if (proMode_llm_name) {
      newLocalSettingsFromStore.proMode.model_type = proMode_llm_name;
    }
    if (locale) {
      newLocalSettingsFromStore.locale = locale;
    }

    dispatch({ type: USER_LOGIN, payload: userDataFound });
    dispatch<IStoreStorage_settings_local | any>(saveLocalAction(newLocalSettingsFromStore));

    await new Promise((resolve) => setTimeout(resolve, 200)); // add a delay

    if (redirect && redirect === 'subscription') {
      navigate('/app/info#subscription');
    } else {
      navigate('/app/proMode/features');
    }

    window.location.reload();
  };

  useEffect(() => {
    console.log('Auth...');
    if (userId && accessToken) {
      init();
    } else {
      navigate('/app/login');
    }
  }, [userId, accessToken]);

  return <div className="p-20">{t.get('Auth')}...</div>;
};
