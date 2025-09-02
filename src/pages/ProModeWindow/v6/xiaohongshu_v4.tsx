import iconCleanRight from '../../../../assets/icons-customize/icon-clean-right/icon-clean-right-24x24.png';

import { v4 as uuidv4 } from 'uuid';

import ReactMarkdown from 'react-markdown';
import {
  LeftOutlined,
  RightOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  EditOutlined,
  CopyOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import copyToClipboard from 'copy-to-clipboard';

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
import { Button, Form, message, Radio, RadioChangeEvent, Select, Splitter, Tooltip } from 'antd';
import { DynamicForm, FieldData } from './DynamicForm';
import IInputsCacheFile, {
  IInputsCache_v2,
  IInputsCache_v3,
  IInputsCache_v3_default,
  to_deprecate_IInputsCache,
} from '../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import { useInputsCache_v3 } from '../../../gpt-ai-flow-common/hooks/useInputsCache_v3';
import { updateInputsCache } from '../../../store/actions/inputsCacheActions';
import TextArea from 'antd/es/input/TextArea';

// === IPrompts - start ===
const PROMODE_ID = 'xiaohongshu_v4';
interface IPrompt_xiaohongshu_v4 extends IPrompt, IDate {
  uuid?: string;
  concept_report: string; // 概念报告
  viewpoint_report: string; // 观点报告
  intro_report: string; // 介绍报告
  response?: any;
  isEdit?: boolean;
  isShow?: boolean;
  userPrompt?: IPrompt_xiaohongshu_v4;
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

  const { t } = props.webCase;

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
  console.log('inputsCache_v3', inputsCache_v3);

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

  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isLargeScreen = windowWidth > 1000;

  // ModelOptions
  const [creativityValue, setCreativityValue] = useState<number>(0.8);
  const [llmName, setLLMName] = useState<ELLM_name>(llmName_from_store);

  const [requestController, setRequestController] = useState<AbortController>(new AbortController());
  const [isCalling, setIsCalling] = useState<boolean>(false);

  const [chatMessages, setChatMessages] = useState<IPrompt_xiaohongshu_v4[]>([
    ...(inputsCache_v3[PROMODE_ID]?.chatMessages ?? []),
    // { ...IPrompt_default, role: EAIFlowRole.USER, content: '你好' },
  ]);
  const [currentVersionNum, setCurrentVersionNum] = useState<number>(chatMessages.length);
  const hasChatMessages = chatMessages.length > 0;
  // console.log('chatMessages', chatMessages);

  const [context, setContext] = useState<string>(inputsCache_v3[PROMODE_ID]?.context);
  const [fields, setFields] = useState<FieldData[]>(
    inputsCache_v3[PROMODE_ID]?.fields,
    // [
    //   { key: 0, label: '标题', value: '我的第一次郊游' },
    //   {
    //     key: 1,
    //     label: '内容',
    //     value:
    //       '今天的天气真的很好，我和朋友们决定去郊游。我们去了一个风景优美的地方，拍了很多照片，还吃了美味的野餐。真是一次难忘的经历！',
    //   },
    // ]
  );

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

    // Create an object to hold all the data
    let input_json_string = `context: "${context}"\n`;
    // Loop through fields and add each key-value pair to the object
    for (const field of fields) {
      if (field.label && field.label.trim()) {
        // Only add if label exists and is not empty
        input_json_string += `${field.label.trim()}: "${field.value}"\n`;
      }
    }

    // console.log('input_json_string', input_json_string);

    const newChatMessage_user = {
      ...IPrompt_default,
      uuid: uuidv4(),
      role: EAIFlowRole.USER,
      content: input_json_string,
      isShow: true,
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
      isShow: true,
      userPrompt: newChatMessage_user,
      createdAt: now,
      updatedAt: now,
    };
    const newChatMessages: IPrompt_xiaohongshu_v4[] = [...chatMessagesBeforeImprove_copy, newChatMessage_assistant];
    setChatMessages(newChatMessages);
    setCurrentVersionNum(newChatMessages.length);

    const bodyData: IAPI_microservice_input = {
      llmOptions,
      input: newChatMessage_user.content,
      history: chatMessagesBeforeImprove_copy.map((item) => ({
        uuid: item.uuid,
        role: item.role,
        content: item.content,
      })),
    };

    const url = `https://g22gqghwxpqsrewousdvpdaxze0ezhzt.lambda-url.us-east-1.on.aws/?locale=${locale}`;
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
        const response_json = JSON.parse(writingResultText || '{}');
        const response_body_json = JSON.parse(response_json?.body || '{}');
        newChatMessage_assistant = {
          ...newChatMessage_assistant,
          response: response_json,
          content: response_body_json?.result,
          concept_report: response_body_json?.concept_report,
          viewpoint_report: response_body_json?.viewpoint_report,
          intro_report: response_body_json?.intro_report,
          updatedAt: new Date(),
        };
        const newChatMessages: IPrompt_xiaohongshu_v4[] = [...chatMessagesBeforeImprove_copy, newChatMessage_assistant];
        setChatMessages(newChatMessages);
      },
      (resultText: string) => {
        console.log('AfterRequestFunc', resultText);

        if (JSON.parse(resultText)?.errorMessage) {
          message.error(JSON.parse(resultText).errorMessage);
          setIsCalling(false);
          return;
        }

        const response_json = JSON.parse(resultText || '{}');
        const response_body_json = JSON.parse(response_json?.body || '{}');

        newChatMessage_assistant = {
          ...newChatMessage_assistant,
          response: response_json,
          content: response_body_json?.result,
          concept_report: response_body_json?.concept_report,
          viewpoint_report: response_body_json?.viewpoint_report,
          intro_report: response_body_json?.intro_report,
          updatedAt: new Date(),
        };
        const newChatMessages: IPrompt_xiaohongshu_v4[] = [...chatMessagesBeforeImprove_copy, newChatMessage_assistant];
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

  const onRegenerateMessage = () => {
    setIsCalling(true);

    const newChatMessages = hasChatMessages ? chatMessages.slice(0, currentVersionNum) : [];
    onImproveMessage(newChatMessages)();
    setCurrentVersionNum(newChatMessages.length);
  };

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
                <div className="block_versionNum" style={{ position: 'absolute', right: 0 }}>
                  {hasChatMessages && (
                    <div
                      className="row pr-2"
                      style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                    >
                      <LeftOutlined
                        className={`${currentVersionNum <= 1 ? 'hidden' : ''}`}
                        style={{ marginLeft: '.4rem', marginRight: '.4rem', width: 20 }}
                        onClick={() => {
                          if (isCalling) return;

                          setCurrentVersionNum(currentVersionNum - 1);
                        }}
                      />

                      <div className="row">
                        {t.get('Version')}: {currentVersionNum}
                      </div>

                      <RightOutlined
                        className={`${currentVersionNum >= chatMessages.length ? 'hidden' : ''}`}
                        style={{ marginLeft: '.4rem', marginRight: '.4rem', width: 20 }}
                        onClick={() => {
                          if (isCalling) return;

                          setCurrentVersionNum(currentVersionNum + 1);
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="row component_chatMessages">
                  <div className="row subContainer">
                    <div className="row flex flex-start items-center pr-2">
                      <div className="col_1">
                        <h2>{t.get('Chat Messages')}</h2>
                      </div>
                      <div className="col_2 ml-4">
                        <Tooltip title={t.get('Reset all')}>
                          <img
                            id="reset-messages-history-button"
                            src={iconCleanRight}
                            alt="reset messages history"
                            className="button resetMessagesHistoryButton"
                            style={{
                              fontSize: 18,
                              width: 30,
                              border: '1px solid #d9d9d9',
                              borderRadius: '.25rem',
                              padding: 4,
                              cursor: 'pointer',

                              marginTop: 8,

                              flex: '0 1 auto',
                            }}
                            onClick={() => {
                              const newChatMessages = [];
                              setChatMessages(newChatMessages);
                            }}
                          />
                        </Tooltip>
                      </div>
                    </div>
                    {chatMessages
                      .slice(0, currentVersionNum)
                      .filter((item) => item.role === EAIFlowRole.ASSISTANT)
                      .sort(
                        (a: IPrompt_xiaohongshu_v4, b: IPrompt_xiaohongshu_v4) =>
                          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
                      )
                      .map((oneChatMessage: IPrompt_xiaohongshu_v4, oneChatMessage_index: number) => {
                        const {
                          uuid,
                          isEdit,
                          isShow,
                          content,
                          // response,
                          // userPrompt,
                          // concept_report,
                          // viewpoint_report,
                          // intro_report,
                        } = oneChatMessage;

                        const switchShow = (paraOneChatMessage: IPrompt_xiaohongshu_v4) => {
                          const newChatMessages = [...chatMessages].map((item: IPrompt_xiaohongshu_v4) => {
                            if (paraOneChatMessage.content === item.content) {
                              return {
                                ...item,
                                isShow: !item.isShow,
                              };
                            }
                            return item;
                          });
                          setChatMessages(newChatMessages);
                          setInputsCache_v3({
                            ...inputsCache_v3,
                            [PROMODE_ID]: {
                              ...inputsCache_v3[PROMODE_ID],
                              chatMessages: newChatMessages,
                            },
                          });
                        };

                        const switchEdit = (paraOneChatMessage: IPrompt_xiaohongshu_v4) => {
                          const newChatMessages = [...chatMessages].map((item: IPrompt_xiaohongshu_v4) => {
                            if (paraOneChatMessage.content === item.content) {
                              return {
                                ...item,
                                isEdit: !item.isEdit,
                              };
                            }
                            return item;
                          });
                          setChatMessages(newChatMessages);
                          setInputsCache_v3({
                            ...inputsCache_v3,
                            [PROMODE_ID]: {
                              ...inputsCache_v3[PROMODE_ID],
                              chatMessages: newChatMessages,
                            },
                          });
                        };

                        const onFinish = (paraOneChatMessage: IPrompt_xiaohongshu_v4, content: string) => {
                          const newChatMessages = [...chatMessages].map((item: IPrompt_xiaohongshu_v4) => {
                            if (paraOneChatMessage.content === item.content) {
                              return {
                                ...item,
                                isEdit: !item.isEdit,
                                content,
                              };
                            }
                            return item;
                          });
                          setChatMessages(newChatMessages);

                          setInputsCache_v3({
                            ...inputsCache_v3,
                            [PROMODE_ID]: {
                              ...inputsCache_v3[PROMODE_ID],
                              chatMessages: newChatMessages,
                            },
                          });
                        };

                        return (
                          <div
                            key={uuid}
                            className={`block_chatMessages_container ${oneChatMessage_index > 0 ? 'mt-4' : ''}`}
                            style={{
                              userSelect: 'text',
                              border: '1px solid #d9d9d9',
                              borderRadius: '.25rem',
                              padding: '.4rem',
                              paddingLeft: '1rem',
                              paddingRight: '1rem',
                            }}
                          >
                            <div
                              className="block_top"
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <div className="column_1" style={{ display: 'flex' }}>
                                <EditOutlined
                                  style={{ fontSize: 18 }}
                                  onClick={() => {
                                    switchEdit(oneChatMessage);
                                  }}
                                />

                                <CopyOutlined
                                  className="ml-2"
                                  style={{ fontSize: 16 }}
                                  onClick={() => {
                                    copyToClipboard(content);

                                    message.success({
                                      content: <span>{t.get('Copy successful')} !</span>,
                                      key: 'copy',
                                      duration: 3,
                                    });
                                  }}
                                />

                                {isShow && (
                                  <EyeOutlined
                                    className="ml-2"
                                    style={{ fontSize: 18 }}
                                    onClick={() => switchShow(oneChatMessage)}
                                  />
                                )}

                                {!isShow && (
                                  <EyeInvisibleOutlined
                                    className="ml-2"
                                    style={{ fontSize: 18 }}
                                    onClick={() => switchShow(oneChatMessage)}
                                  />
                                )}
                              </div>

                              <div className="column_2"></div>
                            </div>
                            <div className="block_chatMessages mt-4">
                              {!content && (
                                <div className="row view">
                                  <LoadingOutlined />
                                </div>
                              )}

                              {isShow && !isEdit && content && (
                                <div className="row view relative watermark-20px">
                                  <ReactMarkdown>{content}</ReactMarkdown>
                                </div>
                              )}

                              {isShow && isEdit && (
                                <div className="row editing">
                                  <Form
                                    initialValues={{ content }}
                                    onFinish={(values: any) => {
                                      onFinish(oneChatMessage, values.content);
                                    }}
                                  >
                                    {/* <Form.Item name="title" label="Title">
                                    <Input
                                      onChange={(event) => {
                                        setCurrentOutput({
                                          ...currentOutput,
                                          title: event.target.value,
                                        });
                                      }}
                                    />
                                  </Form.Item> */}

                                    <Form.Item name="content" className="relative watermark-0px">
                                      <TextArea autoSize className="pb-6" />
                                    </Form.Item>

                                    <Form.Item>
                                      <Button className="confirmChangeContent" type="primary" htmlType="submit">
                                        {t.get('Submit')}
                                      </Button>
                                      <Button
                                        type="default"
                                        onClick={() => {
                                          switchEdit(oneChatMessage);
                                        }}
                                        style={{ marginLeft: '1rem' }}
                                      >
                                        {t.get('Return')}
                                      </Button>
                                    </Form.Item>
                                  </Form>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </Splitter.Panel>
            </Splitter>
          </div>
        </div>
      </CreativityValueProvider>
    </ProModeModelValueProvider>
  );
};
