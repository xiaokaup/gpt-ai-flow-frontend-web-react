import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { EServiceCategoryDB_name } from '../../../gpt-ai-flow-common/enum-database/EServiceCategoryDB';
import IProMode_v2File, { IProMode_v2 } from '../../../gpt-ai-flow-common/interface-backend/IProMode_v2';
import { IProMode_v2_ContextTypes } from '../../../gpt-ai-flow-common/interface-backend/IProMode_v2/index_contextTypes';
import { IUserData } from '../../../gpt-ai-flow-common/interface-app/IUserData';
import { useProModeSetData } from '../../../gpt-ai-flow-common/hooks/useProModeSetData';
import TCryptoJSFile from '../../../gpt-ai-flow-common/tools/TCrypto-js';

import { IReduxRootState } from '../../../store/reducer/index';
import { updateProModeDataAction } from '../../../store/actions/proModeActions';
import { userLogoutAction } from '../../../store/actions/userActions';

import { ProModePage_copyWriting } from './1_pages/ProModePage_copyWriting';
import { ProModePage_xiaoHongShu } from './1_pages/ProModePage_xiaoHongShu';
import { ProModePage_seo } from './1_pages/ProModePage_seo';
import { ProModePage_comment } from './1_pages/ProModePage_comment';
import { ProModePage_communication } from './1_pages/ProModePage_communication';
import { ProModePage_career } from './1_pages/ProModePage_career';
import { ProModePage_upZhu } from './1_pages/ProModePage_upZhu';
import { ProModePage_productManager } from './1_pages/ProModePage_productManager';
import { ProModePage_marketingExpert } from './1_pages/ProModePage_marketingExpert';
import { ProModePage_ai } from './1_pages/ProModePage_ai';

import { ITabPanel } from '.';

