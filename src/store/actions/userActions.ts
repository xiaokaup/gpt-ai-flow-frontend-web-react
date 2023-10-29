import { IConstantGptAiFlowHandler } from '../../gpt-ai-flow-common/config/constantGptAiFlow';
import { IUserDB } from '../../gpt-ai-flow-common/interface-database/IUserDB';
import { IUserData } from '../../gpt-ai-flow-common/interface-app/IUserData';
import TBackendUserFile from '../../gpt-ai-flow-common/tools/3_unit/TBackendUser';
import TSettingsWindow_2_user from '../../pages/1_page/settingsWindow/settingsWindow_2_user/TSettingsWindow_2_user';
import TSettingsWindow_2_userFile from '../../pages/1_page/settingsWindow/settingsWindow_2_user/TSettingsWindow_2_user';
import { IReduxRootState } from '../reducer';

// type MyAction = {
//   type: string;
//   payload?: any;
// };

export const USER_GET_USER_PROFILE_BY_EMAIL_v2 = 'USER_GET_USER_PROFILE_BY_EMAIL';
export const getUserProfileByEmailAction_v2 =
  (email: string, env: IConstantGptAiFlowHandler) => async (dispatch: any, getState: () => IReduxRootState) => {
    try {
      const userFound: IUserDB = await TBackendUserFile.getUserProfileByEmail_v2(email, env);

      if (userFound?.id) {
        return new Error('这个电子邮件已经注册');
      }

      dispatch({ type: USER_GET_USER_PROFILE_BY_EMAIL_v2, payload: userFound });
      return userFound;
    } catch (error) {
      console.log('getUserProfile error', error);
    }
  };

export const USER_LOGIN = 'USER_LOGIN';
export const authLoginByEmailAndPasswordAction =
  (email: string, password: string, env: IConstantGptAiFlowHandler) =>
  async (dispatch: any, getState: () => IReduxRootState) => {
    try {
      const userAndTokenData: IUserDB = await TSettingsWindow_2_userFile.authLoginByEmailAndPassword(
        email,
        password,
        env
      );
      if (!userAndTokenData) {
        throw new Error('用户的邮箱未被注册在或密码错误，如果多次有问题，请联系管理员');
      }

      dispatch({ type: USER_LOGIN, payload: userAndTokenData });

      return userAndTokenData;
    } catch (error) {
      console.log('getUserProfile error', error);
    }
  };

export const USER_SIGN_UP = 'USER_SIGN_UP';
export const authRegisterByEmailAndPasswordAction_v0 =
  (userDB: IUserDB, env: IConstantGptAiFlowHandler, uniqueCode: string | undefined) =>
  async (dispatch: any, getState: () => IReduxRootState) => {
    try {
      const newUser: IUserDB = await TBackendUserFile.authRegisterByEmailAndPassword_v0(userDB, env, uniqueCode);

      if (!newUser?.id) {
        return new Error('注册失败，请再试一次或尝试另一个电子邮件地址');
      }

      dispatch({ type: USER_SIGN_UP, payload: newUser });

      return newUser;
    } catch (error) {
      console.log('user signUp error', error);
    }
  };

export const UPDATTE_SPECIFIC_USER_DATA = 'UPDATTE_SPECIFIC_USER_DATA';
export const updateSpecificUserData =
  (newUser: IUserData) => async (dispatch: any, getState: () => IReduxRootState) => {
    dispatch({ type: UPDATTE_SPECIFIC_USER_DATA, payload: newUser });
  };

export const USER_LOGOUT = 'USER_LOGOUT';
export const userLogoutAction = () => async (dispatch: any, getState: () => IReduxRootState) => {
  dispatch({ type: USER_LOGOUT });
};

export const USER_RESET_PASSWORD_WITH_EMAIL = 'USER_RESET_PASSWORD_WITH_EMAIL';
export const userResetPasswordWithEmailAction =
  (email: string, env: IConstantGptAiFlowHandler) => async (dispatch: any, getState: () => IReduxRootState) => {
    try {
      const userResults = await TSettingsWindow_2_user.resetPasswordWithEmail(email, env);

      if (!userResults) {
        return new Error('这个电子邮件未被注册在，请再试一次或尝试另一个电子邮件地址');
      }

      dispatch({ type: USER_RESET_PASSWORD_WITH_EMAIL, payload: userResults });

      return userResults;
    } catch (error) {
      console.log('userResetPasswordWithEmailAction error', error);
    }
  };

export const USER_UPDATE_USER_PASSWORD_V1 = 'USER_UPDATE_USER_PASSWORD_V1';
export const userUpdateUserPasswordActionAction_v1 =
  (userId: number, newPassword: string, accessToken: string, env: IConstantGptAiFlowHandler) =>
  async (dispatch: any, getState: () => IReduxRootState) => {
    try {
      const userResults = await TSettingsWindow_2_user.updateUserPassword_v1(userId, newPassword, accessToken, env);

      dispatch({ type: USER_UPDATE_USER_PASSWORD_V1, payload: userResults });

      return userResults;
    } catch (error) {
      console.log('userResetPasswordWithEmailAction error', error);
    }
  };
