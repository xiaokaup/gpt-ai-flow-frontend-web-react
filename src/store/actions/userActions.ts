import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IConstantGptAiFlowHandler } from '../../gpt-ai-flow-common/config/constantGptAiFlow';
import TSettingsWindow_2_userFile from '../../pages/1_page/settingsWindow_2_user/TSettingsWindow_2_user';
import IUserDBFile, { IUserDB } from '../../gpt-ai-flow-common/interface-database/IUserDB';
import { IReduxRootState } from '../reducer';
import { Dispatch } from 'react';
import { IUserData } from '../../gpt-ai-flow-common/interface-app/IUserData';
import TSettingsWindow_2_user from '../../pages/1_page/settingsWindow_2_user/TSettingsWindow_2_user';
import TBackendUserFile from '../../tools/3_unit/TBackendUser';

// type MyAction = {
//   type: string;
//   payload?: any;
// };

export const USER_GET_USER_PROFILE_BY_EMAIL_v2 = 'USER_GET_USER_PROFILE_BY_EMAIL';
export const getUserProfileByEmailAction_v2 =
  (email: string, env: IConstantGptAiFlowHandler) => async (dispatch: any, getState: () => IReduxRootState) => {
    try {
      const userFound: IUserDB = await TSettingsWindow_2_user.getUserProfileByEmail_v2(email, env);

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
  (email: string, password: string, first_name: string, last_name: string, env: IConstantGptAiFlowHandler) =>
  async (dispatch: any, getState: () => IReduxRootState) => {
    try {
      const newUser: IUserDB = await TSettingsWindow_2_user.authRegisterByEmailAndPassword_v0(
        {
          ...IUserDBFile.IUserDB_default,
          email: email,
          password: password,
          firstName: first_name,
          lastName: last_name ?? '',
        },
        env
      );

      if (!newUser?.id) {
        return new Error('注册失败，请再试一次或尝试另一个电子邮件地址');
      }

      dispatch({ type: USER_SIGN_UP, payload: newUser });

      return newUser;
    } catch (error) {
      console.log('user signUp error', error);
    }
  };

export const SYNC_USER = 'SYNC_USER';
export const syncUserAction =
  (userId: string, userAccessToken: string, env: IConstantGptAiFlowHandler) =>
  async (dispatch: any, getState: () => IReduxRootState) => {
    try {
      const userResults = await TBackendUserFile.getUser(userId, userAccessToken, env);

      return userResults;
    } catch (error) {
      console.log('syncUserAction error', error);
    }
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
