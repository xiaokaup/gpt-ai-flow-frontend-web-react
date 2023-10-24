import '../../../../styles/global.css';
import '../../../../styles/layout.scss';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Select, message } from 'antd';

import { EOpenAiModel } from '../../../../gpt-ai-flow-common/interface-app/IAIFlow';
import { IReduxRootState } from '../../../../store/reducer';
import { ILocalReducerState } from '../../../../store/reducer/localReducer';
import { saveLocalAction } from '../../../../store/actions/localActions';
import { ESubscriptionVersion } from '../../../../gpt-ai-flow-common/enum-app/ESubscription';
import { ISubscirptionMix } from '../../../../gpt-ai-flow-common/interface-app/3_unit/ISubscriptionMix';
import TSubscriptionMixFile from '../../../../gpt-ai-flow-common/tools/3_unit/TSbuscriptionMix';

const modelTypeOptionsPayment = [
  {
    value: EOpenAiModel.GPT_3_point_5_TURBO,
    label: 'GPT-3.5',
  },
  {
    value: EOpenAiModel.GPT_4,
    label: 'GPT-4',
  },
];

const modelTypeOptionsFree = [
  {
    value: EOpenAiModel.GPT_3_point_5_TURBO,
    label: 'GPT-3.5',
  },
];

interface ISettingsWindow_1_local_basic_input {
  subscriptionData: ISubscirptionMix;
}
export const SettingsWindow_1_local_basic = (props: ISettingsWindow_1_local_basic_input) => {
  const dispatch = useDispatch();

  const { subscriptionData } = props;
  const { isBetaUser } = subscriptionData;
  const { hasAvailableSubscription } = TSubscriptionMixFile.checkSubscriptionAvailability(subscriptionData);
  const hasAccessGPT_4 = hasAvailableSubscription || isBetaUser;

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
        {subscriptionData?.version === ESubscriptionVersion.OFFICIAL_MODAL && (
          <div>
            <span>
              你已经选择使用官方的模型解决方案，<b>此处无需填写</b>
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
          options={hasAccessGPT_4 ? modelTypeOptionsPayment : modelTypeOptionsFree}
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
