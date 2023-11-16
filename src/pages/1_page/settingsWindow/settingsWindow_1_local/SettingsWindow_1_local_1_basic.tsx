import '../../../../styles/global.css';
import '../../../../styles/layout.scss';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Select, message } from 'antd';

import { IReduxRootState } from '../../../../store/reducer';
import { ILocalReducerState } from '../../../../store/reducer/localReducer';
import { saveLocalAction } from '../../../../store/actions/localActions';

import { EOpenAiModel } from '../../../../gpt-ai-flow-common/enum-backend/EOpenAIModel';
import { IUserData } from '../../../../gpt-ai-flow-common/interface-app/IUserData';
import { ISubscriptionDB_v2 } from '../../../../gpt-ai-flow-common/interface-database/ISubscriptionDB_v2';
import { EProductDB_version } from '../../../../gpt-ai-flow-common/enum-database/EProductDB';
import TSubscription_v2CommonFile from '../../../../gpt-ai-flow-common/tools/3_unit/TSbuscription_v2';

const getModelTypeOptions = (userData: IUserData, subscription_v2Data: ISubscriptionDB_v2) => {
  const { isBetaUser } = userData;
  const hasAvailableSubscriptionDB_v2 = TSubscription_v2CommonFile.checkSubscription_v2IsAvailable(subscription_v2Data);
  const hasAccessGPT_4 = hasAvailableSubscriptionDB_v2 || isBetaUser;

  if (
    hasAccessGPT_4 &&
    (isBetaUser || (new Date(subscription_v2Data.expiredAt) >= new Date() && subscription_v2Data.productLimitId === 2))
  ) {
    return [
      {
        value: EOpenAiModel.GPT_3_point_5_TURBO,
        label: EOpenAiModel.GPT_3_point_5_TURBO,
      },
      {
        value: EOpenAiModel.GPT_3_point_5_TUEBO_1106,
        label: EOpenAiModel.GPT_3_point_5_TUEBO_1106,
      },
      {
        value: EOpenAiModel.GPT_3_point_5_TUEBO_16K,
        label: EOpenAiModel.GPT_3_point_5_TUEBO_16K,
      },
      {
        value: EOpenAiModel.GPT_4_PREVIEW,
        label: EOpenAiModel.GPT_4_PREVIEW,
      },
      {
        value: EOpenAiModel.GPT_4,
        label: EOpenAiModel.GPT_4,
      },
    ];
  }

  return [
    {
      value: EOpenAiModel.GPT_3_point_5_TURBO,
      label: EOpenAiModel.GPT_3_point_5_TURBO,
    },
  ];
};

interface ISettingsWindow_1_local_basic_input {
  userData: IUserData;
  subscription_v2Data: ISubscriptionDB_v2;
}
export const SettingsWindow_1_local_basic = (props: ISettingsWindow_1_local_basic_input) => {
  const dispatch = useDispatch();

  const { userData, subscription_v2Data } = props;
  const subscriptionIsExpired = subscription_v2Data?.expiredAt && new Date(subscription_v2Data?.expiredAt) < new Date();

  const localFromStore: ILocalReducerState = useSelector((state: IReduxRootState) => {
    return state.local ?? {};
  });

  const [openAIApiKey, setOpenAIApiKey] = useState(localFromStore?.openAIApiKey);

  const [chatModeModelType, setChatModeModelType] = useState<EOpenAiModel>(
    localFromStore.chatMode?.model_type ?? EOpenAiModel.GPT_3_point_5_TURBO
  );
  const [proModeModelType, setProModeModelType] = useState<EOpenAiModel>(
    localFromStore.proMode?.model_type ?? EOpenAiModel.GPT_3_point_5_TURBO
  );

  const onSaveLocalSettings = () => {
    dispatch(
      saveLocalAction({
        ...localFromStore,
        openAIApiKey: openAIApiKey.trim(),
        chatMode: {
          model_type: chatModeModelType,
        },
        proMode: {
          model_type: proModeModelType,
        },
      }) as any
    );
  };

  return (
    <div id="SettingsWindow_1_local_1_basic" className="row">
      <div className="row">
        <div>
          <label htmlFor="openAIApiKeyInput">
            OpenAI API key
            <input
              type="text"
              id="openAIApiKeyInput"
              name="openAIApiKeyInput"
              value={openAIApiKey ?? ''}
              onChange={(e) => setOpenAIApiKey(e.target.value)}
            />
            <span>(目前仅支持 海外用户 及 带有 VPN 梯子的国内用户)</span>
          </label>
        </div>
        {!subscriptionIsExpired &&
          subscription_v2Data?.Product_Limit?.Product?.version === EProductDB_version.OFFICIAL_MODAL && (
            <div>
              <span>
                你已经选择使用官方模型解决方案，<b>此处无需填写</b>
              </span>
            </div>
          )}
        {subscriptionIsExpired &&
          subscription_v2Data?.Product_Limit?.Product?.version === EProductDB_version.OFFICIAL_MODAL && (
            <div>
              <span>
                你选择使用的官方模型解决方案，<b>已过期</b>，请到 <b>专业模式</b> 设置面板重启方案
              </span>
            </div>
          )}
      </div>

      {/* <div className="row" style={{ marginTop: '.75rem' }}>
        <div>
          <b>对话模式 大模型</b>
        </div>
        <Select
          value={chatModeModelType}
          showSearch
          placeholder="模型类型"
          optionFilterProp="children"
          onChange={(value: string) => {
            console.log(`selected ${value}`);
            setChatModeModelType(value as EOpenAiModel);
          }}
          onSearch={(value: string) => {
            console.log('search:', value);
          }}
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          options={modelTypeOptions}
        />
      </div> */}
      <div className="row" style={{ marginTop: '.75rem' }}>
        <div>
          <b>专业模式 大模型</b>
        </div>
        <Select
          value={proModeModelType}
          showSearch
          placeholder="模型类型"
          optionFilterProp="children"
          onChange={(value: string) => {
            console.log(`selected ${value}`);
            setProModeModelType(value as EOpenAiModel);
          }}
          onSearch={(value: string) => {
            console.log('search:', value);
          }}
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          options={getModelTypeOptions(userData, subscription_v2Data)}
          style={{
            width: 200,
          }}
        />
      </div>
      <div className="row" style={{ marginTop: '.75rem' }}>
        <Button
          type="primary"
          id="userSaveSettingsBtn"
          onClick={() => {
            onSaveLocalSettings();
            message.success('保存成功');
          }}
        >
          保存
        </Button>
      </div>
    </div>
  );
};
