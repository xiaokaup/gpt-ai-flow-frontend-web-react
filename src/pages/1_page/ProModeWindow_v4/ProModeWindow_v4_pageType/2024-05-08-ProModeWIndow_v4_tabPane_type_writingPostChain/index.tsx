import React, { useState } from 'react';

import { Button, message } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { IGetT_frontend_output } from '../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IProMode_v4_tabPane } from '../../../../../gpt-ai-flow-common/interface-app/ProMode_v4/IProMode_v4';

import { WritingPostChain_background } from './component/WritingPostChain_background';
import { WritingPostChain_previousOutput } from './component/WritingPostChain_previousOutput';
import { WritingPostChain_adjust } from './component/WritingPostChain_adjust';
import { WritingPostChain_currentOutput } from './component/WritingPostChain_currentOutput';
import { EProductItemDB_type } from '../../../../../gpt-ai-flow-common/enum-database/EProductItemDB';
import { useCreativityValueContext } from '../../../../../gpt-ai-flow-common/contexts/CreativityValueProviderContext';

import { EOpenAiModel_type } from '../../../../../gpt-ai-flow-common/enum-backend/EOpenAIModelType';
import { EMessage_role } from '../../../../../gpt-ai-flow-common/interface-app/3_unit/IMessage_role';
import { IConstantGptAiFlowHandler } from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import TBackendLangchainFile from '../../../../../gpt-ai-flow-common/tools/3_unit/TBackendLangchain';
import { IAdjust_for_IMessage, IMessage } from '../../../../../gpt-ai-flow-common/interface-app/3_unit/IMessage';
import { ILangchain_type_WritingPostChainService_request } from '../../../../../gpt-ai-flow-common/interface-app/ProMode_v4/interface-call/ILangchain_type_request';
import {
  IWritingPostChainMessageExchange,
  IWritingPostChainMessageExchange_default,
  IBackground_for_5W2H,
} from '../../../../../gpt-ai-flow-common/interface-app/ProMode_v4/interface-type/02-wirtingPostChain/2024-05-12-IProMode_v4_context_type_writingPostChain';

