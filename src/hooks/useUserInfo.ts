import { useEffect, useState } from 'react';
import IUserDataFile, { IUserData } from '../gpt-ai-flow-common/interface-app/IUserData';
import { EUserRoleDB_name } from '../gpt-ai-flow-common/enum-database/EUserRoleDB';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxRootState } from '../store/reducer';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../gpt-ai-flow-common/config/constantGptAiFlow';
import IUserDBFile, { IUserDB } from '../gpt-ai-flow-common/interface-database/IUserDB';
// import { STORE_USER } from "../tools/4_base/TConstant";
// import TBackendUser from "../tools/3_unit/TBackendUser";
import { syncUserAction } from '../store/actions/userActions';

interface IUseUserInfo_ouput {
  userData: IUserData;
  isBetaUser: boolean;
  setUserData: React.Dispatch<React.SetStateAction<IUserData>>;
}
export const useUserInfo = (): IUseUserInfo_ouput => {
  const userDataFromStore: IUserData = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserDataFile.IUserData_default;
  });

  const dispatch = useDispatch();

  const [userData, setUserData] = useState<IUserData>(userDataFromStore);

  const { id: userId, token: { accessToken } = {} } = userData;

  const init = async () => {
    if (!userId || !accessToken) {
      return;
    }

    const userDBFromBackend: IUserDB = await dispatch(
      syncUserAction(userId.toString(), accessToken, CONSTANTS_GPT_AI_FLOW_COMMON) as any
    );
    const newUserData = IUserDBFile.convert_IUserDB_to_IUserData(userDBFromBackend);

    setUserData(newUserData);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    // window.electron.store.set(STORE_USER, userData);
  }, [userData]);

  return {
    userData: {
      ...userData,
      userRolePermissions: [
        // ...window.env.PROMODE_FREE_PROMODE_PERMISSIONS,
        ...(userData.userRolePermissions || []),
      ],
    },
    isBetaUser: userData.userRoles?.includes(EUserRoleDB_name.BETA) ?? false,
    setUserData,
  };
};
