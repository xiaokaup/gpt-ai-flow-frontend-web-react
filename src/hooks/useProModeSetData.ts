import { useEffect, useState } from 'react';
import { useUserInfo } from './useUserInfo';
import IProMode_v2File, { IProMode_v2 } from '../gpt-ai-flow-common/interface-backend/IProMode_v2';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../gpt-ai-flow-common/config/constantGptAiFlow';
import TBackendProModeDataFile from '../tools/3_unit/TBackendProModeData';
import TCryptoJSFile from '../gpt-ai-flow-common/tools/TCrypto-js';

export const useProModeSetData = () => {
  const { userData } = useUserInfo();
  const { id: userId, token: { accessToken } = {} } = userData;

  const proModeSetFromStore: IProMode_v2 = IProMode_v2File.IProMode_v2_default; // @DEVELOP

  const [proModeSetData, setProModeSetData] = useState(proModeSetFromStore ?? IProMode_v2File.IProMode_v2_default);

  const init = async () => {
    if (!userId || !accessToken) {
      return IProMode_v2File.IProMode_v2_default;
    }

    const proModeSetFromBackend: IProMode_v2 = await TBackendProModeDataFile.sync_proModeData(
      userId.toString(),
      accessToken,
      TCryptoJSFile.decrypt,
      CONSTANTS_GPT_AI_FLOW_COMMON
    );

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
