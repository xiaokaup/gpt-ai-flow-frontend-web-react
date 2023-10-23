import IUserDataFile, { IUserData } from '../../gpt-ai-flow-common/interface-app/IUserData';
import {
  USER_GET_USER_PROFILE_BY_EMAIL_v2,
  USER_LOGIN,
  USER_LOGOUT,
  USER_SIGN_UP,
  USER_UPDATE_USER_PASSWORD_V1,
  UPDATE_USER_ROLES_AND_USER_PERMISSIONS,
} from '../actions/userActions';
import { IAction } from '../store';

export type IUserReducerState = IUserData;

export const userReducer = (state: IUserReducerState = IUserDataFile.IUserData_default, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN:
      return payload;
    case UPDATE_USER_ROLES_AND_USER_PERMISSIONS:
      if (state.userRoles.length === payload.userRoles?.length) return state;
      if (state.userRolePermissions.length === payload.userRolePermissions?.length) return state;

      return { ...state, ...payload };
    case USER_LOGOUT:
      return IUserDataFile.IUserData_default;
    case USER_UPDATE_USER_PASSWORD_V1:
    case USER_GET_USER_PROFILE_BY_EMAIL_v2:
    case USER_SIGN_UP:
    default:
      return state;
  }
};
