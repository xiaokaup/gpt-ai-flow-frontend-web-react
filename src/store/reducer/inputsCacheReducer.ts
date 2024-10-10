import IInputsCacheFile, {
  to_deprecate_IInputsCache,
} from '../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';

import { USER_LOGOUT } from '../actions/userActions';
import { UPDATE_INPUTS_CACHE } from '../actions/inputsCacheActions';

import { IAction } from '../store';

export const inputsCacheReduer = (
  state: to_deprecate_IInputsCache = IInputsCacheFile.IInputsCache_default,
  action: IAction,
) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_INPUTS_CACHE:
      return payload;
    case USER_LOGOUT:
      return IInputsCacheFile.IInputsCache_default;
    default:
      return state;
  }
};
