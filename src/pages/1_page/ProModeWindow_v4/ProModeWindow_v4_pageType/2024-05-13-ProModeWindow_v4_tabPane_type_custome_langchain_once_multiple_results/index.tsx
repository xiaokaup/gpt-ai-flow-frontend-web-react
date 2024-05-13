import React, { useEffect, useState } from 'react';

import { Button, Select, message } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { useCreativityValueContext } from '../../../../../gpt-ai-flow-common/contexts/CreativityValueProviderContext';
import { EOpenAiModel_type } from '../../../../../gpt-ai-flow-common/enum-backend/EOpenAIModelType';
import { IGetT_frontend_output } from '../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IProMode_v4_tabPane } from '../../../../../gpt-ai-flow-common/interface-app/solution_ProMode_v4/IProMode_v4';
import { IMessage, IMessage_default } from '../../../../../gpt-ai-flow-common/interface-app/3_unit/IMessage';
import { Langchain_previousOutput } from './component/Langchain_previousOutput';
import { Langchain_currentOutput } from './component/Langchain_currentOutput';
import { Langchain_adjust } from './component/Langchain_adjust';
import { Langchain_background } from './component/Langchain_background';
import { EMessage_role } from '../../../../../gpt-ai-flow-common/interface-app/3_unit/IMessage_role';
import { EProductItemDB_type } from '../../../../../gpt-ai-flow-common/enum-database/EProductItemDB';
import TBackendLangchainFile from '../../../../../gpt-ai-flow-common/tools/3_unit/TBackendLangchain';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import TCryptoJSFile from '../../../../../gpt-ai-flow-common/tools/TCrypto-js';
import {
  ELangchain_contextType,
  IAdjust_for_type_langchain,
  IBackground_for_type_langchain,
  ILangchainMessageExchange,
  ILangchainMessageExchange_default,
  IPromode_v4_tabPane_context_for_type_custom_langchain,
} from '../../../../../gpt-ai-flow-common/interface-app/solution_ProMode_v4/type/03-custome-langchain/IProMode_v4_context_type_langchain';
import { ILangchain_for_type_langchain_request_V2 } from '../../../../../gpt-ai-flow-common/interface-app/solution_ProMode_v4/ILangchain_type_request';
import { IInputsCache } from '../../../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import { EButton_operation } from '../../../../../gpt-ai-flow-common/interface-app/solution_ProMode_v4/IProMode_v4_buttons';
import { IAdjust_for_type_morePostsChain } from 'gpt-ai-flow-common/interface-app/solution_ProMode_v4/type/03-custome-langchain/IProMode_v4_type_langchain_for_morePostsChain';

