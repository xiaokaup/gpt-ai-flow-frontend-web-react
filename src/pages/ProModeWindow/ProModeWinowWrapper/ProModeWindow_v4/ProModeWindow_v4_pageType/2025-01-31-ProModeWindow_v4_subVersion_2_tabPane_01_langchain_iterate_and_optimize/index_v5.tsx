import '../../index.scss';

import { useEffect, useState } from 'react';

import { Button, message, Splitter } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import {
  IChatMessage,
  IChatMessage_default,
} from '../../../../../../gpt-ai-flow-common/interface-app/3_unit/IChatMessage';
import TCryptoJSFile from '../../../../../../gpt-ai-flow-common/tools/TCrypto-web';
import { EAIFlowRole } from '../../../../../../gpt-ai-flow-common/enum-app/EAIFlow';
import { Langchain_context_description } from './component/Langchain_context_description';
import {
  IPromode_v4_tabPane_context_button,
  EButton_operation,
} from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/IProMode_v4_buttons';
import { SLLM_v2_common } from '../../../../../../gpt-ai-flow-common/tools/2_class/SLLM_v2_common';
import { IInputsCache_v2 } from '../../../../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import {
  IProMode_v4_tabPane_context,
  IBackground_for_type_langchain,
  IAdjust_for_type_langchain,
  IBackground_type_langchain_default,
  IAdjust_type_langchain_default,
} from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/03-langchain';
import TBackendLangchainFile from '../../../../../../gpt-ai-flow-common/ProMode_v4/tools-ProMode_v4/TBackendLangchain';
import { EProMode_v4_module_contextType } from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/EProMode_v4_module';
import { IProMode_module_request_v4_subVersion_2 } from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-call/IProMode_module_request_v4_subVersion_2';

import { IProModeWindow_v4_wrapper_input } from '../../ProModeWindow_v4_wrapper';

import { ProMode_Adjust } from '../component/ProMode_Adjust';
import { ProModePage_ChatMessages } from '../component/ProModePage_ChatMessages';
import { ProModePage_Background } from '../component/ProModePage_Background';

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

  const chatHistory_default = inputsCache_v2[contextSelected_uuid]?.['chatHistory']
    ? JSON.parse(inputsCache_v2[contextSelected_uuid]?.['chatHistory'])
    : [];

  const [currentVersionNum, setCurrentVersionNum] = useState<number>(
    chatHistory_default.length > 0 ? chatHistory_default.length - 1 : 0,
  );
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([
    { ...IChatMessage_default, role: EAIFlowRole.USER, content: '你好' },
  ]);
  const [background_v2, setBackground_v2] = useState<IBackground_for_type_langchain>({
    ...IBackground_type_langchain_default,
    ...chatMessages[chatMessages.length - 1].background,
    ...inputsCache_v2[contextSelected_uuid],
  });
  const [adjust_v2, setAdjust_v2] = useState<IAdjust_for_type_langchain>({
    ...IAdjust_type_langchain_default,
    ...chatMessages[chatMessages.length - 1].adjust,
    ...inputsCache_v2[contextSelected_uuid],
  });

  const onImproveMessage = (chatMessagesBeforeImprove: IChatMessage[]) => async () => {
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

    const lastMessage: IChatMessage =
      chatMessagesBeforeImprove_copy.length > 0
        ? chatMessagesBeforeImprove_copy[chatMessagesBeforeImprove_copy.length - 1]
        : IChatMessage_default;
    // const secondLastMessage = chatMessagesBeforeImprove_copy.length > 1 ? chatMessagesBeforeImprove_copy[chatMessagesBeforeImprove_copy.length - 2] : IChatMessage_default;
    const { adjust, background } = lastMessage;
    const bodyData: IProMode_module_request_v4_subVersion_2 = {
      contextType,
      llmOptions,
      background,
      adjust,
      chatMessages,
    };

    const newChatMessages = [...chatMessagesBeforeImprove_copy, { ...IChatMessage_default, adjust, background }];
    setChatMessages(newChatMessages);
    setCurrentVersionNum(newChatMessages.length - 1);

    if (!urlSlug) {
      message.error('urlSlug is empty');
      return;
    }

    TBackendLangchainFile.postProMode_moduleChain_v4_subVersion_2(
      urlSlug,
      bodyData,
      () => {
        setIsCalling(true);
        console.log('beforeSendRequestFunc');
      },
      (writingResultText: string) => {
        // console.log('updateResultFromRequestFunc', writingResultText);
        setChatMessages((prvState: IChatMessage[]) => {
          const newChatMessages = [...prvState];
          newChatMessages[newChatMessages.length - 1].content = writingResultText;
          return newChatMessages;
        });
      },
      (resultText: string) => {
        // console.log('AfterRequestFunc', resultText);

        setChatMessages((prvState: IChatMessage[]) => {
          const newChatMessages = [...prvState];
          newChatMessages[newChatMessages.length - 1].content = resultText;
          return newChatMessages;
        });
        setCurrentVersionNum(chatMessages.length - 1);

        setInputsCache_v2((prvState: IInputsCache_v2) => ({
          ...prvState,
          [contextSelected_uuid]: {
            ...prvState[contextSelected_uuid],
            chatHistory: JSON.stringify(chatMessages),
          },
        }));

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
      setCurrentVersionNum(chatMessagesBeforeImprove_copy.length - 1);
    });
  };

  const onRegenerateMessage = () => {
    setIsCalling(true);

    const newChatMessages = chatMessages.length > 0 ? chatMessages.slice(0, -1) : [];
    onImproveMessage(newChatMessages)();
    setCurrentVersionNum(newChatMessages.length - 1);
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
                        disabled={isCalling || chatMessages.length === 0}
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
              {chatMessages.length > 0 && (
                <div className="row" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <LeftOutlined
                    style={{ marginLeft: '.4rem', marginRight: '.4rem', width: 20 }}
                    onClick={() => {
                      if (chatMessages.length > 0) return;
                      if (isCalling) return;

                      const newChatMessages = chatMessages.slice(0, -1);
                      setCurrentVersionNum(newChatMessages.length - 1);
                    }}
                  />

                  <div className="row">
                    {t.get('Version')}: {Math.floor(currentVersionNum / 2) + 1}
                  </div>

                  <RightOutlined
                    style={{ marginLeft: '.4rem', marginRight: '.4rem', width: 20 }}
                    onClick={() => {
                      if (currentVersionNum === chatMessages.length - 1) return;
                      if (isCalling) return;

                      const newVersion =
                        currentVersionNum + 1 < chatMessages.length ? currentVersionNum + 1 : chatMessages.length - 1;
                      setCurrentVersionNum(newVersion);
                    }}
                  />
                </div>
              )}
              {/* <div className="row" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              {currentVersionNum === 0 && chatHistory.length === 0 && <div className="row">{t.get('No version')}</div>}
            </div> */}
            </div>

            <div className="row component_chatMessages">
              <ProModePage_ChatMessages t={t} chatMessages={chatMessages} setChatMessages={setChatMessages} />
            </div>

            {contextSelected.description && (
              <div className="row description">
                <Langchain_context_description t={t} description={contextSelected.description} />
              </div>
            )}
          </Splitter.Panel>
        </Splitter>
      )}
      {/* <ProMode_v4_Debug
        chatHistory={chatHistory}
        currentVersionNum={currentVersionNum}
        contextType={contextType}
        messageExchangeData={messageExchangeData}
      /> */}
    </>
  );
};
