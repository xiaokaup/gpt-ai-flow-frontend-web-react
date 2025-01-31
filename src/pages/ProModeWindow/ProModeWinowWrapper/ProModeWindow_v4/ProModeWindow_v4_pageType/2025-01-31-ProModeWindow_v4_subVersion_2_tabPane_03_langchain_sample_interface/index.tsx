import '../../index.scss';

import { useEffect, useState } from 'react';

import { Button, message, Splitter, UploadFile } from 'antd';
import { LeftOutlined, RightOutlined, LoadingOutlined } from '@ant-design/icons';

import { IMessage } from '../../../../../../gpt-ai-flow-common/interface-app/3_unit/IMessage';
import { Langchain_left_02_previousOutput } from './component/Langchain_left_02_previousOutput';
import { Langchain_left_01_currentOutput } from './component/Langchain_left_01_currentOutput';
import { Langchain_right_04_adjust } from './component/Langchain_right_04_adjust';
import { Langchain_right_03_background } from './component/Langchain_right_03_background';
import TBackendLangchainFile from '../../../../../../gpt-ai-flow-common/ProMode_v4/tools-ProMode_v4/TBackendLangchain';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import TCryptoJSFile from '../../../../../../gpt-ai-flow-common/tools/TCrypto-web';
import { IInputsCache_v2 } from '../../../../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import {
  IAdjust_IMessage_v2,
  IAdjust_IMessage_v2_default,
} from '../../../../../../gpt-ai-flow-common/interface-app/2_component/IMessageExchange/IAdjust';
import {
  IBackground_v2,
  IBackground_v2_default,
} from '../../../../../../gpt-ai-flow-common/interface-app/2_component/IMessageExchange/IBackground';
import { removeAllEmptyValues } from '../../../../../../gpt-ai-flow-common/tools/4_base/TEmpty';

import { IProModeWindow_v4_wrapper_input } from '../../ProModeWindow_v4_wrapper';

import { Langchain_left_03_context_description } from './component/Langchain_left_03_context_description';
import { Langchain_right_02_uploader } from './component/Langchain_right_02_uploader';
import { Langchain_right_01_xiaohongshu_shareUrl } from './component/Langchain_right_01_xiaohongshu_shareUrl';
import { SLLM_v2_common } from '../../../../../../gpt-ai-flow-common/tools/2_class/SLLM_v2_common';
import { EProMode_v4_module_contextType } from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/EProMode_v4_module';
import {
  IPromode_v4_tabPane_context_button,
  EButton_operation,
} from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/IProMode_v4_buttons';
import {
  IMessage_for_simpleInterface,
  ILangchain_for_type_langchain_request_v4_simpleInterface,
  IMessage_for_simpleInterface_default,
} from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-call/ILangchain_type_request_v4_simpleInterface';
import {
  IProMode_v4_tabPane_context,
  IBackground_for_type_langchain,
  IAdjust_for_type_langchain,
} from '../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/03-langchain';

