import '../../index.scss';

import { useEffect, useState } from 'react';

import { Button, Form, InputNumber, message, Splitter } from 'antd';
import { LeftOutlined, RightOutlined, InfoCircleOutlined } from '@ant-design/icons';

import { v4 as uuidv4 } from 'uuid';

import { IMessage, IMessage_default } from '../../../../../../gpt-ai-flow-common/interface-app/3_unit/IMessage';
import { Langchain_previousOutput } from './component/Langchain_previousOutput';
import { Langchain_currentOutput } from './component/Langchain_currentOutput';
import { Langchain_adjust } from './component/Langchain_adjust';
import { Langchain_background } from './component/Langchain_background';
import { EMessage_role } from '../../../../../../gpt-ai-flow-common/interface-app/3_unit/IMessage_role';
import { to_deprecate_EProductItemDB_type } from '../../../../../../gpt-ai-flow-common/enum-database/to_deprecate_EProductItemDB';
import TBackendLangchainFile from '../../../../../../gpt-ai-flow-common/ProMode_v4/tools-ProMode_v4/TBackendLangchain';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import TCryptoJSFile from '../../../../../../gpt-ai-flow-common/tools/TCrypto-web';
import {
  IInputsCache_v2,
  IInputsCache_v3,
  IInputsCache_v3_contextSelected_value_default,
} from '../../../../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import { ELocale } from '../../../../../../gpt-ai-flow-common/enum-app/ELocale';
import { SLLM_v2_common } from '../../../../../../gpt-ai-flow-common/tools/2_class/SLLM_v2_common';

import { IProModeWindow_v4_wrapper_input } from '../../ProModeWindow_wrapper_v4';
import { EProMode_v4_module_contextType } from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/EProMode_v4_module';
import { to_deprecate_ILangchain_for_type_langchain_request_v3 } from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-call/ILangchain_type_request_v3';
import {
  IProMode_v4_tabPane_context,
  IBackground_for_type_langchain,
  IAdjust_for_type_langchain,
  ILangchainMessageExchange_default,
  IAdjust_type_langchain_default,
  ILangchainMessageExchange,
  IFormItem,
} from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/03-langchain';
import { IAdjust_morePostsChain } from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/03-langchain/02-once-multiple-results/2024-07-03-rewritingTools/2024-05-13-IProMode_v4_morePostsChain';
import {
  IPromode_v4_tabPane_context_button,
  EButton_operation,
} from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/IProMode_v4_buttons';
import { ESocialPlatform_moduleName } from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/03-langchain/01-iterate-and-optimize/00-prototype-2024-12-02-socialPlatform/ESocialPlatofrm';
import { ELLM_name } from '../../../../../../gpt-ai-flow-common/enum-backend/ELLM';
import { IGetT_frontend_output } from '../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import {
  IChatMessage,
  IChatMessage_default,
} from '../../../../../../gpt-ai-flow-common/interface-app/3_unit/IChatMessage';
import { ILLMOption_secrets } from '../../../../../../gpt-ai-flow-common/interface-backend/ILLMOptions';
import { EAIFlowRole } from '../../../../../../gpt-ai-flow-common/enum-app/EAIFlow';
import { ProModePage_ChatMessages } from '../component/ProModePage_ChatMessages';
import { IProMode_module_request_v4_subVersion_2 } from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-call/IProMode_module_request_v4_subVersion_2';
import { ProModePage_Background } from '../component/ProModePage_Background';
import { ProMode_Adjust } from '../component/ProMode_Adjust';
import { ProMode_debug_v4_subVersion_2 } from '../ProMode_debug_v4_subVersion_2';

