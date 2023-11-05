import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { EServiceCategoryDB_name } from '../../../gpt-ai-flow-common/enum-database/EServiceCategoryDB';
import IProMode_v3File, {
  IProMode_v3,
  IProMode_v3_oneProMode,
} from '../../../gpt-ai-flow-common/interface-backend/IProMode_v3';
import { IUserData } from '../../../gpt-ai-flow-common/interface-app/IUserData';
import { useProModeSetData } from '../../../gpt-ai-flow-common/hooks/useProModeSetData';
import TCryptoJSFile from '../../../gpt-ai-flow-common/tools/TCrypto-js';

import { IReduxRootState } from '../../../store/reducer/index';
import { updateProModeDataAction } from '../../../store/actions/proModeActions';
import { userLogoutAction } from '../../../store/actions/userActions';

import { ProModePage_v3_01_communicationManager } from './1_pages/ProModePage_v3_01_communicationManager';
import { ProModePage_v3_02_copyWritingManager } from './1_pages/ProModePage_v3_02_copyWritingManager';
import { ProModePage_v3_03_xiaoHongShuManager } from './1_pages/ProModePage_v3_03_xiaoHongShuManager';
import { ProModePage_v3_04_aiAssistant } from './1_pages/ProModePage_v3_04_aiAssistant';
import { ProModePage_v3_05_commentManager } from './1_pages/ProModePage_v3_05_commentManager';
import { ProModePage_v3_06_careerManager } from './1_pages/ProModePage_v3_06_careerManager';
import { ProModePage_v3_07_upZhu } from './1_pages/ProModePage_v3_07_upZhu';
import { ProModePage_v3_08_productManager } from './1_pages/ProModePage_v3_08_productManager';
import { ProModePage_v3_09_marketingManager } from './1_pages/ProModePage_v3_09_marketingManager';
import { ProModePage_v3_10_seoManager } from './1_pages/ProModePage_v3_10_seoManager';
import { ProModePage_v3_11_customerAssistant } from './1_pages/ProModePage_v3_11_customerAssistant';

import { ITabPanel } from '.';
import {
  EProMode_v3_01_communicationManager_contextType,
  EProMode_v3_01_communicationManager_contextTypeStage,
} from 'gpt-ai-flow-common/interface-backend/IProMode_v3/IProMode_v3_01_communicationManager';
import {
  EProMode_v3_02_copyWritingManager_contextType,
  EProMode_v3_02_copyWritingManager_contextTypeStage,
} from 'gpt-ai-flow-common/interface-backend/IProMode_v3/IProMode_v3_02_copyWritingManager';
import {
  EProMode_v3_03_xiaoHongShuManager_contextType,
  EProMode_v3_03_xiaoHongShuManager_contextTypeStage,
} from 'gpt-ai-flow-common/interface-backend/IProMode_v3/IProMode_v3_03_xiaoHongShuManager';
import {
  EProMode_v3_04_aiAssistant_contextType,
  EProMode_v3_04_aiAssistant_contextTypeStage,
} from 'gpt-ai-flow-common/interface-backend/IProMode_v3/IProMode_v3_04_aiAssistant';
import {
  EProMode_v3_05_commentManager_contextType,
  EProMode_v3_05_commentManager_contextTypeStage,
} from 'gpt-ai-flow-common/interface-backend/IProMode_v3/IProMode_v3_05_commentManager';
import {
  EProMode_v3_06_careerManager_contextType,
  EProMode_v3_06_careerManager_contextTypeStage,
} from 'gpt-ai-flow-common/interface-backend/IProMode_v3/IProMode_v3_06_careerManager';
import {
  EProMode_v3_07_upZhu_contextType,
  EProMode_v3_07_upZhu_contextTypeStage,
} from 'gpt-ai-flow-common/interface-backend/IProMode_v3/IProMode_v3_07_upZhu';
import {
  EProMode_v3_08_productManager_contextType,
  EProMode_v3_08_productManager_contextTypeStage,
} from 'gpt-ai-flow-common/interface-backend/IProMode_v3/IProMode_v3_08_productManager';
import {
  EProMode_v3_09_marketingManager_contextType,
  EProMode_v3_09_marketingManager_contextTypeStage,
} from 'gpt-ai-flow-common/interface-backend/IProMode_v3/IProMode_v3_09_marketingManager';
import {
  EProMode_v3_10_seoManager_contextType,
  EProMode_v3_10_seoManager_contextTypeStage,
} from 'gpt-ai-flow-common/interface-backend/IProMode_v3/IProMode_v3_10_seoManager';
import {
  EProMode_v3_11_customerAssistant_contextType,
  EProMode_v3_11_customerAssistant_contextTypeStage,
} from 'gpt-ai-flow-common/interface-backend/IProMode_v3/IProMode_v3_11_customerAssistant';

