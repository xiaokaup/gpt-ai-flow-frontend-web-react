import { AuthService } from '../../../../gpt-ai-flow-common/tools/2_class/SAuth';
import { IConstantGptAiFlowHandler } from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { IUserDB } from '../../../../gpt-ai-flow-common/interface-database/IUserDB';
import { removeEmptyValues } from '../../../../gpt-ai-flow-common/tools/4_base/TEmpty';
import { fetchWithRetry } from '../../../../gpt-ai-flow-common/tools/4_base/TRequest';
import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

const authLoginByEmailAndPassword = async (
  email: string,
  password: string,
  env: any | IConstantGptAiFlowHandler
): Promise<IUserDB> => {
  const url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v0.0/post/auth/login/`;

  const results = await fetchWithRetry(url, {
    method: 'POST',
    ...AuthService.getApiKeyHeadersForNodeBackend({}, env),
    body: JSON.stringify(removeEmptyValues({ email, password })),
  })
    .then((res) => res.json())
    .then((data) => {
      return data.results;
    })
    .catch((error) => {
      console.log('error', error);
    });

  return results;
};

export const updateUserPassword_v1 = async (
  t: IGetT_frontend_output,
  userId: number,
  newPassword: string,
  accessToken: string,
  env: IConstantGptAiFlowHandler
) => {
  const url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v1.0/put/user/${userId}/password/`;

  const results = await fetch(url, {
    method: 'PUT',
    ...AuthService.getApiKeyHeadersForNodeBackend(
      {
        accessToken,
      },
      env
    ),
    body: JSON.stringify({ password: newPassword }),
  })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error(t.get('Failed to change password, please enter the correct password'));
      }
      return res.json();
    })
    .then((data) => {
      return data.results;
    });

  return results;
};

export const resetPasswordWithEmail = async (email: string, env: IConstantGptAiFlowHandler) => {
  const results = await fetch(
    `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v0.0/post/auth/reset/userPassword/by/email/`,
    {
      method: 'POST',
      ...AuthService.getApiKeyHeadersForNodeBackend({}, env),
      body: JSON.stringify({ to: email }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data.results;
    });

  return results;
};

const TSettingsWindow_2_userFile = {
  // === Login - start ===
  authLoginByEmailAndPassword,
  // === Login - end ===

  // === Change password - start ===
  updateUserPassword_v1,
  // === Change password - end ===

  // === Reset password - start ===
  resetPasswordWithEmail,
  // === Reset password - end ===
};

export default TSettingsWindow_2_userFile;
