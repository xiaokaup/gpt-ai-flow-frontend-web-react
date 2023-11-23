import IStoreStorageFile, {
  IStoreStorageLocalSettings,
} from '../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { SAVE_LOCAL } from '../actions/localActions';
import { USER_LOGOUT } from '../actions/userActions';
import { IAction } from '../store';

export const localReducer = (
  state: IStoreStorageLocalSettings = IStoreStorageFile.IStoreStorageLocalSettings_default,
  action: IAction
) => {
  const { type, payload } = action;
  switch (type) {
    case SAVE_LOCAL:
      return payload;
    case USER_LOGOUT:
      return IStoreStorageFile.IStoreStorageLocalSettings_default;
    default:
      return state;
  }
};
