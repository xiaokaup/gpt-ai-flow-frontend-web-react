import {
  to_deprecate_IUserData,
  to_deprecate_IUserData_default,
} from '../../gpt-ai-flow-common/interface-app/3_unit/to_deprecate_IUserData';
import {
  USER_GET_USER_PROFILE_BY_EMAIL_v2,
  USER_LOGIN,
  USER_LOGOUT,
  USER_SIGN_UP,
  USER_UPDATE_USER_PASSWORD_V1,
  UPDATTE_SPECIFIC_USER_DATA,
} from '../actions/userActions';
import { IAction } from '../store';

export type IUserReducerState = to_deprecate_IUserData;

export const userReducer = (state: IUserReducerState = to_deprecate_IUserData_default, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN:
      return payload;
    case UPDATTE_SPECIFIC_USER_DATA:
      if (state.roles?.length === payload.roles?.length) return state;
      if (state.services?.length === payload.services?.length) return state;
      if (state.serviceCategories?.length === payload.serviceCategories?.length) return state;
      if (state.permissions?.length === payload.permissions?.length) return state;
      if (state.isBetaUser === payload.isBetaUser) return state;

      // === @TODELETE - start ===
      // eslint-disable-next-line no-case-declarations
      const newUniqueRoles = Array.from(new Set([...(state.roles ?? []), ...(payload.roles ?? [])]));
      // eslint-disable-next-line no-case-declarations
      const newUniqueServices = Array.from(new Set([...(state.services ?? []), ...(payload.services ?? [])]));
      // eslint-disable-next-line no-case-declarations
      const newUniqueServiceCategories = Array.from(
        new Set([...(state.serviceCategories ?? []), ...(payload.serviceCategories ?? [])]),
      );
      // eslint-disable-next-line no-case-declarations
      const newUniquePermissions = Array.from(new Set([...(state.permissions ?? []), ...(payload.permissions ?? [])]));
      // === @TODELETE - end ===

      return {
        ...state,
        roles: newUniqueRoles,
        services: newUniqueServices,
        serviceCategories: newUniqueServiceCategories,
        permissions: newUniquePermissions,
        isBetaUser: payload.isBetaUser,
      };
    case USER_LOGOUT:
      return to_deprecate_IUserData_default;
    case USER_UPDATE_USER_PASSWORD_V1:
    case USER_GET_USER_PROFILE_BY_EMAIL_v2:
    case USER_SIGN_UP:
    default:
      return state;
  }
};
