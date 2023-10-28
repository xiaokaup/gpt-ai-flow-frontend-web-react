import IUserDataFile, { IUserData } from '../../gpt-ai-flow-common/interface-app/IUserData';
import {
  USER_GET_USER_PROFILE_BY_EMAIL_v2,
  USER_LOGIN,
  USER_LOGOUT,
  USER_SIGN_UP,
  USER_UPDATE_USER_PASSWORD_V1,
  UPDATE_ROLES_AND_PERMISSIONS_AND_IS_BETA_USER,
} from '../actions/userActions';
import { IAction } from '../store';

export type IUserReducerState = IUserData;

export const userReducer = (state: IUserReducerState = IUserDataFile.IUserData_default, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN:
      return payload;
    case UPDATE_ROLES_AND_PERMISSIONS_AND_IS_BETA_USER:
      if (state.roles.length === payload.roles?.length) return state;
      if (state.permissions.length === payload.permissions?.length) return state;
      if (state.isBetaUser === payload.isBetaUser) return state;

      const newUniqueRoles = Array.from(new Set([...state.roles, ...payload.roles]));
      const newUniquePermissions = Array.from(new Set([...state.permissions, ...payload.permissions]));

      return { ...state, roles: newUniqueRoles, permissions: newUniquePermissions, isBetaUser: payload.isBetaUser };
    case USER_LOGOUT:
      return IUserDataFile.IUserData_default;
    case USER_UPDATE_USER_PASSWORD_V1:
    case USER_GET_USER_PROFILE_BY_EMAIL_v2:
    case USER_SIGN_UP:
    default:
      return state;
  }
};
