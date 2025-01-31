import '../../index.scss';

import { useEffect, useState } from 'react';

import { Button, message, Splitter } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { IMessage_default } from '../../../../../../gpt-ai-flow-common/interface-app/3_unit/IMessage';
import { EMessage_role } from '../../../../../../gpt-ai-flow-common/interface-app/3_unit/IMessage_role';
import { to_deprecate_EProductItemDB_type } from '../../../../../../gpt-ai-flow-common/enum-database/to_deprecate_EProductItemDB';
import TBackendLangchainFile from '../../../../../../gpt-ai-flow-common/ProMode_v4/tools-ProMode_v4/TBackendLangchain';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import TCryptoJSFile from '../../../../../../gpt-ai-flow-common/tools/TCrypto-web';
import { IInputsCache_v2 } from '../../../../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import { Langchain_context_description } from './component/Langchain_context_description';
import { SLLM_v2_common } from '../../../../../../gpt-ai-flow-common/tools/2_class/SLLM_v2_common';

import { IProModeWindow_v4_wrapper_input } from '../../ProModeWindow_v4_wrapper';
import { EProMode_v4_module_contextType } from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/EProMode_v4_module';
import { to_deprecate_ILangchain_for_type_langchain_request_v3 } from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-call/ILangchain_type_request_v3';
import {
  IProMode_v4_tabPane_context,
  IBackground_for_type_langchain,
  IAdjust_for_type_langchain,
  ILangchainMessageExchange_default,
  ILangchainMessageExchange,
  IFormItem,
  IBackground_type_langchain_default,
  IAdjust_type_langchain_default,
} from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/03-langchain';
import {
  IPromode_v4_tabPane_context_button,
  EButton_operation,
} from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/IProMode_v4_buttons';

