import '../../index.scss';

import { useState } from 'react';

import { Button, message, Splitter } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

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
import { IInputsCache_v2 } from '../../../../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import { Langchain_context_description } from './component/Langchain_context_description';
import { SLLM_v2_common } from '../../../../../../gpt-ai-flow-common/tools/2_class/SLLM_v2_common';

import { IProModeWindow_v4_wrapper_input } from '../../ProModeWindow_v4_wrapper';
import { IAdjust_IMessage } from '../../../../../../gpt-ai-flow-common/interface-app/2_component/IMessageExchange/IAdjust';
import { EProMode_v4_module_contextType } from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/EProMode_v4_module';
import { to_deprecate_ILangchain_for_type_langchain_request_v3 } from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-call/ILangchain_type_request_v3';
import {
  IProMode_v4_tabPane_context,
  IBackground_for_type_langchain,
  IAdjust_for_type_langchain,
  ILangchainMessageExchange_default,
  ILangchainMessageExchange,
  IFormItem,
} from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/03-langchain';
import {
  IPromode_v4_tabPane_context_button,
  EButton_operation,
} from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/IProMode_v4_buttons';

interface IProModeWindow_v4_tabPane_type_custome_langchain_iterate_and_optimize_v5_input
  extends Omit<IProModeWindow_v4_wrapper_input, 'tabPane'> {
  creativityValue: number;
  contextSelected: IProMode_v4_tabPane_context<IBackground_for_type_langchain, IAdjust_for_type_langchain>;
  // setContextSelected: React.Dispatch<
  //   React.SetStateAction<IProMode_v4_tabPane_context<IBackground_for_type_langchain, IAdjust_for_type_langchain> | null>
  // >;
  switchContextSelected_by_type: (newType: EProMode_v4_module_contextType) => void;
}
export const ProModeWindow_v4_tabPane_langchain_01_iterate_and_optimize_v5 = (
  props: IProModeWindow_v4_tabPane_type_custome_langchain_iterate_and_optimize_v5_input,
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
  // console.log('chatHistory_default', chatHistory_default);
  const messageExchangeData_default = {
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
  const [messageExchangeData, setMessageExchangeData] =
    useState<ILangchainMessageExchange>(messageExchangeData_default);
  const [chatHistory, setChatHistory] = useState<ILangchainMessageExchange[]>(chatHistory_default);
  const [currentVersionNum, setCurrentVersionNum] = useState<number>(
    chatHistory_default.length > 0 ? chatHistory_default.length - 1 : 0,
  );

  const { currentOutput, previousOutput, background, adjust } = messageExchangeData;

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
      prevMessageExchange: chatHistory.length > 0 ? chatHistory[chatHistory.length - 1] : paraMessageExchangeData,
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
      setMessageExchangeData(newMessageExchange_for_human);
      setChatHistory(newChatHistory_for_human);
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
          setMessageExchangeData({
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
          setMessageExchangeData(newMessageExchange_for_ai);
          setChatHistory(newChatHistory_for_ai);
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
        setChatHistory(chatHistoryBeforeImprove);
        setCurrentVersionNum(chatHistoryBeforeImprove.length - 1);
      });
    };

  const onRegenerateMessage = () => {
    setIsCalling(true);

    const writingPostDataBeforeRollback = { ...messageExchangeData };

    if (currentVersionNum < 2) return;

    const rollBackVersionNum = currentVersionNum - 2;
    const newChatHistory = chatHistory.slice(0, rollBackVersionNum + 1);

    const basedWritingPostData = newChatHistory[newChatHistory.length - 1];
    const newWritingPostData = {
      ...basedWritingPostData,
      background: writingPostDataBeforeRollback.background,
      adjust: writingPostDataBeforeRollback.adjust,
    };

    setChatHistory(newChatHistory);
    setCurrentVersionNum(newChatHistory.length - 1);
    setMessageExchangeData(newWritingPostData);

    onImproveMessage(newChatHistory, newWritingPostData)();
  };

  const onResetAll = () => {
    setChatHistory([]);
    setCurrentVersionNum(0);
    setMessageExchangeData({
      ...messageExchangeData_default,
      currentOutput: {
        title: '',
        content: '',
      },
      previousOutput: {
        title: '',
        content: '',
      },
    });
  };

  return (
    <>
      {contextSelected && (
        <Splitter className="row row_contextSelected" style={{ display: 'flex' }}>
          <Splitter.Panel className="column !pr-5" size="40%" collapsible>
            <div className="row adjust">
              <Langchain_adjust
                t={t}
                isAdjustCall={currentVersionNum > 0}
                adjustSelected={contextSelected.adjust}
                adjust={adjust}
                setAdjust={(newItem: IAdjust_IMessage) => {
                  setMessageExchangeData((prvState: ILangchainMessageExchange) => ({
                    ...prvState,
                    adjust: newItem,
                  }));
                  setInputsCache_v2((prvState: IInputsCache_v2) => ({
                    ...prvState,
                    [contextSelected_uuid]: {
                      ...prvState[contextSelected_uuid],
                      ...newItem,
                    },
                  }));
                }}
                contextSelected_type={contextSelected.contextType}
                switchContextSelected_by_type={switchContextSelected_by_type}
              />
            </div>

            <div className="row background">
              <Langchain_background
                t={t}
                backgroundSelected={contextSelected.background}
                background={background}
                setBackground={(newItem: IBackground_for_type_langchain) => {
                  setMessageExchangeData((prvState: ILangchainMessageExchange) => ({
                    ...prvState,
                    background: newItem,
                  }));
                  setInputsCache_v2((prvState: IInputsCache_v2) => ({
                    ...prvState,
                    [contextSelected_uuid]: {
                      ...prvState[contextSelected_uuid],
                      ...newItem,
                    },
                  }));
                }}
              />
            </div>

            <div className="row buttons">
              <div className="row operation">
                {buttons.map((item: IPromode_v4_tabPane_context_button) => {
                  const { operation, isHidden } = item;
                  if (!isHidden && operation === EButton_operation.GENERATE) {
                    return (
                      <Button
                        type="primary"
                        onClick={() => {
                          onImproveMessage(chatHistory, messageExchangeData)();
                        }}
                        disabled={
                          isCalling ||
                          (chatHistory.length > 0
                            ? currentVersionNum !== chatHistory[chatHistory.length - 1].versionNum
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
                        style={{ marginLeft: '1rem' }}
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
                  style={{ marginLeft: '1rem' }}
                >
                  {t.get('Stop')}
                </Button>
              </div>
            </div>
          </Splitter.Panel>

          <Splitter.Panel className="column !pl-5" size="60%" style={{ position: 'relative' }} collapsible>
            <div className="block_versionNum" style={{ position: 'absolute', right: 0 }}>
              {chatHistory.length > 0 && (
                <div className="row" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <LeftOutlined
                    style={{ marginLeft: '.4rem', marginRight: '.4rem', width: 20 }}
                    onClick={() => {
                      if (currentVersionNum === 1) return;
                      if (isCalling) return;
                      const writingPostDataBeforeRollback = { ...messageExchangeData };
                      const { adjust: adjustBeforeRollBack, background: backgroundBeforeRollBack } =
                        writingPostDataBeforeRollback;

                      const previousVersion = currentVersionNum - 2;
                      const messageExchangeDataRollBack =
                        chatHistory.find((item) => item.versionNum === previousVersion) ?? messageExchangeData;

                      setMessageExchangeData({
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
                      if (currentVersionNum === chatHistory.length - 1) return;
                      if (isCalling) return;
                      const writingPostDataBeforeRollback = { ...messageExchangeData };
                      const { adjust: adjustBeforeRollBack, background: backgroundBeforeRollBack } =
                        writingPostDataBeforeRollback;

                      const nextVersion = currentVersionNum + 2;
                      const messageExchangeDataRollBack =
                        chatHistory.find((item) => item.versionNum === nextVersion) ?? messageExchangeData;

                      setMessageExchangeData({
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

            <div className="row currentOuput">
              <Langchain_currentOutput
                t={t}
                title={contextSelected.currentOutput.title ?? t.get('Post')}
                currentOutput={currentOutput}
                setCurrentOutput={(newItem: IMessage) => {
                  setMessageExchangeData({
                    ...messageExchangeData,
                    currentOutput: newItem,
                  });
                }}
                onResetAll={onResetAll}
              />
            </div>

            <div className="row previousOutput">
              <Langchain_previousOutput
                t={t}
                previousOutput={previousOutput}
                setPreviousOutput={(newItem: IMessage) => {
                  setMessageExchangeData({
                    ...messageExchangeData,
                    previousOutput: newItem,
                  });
                }}
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
      {/* <ProMode_v4_Debug
        chatHistory={chatHistory}
        currentVersionNum={currentVersionNum}
        contextType={contextType}
        messageExchangeData={messageExchangeData}
      /> */}
    </>
  );
};
