import IStoreStorageFile, {
  IStoreStorage_settings_local,
} from '../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { SAVE_LOCAL } from '../actions/localActions';
import { USER_LOGOUT } from '../actions/userActions';
import { IAction } from '../store';

export const localReducer = (
  state: IStoreStorage_settings_local = IStoreStorageFile.IStoreStorage_settings_local_default,
  action: IAction,
) => {
  const { type, payload } = action;
  switch (type) {
    case SAVE_LOCAL:
      return payload;
    case USER_LOGOUT:
      return IStoreStorageFile.IStoreStorage_settings_local_default;
    default:
      return state;
  }
};
