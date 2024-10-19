import { useDispatch, useSelector } from 'react-redux';

import { ELocale } from '../../gpt-ai-flow-common/enum-app/ELocale';
import { updateUserPrompts_v3 } from '../../store/actions/prompts_v3Actions';
import { IUserDB } from '../../gpt-ai-flow-common/interface-database/IUserDB';
import { IPrompt_v3 } from '../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3';
import { ITokenDB_default } from '../../gpt-ai-flow-common/interface-database/ITokenDB';
import { usePrompts_v3_user_v2 } from '../../gpt-ai-flow-common/hooks/usePrompts_v3_user_v2';
import { IConstantGptAiFlowHandler } from '../../gpt-ai-flow-common/config/constantGptAiFlow';
import { IGetT_frontend_output } from '../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

import { PromptsWindow } from '.';
import { IReduxRootState } from '../../store/reducer';
import { IPrompt_v3_IPersonaModel } from '../../gpt-ai-flow-common/interface-app/2_component/IPrompt_v3/IPrompt_v3_IPersonaModel';

interface IPromptsWindowWrapper_input {
  userDB: IUserDB;
  webCase: {
    t: IGetT_frontend_output;
    locale: ELocale;
    env: IConstantGptAiFlowHandler;
  };
}
export const PromptsWindowWrapper = (props: IPromptsWindowWrapper_input) => {
  const dispatch = useDispatch();

  const { userDB, webCase } = props;
  const { t, env } = webCase;

  //   const { prompts_v3_user, setPrompts_v3_user } = usePrompts_v3_user();
  // const [prompts_v3_user, setPrompts_v3_user] = useState<IPrompt_v3[]>([]);
  const prompts_v3_userFromStorage: (IPrompt_v3 | IPrompt_v3_IPersonaModel)[] = useSelector(
    (state: IReduxRootState) => {
      return state.prompts_v3.user;
    },
  );

  const { prompts_v3_user, setPrompts_v3_user } = usePrompts_v3_user_v2({
    prompts_v3_userFromStorage,
    onChangePrompts_v3_user: (newPrompts_v3_user: (IPrompt_v3 | IPrompt_v3_IPersonaModel)[]) => {
      dispatch<any>(updateUserPrompts_v3(newPrompts_v3_user));
    },
  });

  const { Token: { accessToken } = ITokenDB_default } = userDB;

  console.log('prompts_v3_user in store', prompts_v3_user);

  return (
    <PromptsWindow
      t={t}
      prompts_v3_user={prompts_v3_user}
      setPrompts_v3_user={setPrompts_v3_user}
      accessToken={accessToken}
      env={env}
    />
  );
};
