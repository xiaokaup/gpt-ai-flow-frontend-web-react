import { useEffect, useState } from "react";
import IUserDataFile, {
  IUserData,
} from "../gpt-ai-flow-common/interface-app/IUserData";
import { EUserRoleDB_name } from "../gpt-ai-flow-common/enum-database/EUserRoleDB";
// import { STORE_USER } from "../tools/4_base/TConstant";
// import TBackendUser from "../tools/3_unit/TBackendUser";

interface IUseUserInfo_ouput {
  userData: IUserData;
  isBetaUser: boolean;
  setUserData: React.Dispatch<React.SetStateAction<IUserData>>;
}
export const useUserInfo = (): IUseUserInfo_ouput => {
  //   const userDataFromStore: IUserData = window.electron.store.get(STORE_USER);

  const [userData, setUserData] = useState<IUserData>(
    // userDataFromStore ?? IUserDataFile.IUserData_default
    IUserDataFile.IUserData_default
  );

  const { id: userId, token: { accessToken } = {} } = userData;

  const init = async () => {
    if (!userId || !accessToken) {
      return;
    }

    // const userDBFromBackend = await TBackendUser.sync_user(
    //   userId.toString(),
    //   accessToken,
    //   window.env
    // );
    // const newUserData =
    //   IUserDBFile.convert_IUserDB_to_IUserData(userDBFromBackend);

    // setUserData(newUserData);
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
