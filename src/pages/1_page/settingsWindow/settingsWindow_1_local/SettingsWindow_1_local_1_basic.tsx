import '../../../../styles/global.css';
import '../../../../styles/layout.scss';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Select, Tooltip, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { IReduxRootState } from '../../../../store/reducer';
import { saveLocalAction } from '../../../../store/actions/localActions';

import {
  IStoreStorageLocalSettings,
  IStoreStorageLocalSettings_default,
} from '../../../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';

import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { ELocale } from '../../../../gpt-ai-flow-common/enum-app/ELocale';
import { SLLM } from '../../../../gpt-ai-flow-common/tools/2_class/SLLM';
import { ELLM_name } from '../../../../gpt-ai-flow-common/enum-backend/ELLM';

interface ISettingsWindow_1_local_basic_input {
  t: IGetT_frontend_output;
}
export const SettingsWindow_1_local_basic = (props: ISettingsWindow_1_local_basic_input) => {
  const dispatch = useDispatch();

  const { t } = props;

  const localFromStore: IStoreStorageLocalSettings = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorageLocalSettings_default;
  });

  const [openAIApiKey, setOpenAIApiKey] = useState(localFromStore?.openAIApiKey);

  const [chatModeModelType] = useState<ELLM_name>(
    localFromStore.chatMode?.model_type ?? ELLM_name.OPENAI_GPT_3_5_TURBO,
  );
  const [proModeModelType, setProModeModelType] = useState<ELLM_name>(
    localFromStore.proMode?.model_type ?? ELLM_name.OPENAI_GPT_3_5_TURBO,
  );

  const onSaveLocalSettings = () => {
    dispatch<IStoreStorageLocalSettings | any>(
      saveLocalAction({
        ...localFromStore,
        openAIApiKey: openAIApiKey.trim(),
        chatMode: {
          model_type: chatModeModelType,
        },
        proMode: {
          model_type: proModeModelType,
        },
      }),
    );
  };

  const getHowToGetOpenAIKeyUrl = (local: ELocale) => {
    if (local === ELocale.ZH) {
      return 'https://www.gptaiflow.com/zh/blog/how-to-register-for-OpenAI-account-and-get-OpenAI-api-key';
    }

    return 'https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key';
  };

  return (
    <div id="settingsWindowContainer-1-local_1_basic" className="row">
      <div className="row">
        <div>
          <Tooltip
            title={
              <>
                {t.get('How to register for an OpenAI account and obtain an OpenAI API key ?')} :{' '}
                <a href={getHowToGetOpenAIKeyUrl(t.currentLocale)} target="_blank" rel="noreferrer">
                  {t.get('Click here')}
                </a>
              </>
            }
          >
            <label htmlFor="openAIApiKeyInput">
              OpenAI API key
              <InfoCircleOutlined className="px-1" />
              <input
                type="text"
                id="openAIApiKeyInput"
                name="openAIApiKeyInput"
                value={openAIApiKey ?? ''}
                onChange={(e) => setOpenAIApiKey(e.target.value)}
              />
            </label>
          </Tooltip>
        </div>
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
          <b>{t.get('ProMode model')}</b>
        </div>
        <Select
          value={proModeModelType}
          showSearch
          placeholder={t.get('Model type')}
          optionFilterProp="children"
          onChange={(value: string) => {
            console.log(`selected ${value}`);
            setProModeModelType(value as ELLM_name);
          }}
          onSearch={(value: string) => {
            console.log('search:', value);
          }}
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          options={SLLM.getAllLLM_selectOptions()}
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
            message.success(t.get('Save successfully'));
          }}
        >
          {t.get('Save')}
        </Button>
      </div>
    </div>
  );
};
