import { useEffect, useState } from 'react';
import { useUserInfo } from './useUserInfo';
import IProMode_v2File, { IProMode_v2 } from '../gpt-ai-flow-common/interface-backend/IProMode_v2';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../gpt-ai-flow-common/config/constantGptAiFlow';
import TCryptoJSFile from '../gpt-ai-flow-common/tools/TCrypto-js';
import { useDispatch, useSelector } from 'react-redux';
import { sync_proModeDataAction } from '../store/actions/proModeActions';
import { IReduxRootState } from '../store/reducer';

export const useProModeSetData = () => {
  const dispatch = useDispatch();

  const { userData } = useUserInfo();
  const { id: userId, token: { accessToken } = {} } = userData;

  const encryptedProModeSetFromStore: string = useSelector(
    (state: IReduxRootState) => state.proModeSet ?? IProMode_v2File.IProMode_v2_default
  );

  const proModeSetFromStore = TCryptoJSFile.decrypt(
    encryptedProModeSetFromStore,
    CONSTANTS_GPT_AI_FLOW_COMMON.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string
  );

  const [proModeSetData, setProModeSetData] = useState(proModeSetFromStore ?? IProMode_v2File.IProMode_v2_default);

  const init = async () => {
    if (!userId || !accessToken) {
      return IProMode_v2File.IProMode_v2_default;
    }

    const proModeSetFromBackend: IProMode_v2 = await dispatch(
      sync_proModeDataAction(userId.toString(), accessToken, TCryptoJSFile.decrypt, CONSTANTS_GPT_AI_FLOW_COMMON) as any
    );

    console.log('proModeSetFromBackend', proModeSetFromBackend);

    if (!proModeSetFromBackend) {
      return IProMode_v2File.IProMode_v2_default;
    }

    setProModeSetData(proModeSetFromBackend);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    // window.electron.store.set(STORE_PROMODE_SET, window.electron.crypto.getEncryptobjForFrontend(proModeSetData));
  }, [proModeSetData]);

  return { proModeSetData };
};
