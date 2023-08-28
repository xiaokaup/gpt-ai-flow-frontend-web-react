import { IUserDB } from '../../gpt-ai-flow-common/interface-database/IUserDB';
import { fetchWithRetry } from '../../tools/4_base/TRequest';
import { getApiKeyHeadersForNodeBackend } from '../../tools/2_component/TAuth';
import { IConstantGptAiFlowHandler } from '../../gpt-ai-flow-common/config/constantGptAiFlow';

// === Request - start ===
export const getUser = async (
  userId: string,
  accessToken: string,
  env: IConstantGptAiFlowHandler
): Promise<IUserDB> => {
  const url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v1.0/get/user/${userId}/?hasToken=true&hasUserRolePermission=true`;

  const results = await fetchWithRetry(url, {
    method: 'GET',
    ...getApiKeyHeadersForNodeBackend(
      {
        accessToken,
      },
      env
    ),
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

// export const addUserRoleForUser = async (
//   userId: string,
//   userRoleId: string,
//   accessToken: string,
//   env: IConstantGptAiFlowHandler
// ): Promise<any> => {
//   const url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v1.0/get/user/${userId}/add/userRole/${userRoleId}/`;

//   const results = await fetchWithRetry(url, {
//     method: 'GET',
//     ...getApiKeyHeadersForNodeBackend(
//       {
//         accessToken,
//       },
//       env
//     ),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       return data.results;
//     })
//     .catch((error) => {
//       console.log('error', error);
//     });

//   return results;
// };

// export const removeUserRoleFromUser = async (
//   userId: string,
//   userRoleId: string,
//   accessToken: string,
//   env: IConstantGptAiFlowHandler
// ): Promise<any> => {
//   const url = `${env.BACKEND_NODE.ENDPOINT_BACKEND_NODE_HTTPS}/v1.0/delete/user/${userId}/remove/userRole/${userRoleId}/`;

//   const results = await fetchWithRetry(url, {
//     method: 'DELETE',
//     ...getApiKeyHeadersForNodeBackend(
//       {
//         accessToken,
//       },
//       env
//     ),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       return data.results;
//     })
//     .catch((error) => {
//       console.log('error', error);
//     });

//   return results;
// };
// === Request - end ===

const TBackendUserFile = {
  getUser,
  // addUserRoleForUser,
  // removeUserRoleFromUser,
};

export default TBackendUserFile;
