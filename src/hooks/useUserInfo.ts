import { useEffect, useRef, useState } from 'react';

import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxRootState } from '../store/reducer';
import { syncUserAction } from '../store/actions/userActions';

import IUserDataFile, { IUserData } from '../gpt-ai-flow-common/interface-app/IUserData';
import { EUserRoleDB_name } from '../gpt-ai-flow-common/enum-database/EUserRoleDB';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../gpt-ai-flow-common/config/constantGptAiFlow';
import IUserDBFile, { IUserDB } from '../gpt-ai-flow-common/interface-database/IUserDB';

interface IUseUserInfo_ouput {
  isAuthenticated: boolean;
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
    if (!userDBFromBackend) {
      message.error('请您尝试重新登录账号 (无法获取用户数据)');
      return;
    }
    const newUserData = IUserDBFile.convert_IUserDB_to_IUserData(userDBFromBackend);

    // 使用 isMounted 标志检查组件是否还处于挂载状态
    if (isMounted.current) {
      setUserData({ ...userData, ...newUserData });
    }
  };

  // 使用 useRef 创建 isMounted 标志
  const isMounted = useRef(true);

  useEffect(() => {
    init();

    // 当组件卸载时，在清理函数中更新 isMounted 标志
    return () => {
      isMounted.current = false;
    };
  }, []);

  return {
    isAuthenticated: !!accessToken,
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
