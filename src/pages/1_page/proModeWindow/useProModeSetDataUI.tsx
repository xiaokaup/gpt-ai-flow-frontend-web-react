import React from 'react';
import { EUserRolePermissionDB_name } from '../../../gpt-ai-flow-common/enum-database/EUserRolePermissionDB';
import {
  EProMode_v2_career_contextType,
  IProMode_v2_career,
} from '../../../gpt-ai-flow-common/interface-backend/IProMode_v2/IProMode_v2_career';
import {
  EProMode_v2_comment_contextType,
  IProMode_v2_comment,
} from '../../../gpt-ai-flow-common/interface-backend/IProMode_v2/IProMode_v2_comment';
import {
  EProMode_v2_communication_contextType,
  IProMode_v2_communication,
} from '../../../gpt-ai-flow-common/interface-backend/IProMode_v2/IProMode_v2_communication';
import {
  EProMode_v2_copyWriting_contextType,
  IProMode_v2_copyWriting,
} from '../../../gpt-ai-flow-common/interface-backend/IProMode_v2/IProMode_v2_copyWriting';
import {
  EProMode_v2_seo_contextType,
  IProMode_v2_seo,
} from '../../../gpt-ai-flow-common/interface-backend/IProMode_v2/IProMode_v2_seo';
import {
  EProMode_v2_xiaoHongShu_contextType,
  IProMode_v2_xiaoHongShu,
} from '../../../gpt-ai-flow-common/interface-backend/IProMode_v2/IProMode_v2_xiaoHongShu';
import {
  EProMode_v2_upZhu_contextType,
  IProMode_v2_upZhu,
} from '../../../gpt-ai-flow-common/interface-backend/IProMode_v2/IProMode_v2_upZhu';
import {
  EProMode_v2_productManager_contextType,
  IProMode_v2_productManager,
} from '../../../gpt-ai-flow-common/interface-backend/IProMode_v2/IProMode_v2_productManager';
import {
  EProMode_v2_marketingExpert_contextType,
  IProMode_v2_marketingExpert,
} from '../../../gpt-ai-flow-common/interface-backend/IProMode_v2/IProMode_v2_marketingExpert';

import { useProModeSetData } from '../../../hooks/useProModeSetData';

import { ITabPanel } from '.';

import { ProModePage_copyWriting } from './1_pages/ProModePage_copyWriting';
import { ProModePage_xiaoHongShu } from './1_pages/ProModePage_xiaoHongShu';
import { ProModePage_seo } from './1_pages/ProModePage_seo';
import { ProModePage_comment } from './1_pages/ProModePage_comment';
import { ProModePage_communication } from './1_pages/ProModePage_communication';
import { ProModePage_career } from './1_pages/ProModePage_career';
import { ProModePage_upZhu } from './1_pages/ProModePage_upZhu';
import { ProModePage_productManager } from './1_pages/ProModePage_productManager';
import { ProModePage_marketingExpert } from './1_pages/ProModePage_marketingExpert';

