import { IConstantGptAiFlowHandler } from '../../gpt-ai-flow-common/config/constantGptAiFlow';
import { IUserDB } from '../../gpt-ai-flow-common/interface-database/IUserDB';
import TBackendUserFile from '../../gpt-ai-flow-common/tools/3_unit/TBackendUser';
import { ELocale } from '../../gpt-ai-flow-common/enum-app/ELocale';
import { IGetT_frontend_output } from '../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import TBackendAuthFile from '../../gpt-ai-flow-common/tools/3_unit/TBackendAuth';

import { to_deprecate_IUserData } from '../../gpt-ai-flow-common/interface-app/3_unit/to_deprecate_IUserData';

// type MyAction = {
//   type: string;
//   payload?: any;
// };

export const USER_GET_USER_PROFILE_BY_EMAIL_v2 = 'USER_GET_USER_PROFILE_BY_EMAIL';
export const getUserProfileByEmailAction_v2 =
  (email: string, locale: ELocale, env: IConstantGptAiFlowHandler) => async (dispatch: any) => {
    try {
      const userFound: IUserDB = await TBackendUserFile.getUserProfileByEmail_v2(email, locale, env);

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
  (email: string, password: string, locale: ELocale, env: IConstantGptAiFlowHandler) => async (dispatch: any) => {
    try {
      const userAndTokenData: IUserDB = await TBackendAuthFile.authLoginByEmailAndPassword(
        email,
        password,
        locale,
        env,
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
  (userDB: IUserDB, locale: ELocale, env: IConstantGptAiFlowHandler, uniqueCode: string | undefined) =>
  async (dispatch: any) => {
    try {
      const newUser: IUserDB = await TBackendUserFile.authRegisterByEmailAndPassword_v0(
        userDB,
        locale,
        env,
        uniqueCode,
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

export const UPDATTE_SPECIFIC_USER_DB = 'UPDATTE_SPECIFIC_USER_DB';
export const updateSpecificUserDB = (newUser: to_deprecate_IUserData | IUserDB) => async (dispatch: any) => {
  dispatch({ type: UPDATTE_SPECIFIC_USER_DB, payload: newUser });
};

export const USER_LOGOUT = 'USER_LOGOUT';
export const userLogoutAction =
  () =>
  async (dispatch: any): Promise<void> => {
    dispatch({ type: USER_LOGOUT });
  };

export const USER_RESET_PASSWORD_WITH_EMAIL = 'USER_RESET_PASSWORD_WITH_EMAIL';
export const userResetPasswordWithEmailAction =
  (t: IGetT_frontend_output, email: string, locale: ELocale, env: IConstantGptAiFlowHandler) =>
  async (dispatch: any) => {
    try {
      const userResults = await TBackendAuthFile.resetPasswordWithEmail(email, locale, env);

      if (!userResults) {
        return new Error(t.get('This email was not registered in, please try again or try another email address'));
      }

      dispatch({ type: USER_RESET_PASSWORD_WITH_EMAIL, payload: userResults });

      return userResults;
    } catch (error) {
      console.log('userResetPasswordWithEmailAction error', error);
    }
  };

export const USER_UPDATE_USER_PASSWORD_V1 = 'USER_UPDATE_USER_PASSWORD_V1';
export const userUpdateUserPasswordActionAction_v1 =
  (
    t: IGetT_frontend_output,
    userId: number,
    newPassword: string,
    accessToken: string,
    locale: ELocale,
    env: IConstantGptAiFlowHandler,
  ) =>
  async (dispatch: any) => {
    try {
      const userResults = await TBackendAuthFile.updateUserPassword_v1(
        t,
        userId,
        newPassword,
        accessToken,
        locale,
        env,
      );

      dispatch({ type: USER_UPDATE_USER_PASSWORD_V1, payload: userResults });

      return userResults;
    } catch (error) {
      console.log('userResetPasswordWithEmailAction error', error);
    }
  };