interface useProModeSetDataUI_input {
  userDataFromStorage: IUserData;
  serviceCategories: string[];
}
export const useProModeSetDataUI = (props: useProModeSetDataUI_input) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { userDataFromStorage, serviceCategories } = props;

  const encryptedProModeSetFromStore: string = useSelector(
    (state: IReduxRootState) => state.proModeSet ?? IProMode_v2File.IProMode_v2_default
  );

  const proModeSetFromStorage = TCryptoJSFile.decrypt(
    encryptedProModeSetFromStore,
    CONSTANTS_GPT_AI_FLOW_COMMON.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string
  );

  const { proModeSetData } = useProModeSetData({
    userDataFromStorage,
    proModeSetData: proModeSetFromStorage,
    onProModeSetDataChange: (newPromodeSetData: Omit<IProMode_v2, EServiceCategoryDB_name.DEFAULT>) => {
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
    !PROMODE_SEO_DATA.tabInfo
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
        <ProModePage_communication
          PROMODE_DATA={PROMODE_COMMUNICATION_DATA}
          DEFAULT_CONTEXT_TYPE={PROMODE_COMMUNICATION_DATA.defaultContextType}
          defaultContextTypesForSelect={Object.keys(PROMODE_COMMUNICATION_DATA.context) as IProMode_v2_ContextTypes[]}
        />
      ),
      disabled: !serviceCategories.includes(EServiceCategoryDB_name.COMMUNICATION_MANAGER),
    },
    {
      key: EServiceCategoryDB_name.COPY_WRITING_MANAGER,
      label: PROMODE_COPY_WRITING_DATA.tabInfo.name,
      value: EServiceCategoryDB_name.COPY_WRITING_MANAGER,
      children: (
        <ProModePage_copyWriting
          PROMODE_DATA={PROMODE_COPY_WRITING_DATA}
          DEFAULT_CONTEXT_TYPE={PROMODE_COPY_WRITING_DATA.defaultContextType}
          defaultContextTypesForSelect={Object.keys(PROMODE_COPY_WRITING_DATA.context) as IProMode_v2_ContextTypes[]}
        />
      ),
      disabled: !serviceCategories.includes(EServiceCategoryDB_name.COPY_WRITING_MANAGER),
    },
    {
      key: EServiceCategoryDB_name.XIAO_HONG_SHU_MANAGER,
      label: PROMODE_XIAO_HONG_SHU_DATA.tabInfo.name,
      value: EServiceCategoryDB_name.XIAO_HONG_SHU_MANAGER,
      children: (
        <ProModePage_xiaoHongShu
          PROMODE_DATA={PROMODE_XIAO_HONG_SHU_DATA}
          DEFAULT_CONTEXT_TYPE={PROMODE_XIAO_HONG_SHU_DATA.defaultContextType}
          defaultContextTypesForSelect={Object.keys(PROMODE_XIAO_HONG_SHU_DATA.context) as IProMode_v2_ContextTypes[]}
        />
      ),
      disabled: !serviceCategories.includes(EServiceCategoryDB_name.XIAO_HONG_SHU_MANAGER),
    },
    {
      key: EServiceCategoryDB_name.AI_ASSISTANT,
      label: PROMODE_AI.tabInfo.name,
      value: EServiceCategoryDB_name.AI_ASSISTANT,
      children: (
        <ProModePage_ai
          PROMODE_DATA={PROMODE_AI}
          DEFAULT_CONTEXT_TYPE={PROMODE_AI.defaultContextType}
          defaultContextTypesForSelect={Object.keys(PROMODE_AI.context) as IProMode_v2_ContextTypes[]}
        />
      ),
      disabled: !serviceCategories.includes(EServiceCategoryDB_name.AI_ASSISTANT),
    },
    {
      key: EServiceCategoryDB_name.COMMENT_MANAGER,
      label: PROMODE_COMMENT_DATA.tabInfo.name,
      value: EServiceCategoryDB_name.COMMENT_MANAGER,
      children: (
        <ProModePage_comment
          PROMODE_DATA={PROMODE_COMMENT_DATA}
          DEFAULT_CONTEXT_TYPE={PROMODE_COMMENT_DATA.defaultContextType}
          defaultContextTypesForSelect={Object.keys(PROMODE_COMMENT_DATA.context) as IProMode_v2_ContextTypes[]}
        />
      ),
      disabled: !serviceCategories.includes(EServiceCategoryDB_name.COMMENT_MANAGER),
    },
    {
      key: EServiceCategoryDB_name.CAREER_MANAGER,
      label: PROMODE_CAREER_DATA.tabInfo.name,
      value: EServiceCategoryDB_name.CAREER_MANAGER,
      children: (
        <ProModePage_career
          PROMODE_DATA={PROMODE_CAREER_DATA}
          DEFAULT_CONTEXT_TYPE={PROMODE_CAREER_DATA.defaultContextType}
          defaultContextTypesForSelect={Object.keys(PROMODE_CAREER_DATA.context) as IProMode_v2_ContextTypes[]}
        />
      ),
      disabled: !serviceCategories.includes(EServiceCategoryDB_name.CAREER_MANAGER),
    },
    {
      key: EServiceCategoryDB_name.UP_ZHU,
      label: PROMODE_UP_ZHU_DATA.tabInfo.name,
      value: EServiceCategoryDB_name.UP_ZHU,
      children: (
        <ProModePage_upZhu
          PROMODE_DATA={PROMODE_UP_ZHU_DATA}
          DEFAULT_CONTEXT_TYPE={PROMODE_UP_ZHU_DATA.defaultContextType}
          defaultContextTypesForSelect={Object.keys(PROMODE_UP_ZHU_DATA.context) as IProMode_v2_ContextTypes[]}
        />
      ),
      disabled: !serviceCategories.includes(EServiceCategoryDB_name.UP_ZHU),
    },
    {
      key: EServiceCategoryDB_name.PRODUCT_MANAGER,
      label: PROMODE_PRODUCT_MANAGER.tabInfo.name,
      value: EServiceCategoryDB_name.PRODUCT_MANAGER,
      children: (
        <ProModePage_productManager
          PROMODE_DATA={PROMODE_PRODUCT_MANAGER}
          DEFAULT_CONTEXT_TYPE={PROMODE_PRODUCT_MANAGER.defaultContextType}
          defaultContextTypesForSelect={Object.keys(PROMODE_PRODUCT_MANAGER.context) as IProMode_v2_ContextTypes[]}
        />
      ),
      disabled: !serviceCategories.includes(EServiceCategoryDB_name.PRODUCT_MANAGER),
    },
    {
      key: EServiceCategoryDB_name.MARKETING_MANAGER,
      label: PROMODE_MARKETING_EXPERT.tabInfo.name,
      value: EServiceCategoryDB_name.MARKETING_MANAGER,
      children: (
        <ProModePage_marketingExpert
          PROMODE_DATA={PROMODE_MARKETING_EXPERT}
          DEFAULT_CONTEXT_TYPE={PROMODE_MARKETING_EXPERT.defaultContextType}
          defaultContextTypesForSelect={Object.keys(PROMODE_MARKETING_EXPERT.context) as IProMode_v2_ContextTypes[]}
        />
      ),
      disabled: !serviceCategories.includes(EServiceCategoryDB_name.MARKETING_MANAGER),
    },
    {
      key: EServiceCategoryDB_name.SEO_MANAGER,
      label: PROMODE_SEO_DATA.tabInfo.name,
      value: EServiceCategoryDB_name.SEO_MANAGER,
      children: (
        <ProModePage_seo
          PROMODE_DATA={PROMODE_SEO_DATA}
          DEFAULT_CONTEXT_TYPE={PROMODE_SEO_DATA.defaultContextType}
          defaultContextTypesForSelect={Object.keys(PROMODE_SEO_DATA.context) as IProMode_v2_ContextTypes[]}
        />
      ),
      disabled: !serviceCategories.includes(EServiceCategoryDB_name.SEO_MANAGER),
    },
  ];

  return {
    defaultTabPanels,
  };
};