interface useProModeSetDataUI_input {
  userRolePermissionsWithStripeSubscriptionInfo: string[];
}
export const useProModeSetDataUI = (props: useProModeSetDataUI_input) => {
  const { userRolePermissionsWithStripeSubscriptionInfo } = props;

  const { proModeSetData: proModeSetFromStore } = useProModeSetData();

  const PROMODE_COPY_WRITING_DATA = proModeSetFromStore[
    EUserRolePermissionDB_name.COPY_WRITING
  ] as IProMode_v2_copyWriting;
  const PROMODE_XIAO_HONG_SHU_DATA = proModeSetFromStore[
    EUserRolePermissionDB_name.XIAO_HONG_SHU
  ] as IProMode_v2_xiaoHongShu;
  const PROMODE_SEO_DATA = proModeSetFromStore[EUserRolePermissionDB_name.SEO] as IProMode_v2_seo;
  const PROMODE_COMMENT_DATA = proModeSetFromStore[EUserRolePermissionDB_name.COMMENT] as IProMode_v2_comment;
  const PROMODE_CAREER_DATA = proModeSetFromStore[EUserRolePermissionDB_name.CAREER] as IProMode_v2_career;
  const PROMODE_COMMUNICATION_DATA = proModeSetFromStore[
    EUserRolePermissionDB_name.COMMUNICATION
  ] as IProMode_v2_communication;
  const PROMODE_UP_ZHU_DATA = proModeSetFromStore[EUserRolePermissionDB_name.VIDEO_PRODUCTION] as IProMode_v2_upZhu;
  const PROMODE_UP_PRODUCT_MANAGER = proModeSetFromStore[
    EUserRolePermissionDB_name.PRODUCT
  ] as IProMode_v2_productManager;
  const PROMODE_UP_MARKETING_EXPERT = proModeSetFromStore[
    EUserRolePermissionDB_name.MARKETING
  ] as IProMode_v2_marketingExpert;

  const defaultTabPanels: ITabPanel[] = [
    {
      key: EUserRolePermissionDB_name.COMMUNICATION,
      label: PROMODE_COMMUNICATION_DATA.tabInfo.name,
      value: EUserRolePermissionDB_name.COMMUNICATION,
      children: (
        <ProModePage_communication
          PROMODE_DATA={PROMODE_COMMUNICATION_DATA}
          defaultContextPromptType={EProMode_v2_communication_contextType.BUILD_IN}
          defaultContextTypesForSelect={
            Object.keys(PROMODE_COMMUNICATION_DATA.context) as EProMode_v2_communication_contextType[]
          }
        />
      ),
      disabled: !userRolePermissionsWithStripeSubscriptionInfo.includes(EUserRolePermissionDB_name.COMMUNICATION),
    },
    {
      key: EUserRolePermissionDB_name.COPY_WRITING,
      label: PROMODE_COPY_WRITING_DATA.tabInfo.name,
      value: EUserRolePermissionDB_name.COPY_WRITING,
      children: (
        <ProModePage_copyWriting
          PROMODE_DATA={PROMODE_COPY_WRITING_DATA}
          defaultContextPromptType={EProMode_v2_copyWriting_contextType.BUILD_IN}
          defaultContextTypesForSelect={
            Object.keys(PROMODE_COPY_WRITING_DATA.context) as EProMode_v2_copyWriting_contextType[]
          }
        />
      ),
      disabled: !userRolePermissionsWithStripeSubscriptionInfo.includes(EUserRolePermissionDB_name.COPY_WRITING),
    },
    {
      key: EUserRolePermissionDB_name.XIAO_HONG_SHU,
      label: PROMODE_XIAO_HONG_SHU_DATA.tabInfo.name,
      value: EUserRolePermissionDB_name.XIAO_HONG_SHU,
      children: (
        <ProModePage_xiaoHongShu
          PROMODE_DATA={PROMODE_XIAO_HONG_SHU_DATA}
          defaultContextPromptType={EProMode_v2_xiaoHongShu_contextType.BUILD_IN}
          defaultContextTypesForSelect={
            Object.keys(PROMODE_XIAO_HONG_SHU_DATA.context) as EProMode_v2_xiaoHongShu_contextType[]
          }
        />
      ),
      disabled: !userRolePermissionsWithStripeSubscriptionInfo.includes(EUserRolePermissionDB_name.XIAO_HONG_SHU),
    },
    {
      key: EUserRolePermissionDB_name.SEO,
      label: PROMODE_SEO_DATA.tabInfo.name,
      value: EUserRolePermissionDB_name.SEO,
      children: (
        <ProModePage_seo
          PROMODE_DATA={PROMODE_SEO_DATA}
          defaultContextPromptType={EProMode_v2_seo_contextType.BUILD_IN}
          defaultContextTypesForSelect={Object.keys(PROMODE_SEO_DATA.context) as EProMode_v2_seo_contextType[]}
        />
      ),
      disabled: !userRolePermissionsWithStripeSubscriptionInfo.includes(EUserRolePermissionDB_name.SEO),
    },
    {
      key: EUserRolePermissionDB_name.COMMENT,
      label: PROMODE_COMMENT_DATA.tabInfo.name,
      value: EUserRolePermissionDB_name.COMMENT,
      children: (
        <ProModePage_comment
          PROMODE_DATA={PROMODE_COMMENT_DATA}
          defaultContextPromptType={EProMode_v2_comment_contextType.BUILD_IN}
          defaultContextTypesForSelect={Object.keys(PROMODE_COMMENT_DATA.context) as EProMode_v2_comment_contextType[]}
        />
      ),
      disabled: !userRolePermissionsWithStripeSubscriptionInfo.includes(EUserRolePermissionDB_name.COMMENT),
    },
    {
      key: EUserRolePermissionDB_name.CAREER,
      label: PROMODE_CAREER_DATA.tabInfo.name,
      value: EUserRolePermissionDB_name.CAREER,
      children: (
        <ProModePage_career
          PROMODE_DATA={PROMODE_CAREER_DATA}
          defaultContextPromptType={EProMode_v2_career_contextType.BUILD_IN}
          defaultContextTypesForSelect={Object.keys(PROMODE_CAREER_DATA.context) as EProMode_v2_career_contextType[]}
        />
      ),
      disabled: !userRolePermissionsWithStripeSubscriptionInfo.includes(EUserRolePermissionDB_name.CAREER),
    },
    {
      key: EUserRolePermissionDB_name.VIDEO_PRODUCTION,
      label: PROMODE_UP_ZHU_DATA.tabInfo.name,
      value: EUserRolePermissionDB_name.VIDEO_PRODUCTION,
      children: (
        <ProModePage_upZhu
          PROMODE_DATA={PROMODE_UP_ZHU_DATA}
          defaultContextPromptType={EProMode_v2_upZhu_contextType.KNOWLEDGE_SHARE}
          defaultContextTypesForSelect={Object.keys(PROMODE_UP_ZHU_DATA.context) as EProMode_v2_upZhu_contextType[]}
        />
      ),
      disabled: !userRolePermissionsWithStripeSubscriptionInfo.includes(EUserRolePermissionDB_name.VIDEO_PRODUCTION),
    },
    {
      key: EUserRolePermissionDB_name.PRODUCT,
      label: PROMODE_UP_PRODUCT_MANAGER.tabInfo.name,
      value: EUserRolePermissionDB_name.PRODUCT,
      children: (
        <ProModePage_productManager
          PROMODE_DATA={PROMODE_UP_PRODUCT_MANAGER}
          defaultContextPromptType={EProMode_v2_productManager_contextType.BUILD_IN}
          defaultContextTypesForSelect={
            Object.keys(PROMODE_UP_PRODUCT_MANAGER.context) as EProMode_v2_productManager_contextType[]
          }
        />
      ),
      disabled: !userRolePermissionsWithStripeSubscriptionInfo.includes(EUserRolePermissionDB_name.PRODUCT),
    },
    {
      key: EUserRolePermissionDB_name.MARKETING,
      label: PROMODE_UP_MARKETING_EXPERT.tabInfo.name,
      value: EUserRolePermissionDB_name.MARKETING,
      children: (
        <ProModePage_marketingExpert
          PROMODE_DATA={PROMODE_UP_MARKETING_EXPERT}
          defaultContextPromptType={EProMode_v2_marketingExpert_contextType.BUILD_IN}
          defaultContextTypesForSelect={
            Object.keys(PROMODE_UP_MARKETING_EXPERT.context) as EProMode_v2_marketingExpert_contextType[]
          }
        />
      ),
      disabled: !userRolePermissionsWithStripeSubscriptionInfo.includes(EUserRolePermissionDB_name.MARKETING),
    },
  ];

  return {
    defaultTabPanels,
  };
};
