import '../../index.scss';

import { useEffect, useState } from 'react';

import { Button, message, Splitter } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import {
  IChatMessage,
  IChatMessage_default,
} from '../../../../../../gpt-ai-flow-common/interface-app/3_unit/IChatMessage';
import TCryptoJSFile from '../../../../../../gpt-ai-flow-common/tools/TCrypto-web';
import { Langchain_context_description } from './component/Langchain_context_description';
import {
  IPromode_v4_tabPane_context_button,
  EButton_operation,
} from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/IProMode_v4_buttons';
import { SLLM_v2_common } from '../../../../../../gpt-ai-flow-common/tools/2_class/SLLM_v2_common';
import {
  IInputsCache_v2,
  IInputsCache_v2_contextSelected_value_default,
} from '../../../../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import {
  IProMode_v4_tabPane_context,
  IBackground_for_type_langchain,
  IAdjust_for_type_langchain,
} from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/03-langchain';
import TBackendLangchainFile from '../../../../../../gpt-ai-flow-common/ProMode_v4/tools-ProMode_v4/TBackendLangchain';
import { EProMode_v4_module_contextType } from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/EProMode_v4_module';
import { IProMode_module_request_v4_subVersion_2 } from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-call/IProMode_module_request_v4_subVersion_2';

import { IProModeWindow_v4_wrapper_input } from '../../ProModeWindow_v4_wrapper';

import { ProMode_Adjust } from '../component/ProMode_Adjust';
import { ProModePage_ChatMessages } from '../component/ProModePage_ChatMessages';
import { ProModePage_Background } from '../component/ProModePage_Background';
import { EAIFlowRole } from '../../../../../../gpt-ai-flow-common/enum-app/EAIFlow';
import { ProMode_debug_v4_subVersion_2 } from '../ProMode_debug_v4_subVersion_2';

