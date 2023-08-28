import IUserDataFile, { IUserData } from '../../gpt-ai-flow-common/interface-app/IUserData';
import { USER_GET_USER_PROFILE_BY_EMAIL_v2, USER_LOGIN, USER_SIGN_UP } from '../actions/userActions';
import { IAction } from '../store';

export type IUserReducerState = IUserData;

export const userReducer = (state: IUserReducerState = IUserDataFile.IUserData_default, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN:
      return payload;
    case USER_GET_USER_PROFILE_BY_EMAIL_v2:
    case USER_SIGN_UP:
    default:
      return state;
  }
};
