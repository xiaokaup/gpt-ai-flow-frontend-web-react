import { v4 as uuidv4 } from 'uuid';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { ELocale } from '../../../gpt-ai-flow-common/enum-app/ELocale';
import { useDispatch, useSelector } from 'react-redux';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { useUserDB } from '../../../gpt-ai-flow-common/hooks/useUserDB';
import { IUserDB, IUserDB_default } from '../../../gpt-ai-flow-common/interface-database/IUserDB';
import { updateSpecificUserDB } from '../../../store/actions/userActions';
import { IReduxRootState } from '../../../store/reducer';
import { ProModeWindow_v6_logout } from './logout';
import IStoreStorageFile, {
  IStoreStorage_settings_local,
} from '../../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { Link } from 'react-router-dom';
import {
  CreativityValueProvider,
  // useCreativityValueContext,
} from '../../../gpt-ai-flow-common/contexts/CreativityValueProviderContext';
import { ProModeModelValueProvider } from '../../../gpt-ai-flow-common/contexts/ProModeModelValueProviderContext';
import { useState } from 'react';
import { ELLM_name } from '../../../gpt-ai-flow-common/enum-backend/ELLM';
import { saveLocalAction } from '../../../store/actions/localActions';

import { SLLM_v2_common } from '../../../gpt-ai-flow-common/tools/2_class/SLLM_v2_common';
import { getCreationModeOptions } from './components';
// import { ILLMOption_secrets } from '../../../gpt-ai-flow-common/interface-app/3_unit/ILLMModels';
import { IPrompt, IPrompt_default } from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt';
import { IDate } from '../../../gpt-ai-flow-common/interface-app/4_base/IDate';
import { EAIFlowRole } from '../../../gpt-ai-flow-common/enum-app/EAIFlow';
import { IAPI_microservice_input } from '../../../gpt-ai-flow-common/interface-backend-microservice/IAPI_microservice_input';
import TCryptoJSFile from '../../../gpt-ai-flow-common/tools/TCrypto-web';
import { post_microservice_endpoint } from '../../../gpt-ai-flow-common/tools/1_endpoint/TBackendMicroservice';
import { Button, message, Radio, RadioChangeEvent, Select, Splitter } from 'antd';
import { DynamicForm, FieldData } from './DynamicForm';
import IInputsCacheFile, {
  IInputsCache_v2,
  IInputsCache_v3,
  IInputsCache_v3_default,
  to_deprecate_IInputsCache,
} from '../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import { useInputsCache_v3 } from '../../../gpt-ai-flow-common/hooks/useInputsCache_v3';
import { updateInputsCache } from '../../../store/actions/inputsCacheActions';

// === IPrompts - start ===
const PROMODE_ID = 'xiaohongshu_v4';
interface IPrompt_xiaohongshu_v4 extends IPrompt, IDate {
  uuid?: string;
  concept_report: string; // 概念报告
  viewpoint_report: string; // 观点报告
  intro_report: string; // 介绍报告
}
// === IPrompts - end ===

interface IProModeWindow_v6_warpper_xiaonghongshu_v4 {
  webCase: {
    t: IGetT_frontend_output;
    locale: ELocale;
  };
}
export const ProModeWindow_v6_warpper_xiaohongshu_v4 = (props: IProModeWindow_v6_warpper_xiaonghongshu_v4) => {
  const dispatch = useDispatch();

  const { t, locale } = props.webCase;

  const userDBFromStorage: IUserDB = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserDB_default;
  });

  const { userDB } = useUserDB({
    userDBFromStorage,
    onUserDBChange: (newUserDB_without_token: IUserDB) => {
      dispatch<any>(updateSpecificUserDB(newUserDB_without_token));
    },
    t,
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });

  const { id: userId } = userDB;

  return (
    <div className="w-full">
      {userId && <ProModeWindow_v6_warpper_xiaohongshu_v4_login t={t} userDB={userDB} />}
      {!userId && <ProModeWindow_v6_logout t={t} />}
    </div>
  );
};

