import '../../index.scss';

import { useState } from 'react';

import { Button, message } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { IMessage, IMessage_default } from '../../../../../../../gpt-ai-flow-common/interface-app/3_unit/IMessage';
import { Langchain_previousOutput } from './component/Langchain_previousOutput';
import { Langchain_currentOutput } from './component/Langchain_currentOutput';
import { Langchain_adjust } from './component/Langchain_adjust';
import { Langchain_background } from './component/Langchain_background';
import { EMessage_role } from '../../../../../../../gpt-ai-flow-common/interface-app/3_unit/IMessage_role';
import { EProductItemDB_type } from '../../../../../../../gpt-ai-flow-common/enum-database/EProductItemDB';
import TBackendLangchainFile from '../../../../../../../gpt-ai-flow-common/tools/3_unit/TBackendLangchain';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import TCryptoJSFile from '../../../../../../../gpt-ai-flow-common/tools/TCrypto-web';
import { IInputsCache } from '../../../../../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import { ELocale } from '../../../../../../../gpt-ai-flow-common/enum-app/ELocale';
import {
  EButton_operation,
  IPromode_v4_tabPane_context_button,
} from '../../../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/IProMode_v4_buttons';
import { ILangchain_for_type_langchain_request_V2 } from '../../../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/interface-call/ILangchain_type_request';

import {
  IPromode_v4_tabPane_context,
  IBackground_for_type_langchain,
  IAdjust_for_type_langchain,
  ILangchainMessageExchange_default,
  IAdjust_type_langchain_default,
  ILangchainMessageExchange,
  IFormItem,
} from '../../../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/interface-type/03-langchain';
import { EProMode_v4_tabPane_context_type } from '../../../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/EProMode_v4_tabPane_context_type';
import { IProModeWindow_v4_wrapper_input } from '../../ProModeWindow_v4_wrapper';
import { IAdjust_morePostsChain } from '../../../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/interface-type/03-langchain/02-once-multiple-results/2024-07-03-rewritingTools/2024-05-13-IProMode_v4_morePostsChain';

interface IProModeWindow_v4_tabPane_type_custome_langchain_once_multiple_results_v5_input
  extends Omit<IProModeWindow_v4_wrapper_input, 'tabPane'> {
  creativityValue: number;
  contextSelected: IPromode_v4_tabPane_context<IBackground_for_type_langchain, IAdjust_for_type_langchain>;
  // swtichContextSelected_by_type: (newType: EProMode_v4_tabPane_context_type) => void;
}
export const ProModeWindow_v4_tabPane_type_custome_langchain_once_multiple_results_v5 = (
  props: IProModeWindow_v4_tabPane_type_custome_langchain_once_multiple_results_v5_input,
) => {
  const { creativityValue, contextSelected } = props;
  const { urlSlug, contextType, buttons } = contextSelected;
  console.log('contextSelected', contextSelected);
  const { t, userAccessToken, modelSecret, proModeModelType, inputsCache, setInputsCache } = props;

  const [requestController, setRequestController] = useState<AbortController>(new AbortController());
  const [isCalling, setIsCalling] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messageExchangeType, _] = useState<EProMode_v4_tabPane_context_type>(
    contextType ?? EProMode_v4_tabPane_context_type.GENERAL,
  );
  const messageExchangeData_default = {
    ...ILangchainMessageExchange_default,
    // background: defaultBackgtound,
    background: {
      ...ILangchainMessageExchange_default.background,
      ...inputsCache,
    },
    adjust: {
      ...IAdjust_type_langchain_default,
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
    inputsCache.currentOuputNums ? parseInt(inputsCache.currentOuputNums, 10) : 2, // IAdjust_morePostsChain
  );
  const [messages_outputs, setMessages_outputs] = useState<IMessage[]>([]);

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
      setMessages_outputs([]);
      setIsCalling(true);

      // console.log('paraMessageExchangeData', paraMessageExchangeData);
      const newRequestController = new AbortController();
      setRequestController(newRequestController);
      const { signal } = newRequestController;

      // 取最新的 ai message, 生成一个 human message，添加到历史，增加 currentVersionNum
      const filteredParaMessageExchangeData = filterBackendAndAjdust_before_buildHumanMessage(paraMessageExchangeData);
      const bodyData: ILangchain_for_type_langchain_request_V2 = buildHumanMessage(filteredParaMessageExchangeData);
      const newMessageExchange_for_human = bodyData.currentMessageExchange;
      const newMessageExchange_versionNum_for_human = bodyData.currentMessageExchange.versionNum;
      const newChatHistory_for_human = [...chatHistoryBeforeImprove, newMessageExchange_for_human];
      setMessageExchangeData(newMessageExchange_for_human);
      setChatHistory(newChatHistory_for_human);
      setCurrentVersionNum(newChatHistory_for_human.length - 1);

      const promiseList = [];
      const promiseResults: IMessage[] = [];

      for (let index_num = 0; index_num < messages_for_outputs_num; index_num++) {
        if (!urlSlug) {
          message.error('urlSlug is empty');
          continue;
        }
        const promiseInstance = TBackendLangchainFile.postProMode_v4_langchain_tabPane_chains(
          urlSlug,
          bodyData,
          () => {
            setIsCalling(true);
            console.log('beforeSendRequestFunc');
          },
          (writingResultText: string) => {
            // console.log('updateResultFromRequestFunc', writingResultText);
            promiseResults[index_num] = { title: '', content: writingResultText }; // For Promise.all
            setMessages_outputs((prevState) => {
              prevState[index_num] = { title: '', content: writingResultText };
              return prevState;
            }); // For UI display

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

            promiseResults[index_num] = { title: '', content: resultText }; // For Promise.all
            setMessages_outputs((prevState) => {
              prevState[index_num] = { title: '', content: resultText };
              return prevState;
            }); // For UI display

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
          setChatHistory(chatHistoryBeforeImprove);
          setCurrentVersionNum(chatHistoryBeforeImprove.length - 1);
        });

        promiseList.push(promiseInstance);
      }

      Promise.all(promiseList).then(() => {
        const newMessageExchange_versionNum_for_ai = (newMessageExchange_versionNum_for_human ?? 0) + 1;
        const newMessageExchange_for_ai = {
          ...newMessageExchange_for_human,
          currentOutput: {
            title: '',
            content: promiseResults
              .map((item: IMessage, index: number) => {
                let content: string = '';
                if (t.currentLocale === ELocale.EN) {
                  content += `## ${t.get('Rewrite')} ${t.get('Result')} ${index + 1}:\n`;
                }
                if (t.currentLocale === ELocale.ZH) {
                  content += `## ${t.get('Rewrite')}${t.get('Result')} ${index + 1}:\n`;
                }
                content += item.content;
                return content;
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
    <>
      {contextSelected && (
        <div className="row row_contextSelected" style={{ display: 'flex' }}>
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

            {!contextSelected.currentOutput.isHidden && !isCalling && (
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
            )}

            {isCalling &&
              messages_outputs.map((item: IMessage, index: number) => {
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
                      onResetAll={onResetAll}
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
                isAdjustCall={currentVersionNum > 0}
                adjustSelected={contextSelected.adjust}
                adjust={adjust as IAdjust_morePostsChain}
                setAdjust={(newItem: IAdjust_morePostsChain) => {
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
                  setInputsCache((prvState: IInputsCache) => ({
                    ...prvState,
                    ...newItem,
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
          </div>
        </div>
      )}
    </>
  );
};