import { IChatMessage, IChatMessage_default } from '../component/interface';
import { ProModePage_ChatMessages } from '../component/ProModePage_ChatMessages';
import { EAIFlowRole } from '../../../../../../gpt-ai-flow-common/enum-app/EAIFlow';
import { ProModePage_Background } from '../component/ProModePage_Background';
import { ProMode_Adjust } from '../component/ProMode_Adjust';

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
  console.log('chatHistory_default', chatHistory_default);
  // console.log('chatHistory_default', chatHistory_default);
  const messageExchangeData_default: ILangchainMessageExchange = {
    ...ILangchainMessageExchange_default,
    // background: defaultBackgtound,
    previousOutput: {
      title:
        chatHistory_default.length > 1 ? chatHistory_default[chatHistory_default.length - 2].previousOutput.title : '',
      content:
        chatHistory_default.length > 1
          ? chatHistory_default[chatHistory_default.length - 2].previousOutput.content
          : '',
    },
    background: {
      ...ILangchainMessageExchange_default.background,
      ...inputsCache_v2[contextSelected_uuid],
    },
    adjust: {
      ...ILangchainMessageExchange_default.adjust,
      ...inputsCache_v2[contextSelected_uuid],
    },
    currentOutput: {
      title:
        chatHistory_default.length > 0 ? chatHistory_default[chatHistory_default.length - 1].currentOutput.title : '',
      content:
        chatHistory_default.length > 0 ? chatHistory_default[chatHistory_default.length - 1].currentOutput.content : '',
    },
    createdAt: new Date(),
    role: EMessage_role.HUMAN,
    versionNum: 0,
  };
  // console.log('messageExchangeData_default', messageExchangeData_default);
  const [messageExchangeData_deprecated, setMessageExchangeData_deprecated] =
    useState<ILangchainMessageExchange>(messageExchangeData_default);
  const [chatHistory_langchain, setChatHistory_langchain] = useState<ILangchainMessageExchange[]>(chatHistory_default);

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

  const filterBackendAndAjdust_before_buildHumanMessage = (paraMessageExchangeData: ILangchainMessageExchange) => {
    const filtedAdjust = contextSelected.adjust.formItems.reduce(
      (acc, currentFormItem: IFormItem<IAdjust_for_type_langchain>) => {
        if (paraMessageExchangeData.adjust[currentFormItem.name]) {
          acc[currentFormItem.name] = paraMessageExchangeData.adjust[currentFormItem.name];
        }
        return acc;
      },
      {} as IAdjust_for_type_langchain,
    );

    const filtedBackground = contextSelected.background.formItems.reduce(
      (acc, currentFormItem: IFormItem<IBackground_for_type_langchain>) => {
        if (paraMessageExchangeData.background[currentFormItem.name]) {
          acc[currentFormItem.name] = paraMessageExchangeData.background[currentFormItem.name];
        }
        return acc;
      },
      {} as IBackground_for_type_langchain,
    );

    const filteredParaMessageExchangeData = {
      ...paraMessageExchangeData,
      adjust: filtedAdjust,
      background: filtedBackground,
    };
    // console.log('filteredParaMessageExchangeData', filteredParaMessageExchangeData);
    return filteredParaMessageExchangeData;
  };

  const buildHumanMessage = (paraMessageExchangeData: ILangchainMessageExchange) => {
    const newVersionNum =
      paraMessageExchangeData.versionNum && paraMessageExchangeData.versionNum > 0
        ? paraMessageExchangeData.versionNum + 1
        : 0;
    const newMessageExchangeData_for_human = {
      ...paraMessageExchangeData,
      previousOutput: paraMessageExchangeData.currentOutput,
      currentOutput: IMessage_default,
      updatedAt: new Date(),
      versionNum: newVersionNum,
      role: EMessage_role.HUMAN,
    };

    const newHumanRequest: to_deprecate_ILangchain_for_type_langchain_request_v3 = {
      productItem_type: to_deprecate_EProductItemDB_type.PRO_MODE_SERVICE,
      llmOptions: {
        llmName,
        llmImageName: null,
        llmSecret: SLLM_v2_common.getApiKey_by_llmName(llmName, llmOption_secrets),
        llmTemperature: creativityValue,
      },
      type: contextType,
      prevMessageExchange:
        chatHistory_langchain.length > 0
          ? chatHistory_langchain[chatHistory_langchain.length - 1]
          : paraMessageExchangeData,
      currentMessageExchange: newMessageExchangeData_for_human,
    };

    // console.log('buildHumanMessage newHumanRequest', newHumanRequest);

    return newHumanRequest;
  };

  const onImproveMessage =
    (chatHistoryBeforeImprove: ILangchainMessageExchange[], paraMessageExchangeData: ILangchainMessageExchange) =>
    async () => {
      setIsCalling(true);

      // console.log('paraMessageExchangeData', paraMessageExchangeData);
      const newRequestController = new AbortController();
      setRequestController(newRequestController);
      const { signal } = newRequestController;

      // 取最新的 ai message, 生成一个 human message，添加到历史，增加 currentVersionNum
      const filteredParaMessageExchangeData = filterBackendAndAjdust_before_buildHumanMessage(paraMessageExchangeData);
      const bodyData: to_deprecate_ILangchain_for_type_langchain_request_v3 = buildHumanMessage(
        filteredParaMessageExchangeData,
      );
      const newMessageExchange_for_human = bodyData.currentMessageExchange;
      const newMessageExchange_versionNum_for_human = bodyData.currentMessageExchange.versionNum;
      const newChatHistory_for_human = [...chatHistoryBeforeImprove, newMessageExchange_for_human];
      setMessageExchangeData_deprecated(newMessageExchange_for_human);
      setChatHistory_langchain(newChatHistory_for_human);
      setCurrentVersionNum(newChatHistory_for_human.length - 1);

      if (!urlSlug) {
        message.error('urlSlug is empty');
        return;
      }

      TBackendLangchainFile.postProMode_v4_langchain_tabPane_chains(
        urlSlug,
        bodyData,
        () => {
          setIsCalling(true);
          console.log('beforeSendRequestFunc');
        },
        (writingResultText: string) => {
          // console.log('updateResultFromRequestFunc', writingResultText);
          setMessageExchangeData_deprecated({
            ...newMessageExchange_for_human,
            currentOutput: {
              title: '',
              content: writingResultText,
            },
          });
        },
        (resultText: string) => {
          // console.log('AfterRequestFunc', resultText);

          const newMessageExchange_versionNum_for_ai = (newMessageExchange_versionNum_for_human ?? 0) + 1;
          const newMessageExchange_for_ai = {
            ...newMessageExchange_for_human,
            currentOutput: {
              title: '',
              content: resultText,
            },
            updatedAt: new Date(),
            versionNum: newMessageExchange_versionNum_for_ai,
            role: EMessage_role.AI,
          };
          if (contextType.includes('agent') || contextType.includes('beta') || contextType.includes('BETA')) {
            console.log("I'm in beta mode, so I'm not going to update the chat history.");
            const response = JSON.parse(resultText);
            const { results } = response;
            const { messages } = results;
            // console.log('results', results);
            // console.log('messages', messages);
            newMessageExchange_for_ai.currentOutput.content = '';
            messages.forEach((item, index: number) => {
              if (index % 2 === 0) {
                if (index !== 0) {
                  newMessageExchange_for_ai.currentOutput.content += '\n\n---\n\n';
                }
                newMessageExchange_for_ai.currentOutput.content += `## ${t.get('Writing post')}\n`;
                newMessageExchange_for_ai.currentOutput.content += item.kwargs.content;
              }
              if (index % 2 === 1) {
                newMessageExchange_for_ai.currentOutput.content += '\n\n---\n\n';
                newMessageExchange_for_ai.currentOutput.content += `## ${t.get('Review post')}\n`;
                const newContent = item.kwargs.content.replace('FINAL ANSWER', '');
                newMessageExchange_for_ai.currentOutput.content += newContent;
              }
            });
          }
          const newChatHistory_for_ai = [...newChatHistory_for_human, newMessageExchange_for_ai];
          setMessageExchangeData_deprecated(newMessageExchange_for_ai);
          setChatHistory_langchain(newChatHistory_for_ai);
          setCurrentVersionNum(newChatHistory_for_ai.length - 1);
          setInputsCache_v2((prvState: IInputsCache_v2) => ({
            ...prvState,
            [contextSelected_uuid]: {
              ...prvState[contextSelected_uuid],
              chatHistory: JSON.stringify(newChatHistory_for_ai),
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
        setChatHistory_langchain(chatHistoryBeforeImprove);
        setCurrentVersionNum(chatHistoryBeforeImprove.length - 1);
      });
    };

  const onRegenerateMessage = () => {
    setIsCalling(true);

    const writingPostDataBeforeRollback = { ...messageExchangeData_deprecated };

    if (currentVersionNum < 2) return;

    const rollBackVersionNum = currentVersionNum - 2;
    const newChatHistory = chatHistory_langchain.slice(0, rollBackVersionNum + 1);

    const basedWritingPostData = newChatHistory[newChatHistory.length - 1];
    const newWritingPostData = {
      ...basedWritingPostData,
      background: writingPostDataBeforeRollback.background,
      adjust: writingPostDataBeforeRollback.adjust,
    };

    setChatHistory_langchain(newChatHistory);
    setCurrentVersionNum(newChatHistory.length - 1);
    setMessageExchangeData_deprecated(newWritingPostData);

    onImproveMessage(newChatHistory, newWritingPostData)();
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
                          onImproveMessage(chatHistory_langchain, messageExchangeData_deprecated)();
                        }}
                        disabled={
                          isCalling ||
                          (chatHistory_langchain.length > 0
                            ? currentVersionNum !== chatHistory_langchain[chatHistory_langchain.length - 1].versionNum
                            : false)
                        }
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
              {chatHistory_langchain.length > 0 && (
                <div className="row" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <LeftOutlined
                    style={{ marginLeft: '.4rem', marginRight: '.4rem', width: 20 }}
                    onClick={() => {
                      if (currentVersionNum === 1) return;
                      if (isCalling) return;
                      const writingPostDataBeforeRollback = { ...messageExchangeData_deprecated };
                      const { adjust: adjustBeforeRollBack, background: backgroundBeforeRollBack } =
                        writingPostDataBeforeRollback;

                      const previousVersion = currentVersionNum - 2;
                      const messageExchangeDataRollBack =
                        chatHistory_langchain.find((item) => item.versionNum === previousVersion) ??
                        messageExchangeData_deprecated;

                      setMessageExchangeData_deprecated({
                        ...messageExchangeDataRollBack,
                        adjust: adjustBeforeRollBack,
                        background: backgroundBeforeRollBack,
                      });
                      setCurrentVersionNum(previousVersion);
                    }}
                  />

                  <div className="row">
                    {t.get('Version')}: {Math.floor(currentVersionNum / 2) + 1}
                  </div>

                  <RightOutlined
                    style={{ marginLeft: '.4rem', marginRight: '.4rem', width: 20 }}
                    onClick={() => {
                      if (currentVersionNum === chatHistory_langchain.length - 1) return;
                      if (isCalling) return;
                      const writingPostDataBeforeRollback = { ...messageExchangeData_deprecated };
                      const { adjust: adjustBeforeRollBack, background: backgroundBeforeRollBack } =
                        writingPostDataBeforeRollback;

                      const nextVersion = currentVersionNum + 2;
                      const messageExchangeDataRollBack =
                        chatHistory_langchain.find((item) => item.versionNum === nextVersion) ??
                        messageExchangeData_deprecated;

                      setMessageExchangeData_deprecated({
                        ...messageExchangeDataRollBack,
                        adjust: adjustBeforeRollBack,
                        background: backgroundBeforeRollBack,
                      });
                      setCurrentVersionNum(nextVersion);
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