interface ProModeWindow_v6_warpper_xiaohongshu_v4_login {
  t: IGetT_frontend_output;
  userDB: IUserDB;
}
const ProModeWindow_v6_warpper_xiaohongshu_v4_login = (props: ProModeWindow_v6_warpper_xiaohongshu_v4_login) => {
  const dispatch = useDispatch();

  const inputsCacheFromStorage: to_deprecate_IInputsCache | IInputsCache_v2 | IInputsCache_v3 = useSelector(
    (state: IReduxRootState) => {
      return state.inputsCache ?? IInputsCacheFile.IInputsCache_default;
    },
  );
  const { inputsCache_v3, setInputsCache_v3 } = useInputsCache_v3({
    inputsCache_v3FromStorage: (inputsCacheFromStorage as IInputsCache_v3) || IInputsCache_v3_default,
    onInputsCache_v3Change: (newItem: IInputsCache_v3) => {
      dispatch<any>(updateInputsCache(newItem));
    },
  });

  const { t, userDB } = props;
  const locale = t.currentLocale;

  const localFromStore: IStoreStorage_settings_local = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorageFile.IStoreStorage_settings_local_default;
  });
  const {
    apiKeys_v2: { llm: llmOption_secrets },
    proMode: { model_type: llmName_from_store },
  } = localFromStore;

  const { Token: { accessToken: userAccessToken } = {} } = userDB;

  if (!userAccessToken) {
    return (
      <div>
        <div>{t.get('Please register a user and log in first')}</div>
        <Link to="/app/logout">{t.get('Logout')}</Link>
      </div>
    );
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isLargeScreen = windowWidth > 1000;

  // ModelOptions
  const [creativityValue, setCreativityValue] = useState<number>(0.8);
  const [llmName, setLLMName] = useState<ELLM_name>(llmName_from_store);

  const [requestController, setRequestController] = useState<AbortController>(new AbortController());
  const [isCalling, setIsCalling] = useState<boolean>(false);

  const [chatMessages, setChatMessages] = useState<IPrompt_xiaohongshu_v4[]>([
    // ...chatMessages_from_cache,
    // { ...IPrompt_default, role: EAIFlowRole.USER, content: '你好' },
  ]);
  const [currentVersionNum, setCurrentVersionNum] = useState<number>(chatMessages.length);
  const hasChatMessages = chatMessages.length > 0;

  const [context, setContext] = useState<string>('今天的天气好像不错，我们去郊游吧！');
  const [fields, setFields] = useState<FieldData[]>([
    { key: 0, label: '标题', value: '我的第一次郊游' },
    {
      key: 1,
      label: '内容',
      value:
        '今天的天气真的很好，我和朋友们决定去郊游。我们去了一个风景优美的地方，拍了很多照片，还吃了美味的野餐。真是一次难忘的经历！',
    },
  ]);

  const onImproveMessage = (chatMessagesBeforeImprove: IPrompt_xiaohongshu_v4[]) => async () => {
    setIsCalling(true);

    const newRequestController = new AbortController();
    setRequestController(newRequestController);
    const { signal } = newRequestController;

    const chatMessagesBeforeImprove_copy = [...chatMessagesBeforeImprove];

    const llmOptions = {
      llmName,
      llmImageName: null,
      llmSecret: SLLM_v2_common.getApiKey_by_llmName(llmName, llmOption_secrets),
      llmTemperature: creativityValue,
    };

    const now = new Date();

    // console.log('context', context);
    // console.log('fields', fields);
    const input_json_string = JSON.stringify({
      context,
      ...fields.reduce(
        (result, item) => {
          result[item.label] = item.value;
          return result;
        },
        {} as Record<string, any>,
      ),
    });
    // console.log('input_json_string', input_json_string);

    const newChatMessage_user = {
      ...IPrompt_default,
      uuid: uuidv4(),
      role: EAIFlowRole.USER,
      content: input_json_string,
      createdAt: now,
      updatedAt: now,
    } as IPrompt_xiaohongshu_v4;
    let newChatMessage_assistant: IPrompt_xiaohongshu_v4 = {
      ...IPrompt_default,
      uuid: uuidv4(),
      role: EAIFlowRole.ASSISTANT,
      content: '',
      concept_report: '',
      viewpoint_report: '',
      intro_report: '',
      createdAt: now,
      updatedAt: now,
    };
    const newChatMessages: IPrompt_xiaohongshu_v4[] = [...chatMessagesBeforeImprove_copy, newChatMessage_user];
    setChatMessages(newChatMessages);
    setCurrentVersionNum(newChatMessages.length);

    const bodyData: IAPI_microservice_input = {
      llmOptions,
      input: JSON.stringify({
        content: newChatMessage_user.content,
      }),
      history: chatMessagesBeforeImprove_copy,
    };

    const url = `https://y2v6snleiealiesvu4spdvhgpy0bxfra.lambda-url.us-east-1.on.aws/?locale=${locale}`;
    post_microservice_endpoint(
      url,
      bodyData,
      () => {
        console.log('afterReceiveResponseFunc');
      },
      () => {
        console.log('beforeSendRequestFunc');
        setIsCalling(true);
      },
      (writingResultText: string) => {
        console.log('updateResultFromRequestFunc', writingResultText);
        newChatMessage_assistant = {
          ...newChatMessage_assistant,
          content: writingResultText,
          updatedAt: new Date(),
        };
        const newChatMessages: IPrompt_xiaohongshu_v4[] = [
          ...chatMessagesBeforeImprove_copy,
          newChatMessage_user,
          newChatMessage_assistant,
        ];
        setChatMessages(newChatMessages);
      },
      (resultText: string) => {
        console.log('AfterRequestFunc', resultText);

        if (JSON.parse(resultText)?.errorMessage) {
          message.error(JSON.parse(resultText).errorMessage);
          setIsCalling(false);
          return;
        }

        newChatMessage_assistant = {
          ...newChatMessage_assistant,
          content: resultText,
          updatedAt: new Date(),
        };
        const newChatMessages: IPrompt_xiaohongshu_v4[] = [
          ...chatMessagesBeforeImprove_copy,
          newChatMessage_user,
          newChatMessage_assistant,
        ];
        setChatMessages(newChatMessages);
        setCurrentVersionNum(newChatMessages.length);

        setInputsCache_v3({
          ...inputsCache_v3,
          [PROMODE_ID]: {
            ...inputsCache_v3[PROMODE_ID],
            context,
            fields,
            chatMessages: newChatMessages,
          },
        });

        setIsCalling(false);
      },
      userAccessToken,
      t.currentLocale,
      CONSTANTS_GPT_AI_FLOW_COMMON,
      TCryptoJSFile.encrypt_v2(CONSTANTS_GPT_AI_FLOW_COMMON.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string),
      signal,
    ).catch((error: Error) => {
      if (error.name === 'AbortError') {
        console.log('Fetch request was aborted');
      } else {
        console.error('Fetch request failed:', error);
        message.error(error.message);
      }
      // Recover the chat history if the request fails or is aborted
      setChatMessages(chatMessagesBeforeImprove_copy);
      setCurrentVersionNum(chatMessagesBeforeImprove_copy.length);
    });
  };

  const onRegenerateMessage = () => {};

  return (
    <ProModeModelValueProvider value={llmName}>
      <CreativityValueProvider value={creativityValue}>
        <div
          className="container proModeContainer"
          style={{ position: 'relative', overflow: 'auto', margin: '1rem auto' }}
        >
          <div
            className="row top_block"
            // style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div
              className="block_creativity_value_slider gap-2"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                alignItems: 'center',

                position: 'sticky',
                top: 0,

                backgroundColor: '#fff',
                zIndex: 10,
                borderBottom: '1px solid #E8E8E8',
                paddingBottom: '.8rem',
              }}
            >
              <div>
                <span style={{ color: '#5D6370', marginRight: '1rem' }}>{t.get('Creation mode')}:</span>

                <Radio.Group
                  options={getCreationModeOptions(t)}
                  onChange={({ target: { value } }: RadioChangeEvent) => {
                    console.log('radio checked', value);
                    setCreativityValue(value);
                  }}
                  value={creativityValue}
                  optionType="button"
                  buttonStyle="solid"
                />
              </div>

              <div className="modelSwitch">
                <span style={{ color: '#5D6370', marginRight: '1rem' }}>{t.get('Model')}:</span>

                <Select
                  value={llmName}
                  showSearch
                  placeholder={t.get('Select Model')}
                  optionFilterProp="children"
                  onChange={(value: string) => {
                    console.log(`selected ${value}`);
                    setLLMName(value as ELLM_name);
                    dispatch<IStoreStorage_settings_local | any>(
                      saveLocalAction({
                        ...localFromStore,
                        proMode: {
                          ...localFromStore.proMode,
                          model_type: value as ELLM_name,
                        },
                      }),
                    );
                  }}
                  onSearch={(value: string) => {
                    console.log('search:', value);
                  }}
                  filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                  options={SLLM_v2_common.getAllLLM_selectOptions_for_web(t)}
                  style={{
                    width: 450,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <Splitter
              layout={isLargeScreen ? 'horizontal' : 'vertical'}
              className="row row_contextSelected"
              style={{ display: 'flex' }}
            >
              <Splitter.Panel
                className="column"
                defaultSize="35%"
                style={
                  isLargeScreen
                    ? {
                        paddingRight: '1.25rem',
                      }
                    : {
                        overflow: 'unset',
                        // paddingRight: 0,
                        paddingBottom: '1.25rem',
                      }
                }
                collapsible
              >
                <div className="block_title">
                  <h2>{t.get('xiaohongshu')}</h2>
                </div>

                <div className="row">
                  <DynamicForm t={t} context={context} setContext={setContext} fields={fields} setFields={setFields} />
                </div>

                <div className="row buttons">
                  <div className="row operation space-x-4 space-y-4">
                    <Button
                      type="primary"
                      onClick={() => {
                        onImproveMessage(chatMessages)();
                      }}
                      disabled={isCalling || currentVersionNum < chatMessages.length}
                    >
                      {t.get('Generate')}
                    </Button>

                    <Button
                      type="primary"
                      onClick={() => {
                        onRegenerateMessage();
                      }}
                      disabled={isCalling || chatMessages.length === 0}
                    >
                      {t.get('Regenerate')}
                    </Button>

                    <Button
                      onClick={() => {
                        requestController.abort();
                        setIsCalling(false);
                      }}
                    >
                      {t.get('Stop')}
                    </Button>
                  </div>
                </div>
              </Splitter.Panel>

              <Splitter.Panel
                className="column component_chatMessages_history_container"
                defaultSize="65%"
                style={
                  isLargeScreen
                    ? { position: 'relative', paddingLeft: '1.25rem' }
                    : {
                        position: 'relative',
                        overflow: 'unset',
                        // paddingLeft: 0,
                        paddingTop: '1.25rem',
                      }
                }
                collapsible
              >
                content
              </Splitter.Panel>
            </Splitter>
          </div>
        </div>
      </CreativityValueProvider>
    </ProModeModelValueProvider>
  );
};