interface ProModeWindow_v4_tabPane_type_custome_langchain_once_multiple_results_input {
  t: IGetT_frontend_output;
  tabPane: IProMode_v4_tabPane<
    IPromode_v4_tabPane_context_for_type_custom_langchain<IBackground_for_type_langchain, IAdjust_for_type_langchain>
  >;
  userAccessToken: string;
  modelSecret: string;
  proModeModelType: EOpenAiModel_type;
  inputsCache: IInputsCache;
  setInputsCache: React.Dispatch<React.SetStateAction<IInputsCache>>;
}
export const ProModeWindow_v4_tabPane_type_custome_langchain_once_multiple_results = (
  props: ProModeWindow_v4_tabPane_type_custome_langchain_once_multiple_results_input,
) => {
  const { t, tabPane, userAccessToken, modelSecret, proModeModelType, inputsCache, setInputsCache } = props;
  const { urlSlug, context, buttons } = tabPane;
  const creativityValue = useCreativityValueContext();

  const [requestController, setRequestController] = useState<AbortController>(new AbortController());
  const [isCalling, setIsCalling] = useState<boolean>(false);

  const [messageExchangeType, setMessageExchangeType] = useState<ELangchain_contextType>(
    context.length > 0 ? context[0].type : ELangchain_contextType.GENERAL,
  );
  const messageExchangeData_default = {
    ...ILangchainMessageExchange_default,
    // background: defaultBackgtound,
    background: {
      ...ILangchainMessageExchange_default.background,
      ...inputsCache,
    },
    adjust: {
      ...ILangchainMessageExchange_default.adjust,
      ...inputsCache,
    },
    createdAt: new Date(),
    role: EMessage_role.HUMAN,
    versionNum: 0,
  };
  const [messageExchangeData, setMessageExchangeData] =
    useState<ILangchainMessageExchange>(messageExchangeData_default);
  const [currentVersionNum, setCurrentVersionNum] = useState<number>(0);
  const [chatHistory, setChatHistory] = useState<ILangchainMessageExchange[]>([]);

  // Manage multiple outputs results
  const [messages_for_outputs_num, setMessages_outputs_num] = useState<number>(
    inputsCache['currentOuputNums'] ? parseInt(String(inputsCache['currentOuputNums'])) : 2, // IAdjust_for_type_morePostsChain
  );
  const [messages_outputs, setMessages_outputs] = useState<IMessage[]>([]);

  const { currentOutput, previousOutput, background, adjust } = messageExchangeData;

  const [contextSelected, setContextSelected] = useState<IPromode_v4_tabPane_context_for_type_custom_langchain<
    IBackground_for_type_langchain,
    IAdjust_for_type_langchain
  > | null>(context.length > 0 ? context[0] : null);

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

    const newHumanRequest: ILangchain_for_type_langchain_request_V2 = {
      productItem_type: EProductItemDB_type.PRO_MODE_SERVICE,
      modelSecret,
      modelOptions: {
        openaiModelType: proModeModelType,
        temperature: creativityValue,
      },
      type: messageExchangeType,
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
      const bodyData: ILangchain_for_type_langchain_request_V2 = buildHumanMessage(paraMessageExchangeData);
      const newMessageExchange_for_human = bodyData.currentMessageExchange;
      const newMessageExchange_versionNum_for_human = bodyData.currentMessageExchange.versionNum;
      const newChatHistory_for_human = [...chatHistoryBeforeImprove, newMessageExchange_for_human];
      setMessageExchangeData(newMessageExchange_for_human);
      setChatHistory(newChatHistory_for_human);
      setCurrentVersionNum(newChatHistory_for_human.length - 1);

      const promiseList = [];

      for (let index_num = 0; index_num < messages_for_outputs_num; index_num++) {
        const promiseInstance = TBackendLangchainFile.postLangchain_type_custom_langchain(
          urlSlug,
          bodyData,
          () => {
            setIsCalling(true);
            console.log('beforeSendRequestFunc');
          },
          (writingResultText: string) => {
            // console.log('updateResultFromRequestFunc', writingResultText);
            setMessages_outputs((prevState) => {
              prevState[index_num] = { title: '', content: writingResultText };
              return prevState;
            });

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

            setMessages_outputs((prevState) => {
              prevState[index_num] = { title: '', content: resultText };
              return prevState;
            });

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
        });

        promiseList.push(promiseInstance);
      }

      Promise.all(promiseList).then(() => {
        console.log('newChatHistory_for_human', newChatHistory_for_human);
        console.log('messages_outputs', messages_outputs);

        const newMessageExchange_versionNum_for_ai = (newMessageExchange_versionNum_for_human ?? 0) + 1;
        const newMessageExchange_for_ai = {
          ...newMessageExchange_for_human,
          currentOutput: {
            title: '',
            content: messages_outputs
              .map((item: IMessage, index: number) => {
                return `
Result ${index + 1}:
${item.content}`;
              })
              .join('\n\n'),
          },
          updatedAt: new Date(),
          versionNum: newMessageExchange_versionNum_for_ai,
          role: EMessage_role.AI,
        };
        const newChatHistory_for_ai = [...newChatHistory_for_human, newMessageExchange_for_ai];
        setMessageExchangeData(newMessageExchange_for_ai);
        setChatHistory(newChatHistory_for_ai);
        setCurrentVersionNum(newChatHistory_for_ai.length - 1);

        setIsCalling(false);
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
    setMessageExchangeData(messageExchangeData_default);

    setMessages_outputs([]);
  };

  return (
    <div className="page_container" style={{ maxWidth: 'unset' }}>
      <div className="context_container">
        <div className="row" style={{ paddingLeft: '1rem' }}>
          <Select
            defaultValue={contextSelected?.type ?? null}
            style={{ width: 120 }}
            onChange={(value: string) => {
              console.log(`selected ${value}`);
              setContextSelected(context.find((item) => item.type === value) ?? null);
              setMessageExchangeType(
                context.find((item) => item.type === value)?.type ?? ELangchain_contextType.GENERAL,
              );
            }}
            options={context.map(
              (
                item: IPromode_v4_tabPane_context_for_type_custom_langchain<
                  IBackground_for_type_langchain,
                  IAdjust_for_type_langchain
                >,
              ) => {
                return {
                  label: t.get(item.label),
                  value: item.type,
                };
              },
            )}
          />
        </div>

        {contextSelected && (
          <div className="row" style={{ display: 'flex' }}>
            <div className="column" style={{ position: 'relative', flex: '1 1 55%', paddingRight: '1rem' }}>
              <div className="block_versionNum" style={{ position: 'absolute', right: 0 }}>
                {chatHistory.length > 0 && (
                  <div className="row" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <LeftOutlined
                      style={{ marginLeft: '.4rem', marginRight: '.4rem', width: 20 }}
                      onClick={() => {
                        if (currentVersionNum === 1) return;
                        if (isCalling) return;
                        const previousVersion = currentVersionNum - 2;
                        setMessageExchangeData(
                          chatHistory.find((item) => item.versionNum === previousVersion) ?? messageExchangeData,
                        );
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
                        const nextVersion = currentVersionNum + 2;
                        setMessageExchangeData(
                          chatHistory.find((item) => item.versionNum === nextVersion) ?? messageExchangeData,
                        );
                        setCurrentVersionNum(nextVersion);
                      }}
                    />
                  </div>
                )}
                {/* <div className="row" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              {currentVersionNum === 0 && chatHistory.length === 0 && <div className="row">{t.get('No version')}</div>}
            </div> */}
              </div>

              {!contextSelected.currentOutput.isHidden && (
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
                  />
                </div>
              )}

              {messages_outputs.map((item: IMessage, index: number) => {
                return (
                  <div className="row currentOuput" key={index}>
                    <Langchain_currentOutput
                      t={t}
                      title={`${contextSelected.currentOutput.title} ${index + 1}` ?? t.get('Post')}
                      currentOutput={item}
                      setCurrentOutput={(newItem: IMessage) => {
                        setMessageExchangeData({
                          ...messageExchangeData,
                          currentOutput: newItem,
                        });
                      }}
                    />
                  </div>
                );
              })}

              {!contextSelected.previousOutput.isHidden && (
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
              )}
            </div>

            <div
              className="column m-0"
              style={{ flex: '1 1 45%', borderLeft: '1px solid #d9d9d9', paddingLeft: '1.2rem' }}
            >
              <div className="row adjust">
                <Langchain_adjust
                  t={t}
                  adjustSelected={contextSelected.adjust}
                  adjust={adjust as IAdjust_for_type_morePostsChain}
                  setAdjust={(newItem: IAdjust_for_type_morePostsChain) => {
                    setMessages_outputs_num(newItem.currentOuputNums);
                    setMessageExchangeData({
                      ...messageExchangeData,
                      adjust: newItem,
                    });
                    setInputsCache((prvState: IInputsCache) => ({
                      ...prvState,
                      ...newItem,
                      currentOuputNums: newItem?.currentOuputNums?.toString(), // Convert currentOuputNums to string
                    }));
                  }}
                />
              </div>

              <div className="row background">
                <Langchain_background
                  t={t}
                  backgroundSelected={contextSelected.background}
                  background={background}
                  setBackground={(newItem: IBackground_for_type_langchain) => {
                    setMessageExchangeData({
                      ...messageExchangeData,
                      background: newItem,
                    });
                    setInputsCache((prvState) => ({
                      ...prvState,
                      ...newItem,
                    }));
                  }}
                  onResetAll={onResetAll}
                />
              </div>

              <div className="row buttons">
                <div className="row operation">
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

                  {!buttons.find((item) => item.operation === EButton_operation.REGENERATE)?.isHidden && (
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
                  )}

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

                {/* <div className="row @DEV">
                  <Button
                    type="primary"
                    onClick={() => {
                      console.log('chatHistory', chatHistory);
                    }}
                  >
                    chatHistory
                  </Button>

                  <Button
                    type="primary"
                    onClick={() => {
                      console.log('currentVersionNum', currentVersionNum);
                    }}
                    style={{ marginLeft: '1rem' }}
                  >
                    currentVersionNum
                  </Button>

                  <Button
                    type="primary"
                    onClick={() => {
                      console.log('messageExchangeType', messageExchangeType);
                      console.log('messageExchangeData', messageExchangeData);
                    }}
                    style={{ marginLeft: '1rem' }}
                  >
                    messageExchangeData
                  </Button>

                  <Button
                    type="primary"
                    onClick={() => {
                      console.log('messages_for_outputs_num', messages_for_outputs_num);
                    }}
                    style={{ marginLeft: '1rem' }}
                  >
                    messages_for_outputs_num
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      console.log('messages_outputs', messages_outputs);
                    }}
                    style={{ marginLeft: '1rem' }}
                  >
                    messages_outputs
                  </Button>
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
