import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IConstantGptAiFlowHandler } from '../../gpt-ai-flow-common/config/constantGptAiFlow';
import TSettingsWindow_2_userFile from '../../pages/1_page/settingsWindow_2_user/TSettingsWindow_2_user';
import { IUserDB } from '../../gpt-ai-flow-common/interface-database/IUserDB';
import { IReduxRootState } from '../reducer';
import { Dispatch } from 'react';
import { IUserData } from '../../gpt-ai-flow-common/interface-app/IUserData';

type MyAction = {
  type: string;
  payload?: any;
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

const userActionsFile = {
  authLoginByEmailAndPasswordAction,
};

export default userActionsFile;