interface IProModeWIndow_v4_tabPane_type_writingPostChain_input {
  t: IGetT_frontend_output;
  tabPane: IProMode_v4_tabPane<{}>;
  userAccessToken: string;
  modelSecret: string;
  proModeModelType: EOpenAiModel_type;
  envObj: {
    env: IConstantGptAiFlowHandler;
    getEncryptobjForFrontend: (obj: any) => string;
  };
}
export const ProModeWIndow_v4_tabPane_type_writingPostChain = (
  props: IProModeWIndow_v4_tabPane_type_writingPostChain_input,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    t,
    tabPane,
    userAccessToken,
    modelSecret,
    proModeModelType,
    envObj: { env, getEncryptobjForFrontend },
  } = props;
  const creativityValue = useCreativityValueContext();

  const [requestController, setRequestController] = useState<AbortController>(new AbortController());
  const [isCalling, setIsCalling] = useState<boolean>(false);
  // requestController.abort();

  // @DEV
  // const defaultBackgtound = {
  //   subject: '',
  //   how: '',
  //   how_much: '',
  //   what: '创业，开发产品',
  //   when: '',
  //   where: '巴黎家中',
  //   who: '独自一人',
  //   emotion: '',
  //   why: '我想说创业艰辛，一步一步做出自己想要的产品',
  // };
  const [writingPostData, setWritingPostData] = useState<IWritingPostChainMessageExchange>({
    ...IWritingPostChainMessageExchange_default,
    // background: defaultBackgtound,
    createdAt: new Date(),
    role: EMessage_role.HUMAN,
    versionNum: 0,
  });
  const [currentVersionNum, setCurrentVersionNum] = useState<number>(0);
  const [chatHistory, setChatHistory] = useState<IWritingPostChainMessageExchange[]>([]);

  const { background, previousOutput, adjust, currentOutput } = writingPostData;

  const buildHumanMessage = (paraWritingPostData: IWritingPostChainMessageExchange) => {
    let newHumanRequest: ILangchain_type_WritingPostChainService_request;

    if (currentVersionNum === 0) {
      newHumanRequest = {
        productItem_type: EProductItemDB_type.PRO_MODE_SERVICE,
        modelSecret,
        modelOptions: {
          openaiModelType: proModeModelType,
          temperature: creativityValue,
        },
        prevMessage: null,
        message: paraWritingPostData,
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
      prevMessage: chatHistory[chatHistory.length - 1],
      message: newHumanWritingPostMessage,
    };

    return newHumanRequest;
  };

  const onImproveMessage =
    (
      chatHistoryBeforeImprove: IWritingPostChainMessageExchange[],
      paraWritingPostData: IWritingPostChainMessageExchange,
    ) =>
    async () => {
      // console.log('writingPostData', writingPostData);
      const newRequestController = new AbortController();
      setRequestController(newRequestController);
      const { signal } = newRequestController;

      // 取最新的 ai message, 生成一个 human message，添加到历史，增加 currentVersionNum
      const bodyData: ILangchain_type_WritingPostChainService_request = buildHumanMessage(paraWritingPostData);
      const newHumanMessage = bodyData.message;
      const newVersionNum_for_human = bodyData.message.versionNum;
      const newChatHistory_for_human = [...chatHistoryBeforeImprove, newHumanMessage];
      setWritingPostData(newHumanMessage);
      setChatHistory(newChatHistory_for_human);
      setCurrentVersionNum(newChatHistory_for_human.length - 1);

      TBackendLangchainFile.postWritingPostChain(
        bodyData,
        () => {
          setIsCalling(true);
          console.log('beforeSendRequestFunc');
        },
        (writingResultText: string) => {
          // console.log('updateResultFromRequestFunc', writingResultText);
          setWritingPostData({
            ...newHumanMessage,
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
            ...newHumanMessage,
            currentOutput: {
              title: '',
              content: resultText,
            },
            updatedAt: new Date(),
            versionNum: newVersionNum_for_ai,
            role: EMessage_role.AI,
          };
          const newChatHistory_for_ai = [...newChatHistory_for_human, newAIMessage];
          setWritingPostData(newAIMessage);
          setChatHistory(newChatHistory_for_ai);
          setCurrentVersionNum(newChatHistory_for_ai.length - 1);

          setIsCalling(false);
        },
        userAccessToken,
        t.currentLocale,
        env,
        getEncryptobjForFrontend,
        signal,
      ).catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Fetch request was aborted');
        } else {
          console.error('Fetch request failed:', error);
          message.error(error.message);
        }
      });
    };

  const onRegenerateMessage = () => {
    const writingPostDataBeforeRollback = { ...writingPostData };

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
    setWritingPostData(newWritingPostData);

    onImproveMessage(newChatHistory, newWritingPostData)();
  };

  const onResetAll = () => {
    setChatHistory([]);
    setCurrentVersionNum(0);
    setWritingPostData({
      ...IWritingPostChainMessageExchange_default,
      createdAt: new Date(),
      role: EMessage_role.HUMAN,
      versionNum: 0,
    });
  };

  return (
    <div className="container" style={{ maxWidth: 'unset' }}>
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
                    setWritingPostData(
                      chatHistory.find((item) => item.versionNum === previousVersion) ?? writingPostData,
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
                    setWritingPostData(chatHistory.find((item) => item.versionNum === nextVersion) ?? writingPostData);
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
            <WritingPostChain_currentOutput
              t={t}
              currentOutput={currentOutput}
              setCurrentOutput={(newItem: IMessage) => {
                setWritingPostData({
                  ...writingPostData,
                  currentOutput: newItem,
                });
              }}
            />
          </div>

          <div className="row previousOutput">
            <WritingPostChain_previousOutput
              t={t}
              previousOutput={previousOutput}
              setPreviousOutput={(newItem: IMessage) => {
                setWritingPostData({
                  ...writingPostData,
                  previousOutput: newItem,
                });
              }}
            />
          </div>
        </div>
        <div className="column m-0" style={{ flex: '1 1 45%', borderLeft: '1px solid #d9d9d9', paddingLeft: '1.2rem' }}>
          <div className="row adjust">
            <WritingPostChain_adjust
              t={t}
              adjust={adjust}
              setAdjust={(newItem: IAdjust_for_IMessage) => {
                setWritingPostData({
                  ...writingPostData,
                  adjust: newItem,
                });
              }}
            />
          </div>

          <div className="row background">
            <WritingPostChain_background
              t={t}
              background={background}
              setBackground={(newItem: IBackground_for_5W2H) => {
                setWritingPostData({
                  ...writingPostData,
                  background: newItem,
                });
              }}
              onResetAll={onResetAll}
            />
          </div>

          <div className="row buttons">
            <div className="row operation">
              <Button type="primary" onClick={onImproveMessage(chatHistory, writingPostData)} disabled={isCalling}>
                {t.get('Generate')}
              </Button>

              <Button
                type="primary"
                onClick={onRegenerateMessage}
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
  );
};