interface useProModeSetDataUI_input {
  userDataFromStorage: IUserData;
  serviceCategories: string[];
}
export const useProModeSetDataUI = (props: useProModeSetDataUI_input) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { userDataFromStorage, serviceCategories } = props;

  const encryptedProModeSetFromStore: string = useSelector(
    (state: IReduxRootState) => state.proModeSet ?? IProMode_v3File.IProMode_v3_default
  );

  const proModeSetFromStorage: IProMode_v3 = TCryptoJSFile.decrypt(
    encryptedProModeSetFromStore,
    CONSTANTS_GPT_AI_FLOW_COMMON.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string
  );

  const { proModeSetData } = useProModeSetData({
    userDataFromStorage,
    proModeSetData: proModeSetFromStorage,
    onProModeSetDataChange: (newPromodeSetData: Omit<IProMode_v3, EServiceCategoryDB_name.DEFAULT>) => {
      dispatch(updateProModeDataAction(newPromodeSetData) as any);
    },
    getDecryptObj: TCryptoJSFile.decrypt,
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });

  const PROMODE_COMMUNICATION_DATA = proModeSetData[EServiceCategoryDB_name.COMMUNICATION_MANAGER];
  const PROMODE_COPY_WRITING_DATA = proModeSetData[EServiceCategoryDB_name.COPY_WRITING_MANAGER];
  const PROMODE_XIAO_HONG_SHU_DATA = proModeSetData[EServiceCategoryDB_name.XIAO_HONG_SHU_MANAGER];
  const PROMODE_AI = proModeSetData[EServiceCategoryDB_name.AI_ASSISTANT];
  const PROMODE_COMMENT_DATA = proModeSetData[EServiceCategoryDB_name.COMMENT_MANAGER];
  const PROMODE_CAREER_DATA = proModeSetData[EServiceCategoryDB_name.CAREER_MANAGER];
  const PROMODE_UP_ZHU_DATA = proModeSetData[EServiceCategoryDB_name.UP_ZHU];
  const PROMODE_PRODUCT_MANAGER = proModeSetData[EServiceCategoryDB_name.PRODUCT_MANAGER];
  const PROMODE_MARKETING_EXPERT = proModeSetData[EServiceCategoryDB_name.MARKETING_MANAGER];
  const PROMODE_SEO_DATA = proModeSetData[EServiceCategoryDB_name.SEO_MANAGER];
  const PROMODE_CUSTOMER_ASSISTANT_DATA = proModeSetData[EServiceCategoryDB_name.CUSTOMER_ASSISTANT];

  if (
    !PROMODE_COMMUNICATION_DATA ||
    !PROMODE_COMMUNICATION_DATA.tabInfo ||
    !PROMODE_COPY_WRITING_DATA ||
    !PROMODE_COPY_WRITING_DATA.tabInfo ||
    !PROMODE_XIAO_HONG_SHU_DATA ||
    !PROMODE_XIAO_HONG_SHU_DATA.tabInfo ||
    !PROMODE_AI ||
    !PROMODE_AI.tabInfo ||
    !PROMODE_COMMENT_DATA ||
    !PROMODE_COMMENT_DATA.tabInfo ||
    !PROMODE_CAREER_DATA ||
    !PROMODE_CAREER_DATA.tabInfo ||
    !PROMODE_UP_ZHU_DATA ||
    !PROMODE_UP_ZHU_DATA.tabInfo ||
    !PROMODE_PRODUCT_MANAGER ||
    !PROMODE_PRODUCT_MANAGER.tabInfo ||
    !PROMODE_MARKETING_EXPERT ||
    !PROMODE_MARKETING_EXPERT.tabInfo ||
    !PROMODE_SEO_DATA ||
    !PROMODE_SEO_DATA.tabInfo ||
    !PROMODE_CUSTOMER_ASSISTANT_DATA ||
    !PROMODE_CUSTOMER_ASSISTANT_DATA.tabInfo
  ) {
    dispatch(userLogoutAction() as any);
    setTimeout(() => {
      navigate('/login');
      window.location.reload();
    }, 1000);
  }

  const defaultTabPanels: ITabPanel[] = [
    {
      key: EServiceCategoryDB_name.COMMUNICATION_MANAGER,
      label: PROMODE_COMMUNICATION_DATA.tabInfo.name,
      value: EServiceCategoryDB_name.COMMUNICATION_MANAGER,
      children: (
        <ProModePage_v3_01_communicationManager
          PROMODE_DATA={
            PROMODE_COMMUNICATION_DATA as IProMode_v3_oneProMode<
              EProMode_v3_01_communicationManager_contextType,
              EProMode_v3_01_communicationManager_contextTypeStage
            >
          }
        />
      ),
      disabled: !serviceCategories.includes(EServiceCategoryDB_name.COMMUNICATION_MANAGER),
    },
    {
      key: EServiceCategoryDB_name.COPY_WRITING_MANAGER,
      label: PROMODE_COPY_WRITING_DATA.tabInfo.name,
      value: EServiceCategoryDB_name.COPY_WRITING_MANAGER,
      children: (
        <ProModePage_v3_02_copyWritingManager
          PROMODE_DATA={
            PROMODE_COPY_WRITING_DATA as IProMode_v3_oneProMode<
              EProMode_v3_02_copyWritingManager_contextType,
              EProMode_v3_02_copyWritingManager_contextTypeStage
            >
          }
        />
      ),
      disabled: !serviceCategories.includes(EServiceCategoryDB_name.COPY_WRITING_MANAGER),
    },
    {
      key: EServiceCategoryDB_name.XIAO_HONG_SHU_MANAGER,
      label: PROMODE_XIAO_HONG_SHU_DATA.tabInfo.name,
      value: EServiceCategoryDB_name.XIAO_HONG_SHU_MANAGER,
      children: (
        <ProModePage_v3_03_xiaoHongShuManager
          PROMODE_DATA={
            PROMODE_XIAO_HONG_SHU_DATA as IProMode_v3_oneProMode<
              EProMode_v3_03_xiaoHongShuManager_contextType,
              EProMode_v3_03_xiaoHongShuManager_contextTypeStage
            >
          }
        />
      ),
      disabled: !serviceCategories.includes(EServiceCategoryDB_name.XIAO_HONG_SHU_MANAGER),
    },
    {
      key: EServiceCategoryDB_name.AI_ASSISTANT,
      label: PROMODE_AI.tabInfo.name,
      value: EServiceCategoryDB_name.AI_ASSISTANT,
      children: (
        <ProModePage_v3_04_aiAssistant
          PROMODE_DATA={
            PROMODE_AI as IProMode_v3_oneProMode<
              EProMode_v3_04_aiAssistant_contextType,
              EProMode_v3_04_aiAssistant_contextTypeStage
            >
          }
        />
      ),
      disabled: !serviceCategories.includes(EServiceCategoryDB_name.AI_ASSISTANT),
    },
    {
      key: EServiceCategoryDB_name.CUSTOMER_ASSISTANT,
      label: PROMODE_CUSTOMER_ASSISTANT_DATA.tabInfo.name,
      value: EServiceCategoryDB_name.CUSTOMER_ASSISTANT,
      children: (
        <ProModePage_v3_11_customerAssistant
          PROMODE_DATA={
            PROMODE_CUSTOMER_ASSISTANT_DATA as IProMode_v3_oneProMode<
              EProMode_v3_11_customerAssistant_contextType,
              EProMode_v3_11_customerAssistant_contextTypeStage
            >
          }
        />
      ),
      disabled: !serviceCategories.includes(EServiceCategoryDB_name.CUSTOMER_ASSISTANT),
    },
    {
      key: EServiceCategoryDB_name.COMMENT_MANAGER,
      label: PROMODE_COMMENT_DATA.tabInfo.name,
      value: EServiceCategoryDB_name.COMMENT_MANAGER,
      children: (
        <ProModePage_v3_05_commentManager
          PROMODE_DATA={
            PROMODE_COMMENT_DATA as IProMode_v3_oneProMode<
              EProMode_v3_05_commentManager_contextType,
              EProMode_v3_05_commentManager_contextTypeStage
            >
          }
        />
      ),
      disabled: !serviceCategories.includes(EServiceCategoryDB_name.COMMENT_MANAGER),
    },
    {
      key: EServiceCategoryDB_name.CAREER_MANAGER,
      label: PROMODE_CAREER_DATA.tabInfo.name,
      value: EServiceCategoryDB_name.CAREER_MANAGER,
      children: (
        <ProModePage_v3_06_careerManager
          PROMODE_DATA={
            PROMODE_CAREER_DATA as IProMode_v3_oneProMode<
              EProMode_v3_06_careerManager_contextType,
              EProMode_v3_06_careerManager_contextTypeStage
            >
          }
        />
      ),
      disabled: !serviceCategories.includes(EServiceCategoryDB_name.CAREER_MANAGER),
    },
    {
      key: EServiceCategoryDB_name.UP_ZHU,
      label: PROMODE_UP_ZHU_DATA.tabInfo.name,
      value: EServiceCategoryDB_name.UP_ZHU,
      children: (
        <ProModePage_v3_07_upZhu
          PROMODE_DATA={
            PROMODE_UP_ZHU_DATA as IProMode_v3_oneProMode<
              EProMode_v3_07_upZhu_contextType,
              EProMode_v3_07_upZhu_contextTypeStage
            >
          }
        />
      ),
      disabled: !serviceCategories.includes(EServiceCategoryDB_name.UP_ZHU),
    },
    {
      key: EServiceCategoryDB_name.PRODUCT_MANAGER,
      label: PROMODE_PRODUCT_MANAGER.tabInfo.name,
      value: EServiceCategoryDB_name.PRODUCT_MANAGER,
      children: (
        <ProModePage_v3_08_productManager
          PROMODE_DATA={
            PROMODE_PRODUCT_MANAGER as IProMode_v3_oneProMode<
              EProMode_v3_08_productManager_contextType,
              EProMode_v3_08_productManager_contextTypeStage
            >
          }
        />
      ),
      disabled: !serviceCategories.includes(EServiceCategoryDB_name.PRODUCT_MANAGER),
    },
    {
      key: EServiceCategoryDB_name.MARKETING_MANAGER,
      label: PROMODE_MARKETING_EXPERT.tabInfo.name,
      value: EServiceCategoryDB_name.MARKETING_MANAGER,
      children: (
        <ProModePage_v3_09_marketingManager
          PROMODE_DATA={
            PROMODE_MARKETING_EXPERT as IProMode_v3_oneProMode<
              EProMode_v3_09_marketingManager_contextType,
              EProMode_v3_09_marketingManager_contextTypeStage
            >
          }
        />
      ),
      disabled: !serviceCategories.includes(EServiceCategoryDB_name.MARKETING_MANAGER),
    },
    {
      key: EServiceCategoryDB_name.SEO_MANAGER,
      label: PROMODE_SEO_DATA.tabInfo.name,
      value: EServiceCategoryDB_name.SEO_MANAGER,
      children: (
        <ProModePage_v3_10_seoManager
          PROMODE_DATA={
            PROMODE_SEO_DATA as IProMode_v3_oneProMode<
              EProMode_v3_10_seoManager_contextType,
              EProMode_v3_10_seoManager_contextTypeStage
            >
          }
        />
      ),
      disabled: !serviceCategories.includes(EServiceCategoryDB_name.SEO_MANAGER),
    },
  ];

  return {
    defaultTabPanels,
  };
};
