import '../../../styles/global.css';
import '../../../styles/layout.scss';

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
import { ILLMOption_secrets_default } from '../../../gpt-ai-flow-common/interface-app/3_unit/ILLMModels';
import { IToolOption_secrets_default } from '../../../gpt-ai-flow-common/interface-app/3_unit/ITools';

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

  const [form] = Form.useForm();
  const openAIApiKey_watch = Form.useWatch('openAIApiKey', form);
  const anthropicApiKey_watch = Form.useWatch('anthropicApiKey', form);
  const deepSeekApiKey_watch = Form.useWatch('deepSeekApiKey', form);
  const siliconFlowApiKey_watch = Form.useWatch('siliconFlowApiKey', form);

  const onFinish = (values: any) => {
    // console.log('Success onFinish:', values);

    const { openAIApiKey, anthropicApiKey, deepSeekApiKey, siliconFlowApiKey } = values;
    const { chatModeModelType, proModeModelType } = values;

    dispatch<IStoreStorage_settings_local | any>(
      saveLocalAction({
        ...localFromStore,
        apiKeys_deprecated: { ...ILLMOption_secrets_default, ...IToolOption_secrets_default },
        apiKeys_v2: {
          llm: {
            openAIApiKey,
            anthropicApiKey,
            moonshotApiKey: '',
            deepSeekApiKey,
            siliconFlowApiKey,
            googleApiKey: '',
          },
          tool: IToolOption_secrets_default,
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

    message.success(t.get('Save successfully'));
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
          form={form}
          layout="horizontal"
          initialValues={{
            ...localFromStore.apiKeys_v2.llm,
            proModeModelType: localFromStore.proMode?.model_type,
          }}
          onFinish={onFinish}
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
                  <Input type="password" size="small" />
                </Form.Item>
              </Tooltip>
              {openAIApiKey_watch && <span className="ml-1 ">({openAIApiKey_watch?.slice(-6).toLowerCase()})</span>}
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
                <Input type="password" size="small" />
              </Form.Item>
              {anthropicApiKey_watch && (
                <span className="ml-1 ">({anthropicApiKey_watch?.slice(-6).toLowerCase()})</span>
              )}
            </div>

            <div className="moonshotApiKey flex items-center hidden">
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
                <Input type="password" size="small" />
              </Form.Item>
              {/* {moonshotApiKey && <span className="ml-1 ">({moonshotApiKey?.slice(-6).toLowerCase()})</span>} */}
            </div>

            <div className="deepSeekApiKey flex items-center">
              <Form.Item
                className="m-0"
                name="deepSeekApiKey"
                label={
                  <>
                    Deepseek API key
                    {/* <InfoCircleOutlined className="px-1" /> */}
                  </>
                }
                style={{ width: 300 }}
              >
                <Input type="password" size="small" />
              </Form.Item>
              {deepSeekApiKey_watch && <span className="ml-1 ">({deepSeekApiKey_watch?.slice(-6).toLowerCase()})</span>}
            </div>

            <div className="siliconFlowApiKey flex items-center">
              <Form.Item
                className="m-0"
                name="siliconFlowApiKey"
                label={
                  <>
                    SiliconFlow API key
                    {/* <InfoCircleOutlined className="px-1" /> */}
                  </>
                }
                style={{ width: 300 }}
              >
                <Input type="password" size="small" />
              </Form.Item>
              {siliconFlowApiKey_watch && (
                <span className="ml-1 ">({siliconFlowApiKey_watch?.slice(-6).toLowerCase()})</span>
              )}
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
            <Form.Item className="m-0" name="proModeModelType" label={t.get('ProMode model')}>
              <Select
                showSearch
                optionFilterProp="children"
                onSearch={(value: string) => {
                  console.log('search:', value);
                }}
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={SLLM_v2_common.getAllLLM_selectOptions_for_web(t)}
                style={{
                  width: 200,
                }}
              />
            </Form.Item>
          </div>
          <div className="row" style={{ marginTop: '.75rem' }}>
            <Button id="userSaveSettingsBtn" type="primary" htmlType="submit">
              {t.get('Save')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