interface IProModeWindow_v4_subVersion_2_tabPane_02_langchain_once_multiple_results_input
  extends Omit<IProModeWindow_v4_wrapper_input, 'tabPane'> {
  // new version
  t: IGetT_frontend_output;
  userAccessToken: string;
  llmOption_secrets: ILLMOption_secrets;
  llmName: ELLM_name;
  creativityValue: number;
  contextSelected: IProMode_v4_tabPane_context<IBackground_for_type_langchain, IAdjust_for_type_langchain>;
  switchContextSelected_by_type: (newType: EProMode_v4_module_contextType) => void;
  inputsCache_v3: IInputsCache_v3;
  setInputsCache_v3: React.Dispatch<React.SetStateAction<IInputsCache_v3>>;
}
export const ProModeWindow_v4_subVersion_2_tabPane_02_langchain_once_multiple_results = (
  props: IProModeWindow_v4_subVersion_2_tabPane_02_langchain_once_multiple_results_input,
) => {
  const { creativityValue, contextSelected, switchContextSelected_by_type } = props;
  const { uuid: contextSelected_uuid, urlSlug, contextType, buttons } = contextSelected;
  const { currentOutput: currentOuputFromContextSelected } = contextSelected;
  const {
    t,
    userAccessToken,
    llmOption_secrets,
    llmName,
    inputsCache_v2,
    setInputsCache_v2,
    inputsCache_v3,
    setInputsCache_v3,
  } = props;
  inputsCache_v2.when = undefined; // @BUGFIX: when is a reserved when date in JavaScript

  const [requestController, setRequestController] = useState<AbortController>(new AbortController());
  const [isCalling, setIsCalling] = useState<boolean>(false);

  const {
    background: background_from_cache,
    adjust: adjust_from_cache,
    chatMessages: chatMessages_from_cache,
  } = { ...IInputsCache_v3_contextSelected_value_default, ...inputsCache_v3[contextSelected_uuid] };

  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([
    ...chatMessages_from_cache,
    // { ...IChatMessage_default, role: EAIFlowRole.USER, content: '你好' },
  ]);
  const [currentVersionNum, setCurrentVersionNum] = useState<number>(chatMessages.length);
  console.log('currentVersionNum', currentVersionNum);
  const hasChatMessages = chatMessages.length > 0;
  const [background, setBackground] = useState<IBackground_for_type_langchain>(background_from_cache);
  const [adjust, setAdjust] = useState<IAdjust_for_type_langchain>(adjust_from_cache);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messageExchangeType, _] = useState<EProMode_v4_module_contextType | ESocialPlatform_moduleName>(
    contextType ?? EProMode_v4_module_contextType.GENERAL,
  );
  const messageExchangeData_default = {
    ...ILangchainMessageExchange_default,
    // background: defaultBackgtound,
    background: {
      ...ILangchainMessageExchange_default.background,
      ...inputsCache_v2[contextSelected_uuid],
    },
    adjust: {
      ...IAdjust_type_langchain_default,
      ...inputsCache_v2[contextSelected_uuid],
    },
    createdAt: new Date(),
    role: EMessage_role.HUMAN,
    versionNum: 0,
  };
  const [messageExchangeData, setMessageExchangeData] =
    useState<ILangchainMessageExchange>(messageExchangeData_default);
  const [chatHistory, setChatHistory] = useState<ILangchainMessageExchange[]>([]);

  // Manage multiple outputs results
  const [messages_for_outputs_num, setMessages_outputs_num] = useState<number>(
    inputsCache_v2[contextSelected_uuid]?.currentOutputNums
      ? parseInt(inputsCache_v2[contextSelected_uuid].currentOutputNums, 10)
      : 1, // IAdjust_morePostsChain
  );
  const [messages_outputs, setMessages_outputs] = useState<IChatMessage[]>([...chatMessages_from_cache]);

  // const { currentOutput, previousOutput } = messageExchangeData;

  // const filterBackendAndAjdust_before_buildHumanMessage = (paraMessageExchangeData: ILangchainMessageExchange) => {
  //   const filtedAdjust = contextSelected.adjust.formItems.reduce(
  //     (acc, currentFormItem: IFormItem<IAdjust_for_type_langchain>) => {
  //       if (paraMessageExchangeData.adjust[currentFormItem.name]) {
  //         acc[currentFormItem.name] = paraMessageExchangeData.adjust[currentFormItem.name];
  //       }
  //       return acc;
  //     },
  //     {} as IAdjust_for_type_langchain,
  //   );

  //   const filtedBackground = contextSelected.background.formItems.reduce(
  //     (acc, currentFormItem: IFormItem<IBackground_for_type_langchain>) => {
  //       if (paraMessageExchangeData.background[currentFormItem.name]) {
  //         acc[currentFormItem.name] = paraMessageExchangeData.background[currentFormItem.name];
  //       }
  //       return acc;
  //     },
  //     {} as IBackground_for_type_langchain,
  //   );

  //   const filteredParaMessageExchangeData = {
  //     ...paraMessageExchangeData,
  //     adjust: filtedAdjust,
  //     background: filtedBackground,
  //   };
  //   // console.log('filteredParaMessageExchangeData', filteredParaMessageExchangeData);
  //   return filteredParaMessageExchangeData;
  // };

  // const buildHumanMessage = (paraMessageExchangeData: ILangchainMessageExchange) => {
  //   const newVersionNum =
  //     paraMessageExchangeData.versionNum && paraMessageExchangeData.versionNum > 0
  //       ? paraMessageExchangeData.versionNum + 1
  //       : 0;
  //   const newMessageExchangeData_for_human = {
  //     ...paraMessageExchangeData,
  //     previousOutput: paraMessageExchangeData.currentOutput,
  //     currentOutput: IMessage_default,
  //     updatedAt: new Date(),
  //     versionNum: newVersionNum,
  //     role: EMessage_role.HUMAN,
  //   };

  //   const newHumanRequest: to_deprecate_ILangchain_for_type_langchain_request_v3 = {
  //     productItem_type: to_deprecate_EProductItemDB_type.PRO_MODE_SERVICE,
  //     llmOptions: {
  //       llmName,
  //       llmImageName: null,
  //       llmSecret: SLLM_v2_common.getApiKey_by_llmName(llmName, llmOption_secrets),
  //       llmTemperature: creativityValue,
  //     },
  //     type: messageExchangeType,
  //     prevMessageExchange: hasChatMessages ? chatHistory[chatHistory.length - 1] : paraMessageExchangeData,
  //     currentMessageExchange: newMessageExchangeData_for_human,
  //   };

  //   // console.log('buildHumanMessage newHumanRequest', newHumanRequest);

  //   return newHumanRequest;
  // };

  const onImproveMessage = (chatMessagesBeforeImprove: IChatMessage[]) => async () => {
    setMessages_outputs([]); // @FEAT: for multiple outputs results

    setIsCalling(true);

    // console.log('paraMessageExchangeData', paraMessageExchangeData);
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

    // 取最新的 ai message, 生成一个 human message，添加到历史，增加 currentVersionNum
    // const filteredParaMessageExchangeData = filterBackendAndAjdust_before_buildHumanMessage(paraMessageExchangeData);
    // const bodyData: to_deprecate_ILangchain_for_type_langchain_request_v3 = buildHumanMessage(
    //   filteredParaMessageExchangeData,
    // );
    // const newMessageExchange_for_human = bodyData.currentMessageExchange;
    // const newMessageExchange_versionNum_for_human = bodyData.currentMessageExchange.versionNum;
    // const newChatHistory_for_human = [...chatHistoryBeforeImprove, newMessageExchange_for_human];
    // setMessageExchangeData(newMessageExchange_for_human);
    // setChatHistory(newChatHistory_for_human);
    // setCurrentVersionNum(newChatHistory_for_human.length - 1);

    const promiseList = []; // @FEAT: for multiple outputs results
    const promiseResults: IChatMessage[] = []; // @FEAT: for multiple outputs results

    // @FEAT: for multiple outputs results
    for (let index_num = 0; index_num < messages_for_outputs_num; index_num++) {
      promiseResults[index_num] = { ...IChatMessage_default, role: EAIFlowRole.ASSISTANT, content: '' }; // @FEAT: for multiple outputs results

      const newChatMessage: IChatMessage = {
        ...IChatMessage_default,
        uuid: uuidv4(),
        adjust,
        background,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const newChatMessages: IChatMessage[] = [...chatMessagesBeforeImprove_copy, newChatMessage];

      if (!urlSlug) {
        message.error('urlSlug is empty');
        continue;
      }

      const bodyData: IProMode_module_request_v4_subVersion_2 = {
        contextType,
        llmOptions,
        background,
        adjust,
        chatMessages: newChatMessages,
      };

      const promiseInstance = TBackendLangchainFile.postProMode_moduleChain_v4_subVersion_2(
        urlSlug,
        bodyData,
        () => {
          setIsCalling(true);
          console.log('beforeSendRequestFunc');
        },
        (writingResultText: string) => {
          console.log('writingResultText', writingResultText);
          promiseResults[index_num] = {
            ...promiseResults[index_num],
            role: EAIFlowRole.ASSISTANT,
            content: writingResultText,
          }; // @FEAT: for multiple outputs results, for Promise.all
          setMessages_outputs(promiseResults); // / @FEAT: for multiple outputs results, for UI display

          // setMessageExchangeData({
          //   ...newMessageExchange_for_human,
          //   currentOutput: {
          //     title: '',
          //     content: writingResultText,
          //   },
          // });
        },
        (resultText: string) => {
          console.log('AfterRequestFunc', resultText);

          promiseResults[index_num] = {
            ...promiseResults[index_num],
            role: EAIFlowRole.ASSISTANT,
            content: resultText,
          }; // @FEAT: for multiple outputs results, for Promise.all
          setMessages_outputs(promiseResults); // / @FEAT: for multiple outputs results, for UI display

          // const newMessageExchange_versionNum_for_ai = (newMessageExchange_versionNum_for_human ?? 0) + 1;
          // const newMessageExchange_for_ai = {
          //   ...newMessageExchange_for_human,
          //   currentOutput: {
          //     title: '',
          //     content: resultText,
          //   },
          //   updatedAt: new Date(),
          //   versionNum: newMessageExchange_versionNum_for_ai,
          //   role: EMessage_role.AI,
          // };
          // const newChatHistory_for_ai = [...newChatHistory_for_human, newMessageExchange_for_ai];
          // setMessageExchangeData(newMessageExchange_for_ai);
          // setChatHistory(newChatHistory_for_ai);
          // setCurrentVersionNum(newChatHistory_for_ai.length - 1);

          // setIsCalling(false);
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

      promiseList.push(promiseInstance);
    }

    Promise.all(promiseList).then(() => {
      // const newMessageExchange_versionNum_for_ai = (newMessageExchange_versionNum_for_human ?? 0) + 1;
      // const newMessageExchange_for_ai = {
      //   ...newMessageExchange_for_human,
      //   currentOutput: {
      //     title: '',
      //     content: promiseResults
      //       .map((item: IMessage, index: number) => {
      //         let content: string = '';
      //         if (t.currentLocale === ELocale.EN) {
      //           content += `## ${currentOuputFromContextSelected?.title ? currentOuputFromContextSelected?.title : `${t.get('Rewrite')} ${t.get('Result')}`} ${index + 1}:\n`;
      //         }
      //         if (t.currentLocale === ELocale.ZH) {
      //           content += `## ${currentOuputFromContextSelected?.title ? currentOuputFromContextSelected?.title : `${t.get('Rewrite')}${t.get('Result')}`} ${index + 1}:\n`;
      //         }
      //         content += item.content;
      //         return content;
      //       })
      //       .join('\n\n'),
      //   },
      //   updatedAt: new Date(),
      //   versionNum: newMessageExchange_versionNum_for_ai,
      //   role: EMessage_role.AI,
      // };
      // const newChatHistory_for_ai = [...newChatHistory_for_human, newMessageExchange_for_ai];
      // setMessageExchangeData(newMessageExchange_for_ai);
      // setChatHistory(newChatHistory_for_ai);

      const newChatMessages: IChatMessage[] = [...messages_outputs];
      setChatMessages(newChatMessages);
      setCurrentVersionNum(newChatMessages.length);

      setIsCalling(false);
    });
    Promise.all(promiseList).then(() => {
      setChatMessages(promiseResults);
      setIsCalling(false);
    });
  };

  const onRegenerateMessage = () => {
    // setIsCalling(true);

    // const writingPostDataBeforeRollback = { ...messageExchangeData };

    // if (currentVersionNum < 2) return;

    // const rollBackVersionNum = currentVersionNum - 2;
    // const newChatHistory = chatHistory.slice(0, rollBackVersionNum + 1);

    // const basedWritingPostData = newChatHistory[newChatHistory.length - 1];
    // const newWritingPostData = {
    //   ...basedWritingPostData,
    //   background: writingPostDataBeforeRollback.background,
    //   adjust: writingPostDataBeforeRollback.adjust,
    // };

    // setChatHistory(newChatHistory);
    // setCurrentVersionNum(newChatHistory.length - 1);
    // setMessageExchangeData(newWritingPostData);

    // onImproveMessage(newChatHistory, newWritingPostData)();

    setIsCalling(true);

    const newChatMessages = hasChatMessages ? chatMessages.slice(0, currentVersionNum - 1) : [];
    onImproveMessage(newChatMessages)();
    setCurrentVersionNum(newChatMessages.length);
  };

  const onResetAll = () => {
    setChatHistory([]);
    setCurrentVersionNum(0);
    setMessageExchangeData(messageExchangeData_default);

    setMessages_outputs([]);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isLargeScreen = windowWidth > 1000;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {contextSelected && (
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
            <div className="row adjust">
              <ProMode_Adjust
                t={t}
                canRegenerate={currentVersionNum > 0}
                adjustSelected={contextSelected.adjust}
                adjust={adjust}
                setAdjust={setAdjust}
                contextSelected_type={contextSelected.contextType}
                switchContextSelected_by_type={switchContextSelected_by_type}
              />
            </div>

            <div className="row messages_output_num">
              <Form.Item label={t.get('Number of outputs')}>
                <InputNumber
                  value={messages_for_outputs_num}
                  onChange={(value: number) => {
                    setMessages_outputs_num(value);
                  }}
                />
              </Form.Item>
            </div>

            <div className="row background">
              <ProModePage_Background
                t={t}
                backgroundSelected={contextSelected.background}
                background={background}
                setBackground={setBackground}
              />
            </div>

            <div className="row buttons">
              <div className="row operation space-x-4 space-y-4">
                {buttons.map((item: IPromode_v4_tabPane_context_button) => {
                  const { operation, isHidden } = item;
                  if (!isHidden && operation === EButton_operation.GENERATE) {
                    return (
                      <Button
                        type="primary"
                        onClick={() => {
                          onImproveMessage(chatMessages)();
                        }}
                        disabled={isCalling || currentVersionNum < chatMessages.length}
                      >
                        {t.get('Generate')}
                      </Button>
                    );
                  }
                  if (!isHidden && item.operation === EButton_operation.REGENERATE) {
                    return (
                      <Button
                        type="primary"
                        onClick={() => {
                          onRegenerateMessage();
                        }}
                        disabled={isCalling || currentVersionNum < 2}
                      >
                        {t.get('Regenerate')}
                      </Button>
                    );
                  }
                })}

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
            className="column"
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
                <div className="row" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <LeftOutlined
                    style={{ marginLeft: '.4rem', marginRight: '.4rem', width: 20 }}
                    // onClick={() => {
                    //   if (currentVersionNum === 1) return;
                    //   if (isCalling) return;
                    //   const previousVersion = currentVersionNum - 2;
                    //   setMessageExchangeData(
                    //     chatHistory.find((item) => item.versionNum === previousVersion) ?? messageExchangeData,
                    //   );
                    //   setCurrentVersionNum(previousVersion);
                    // }}
                    onClick={() => {
                      if (isCalling) return;

                      setCurrentVersionNum(currentVersionNum - 1);
                    }}
                  />

                  <div className="row">
                    {t.get('Version')}: {currentVersionNum}
                  </div>

                  <RightOutlined
                    style={{ marginLeft: '.4rem', marginRight: '.4rem', width: 20 }}
                    // onClick={() => {
                    //   if (currentVersionNum === chatHistory.length - 1) return;
                    //   if (isCalling) return;
                    //   const nextVersion = currentVersionNum + 2;
                    //   setMessageExchangeData(
                    //     chatHistory.find((item) => item.versionNum === nextVersion) ?? messageExchangeData,
                    //   );
                    //   setCurrentVersionNum(nextVersion);
                    // }}
                    onClick={() => {
                      if (isCalling) return;

                      setCurrentVersionNum(currentVersionNum + 1);
                    }}
                  />
                </div>
              )}
              {/* <div className="row" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              {currentVersionNum === 0 && chatHistory.length === 0 && <div className="row">{t.get('No version')}</div>}
            </div> */}
            </div>

            {/* @TODO */}
            <div className="row component_chatMessages_outputs">
              <ProModePage_ChatMessages
                t={t}
                currentVersionNum={currentVersionNum}
                chatMessages={messages_outputs}
                setChatMessages={setMessages_outputs}
                // cache
                contextSelected_uuid={contextSelected_uuid}
                inputsCache_v3={inputsCache_v3}
                setInputsCache_v3={setInputsCache_v3}
              />
            </div>

            <div className="row component_chatMessages_history">
              <ProModePage_ChatMessages
                t={t}
                currentVersionNum={currentVersionNum}
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
                // cache
                contextSelected_uuid={contextSelected_uuid}
                inputsCache_v3={inputsCache_v3}
                setInputsCache_v3={setInputsCache_v3}
              />
            </div>
          </Splitter.Panel>
        </Splitter>
      )}
      <ProMode_debug_v4_subVersion_2
        contextType={contextType}
        background={background}
        adjust={adjust}
        chatMessages={chatMessages}
        messages_outputs={messages_outputs}
        currentVersionNum={currentVersionNum}
        inputsCache_v3={inputsCache_v3}
      />
    </>
  );
};