interface IProModeWindow_v4_subVersion_2_tabPane_03_langchain_sample_interface_input
  extends Omit<IProModeWindow_v4_wrapper_input, 'tabPane'> {
  creativityValue: number;
  contextSelected: IProMode_v4_tabPane_context<IBackground_for_type_langchain, IAdjust_for_type_langchain>;
  // setContextSelected: React.Dispatch<
  //   React.SetStateAction<IProMode_v4_tabPane_context<IBackground_for_type_langchain, IAdjust_for_type_langchain> | null>
  // >;
  switchContextSelected_by_type: (newType: EProMode_v4_module_contextType) => void;
}
export const ProModeWindow_v4_subVersion_2_tabPane_03_langchain_sample_interface = (
  props: IProModeWindow_v4_subVersion_2_tabPane_03_langchain_sample_interface_input,
) => {
  const { creativityValue, contextSelected, switchContextSelected_by_type } = props;
  const { uuid: contextSelected_uuid, urlSlug, contextType, buttons } = contextSelected;
  const { t, userAccessToken, llmOption_secrets, llmName: llmName, inputsCache_v2, setInputsCache_v2 } = props;

  const [requestController, setRequestController] = useState<AbortController>(new AbortController());
  const [isCalling, setIsCalling] = useState<boolean>(false);

  const [currentVersionNum, setCurrentVersionNum] = useState<number>(0);
  const [chatHistory, setChatHistory] = useState<IMessage_for_simpleInterface[]>([
    // { content: '测试1' },
    // { content: '测试2' },
    // { content: '测试3' },
  ]);
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([]);
  const [background, setBackground] = useState<IBackground_v2>({
    ...IBackground_v2_default,
    ...inputsCache_v2[contextSelected_uuid],
  });
  const [adjust, setAdjust] = useState<IAdjust_IMessage_v2>({
    ...IAdjust_IMessage_v2_default,
    ...inputsCache_v2[contextSelected_uuid],
  });

  const buildRequestBody = (lastMessage_in_chatHistory: IMessage_for_simpleInterface[]) => {
    const newRequestBody: ILangchain_for_type_langchain_request_v4_simpleInterface = {
      llmOptions: {
        llmName,
        llmImageName: null,
        llmSecret: SLLM_v2_common.getApiKey_by_llmName(llmName, llmOption_secrets),
        llmTemperature: creativityValue,
      },
      contextType,
      chatHistory: lastMessage_in_chatHistory,
      background: removeAllEmptyValues(background),
      adjust: removeAllEmptyValues(adjust),
      imagesList_base64: uploadFileList.map((file) => file.thumbUrl),
    };

    return newRequestBody;
  };

  const onImproveMessage = (paraChatHistory: IMessage_for_simpleInterface[]) => async () => {
    setIsCalling(true);

    const newRequestController = new AbortController();
    setRequestController(newRequestController);
    const { signal } = newRequestController;

    const bodyData: ILangchain_for_type_langchain_request_v4_simpleInterface = buildRequestBody(
      paraChatHistory.slice(-1), // lastMessage_in_chatHistory
    );

    if (!urlSlug) {
      message.error('urlSlug is empty');
      return;
    }

    TBackendLangchainFile.postProMode_langchain_tabPane_03_simpleInterface(
      urlSlug,
      bodyData,
      () => {
        setIsCalling(true);
        console.log('beforeSendRequestFunc');
      },
      (writingResultText: string) => {
        // console.log('updateResultFromRequestFunc', writingResultText);
        const newChatHistory = [...paraChatHistory];
        newChatHistory.push({ content: writingResultText });
        setChatHistory(newChatHistory);
      },
      (resultText: string) => {
        // console.log('AfterRequestFunc', resultText);

        const newChatHistory = [...paraChatHistory];
        newChatHistory.push({ content: resultText });

        setChatHistory(newChatHistory);
        setCurrentVersionNum(newChatHistory.length - 1);

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
      setChatHistory(paraChatHistory);
      setCurrentVersionNum(paraChatHistory.length - 1);
      setIsCalling(false);
    });
  };

  const onRegenerateMessage = () => {
    setIsCalling(true);

    if (currentVersionNum < 1) return;

    const paraChatHistory = chatHistory.slice(0, -1);

    onImproveMessage(paraChatHistory)();
  };

  const onResetAll = () => {
    setChatHistory([]);
    setCurrentVersionNum(0);
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
            <div className="row title">
              <h1>{t.get('Content Creation')}</h1>
            </div>

            <div className="row xiaohongshu_shareUrl">
              <Langchain_right_01_xiaohongshu_shareUrl
                t={t}
                adjust={adjust}
                setAdjust={(newItem: IAdjust_IMessage_v2) => {
                  setAdjust(newItem);
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

            <div className="row uploader flex justify-center">
              <Langchain_right_02_uploader uploadFileList={uploadFileList} setUploadFileList={setUploadFileList} />
            </div>

            <div className="row background">
              <Langchain_right_03_background
                t={t}
                backgroundSelected={contextSelected.background}
                background={background}
                setBackground={(newItem: IBackground_v2) => {
                  setBackground(newItem);
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

            <div className="row adjust">
              <Langchain_right_04_adjust
                t={t}
                isAdjustCall={currentVersionNum > 0}
                adjustSelected={contextSelected.adjust}
                adjust={adjust}
                setAdjust={(newItem: IAdjust_IMessage_v2) => {
                  setAdjust(newItem);
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

            <div className="row buttons">
              <div className="row operation space-x-4 space-y-4">
                {buttons.map((item: IPromode_v4_tabPane_context_button) => {
                  const { operation, isHidden } = item;
                  if (!isHidden && operation === EButton_operation.GENERATE) {
                    return (
                      <Button
                        type="primary"
                        onClick={() => {
                          onImproveMessage(chatHistory)();
                        }}
                        disabled={
                          isCalling || (chatHistory.length > 0 ? currentVersionNum !== chatHistory.length - 1 : false)
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
                        disabled={isCalling || currentVersionNum < 1}
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

                {isCalling && <LoadingOutlined style={{ fontSize: 18, marginLeft: '0.4rem' }} />}
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
              {chatHistory.length > 0 && (
                <div className="row" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <LeftOutlined
                    style={{ marginLeft: '.4rem', marginRight: '.4rem', width: 20 }}
                    onClick={() => {
                      if (chatHistory.length === 0) return;
                      if (isCalling) return;

                      setCurrentVersionNum((prvState) => {
                        if (prvState === 0) return prvState;
                        return prvState - 1;
                      });
                    }}
                  />

                  <div className="row">
                    {t.get('Version')}: {currentVersionNum + 1}
                  </div>

                  <RightOutlined
                    style={{ marginLeft: '.4rem', marginRight: '.4rem', width: 20 }}
                    onClick={() => {
                      if (currentVersionNum === chatHistory.length) return;
                      if (isCalling) return;

                      setCurrentVersionNum((prvState) => {
                        if (prvState === chatHistory.length - 1) return prvState;
                        return prvState + 1;
                      });
                    }}
                  />
                </div>
              )}
              {/* <div className="row" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              {currentVersionNum === 0 && chatHistory.length === 0 && <div className="row">{t.get('No version')}</div>}
            </div> */}
            </div>

            <div className="row currentOutput">
              <Langchain_left_01_currentOutput
                t={t}
                title={contextSelected.currentOutput.title ?? t.get('Post')}
                currentOutput={
                  chatHistory.length > 0 && currentVersionNum >= 0
                    ? chatHistory[currentVersionNum]
                    : IMessage_for_simpleInterface_default
                }
                setCurrentOutput={(newItem: IMessage_for_simpleInterface) => {
                  const newChatHistory = chatHistory.slice(0, chatHistory.length - 1);
                  newChatHistory.push(newItem);
                  setChatHistory(newChatHistory);
                }}
                onResetAll={onResetAll}
              />
            </div>

            <div className="row previousOutput">
              <Langchain_left_02_previousOutput
                t={t}
                previousOutput={
                  chatHistory.length > 1 && currentVersionNum >= 1
                    ? chatHistory[currentVersionNum - 1]
                    : IMessage_for_simpleInterface_default
                }
                setPreviousOutput={(newItem: IMessage) => {
                  const newChatHistory = chatHistory.slice(0, chatHistory.length - 2);
                  const lastChatHistory = chatHistory[chatHistory.length - 1];
                  newChatHistory.push(newItem);
                  newChatHistory.push(lastChatHistory);
                  setChatHistory(newChatHistory);
                }}
              />
            </div>

            {contextSelected.description && (
              <div className="row description">
                <Langchain_left_03_context_description t={t} description={contextSelected.description} />
              </div>
            )}
          </Splitter.Panel>
        </Splitter>
      )}
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
            console.log('inputsCache', inputsCache);
          }}
          style={{ marginLeft: '1rem' }}
        >
          inputsCache
        </Button>

        <Button
          type="primary"
          onClick={() => {
            console.log('uploadFileList', uploadFileList);
          }}
          style={{ marginLeft: '1rem' }}
        >
          fileList
        </Button>
      </div> */}
    </>
  );
};
