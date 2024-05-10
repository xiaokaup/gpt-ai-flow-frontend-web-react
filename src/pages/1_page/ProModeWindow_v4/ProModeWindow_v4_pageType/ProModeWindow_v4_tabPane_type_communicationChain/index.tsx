import React, { useEffect, useState } from 'react';

import { Button, Select, message } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { useCreativityValueContext } from '../../../../../gpt-ai-flow-common/contexts/CreativityValueProviderContext';
import { EOpenAiModel_type } from '../../../../../gpt-ai-flow-common/enum-backend/EOpenAIModelType';
import { IGetT_frontend_output } from '../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IProMode_v4_tabPane } from '../../../../../gpt-ai-flow-common/interface-app/solution_ProMode_v4/IProMode_v4';
import { IAdjust_for_IMessage, IMessage } from '../../../../../gpt-ai-flow-common/interface-app/3_unit/IMessage';
import { Langchain_previousOutput } from './component/Langchain_previousOutput';
import { Langchain_currentOutput } from './component/Langchain_currentOutput';
import { Langchain_adjust } from './component/Langchain_adjust';
import { Langchain_background } from './component/Langchain_background';
import {
  IPromode_v4_tabPane_context_for_type_langchain,
  IPromode_v4_tabPane_context_for_type_langchain_formItems,
} from '../../../../../gpt-ai-flow-common/interface-app/solution_ProMode_v4/type/langchain/IProMode_v4_context_type_langchain';
import {
  IBackground_type_communicationChat,
  ICommunicationChainMessageExchange,
  ICommunicationChainMessageExchange_default,
} from '../../../../../gpt-ai-flow-common/interface-app/solution_ProMode_v4/type/langchain/IProMode_v4_context_type_communicationChain';
import { EMessage_role } from '../../../../../gpt-ai-flow-common/interface-app/3_unit/IMessage_role';
import { ILangchain_type_SLangchain_type_communicationChainService_request } from '../../../../../gpt-ai-flow-common/interface-app/solution_ProMode_v4/type/adapter/ILangchain_type_request';
import { EProductItemDB_type } from '../../../../../gpt-ai-flow-common/enum-database/EProductItemDB';
import TBackendLangchainFile from '../../../../../gpt-ai-flow-common/tools/3_unit/TBackendLangchain';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import TCryptoJSFile from '../../../../../gpt-ai-flow-common/tools/TCrypto-js';

