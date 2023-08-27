import React from 'react';

import { IConstantGptAiFlowHandler } from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { IUserDB, IUserDB_default } from '../../../gpt-ai-flow-common/interface-database/IUserDB';
import { fetchWithRetry } from '../../../tools/4_base/TRequest';
import { removeEmptyValues } from '../../../tools/4_base/TEmpty';
import { getApiKeyHeadersForNodeBackend } from '../../../tools/2_component/TAuth';

// import { fetchWithRetry } from "../../../tools/4_base/TRequest";
// import { removeEmptyValues } from "../../../tools/4_base/TEmpty";
// import { IConstantGptAiFlowHandler } from "../../../main/preload";

// const getUserProfileByEmail_v2 = async (
//   email: string,
//   env: IConstantGptAiFlowHandler
// ): Promise<IUserDB> => {
//   const url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v2.0/get/user/email/${email}/`;

//   const results = await fetchWithRetry(url, {
//     method: "GET",
//     ...getApiKeyHeadersForNodeBackend(
//       {
//         admin_api_key: env.BACKEND_NODE.BACKEND_NODE_HTTPS_ADMIN_API_KEY,
//       },
//       env
//     ),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       return data.results;
//     });

//   return results;
// };

// const authRegisterByEmailAndPassword_v0 = async (
//   { email, password, firstName, lastName }: IUserDB,
//   env: IConstantGptAiFlowHandler
// ): Promise<IUserDB> => {
//   const newUserDB: IUserDB = IUserDB_default;
//   newUserDB.firstName = firstName;
//   newUserDB.lastName = lastName;
//   newUserDB.email = email;
//   newUserDB.password = password;
//   newUserDB.displayName = `${firstName} ${lastName}`;
//   newUserDB.providers = "password";
//   newUserDB.lastLoginAt = new Date();

//   const url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v0.0/post/auth/register/`;

//   const createdUser: IUserDB = await fetchWithRetry(url, {
//     method: "POST",
//     ...getApiKeyHeadersForNodeBackend({}, env),
//     body: JSON.stringify(removeEmptyValues(newUserDB)),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       return data.results;
//     })
//     .catch((error) => {
//       console.log("error", error);
//     });

//   return createdUser;
// };

const authLoginByEmailAndPassword = async (
  email: string,
  password: string,
  env: any | IConstantGptAiFlowHandler
): Promise<IUserDB> => {
  const url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v0.0/post/auth/login/`;

  const results = await fetchWithRetry(url, {
    method: 'POST',
    ...getApiKeyHeadersForNodeBackend({}, env),
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

// export const updateUserPassword_v1 = async (
//   userId: number,
//   newPassword: string,
//   accessToken: string,
//   env: IConstantGptAiFlowHandler
// ) => {
//   const url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v1.0/put/user/${userId}/password/`;

//   const results = await fetch(url, {
//     method: "PUT",
//     ...getApiKeyHeadersForNodeBackend(
//       {
//         accessToken,
//       },
//       env
//     ),
//     body: JSON.stringify({ password: newPassword }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       return data.results;
//     });

//   return results;
// };

// export const resetPasswordWithEmail = async (
//   email: string,
//   env: IConstantGptAiFlowHandler
// ) => {
//   const results = await fetch(
//     `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v0.0/post/auth/reset/userPassword/by/email/`,
//     {
//       method: "POST",
//       ...getApiKeyHeadersForNodeBackend({}, env),
//       body: JSON.stringify({ to: email }),
//     }
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       return data.results;
//     });

//   return results;
// };

const TSettingsWindow_2_userFile = {
  // === Singup - start ===
  //   getUserProfileByEmail_v2,
  //   authRegisterByEmailAndPassword_v0,
  // === Singup - end ===

  // === Login - start ===
  authLoginByEmailAndPassword,
  // === Login - end ===

  // === Change password - start ===
  //   updateUserPassword_v1,
  // === Change password - end ===

  // === Reset password - start ===
  //   resetPasswordWithEmail,
  // === Reset password - end ===
};

export default TSettingsWindow_2_userFile;
