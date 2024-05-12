import React, { useEffect, useState } from 'react';

import { Button, Select, message } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { useCreativityValueContext } from '../../../../../gpt-ai-flow-common/contexts/CreativityValueProviderContext';
import { EOpenAiModel_type } from '../../../../../gpt-ai-flow-common/enum-backend/EOpenAIModelType';
import { IGetT_frontend_output } from '../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IProMode_v4_tabPane } from '../../../../../gpt-ai-flow-common/interface-app/solution_ProMode_v4/IProMode_v4';
import { IMessage } from '../../../../../gpt-ai-flow-common/interface-app/3_unit/IMessage';
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
  IAdjust_for_type_langchain,
  IBackground_for_type_langchain,
  ILangchainMessageExchange,
  ILangchainMessageExchange_default,
  IPromode_v4_tabPane_context_for_type_custome_langchain,
} from '../../../../../gpt-ai-flow-common/interface-app/solution_ProMode_v4/type/03-custome-langchain/IProMode_v4_context_type_langchain';
import { ILangchain_for_type_langchain_request } from '../../../../../gpt-ai-flow-common/interface-app/solution_ProMode_v4/ILangchain_type_request';

interface ProModeWindow_v4_tabPane_type_custome_langchain_input {
  t: IGetT_frontend_output;
  tabPane: IProMode_v4_tabPane<
    IPromode_v4_tabPane_context_for_type_custome_langchain<IBackground_for_type_langchain, IAdjust_for_type_langchain>
  >;
  userAccessToken: string;
  modelSecret: string;
  proModeModelType: EOpenAiModel_type;
}
export const ProModeWindow_v4_tabPane_type_custome_langchain = (
  props: ProModeWindow_v4_tabPane_type_custome_langchain_input,
) => {
  const { t, tabPane, userAccessToken, modelSecret, proModeModelType } = props;
  const { urlSlug, context } = tabPane;
  const creativityValue = useCreativityValueContext();

  const [requestController, setRequestController] = useState<AbortController>(new AbortController());
  const [isCalling, setIsCalling] = useState<boolean>(false);

  const [messageExchangeType, setMessageExchangeType] = useState<string>(context.length > 0 ? context[0].type : '');
  const [messageExchangeData, setMessageExchangeData] = useState<ILangchainMessageExchange>({
    ...ILangchainMessageExchange_default,
    // background: defaultBackgtound,
    createdAt: new Date(),
    role: EMessage_role.HUMAN,
    versionNum: 0,
  });
  const [currentVersionNum, setCurrentVersionNum] = useState<number>(0);
  const [chatHistory, setChatHistory] = useState<ILangchainMessageExchange[]>([]);

  const { currentOutput, previousOutput, background, adjust } = messageExchangeData;

  const [contextSelected, setContextSelected] = useState<IPromode_v4_tabPane_context_for_type_custome_langchain<
    IBackground_for_type_langchain,
    IAdjust_for_type_langchain
  > | null>(context.length > 0 ? context[0] : null);

  const buildHumanMessage = (paraWritingPostData: ILangchainMessageExchange) => {
    let newHumanRequest: ILangchain_for_type_langchain_request;

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
    (chatHistoryBeforeImprove: ILangchainMessageExchange[], paraWritingPostData: ILangchainMessageExchange) =>
    async () => {
      // console.log('writingPostData', writingPostData);
      const newRequestController = new AbortController();
      setRequestController(newRequestController);
      const { signal } = newRequestController;

      // 取最新的 ai message, 生成一个 human message，添加到历史，增加 currentVersionNum
      const bodyData: ILangchain_for_type_langchain_request = buildHumanMessage(paraWritingPostData);
      const newHumanMessageExchange = bodyData.messageExchange;
      const newVersionNum_for_human = bodyData.messageExchange.versionNum;
      const newChatHistory_for_human = [...chatHistoryBeforeImprove, newHumanMessageExchange];
      setMessageExchangeData(newHumanMessageExchange);
      setChatHistory(newChatHistory_for_human);
      setCurrentVersionNum(newChatHistory_for_human.length - 1);

      TBackendLangchainFile.postLangchain(
        urlSlug,
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
          // console.log('AfterRequestFunc', resultText);

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
        signal,
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
      ...ILangchainMessageExchange_default,
      createdAt: new Date(),
      role: EMessage_role.HUMAN,
      versionNum: 0,
    });
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
              setMessageExchangeType(context.find((item) => item.type === value)?.type ?? '');
            }}
            options={context.map(
              (
                item: IPromode_v4_tabPane_context_for_type_custome_langchain<
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
                  adjust={adjust}
                  setAdjust={(newItem: IAdjust_for_type_langchain) => {
                    setMessageExchangeData({
                      ...messageExchangeData,
                      adjust: newItem,
                    });
                  }}
                />
              </div>

              <div className="row background">
                <Langchain_background
                  t={t}
                  backgroundSelected={contextSelected.background}
                  background={background as IBackground_for_type_langchain}
                  setBackground={(newItem: IBackground_for_type_langchain) => {
                    setMessageExchangeData({
                      ...messageExchangeData,
                      background: newItem,
                    });
                  }}
                  onResetAll={onResetAll}
                />
              </div>

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
                      console.log('messageExchangeType', messageExchangeType);
                      console.log('messageExchangeData', messageExchangeData);
                    }}
                    style={{ marginLeft: '1rem' }}
                  >
                    messageExchangeData
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
