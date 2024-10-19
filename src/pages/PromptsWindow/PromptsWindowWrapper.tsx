import { useState } from 'react';
import { PromptsWindow } from '.';
import { IUserDB } from '../../gpt-ai-flow-common/interface-database/IUserDB';
import { ITokenDB_default } from '../../gpt-ai-flow-common/interface-database/ITokenDB';
import { IPrompt_v3 } from '../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3';
import { IConstantGptAiFlowHandler } from '../../gpt-ai-flow-common/config/constantGptAiFlow';
import { ELocale } from '../../gpt-ai-flow-common/enum-app/ELocale';
import { IGetT_frontend_output } from '../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

interface IPromptsWindowWrapper_input {
  userDB: IUserDB;
  webCase: {
    t: IGetT_frontend_output;
    locale: ELocale;
    env: IConstantGptAiFlowHandler;
  };
}
export const PromptsWindowWrapper = (props: IPromptsWindowWrapper_input) => {
  const { userDB, webCase } = props;
  const { t, env } = webCase;

  //   const { prompts_v3_user, setPrompts_v3_user } = usePrompts_v3_user();
  const [prompts_v3_user, setPrompts_v3_user] = useState<IPrompt_v3[]>([]);

  const { Token: { accessToken } = ITokenDB_default } = userDB;

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
