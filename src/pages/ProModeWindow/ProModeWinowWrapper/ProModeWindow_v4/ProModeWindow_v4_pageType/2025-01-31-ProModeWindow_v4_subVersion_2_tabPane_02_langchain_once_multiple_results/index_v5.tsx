import '../../index.scss';

import { useEffect, useState } from 'react';

import { Button, Form, InputNumber, message, Splitter } from 'antd';
// import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { v4 as uuidv4 } from 'uuid';

import TBackendLangchainFile from '../../../../../../gpt-ai-flow-common/ProMode_v4/tools-ProMode_v4/TBackendLangchain';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import TCryptoJSFile from '../../../../../../gpt-ai-flow-common/tools/TCrypto-web';
import {
  IInputsCache_v3,
  IInputsCache_v3_contextSelected_value_default,
} from '../../../../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import { SLLM_v2_common } from '../../../../../../gpt-ai-flow-common/tools/2_class/SLLM_v2_common';

import { EProMode_v4_module_contextType } from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/EProMode_v4_module';
import {
  IProMode_v4_tabPane_context,
  IBackground_for_type_langchain,
  IAdjust_for_type_langchain,
} from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/03-langchain';
import {
  IPromode_v4_tabPane_context_button,
  EButton_operation,
} from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/IProMode_v4_buttons';
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

interface IProModeWindow_v4_subVersion_2_tabPane_02_langchain_once_multiple_results_input {
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
  const { t, userAccessToken, llmOption_secrets, llmName, inputsCache_v3, setInputsCache_v3 } = props;
  inputsCache_v3.when = undefined; // @BUGFIX: when is a reserved when date in JavaScript

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
  // const hasChatMessages = chatMessages.length > 0;
  const [background, setBackground] = useState<IBackground_for_type_langchain>(background_from_cache);
  const [adjust, setAdjust] = useState<IAdjust_for_type_langchain>(adjust_from_cache);

  // Manage multiple outputs results
  const [messagesOutputs_num, setMessagesOutputs_num] = useState<number>(
    1,
    // Object.keys(inputsCache_v3).includes(contextSelected_uuid)
    //   ? inputsCache_v3[contextSelected_uuid]?.messagesOutputs_num
    //   : IInputsCache_v3_contextSelected_value_default.messagesOutputs_num,
  );
  const [messages_outputs, setMessages_outputs] = useState<IChatMessage[]>([]);

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

    const promiseList = []; // @FEAT: for multiple outputs results
    const promiseResults: IChatMessage[] = []; // @FEAT: for multiple outputs results

    if (!messagesOutputs_num) {
      message.error(t.get('Number of outputs is empty'));
      setIsCalling(false);
      return;
    }

    // @FEAT: for multiple outputs results
    for (let index_num = 0; index_num < messagesOutputs_num; index_num++) {
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
          // console.log('writingResultText', writingResultText);

          promiseResults[index_num] = {
            ...promiseResults[index_num],
            role: EAIFlowRole.ASSISTANT,
            content: writingResultText,
          }; // @FEAT: for multiple outputs results, for Promise.all
          setMessages_outputs(promiseResults); // / @FEAT: for multiple outputs results, for UI display
        },
        (resultText: string) => {
          // console.log('AfterRequestFunc', resultText);

          promiseResults[index_num] = {
            ...promiseResults[index_num],
            role: EAIFlowRole.ASSISTANT,
            content: resultText,
          }; // @FEAT: for multiple outputs results, for Promise.all
          setMessages_outputs(promiseResults); // / @FEAT: for multiple outputs results, for UI display
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
      const mergedResult = promiseResults
        .map((item: IChatMessage, index: number) => `## ${`${t.get('Post')} ${index + 1}`}\n\n ${item.content}`)
        .join('\n\n');

      const newChatMessages: IChatMessage[] = [
        {
          ...IChatMessage_default,
          role: EAIFlowRole.ASSISTANT,
          content: mergedResult,
        },
        ...chatMessages,
      ];
      setChatMessages(newChatMessages);
      setCurrentVersionNum(newChatMessages.length);
      setInputsCache_v3({
        ...inputsCache_v3,
        [contextSelected_uuid]: {
          ...inputsCache_v3[contextSelected_uuid],
          chatMessages: newChatMessages,
        },
      });

      setIsCalling(false);
    });
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isLargeScreen = windowWidth > 1000;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const newInputCache_v3 = {
      ...inputsCache_v3,
      [contextSelected_uuid]: {
        ...inputsCache_v3[contextSelected_uuid],
        background,
        adjust,
        chatMessages,
      },
    };
    setCurrentVersionNum(chatMessages.length);
    setInputsCache_v3(newInputCache_v3);
  }, [background, adjust, chatMessages.length]);

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

            <div className="row messages_output_num hidden">
              <Form.Item label={t.get('Number of outputs')}>
                <InputNumber
                  max={4}
                  name="messages_outputs_num"
                  value={messagesOutputs_num}
                  onChange={(value: number) => {
                    setMessagesOutputs_num(value);
                    setInputsCache_v3({
                      ...inputsCache_v3,
                      [contextSelected_uuid]: {
                        ...inputsCache_v3[contextSelected_uuid],
                        messagesOutputs_num: value,
                      },
                    });
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
                  const { operation } = item;
                  if (operation === EButton_operation.GENERATE) {
                    return (
                      <Button
                        type="primary"
                        onClick={() => {
                          onImproveMessage(chatMessages)();
                        }}
                        disabled={isCalling}
                      >
                        {t.get('Generate')}
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

            {/* <div className="row component_chatMessages_history">
              <div className="block_versionNum" style={{ position: 'absolute', right: 0 }}>
                {hasChatMessages && (
                  <div className="row" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
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
            </div> */}
          </Splitter.Panel>
        </Splitter>
      )}
      {/* <ProMode_debug_v4_subVersion_2
        contextType={contextType}
        background={background}
        adjust={adjust}
        chatMessages={chatMessages}
        messages_outputs={messages_outputs}
        currentVersionNum={currentVersionNum}
        inputsCache_v3={inputsCache_v3}
      /> */}
    </>
  );
};