interface IProModeWindow_v4_tabPane_type_communicationChain_input {
  t: IGetT_frontend_output;
  tabPane: IProMode_v4_tabPane<
    IPromode_v4_tabPane_context_for_type_langchain<IBackground_type_communicationChat, IAdjust_for_IMessage>
  >;
  userAccessToken: string;
  modelSecret: string;
  proModeModelType: EOpenAiModel_type;
}
export const ProModeWindow_v4_tabPane_type_communicationChain = (
  props: IProModeWindow_v4_tabPane_type_communicationChain_input
) => {
  const { t, tabPane, userAccessToken, modelSecret, proModeModelType } = props;
  const { context } = tabPane;
  const creativityValue = useCreativityValueContext();

  console.log('ProModeWindow_v4_tabPane_type_langchain tabPane', tabPane);

  const [requestController, setRequestController] = useState<AbortController>(new AbortController());
  const [isCalling, setIsCalling] = useState<boolean>(false);

  const [messageExchangeType, setMessageExchangeType] = useState<string>('');
  const [messageExchangeData, setMessageExchangeData] = useState<ICommunicationChainMessageExchange>({
    ...ICommunicationChainMessageExchange_default,
    // background: defaultBackgtound,
    createdAt: new Date(),
    role: EMessage_role.HUMAN,
    versionNum: 0,
  });
  const [currentVersionNum, setCurrentVersionNum] = useState<number>(0);
  const [chatHistory, setChatHistory] = useState<ICommunicationChainMessageExchange[]>([]);

  const { currentOutput, previousOutput, background, adjust } = messageExchangeData;

  const [contextSelected, setContextSelected] = useState<IPromode_v4_tabPane_context_for_type_langchain<
    IBackground_type_communicationChat,
    IAdjust_for_IMessage
  > | null>(context.length > 0 ? context[0] : null);
  const [backgroundSelected, setBackgroundSelected] =
    useState<IPromode_v4_tabPane_context_for_type_langchain_formItems<IBackground_type_communicationChat> | null>(null);
  const [adjustSelected, setAdjustSelected] =
    useState<IPromode_v4_tabPane_context_for_type_langchain_formItems<IAdjust_for_IMessage> | null>(null);

  useEffect(() => {
    if (contextSelected && contextSelected.backgrounds?.length > 0) {
      const newBackgroundSelected = contextSelected.backgrounds[0];
      setBackgroundSelected(newBackgroundSelected);
      setMessageExchangeType(newBackgroundSelected?.type);
    }
    if (contextSelected && contextSelected.adjust?.length > 0) {
      const newAdjustSelected = contextSelected.adjust[0];
      setAdjustSelected(newAdjustSelected);
    }
  }, [contextSelected, setMessageExchangeType]);

  const buildHumanMessage = (paraWritingPostData: ICommunicationChainMessageExchange) => {
    let newHumanRequest: ILangchain_type_SLangchain_type_communicationChainService_request;

    if (currentVersionNum === 0) {
      newHumanRequest = {
        productItem_type: EProductItemDB_type.PRO_MODE_SERVICE,
        modelSecret,
        modelOptions: {
          openaiModelType: proModeModelType,
          temperature: creativityValue,
        },
        type: messageExchangeType,
        prevMessageExchange: null,
        messageExchange: paraWritingPostData,
      };
      return newHumanRequest;
    }

    const newVersionNum = (paraWritingPostData.versionNum ?? 0) + 1;
    const newHumanWritingPostMessage = {
      ...paraWritingPostData,
      previousOutput: paraWritingPostData.currentOutput,
      currentOutput: {
        title: '',
        content: '',
      },
      updatedAt: new Date(),
      versionNum: newVersionNum,
      role: EMessage_role.HUMAN,
    };

    newHumanRequest = {
      productItem_type: EProductItemDB_type.PRO_MODE_SERVICE,
      modelSecret,
      modelOptions: {
        openaiModelType: proModeModelType,
        temperature: creativityValue,
      },
      type: messageExchangeType,
      prevMessageExchange: chatHistory[chatHistory.length - 1],
      messageExchange: newHumanWritingPostMessage,
    };

    return newHumanRequest;
  };

  const onImproveMessage =
    (
      chatHistoryBeforeImprove: ICommunicationChainMessageExchange[],
      paraWritingPostData: ICommunicationChainMessageExchange
    ) =>
    async () => {
      // console.log('writingPostData', writingPostData);
      const newRequestController = new AbortController();
      setRequestController(newRequestController);
      const { signal } = newRequestController;

      // 取最新的 ai message, 生成一个 human message，添加到历史，增加 currentVersionNum
      const bodyData: ILangchain_type_SLangchain_type_communicationChainService_request =
        buildHumanMessage(paraWritingPostData);
      const newHumanMessageExchange = bodyData.messageExchange;
      const newVersionNum_for_human = bodyData.messageExchange.versionNum;
      const newChatHistory_for_human = [...chatHistoryBeforeImprove, newHumanMessageExchange];
      setMessageExchangeData(newHumanMessageExchange);
      setChatHistory(newChatHistory_for_human);
      setCurrentVersionNum(newChatHistory_for_human.length - 1);

      TBackendLangchainFile.postCommunicationchain(
        '/v1.0/post/langchain/chains/proMode/communicationChain/',
        bodyData,
        () => {
          setIsCalling(true);
          console.log('beforeSendRequestFunc');
        },
        (writingResultText: string) => {
          // console.log('updateResultFromRequestFunc', writingResultText);
          setMessageExchangeData({
            ...newHumanMessageExchange,
            currentOutput: {
              title: '',
              content: writingResultText,
            },
          });
        },
        (resultText: string) => {
          console.log('AfterRequestFunc', resultText);

          const newVersionNum_for_ai = (newVersionNum_for_human ?? 0) + 1;
          const newAIMessage = {
            ...newHumanMessageExchange,
            currentOutput: {
              title: '',
              content: resultText,
            },
            updatedAt: new Date(),
            versionNum: newVersionNum_for_ai,
            role: EMessage_role.AI,
          };
          const newChatHistory_for_ai = [...newChatHistory_for_human, newAIMessage];
          setMessageExchangeData(newAIMessage);
          setChatHistory(newChatHistory_for_ai);
          setCurrentVersionNum(newChatHistory_for_ai.length - 1);

          setIsCalling(false);
        },
        userAccessToken,
        t.currentLocale,
        CONSTANTS_GPT_AI_FLOW_COMMON,
        TCryptoJSFile.encrypt_v2(CONSTANTS_GPT_AI_FLOW_COMMON.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string),
        signal
      ).catch((error: Error) => {
        if (error.name === 'AbortError') {
          console.log('Fetch request was aborted');
        } else {
          console.error('Fetch request failed:', error);
          message.error(error.message);
        }
      });
    };

  const onResetAll = () => {
    setChatHistory([]);
    setCurrentVersionNum(0);
    setMessageExchangeData({
      ...ICommunicationChainMessageExchange_default,
      createdAt: new Date(),
      role: EMessage_role.HUMAN,
      versionNum: 0,
    });
  };

  return (
    <div className="page_container" style={{ maxWidth: 'unset' }}>
      <Select
        defaultValue={contextSelected?.name ?? null}
        style={{ width: 120 }}
        onChange={(value: string) => {
          console.log(`selected ${value}`);
          setContextSelected(context.find((item) => item.name === value) ?? null);
        }}
        options={context.map(
          (
            item: IPromode_v4_tabPane_context_for_type_langchain<
              IBackground_type_communicationChat,
              IAdjust_for_IMessage
            >
          ) => {
            return {
              label: item.label,
              value: item.name,
            };
          }
        )}
      />

      {contextSelected && (
        <div className="context_container">
          <div className="row" style={{ display: 'flex' }}>
            <div className="column" style={{ position: 'relative', flex: '1 1 60%', paddingRight: '1rem' }}>
              <div className="block_versionNum" style={{ position: 'absolute', right: 0 }}>
                {chatHistory.length > 0 && (
                  <div className="row" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <LeftOutlined
                      style={{ marginLeft: '.4rem', marginRight: '.4rem', width: 20, padding: 10 }}
                      onClick={() => {
                        if (currentVersionNum === 1) return;
                        if (isCalling) return;
                        const previousVersion = currentVersionNum - 2;
                        setMessageExchangeData(
                          chatHistory.find((item) => item.versionNum === previousVersion) ?? messageExchangeData
                        );
                        setCurrentVersionNum(previousVersion);
                      }}
                    />

                    <div className="row">
                      {t.get('Version')}: {Math.floor(currentVersionNum / 2) + 1}
                    </div>

                    <RightOutlined
                      style={{ marginLeft: '.4rem', marginRight: '.4rem', width: 20, padding: 10 }}
                      onClick={() => {
                        if (currentVersionNum === chatHistory.length - 1) return;
                        if (isCalling) return;
                        const nextVersion = currentVersionNum + 2;
                        setMessageExchangeData(
                          chatHistory.find((item) => item.versionNum === nextVersion) ?? messageExchangeData
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

              <div className="row currentOuput">
                <Langchain_currentOutput
                  t={t}
                  currentOutput={currentOutput}
                  setCurrentOutput={(newItem: IMessage) => {
                    setMessageExchangeData({
                      ...messageExchangeData,
                      currentOutput: newItem,
                    });
                  }}
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
            </div>
            <div
              className="column m-0"
              style={{ flex: '1 1 40%', borderLeft: '1px solid #d9d9d9', paddingLeft: '1.2rem' }}
            >
              {adjustSelected && (
                <div className="row adjust">
                  <Langchain_adjust
                    t={t}
                    adjustSelected={adjustSelected}
                    adjust={adjust}
                    setAdjust={(newItem: IAdjust_for_IMessage) => {
                      setMessageExchangeData({
                        ...messageExchangeData,
                        adjust: newItem,
                      });
                    }}
                  />
                </div>
              )}

              {backgroundSelected && (
                <div className="row background">
                  <Select
                    defaultValue={backgroundSelected.type}
                    style={{ width: 120 }}
                    onChange={(value: string) => {
                      console.log(`selected ${value}`);
                      const newBackgroundSelected =
                        contextSelected?.backgrounds.find((item) => item.name === value) ?? null;
                      setBackgroundSelected(newBackgroundSelected);
                      if (!newBackgroundSelected?.type) return;
                      setMessageExchangeType(newBackgroundSelected.type);
                    }}
                    options={contextSelected?.backgrounds.map(
                      (
                        item: IPromode_v4_tabPane_context_for_type_langchain_formItems<IBackground_type_communicationChat>
                      ) => {
                        return {
                          label: item.label,
                          value: item.type,
                        };
                      }
                    )}
                  />

                  <Langchain_background
                    t={t}
                    backgroundSelected={backgroundSelected}
                    background={background as IBackground_type_communicationChat}
                    setBackground={(newItem: IBackground_type_communicationChat) => {
                      setMessageExchangeData({
                        ...messageExchangeData,
                        background: newItem,
                      });
                    }}
                    onResetAll={onResetAll}
                  />
                </div>
              )}

              <div className="row buttons">
                <div className="row operation">
                  <Button
                    type="primary"
                    onClick={onImproveMessage(chatHistory, messageExchangeData)}
                    disabled={isCalling}
                  >
                    {t.get('Generate')}
                  </Button>

                  <Button
                    type="primary"
                    // onClick={onRegenerateMessage}
                    style={{ marginLeft: '1rem' }}
                    disabled={isCalling || currentVersionNum < 2}
                  >
                    {t.get('Regenerate')}
                  </Button>

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
                  console.log('writingPostData', writingPostData);
                }}
                style={{ marginLeft: '1rem' }}
              >
                writingPostData
              </Button>
            </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
