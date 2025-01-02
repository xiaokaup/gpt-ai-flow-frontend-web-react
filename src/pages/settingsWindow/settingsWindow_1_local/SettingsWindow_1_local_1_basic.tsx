import '../../../styles/global.css';
import '../../../styles/layout.scss';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Form, Input, Select, Tooltip, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { IReduxRootState } from '../../../store/reducer';
import { saveLocalAction } from '../../../store/actions/localActions';

import {
  IStoreStorage_settings_local,
  IStoreStorage_settings_local_default,
} from '../../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';

import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { ELocale } from '../../../gpt-ai-flow-common/enum-app/ELocale';
import { SLLM_v2_common } from '../../../gpt-ai-flow-common/tools/2_class/SLLM_v2_common';
import { ELLM_name } from '../../../gpt-ai-flow-common/enum-backend/ELLM';

interface ISettingsWindow_1_local_basic_input {
  t: IGetT_frontend_output;
  isModelEdition: boolean;
}
export const SettingsWindow_1_local_basic = (props: ISettingsWindow_1_local_basic_input) => {
  const dispatch = useDispatch();

  const { t, isModelEdition } = props;

  const localFromStore: IStoreStorage_settings_local = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorage_settings_local_default;
  });

  const [openAIApiKey, setOpenAIApiKey] = useState(localFromStore?.apiKeys?.openAIApiKey);
  const [anthropicApiKey, setAnthropicApiKey] = useState<string>(localFromStore?.apiKeys?.anthropicApiKey);
  const [moonshotApiKey, setMoonshotApiKey] = useState<string>(localFromStore?.apiKeys?.moonshotApiKey);

  const [chatModeModelType] = useState<ELLM_name>(
    localFromStore.chatMode?.model_type ?? ELLM_name.OPENAI_GPT_3_5_TURBO,
  );
  const [proModeModelType, setProModeModelType] = useState<ELLM_name>(
    localFromStore.proMode?.model_type ?? ELLM_name.OPENAI_GPT_3_5_TURBO,
  );

  const onSaveLocalSettings = () => {
    dispatch<IStoreStorage_settings_local | any>(
      saveLocalAction({
        ...localFromStore,
        openAIApiKey: openAIApiKey?.trim(),
        apiKeys: {
          openAIApiKey: openAIApiKey?.trim(),
          anthropicApiKey: anthropicApiKey?.trim(),
          moonshotApiKey: moonshotApiKey?.trim(),
          googleApiKey: '', // @DEV
        },
        chatMode: {
          chatModeStatus: localFromStore.chatMode?.chatModeStatus,
          model_type: chatModeModelType,
          model_image_type: null,
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
        <Form
          layout="horizontal"
          initialValues={{
            openAIApiKey,
            anthropicApiKey,
            moonshotApiKey,
          }}
        >
          <div className={isModelEdition ? 'row block_apiKeys hidden' : 'row block_apiKeys'}>
            <div className="openAIApiKey flex items-center">
              <Tooltip
                title={
                  <>
                    {t.get('How to register for an OpenAI account and obtain an OpenAI API key ?')} :{' '}
                    <a href={getHowToGetOpenAIKeyUrl(t.currentLocale)} target="_blank" rel="noreferrer">
                      {t.get('Click here')}
                    </a>
                    <br />
                    <br />
                    {t.get('Use the desktop app to easily store your web API key for seamless use across platforms.')}
                  </>
                }
              >
                <Form.Item
                  className="m-0"
                  name="openAIApiKey"
                  label={
                    <>
                      OpenAI API key <InfoCircleOutlined className="px-1" />
                    </>
                  }
                  style={{ width: 300 }}
                >
                  <Input
                    type="password"
                    size="small"
                    value={openAIApiKey}
                    onChange={(event) => {
                      setOpenAIApiKey(event.target.value);
                    }}
                  />
                </Form.Item>
              </Tooltip>
              {openAIApiKey && <span className="ml-1 ">({openAIApiKey?.slice(-6).toLowerCase()})</span>}
            </div>
            <div className="anthropicApiKey flex items-center">
              <Form.Item
                className="m-0"
                name="anthropicApiKey"
                label={
                  <>
                    Anthropic API key
                    {/* <InfoCircleOutlined className="px-1" /> */}
                  </>
                }
                style={{ width: 300 }}
              >
                <Input
                  type="password"
                  size="small"
                  value={anthropicApiKey}
                  onChange={(event) => {
                    setAnthropicApiKey(event.target.value);
                  }}
                />
              </Form.Item>
              {anthropicApiKey && <span className="ml-1 ">({anthropicApiKey?.slice(-6).toLowerCase()})</span>}
            </div>

            <div className="moonshotApiKey flex items-center">
              <Form.Item
                className="m-0"
                name="moonshotApiKey"
                label={
                  <>
                    Moonshot API key
                    {/* <InfoCircleOutlined className="px-1" /> */}
                  </>
                }
                style={{ width: 300 }}
              >
                <Input
                  type="password"
                  size="small"
                  value={moonshotApiKey}
                  onChange={(event) => {
                    setMoonshotApiKey(event.target.value);
                  }}
                />
              </Form.Item>
              {moonshotApiKey && <span className="ml-1 ">({moonshotApiKey?.slice(-6).toLowerCase()})</span>}
            </div>

            {/* GoogleAPIKey */}
            <div className="block_alert_info pt-2">
              <Alert
                type="info"
                message={t.get(
                  'Note: Some regions may have network access restrictions. If you are unable to use the free version or non-model version of this product normally in your area, please consider using network proxy or VPN tools to improve connectivity. Please comply with relevant local laws and regulations.',
                )}
              />
            </div>
          </div>
        </Form>
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
          options={SLLM_v2_common.getAllLLM_selectOptions_for_web(t)}
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
