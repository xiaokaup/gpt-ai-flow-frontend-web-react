import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { EUserRoleDB_name } from '../../../gpt-ai-flow-common/enum-database/EUserRoleDB';
import IProMode_v2File, { IProMode_v2 } from '../../../gpt-ai-flow-common/interface-backend/IProMode_v2';
import TCryptoJSFile from '../../../gpt-ai-flow-common/tools/TCrypto-js';
import { IUserData } from '../../../gpt-ai-flow-common/interface-app/IUserData';
import { IProMode_v2_ContextTypes } from '../../../gpt-ai-flow-common/interface-backend/IProMode_v2/IProMode_contextTypes';
import { useProModeSetData } from '../../../gpt-ai-flow-common/hooks/useProModeSetData';

import { updateProModeDataAction } from '../../../store/actions/proModeActions';
import { IReduxRootState } from '../../../store/reducer/index';

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
  userRoles: string[];
}
export const useProModeSetDataUI = (props: useProModeSetDataUI_input) => {
  const dispatch = useDispatch();

  const { userDataFromStorage, userRoles } = props;

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
    onProModeSetDataChange: (newPromodeSetData: IProMode_v2) => {
      dispatch(updateProModeDataAction(newPromodeSetData) as any);
    },
    getDecryptObj: TCryptoJSFile.decrypt,
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });

  const PROMODE_COMMUNICATION_DATA = proModeSetData[EUserRoleDB_name.COMMUNICATION_MANAGER];
  const PROMODE_COPY_WRITING_DATA = proModeSetData[EUserRoleDB_name.COPY_WRITING_MANAGER];
  const PROMODE_XIAO_HONG_SHU_DATA = proModeSetData[EUserRoleDB_name.XIAO_HONG_SHU_MANAGER];
  const PROMODE_AI = proModeSetData[EUserRoleDB_name.AI_ASSISTANT];
  const PROMODE_COMMENT_DATA = proModeSetData[EUserRoleDB_name.COMMENT_MANAGER];
  const PROMODE_CAREER_DATA = proModeSetData[EUserRoleDB_name.CAREER_MANAGER];
  const PROMODE_UP_ZHU_DATA = proModeSetData[EUserRoleDB_name.UP_ZHU];
  const PROMODE_PRODUCT_MANAGER = proModeSetData[EUserRoleDB_name.PRODUCT_MANAGER];
  const PROMODE_MARKETING_EXPERT = proModeSetData[EUserRoleDB_name.MARKETING_MANAGER];
  const PROMODE_SEO_DATA = proModeSetData[EUserRoleDB_name.SEO_MANAGER];

  const defaultTabPanels: ITabPanel[] = [
    {
      key: EUserRoleDB_name.COMMUNICATION_MANAGER,
      label: PROMODE_COMMUNICATION_DATA.tabInfo.name,
      value: EUserRoleDB_name.COMMUNICATION_MANAGER,
      children: (
        <ProModePage_communication
          PROMODE_DATA={PROMODE_COMMUNICATION_DATA}
          DEFAULT_CONTEXT_TYPE={PROMODE_COMMUNICATION_DATA.defaultContextType}
          defaultContextTypesForSelect={Object.keys(PROMODE_COMMUNICATION_DATA.context) as IProMode_v2_ContextTypes[]}
        />
      ),
      disabled: !userRoles.includes(EUserRoleDB_name.COMMUNICATION_MANAGER),
    },
    {
      key: EUserRoleDB_name.COPY_WRITING_MANAGER,
      label: PROMODE_COPY_WRITING_DATA.tabInfo.name,
      value: EUserRoleDB_name.COPY_WRITING_MANAGER,
      children: (
        <ProModePage_copyWriting
          PROMODE_DATA={PROMODE_COPY_WRITING_DATA}
          DEFAULT_CONTEXT_TYPE={PROMODE_COPY_WRITING_DATA.defaultContextType}
          defaultContextTypesForSelect={Object.keys(PROMODE_COPY_WRITING_DATA.context) as IProMode_v2_ContextTypes[]}
        />
      ),
      disabled: !userRoles.includes(EUserRoleDB_name.COPY_WRITING_MANAGER),
    },
    {
      key: EUserRoleDB_name.XIAO_HONG_SHU_MANAGER,
      label: PROMODE_XIAO_HONG_SHU_DATA.tabInfo.name,
      value: EUserRoleDB_name.XIAO_HONG_SHU_MANAGER,
      children: (
        <ProModePage_xiaoHongShu
          PROMODE_DATA={PROMODE_XIAO_HONG_SHU_DATA}
          DEFAULT_CONTEXT_TYPE={PROMODE_XIAO_HONG_SHU_DATA.defaultContextType}
          defaultContextTypesForSelect={Object.keys(PROMODE_XIAO_HONG_SHU_DATA.context) as IProMode_v2_ContextTypes[]}
        />
      ),
      disabled: !userRoles.includes(EUserRoleDB_name.XIAO_HONG_SHU_MANAGER),
    },
    {
      key: EUserRoleDB_name.AI_ASSISTANT,
      label: PROMODE_AI.tabInfo.name,
      value: EUserRoleDB_name.AI_ASSISTANT,
      children: (
        <ProModePage_ai
          PROMODE_DATA={PROMODE_AI}
          DEFAULT_CONTEXT_TYPE={PROMODE_AI.defaultContextType}
          defaultContextTypesForSelect={Object.keys(PROMODE_AI.context) as IProMode_v2_ContextTypes[]}
        />
      ),
      disabled: !userRoles.includes(EUserRoleDB_name.AI_ASSISTANT),
    },
    {
      key: EUserRoleDB_name.COMMENT_MANAGER,
      label: PROMODE_COMMENT_DATA.tabInfo.name,
      value: EUserRoleDB_name.COMMENT_MANAGER,
      children: (
        <ProModePage_comment
          PROMODE_DATA={PROMODE_COMMENT_DATA}
          DEFAULT_CONTEXT_TYPE={PROMODE_COMMENT_DATA.defaultContextType}
          defaultContextTypesForSelect={Object.keys(PROMODE_COMMENT_DATA.context) as IProMode_v2_ContextTypes[]}
        />
      ),
      disabled: !userRoles.includes(EUserRoleDB_name.COMMENT_MANAGER),
    },
    {
      key: EUserRoleDB_name.CAREER_MANAGER,
      label: PROMODE_CAREER_DATA.tabInfo.name,
      value: EUserRoleDB_name.CAREER_MANAGER,
      children: (
        <ProModePage_career
          PROMODE_DATA={PROMODE_CAREER_DATA}
          DEFAULT_CONTEXT_TYPE={PROMODE_CAREER_DATA.defaultContextType}
          defaultContextTypesForSelect={Object.keys(PROMODE_CAREER_DATA.context) as IProMode_v2_ContextTypes[]}
        />
      ),
      disabled: !userRoles.includes(EUserRoleDB_name.CAREER_MANAGER),
    },
    {
      key: EUserRoleDB_name.UP_ZHU,
      label: PROMODE_UP_ZHU_DATA.tabInfo.name,
      value: EUserRoleDB_name.UP_ZHU,
      children: (
        <ProModePage_upZhu
          PROMODE_DATA={PROMODE_UP_ZHU_DATA}
          DEFAULT_CONTEXT_TYPE={PROMODE_UP_ZHU_DATA.defaultContextType}
          defaultContextTypesForSelect={Object.keys(PROMODE_UP_ZHU_DATA.context) as IProMode_v2_ContextTypes[]}
        />
      ),
      disabled: !userRoles.includes(EUserRoleDB_name.UP_ZHU),
    },
    {
      key: EUserRoleDB_name.PRODUCT_MANAGER,
      label: PROMODE_PRODUCT_MANAGER.tabInfo.name,
      value: EUserRoleDB_name.PRODUCT_MANAGER,
      children: (
        <ProModePage_productManager
          PROMODE_DATA={PROMODE_PRODUCT_MANAGER}
          DEFAULT_CONTEXT_TYPE={PROMODE_PRODUCT_MANAGER.defaultContextType}
          defaultContextTypesForSelect={Object.keys(PROMODE_PRODUCT_MANAGER.context) as IProMode_v2_ContextTypes[]}
        />
      ),
      disabled: !userRoles.includes(EUserRoleDB_name.PRODUCT_MANAGER),
    },
    {
      key: EUserRoleDB_name.MARKETING_MANAGER,
      label: PROMODE_MARKETING_EXPERT.tabInfo.name,
      value: EUserRoleDB_name.MARKETING_MANAGER,
      children: (
        <ProModePage_marketingExpert
          PROMODE_DATA={PROMODE_MARKETING_EXPERT}
          DEFAULT_CONTEXT_TYPE={PROMODE_MARKETING_EXPERT.defaultContextType}
          defaultContextTypesForSelect={Object.keys(PROMODE_MARKETING_EXPERT.context) as IProMode_v2_ContextTypes[]}
        />
      ),
      disabled: !userRoles.includes(EUserRoleDB_name.MARKETING_MANAGER),
    },
    {
      key: EUserRoleDB_name.SEO_MANAGER,
      label: PROMODE_SEO_DATA.tabInfo.name,
      value: EUserRoleDB_name.SEO_MANAGER,
      children: (
        <ProModePage_seo
          PROMODE_DATA={PROMODE_SEO_DATA}
          DEFAULT_CONTEXT_TYPE={PROMODE_SEO_DATA.defaultContextType}
          defaultContextTypesForSelect={Object.keys(PROMODE_SEO_DATA.context) as IProMode_v2_ContextTypes[]}
        />
      ),
      disabled: !userRoles.includes(EUserRoleDB_name.SEO_MANAGER),
    },
  ];

  return {
    defaultTabPanels,
  };
};