interface IProModeWindow_v4_subVersion_2_tabPane_01_langchain_iterate_and_optimize_input
  extends Omit<IProModeWindow_v4_wrapper_input, 'tabPane'> {
  creativityValue: number;
  contextSelected: IProMode_v4_tabPane_context<IBackground_for_type_langchain, IAdjust_for_type_langchain>;
  // setContextSelected: React.Dispatch<
  //   React.SetStateAction<IProMode_v4_tabPane_context<IBackground_for_type_langchain, IAdjust_for_type_langchain> | null>
  // >;
  switchContextSelected_by_type: (newType: EProMode_v4_module_contextType) => void;
}
export const ProModeWindow_v4_subVersion_2_tabPane_01_langchain_iterate_and_optimize = (
  props: IProModeWindow_v4_subVersion_2_tabPane_01_langchain_iterate_and_optimize_input,
) => {
  const { creativityValue, contextSelected, switchContextSelected_by_type } = props;
  const { uuid: contextSelected_uuid, urlSlug, contextType, buttons } = contextSelected;
  const { t, userAccessToken, llmOption_secrets, llmName, inputsCache_v2, setInputsCache_v2 } = props;
  inputsCache_v2.when = undefined; // @BUGFIX: when is a reserved when date in JavaScript

  const [requestController, setRequestController] = useState<AbortController>(new AbortController());
  const [isCalling, setIsCalling] = useState<boolean>(false);

  const {
    background: background_from_cache,
    adjust: adjust_from_cache,
    chatMessages: chatMessages_from_cache,
  } = { ...IInputsCache_v2_contextSelected_value_default, ...inputsCache_v2[contextSelected_uuid] };

  // console.log('chatMessages_from_cache', chatMessages_from_cache);

  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([
    ...chatMessages_from_cache,
    // { ...IChatMessage_default, role: EAIFlowRole.USER, content: '你好' },
  ]);
  const [currentVersionNum, setCurrentVersionNum] = useState<number>(chatMessages.length);
  const hasChatMessages = chatMessages.length > 0;
  const [background_v2, setBackground_v2] = useState<IBackground_for_type_langchain>(background_from_cache);
  const [adjust_v2, setAdjust_v2] = useState<IAdjust_for_type_langchain>(adjust_from_cache);

  const onImproveMessage = (chatMessagesBeforeImprove: IChatMessage[]) => async () => {
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

    // const lastMessage: IChatMessage =
    //   chatMessagesBeforeImprove_copy.length > 0
    //     ? chatMessagesBeforeImprove_copy[chatMessagesBeforeImprove_copy.length - 1]
    //     : IChatMessage_default;
    // const secondLastMessage = chatMessagesBeforeImprove_copy.length > 1 ? chatMessagesBeforeImprove_copy[chatMessagesBeforeImprove_copy.length - 2] : IChatMessage_default;

    let newChatMessage: IChatMessage = {
      ...IChatMessage_default,
      adjust: adjust_v2,
      background: background_v2,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newChatMessages: IChatMessage[] = [...chatMessagesBeforeImprove_copy, newChatMessage];
    setChatMessages(newChatMessages);
    setCurrentVersionNum(newChatMessages.length);

    if (!urlSlug) {
      message.error('urlSlug is empty');
      return;
    }

    const bodyData: IProMode_module_request_v4_subVersion_2 = {
      contextType,
      llmOptions,
      background: background_v2,
      adjust: adjust_v2,
      chatMessages: newChatMessages,
    };

    TBackendLangchainFile.postProMode_moduleChain_v4_subVersion_2(
      urlSlug,
      bodyData,
      () => {
        setIsCalling(true);
        console.log('beforeSendRequestFunc');
      },
      (writingResultText: string) => {
        console.log('updateResultFromRequestFunc', writingResultText);
        newChatMessage = {
          ...newChatMessage,
          content: writingResultText,
          updatedAt: new Date(),
        };
        const newChatMessages: IChatMessage[] = [...chatMessagesBeforeImprove_copy, newChatMessage];
        setChatMessages(newChatMessages);
      },
      (resultText: string) => {
        console.log('AfterRequestFunc', resultText);
        newChatMessage = {
          ...newChatMessage,
          content: resultText,
          updatedAt: new Date(),
        };
        const newChatMessages: IChatMessage[] = [...chatMessagesBeforeImprove_copy, newChatMessage];
        setChatMessages(newChatMessages);
        setCurrentVersionNum(newChatMessages.length);

        setInputsCache_v2({
          ...inputsCache_v2,
          [contextSelected_uuid]: {
            ...inputsCache_v2[contextSelected_uuid],
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
      console.log('error', error);
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

    const newChatMessages = hasChatMessages ? chatMessages.slice(0, -1) : [];
    onImproveMessage(newChatMessages)();
    setCurrentVersionNum(newChatMessages.length);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isLargeScreen = windowWidth > 1000;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // console.log('background_v2', background_v2);
    // console.log('adjust_v2', adjust_v2);
    const newInputCache_v2 = {
      ...inputsCache_v2,
      [contextSelected_uuid]: {
        ...inputsCache_v2[contextSelected_uuid],
        background: background_v2,
        adjust: adjust_v2,
        chatMessages,
      },
    };
    setInputsCache_v2(newInputCache_v2);
  }, [background_v2, adjust_v2, chatMessages.length]);

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
                adjust={adjust_v2}
                setAdjust={setAdjust_v2}
                contextSelected_type={contextSelected.contextType}
                switchContextSelected_by_type={switchContextSelected_by_type}
              />
            </div>

            {console.log('contextSelected.background', contextSelected.background)}

            <div className="row background">
              <ProModePage_Background
                t={t}
                backgroundSelected={contextSelected.background}
                background={background_v2}
                setBackground={setBackground_v2}
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
                        disabled={isCalling}
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
                        disabled={isCalling || chatMessages.length === 0}
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
                <div className="row pr-2" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
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
              {/* <div className="row" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              {currentVersionNum === 0 && chatHistory.length === 0 && <div className="row">{t.get('No version')}</div>}
            </div> */}
            </div>

            <div className="row component_chatMessages">
              <ProModePage_ChatMessages
                t={t}
                currentVersionNum={currentVersionNum}
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
              />
            </div>

            {contextSelected.description && (
              <div className="row description">
                <Langchain_context_description t={t} description={contextSelected.description} />
              </div>
            )}
          </Splitter.Panel>
        </Splitter>
      )}
      <ProMode_debug_v4_subVersion_2
        contextType={contextType}
        background={background_v2}
        adjust={adjust_v2}
        chatMessages={chatMessages}
        currentVersionNum={currentVersionNum}
        inputsCache_v2={inputsCache_v2}
      />
    </>
  );
};
