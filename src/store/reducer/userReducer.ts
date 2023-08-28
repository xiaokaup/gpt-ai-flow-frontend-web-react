import IUserDataFile, { IUserData } from '../../gpt-ai-flow-common/interface-app/IUserData';
import { USER_LOGIN } from '../actions/userActions';
import { IAction } from '../store';

export type IUserReducerState = IUserData;

export const userReducer = (state: IUserReducerState = IUserDataFile.IUserData_default, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN:
      return payload;
    default:
      return state;
  }
};
