import '../../../../styles/global.css';
import '../../../../styles/layout.scss';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Select, Tooltip, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { IReduxRootState } from '../../../../store/reducer';
import { saveLocalAction } from '../../../../store/actions/localActions';

import { EOpenAiModel_type } from '../../../../gpt-ai-flow-common/enum-backend/EOpenAIModelType';
import { IStoreStorageLocalSettings } from '../../../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { ModelStaticService } from '../../../../gpt-ai-flow-common/tools/2_class/SModels';
import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { ELocale } from '../../../../gpt-ai-flow-common/enum-app/ELocale';

interface ISettingsWindow_1_local_basic_input {
  t: IGetT_frontend_output;
}
export const SettingsWindow_1_local_basic = (props: ISettingsWindow_1_local_basic_input) => {
  const dispatch = useDispatch();

  const { t } = props;

  const localFromStore: IStoreStorageLocalSettings = useSelector((state: IReduxRootState) => {
    return state.local ?? {};
  });

  const [openAIApiKey, setOpenAIApiKey] = useState(localFromStore?.openAIApiKey);

  const [chatModeModelType, setChatModeModelType] = useState<EOpenAiModel_type>(
    localFromStore.chatMode?.model_type ?? EOpenAiModel_type.GPT_3_point_5_TURBO,
  );
  const [proModeModelType, setProModeModelType] = useState<EOpenAiModel_type>(
    localFromStore.proMode?.model_type ?? EOpenAiModel_type.GPT_3_point_5_TURBO,
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
    <div id="SettingsWindow_1_local_1_basic" className="row">
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
            setProModeModelType(value as EOpenAiModel_type);
          }}
          onSearch={(value: string) => {
            console.log('search:', value);
          }}
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          options={ModelStaticService.getAllModelOptions()}
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
