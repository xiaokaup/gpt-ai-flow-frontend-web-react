import '../../index.scss';

import { useState } from 'react';

import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Image as AntdImage, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import { LeftOutlined, RightOutlined, LoadingOutlined } from '@ant-design/icons';

import { IMessage } from '../../../../../../../gpt-ai-flow-common/interface-app/3_unit/IMessage';
import { Langchain_previousOutput } from './component/Langchain_previousOutput';
import { Langchain_currentOutput } from './component/Langchain_currentOutput';
import { Langchain_adjust } from './component/Langchain_adjust';
import { Langchain_background } from './component/Langchain_background';
import { EProductItemDB_type } from '../../../../../../../gpt-ai-flow-common/enum-database/EProductItemDB';
import TBackendLangchainFile from '../../../../../../../gpt-ai-flow-common/tools/3_unit/TBackendLangchain';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import TCryptoJSFile from '../../../../../../../gpt-ai-flow-common/tools/TCrypto-web';
import { IInputsCache } from '../../../../../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import { Langchain_context_description } from './component/Langchain_context_description';
import {
  IBackground_for_type_langchain,
  IAdjust_for_type_langchain,
  IPromode_v4_tabPane_context,
} from '../../../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/interface-type/03-langchain';
import { EProMode_v4_tabPane_context_type } from '../../../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/EProMode_v4_tabPane_context_type';
import {
  IAdjust_IMessage_v2,
  IAdjust_IMessage_v2_default,
} from '../../../../../../../gpt-ai-flow-common/interface-app/2_component/IMessageExchange/IAdjust';
import { IProModeWindow_v4_wrapper_input } from '../../ProModeWindow_v4_wrapper';
import {
  IPromode_v4_tabPane_context_button,
  EButton_operation,
} from '../../../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/IProMode_v4_buttons';
import {
  ILangchain_for_type_langchain_request_v4_simpleInterface,
  IMessage_for_simpleInterface_default,
} from '../../../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/interface-call/ILangchain_type_request_v4_simpleInterface';
import { IMessage_for_simpleInterface } from '../../../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/interface-call/ILangchain_type_request_v4_simpleInterface';
import {
  IBackground_v2,
  IBackground_v2_default,
} from '../../../../../../../gpt-ai-flow-common/interface-app/2_component/IMessageExchange/IBackground';
import { removeAllEmptyValues } from '../../../../../../../gpt-ai-flow-common/tools/4_base/TEmpty';
import { FileType, getBase64 } from './TImage';

interface ProModeWindow_v4_tabPane_langchain_03_langchain_sample_interface_input
  extends Omit<IProModeWindow_v4_wrapper_input, 'tabPane'> {
  creativityValue: number;
  contextSelected: IPromode_v4_tabPane_context<IBackground_for_type_langchain, IAdjust_for_type_langchain>;
  // setContextSelected: React.Dispatch<
  //   React.SetStateAction<IPromode_v4_tabPane_context<IBackground_for_type_langchain, IAdjust_for_type_langchain> | null>
  // >;
  swtichContextSelected_by_type: (newType: EProMode_v4_tabPane_context_type) => void;
}
export const ProModeWindow_v4_tabPane_langchain_03_langchain_sample_interface = (
  props: ProModeWindow_v4_tabPane_langchain_03_langchain_sample_interface_input,
) => {
  const { creativityValue, contextSelected, swtichContextSelected_by_type } = props;
  const { urlSlug, contextType, buttons } = contextSelected;
  const { t, userAccessToken, modelSecret, proModeModelType, inputsCache, setInputsCache } = props;

  const [requestController, setRequestController] = useState<AbortController>(new AbortController());
  const [isCalling, setIsCalling] = useState<boolean>(false);

  const [currentVersionNum, setCurrentVersionNum] = useState<number>(0);
  const [chatHistory, setChatHistory] = useState<IMessage_for_simpleInterface[]>([
    // { content: '测试1' },
    // { content: '测试2' },
    // { content: '测试3' },
  ]);
  const [background, setBackground] = useState<IBackground_v2>({ ...IBackground_v2_default, ...inputsCache });
  const [adjust, setAdjust] = useState<IAdjust_IMessage_v2>({ ...IAdjust_IMessage_v2_default, ...inputsCache });

  const buildRequestBody = (lastMessage_in_chatHistory: IMessage_for_simpleInterface[]) => {
    const newRequestBody: ILangchain_for_type_langchain_request_v4_simpleInterface = {
      productItem_type: EProductItemDB_type.PRO_MODE_SERVICE,
      llmOptions: {
        llmName: proModeModelType,
        llmSecret: modelSecret,
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

  // === Upload images - start ===
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-2',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-3',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-4',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-xxx',
    //   percent: 50,
    //   name: 'image.png',
    //   status: 'uploading',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-5',
    //   name: 'image.png',
    //   status: 'error',
    // },
  ]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setUploadFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  function resizeImage(
    file: File,
    maxWidth: number,
    maxHeight: number,
    quality: number,
    callback: (file: File) => void,
  ) {
    // const maxWidth = 512;
    // const maxHeight = 512;
    // const quality = 0.8; // Adjust quality from 0 to 1
    // High Quality (0.8 to 1.0)
    // Medium Quality (0.5 to 0.79)
    // Low Quality (0.1 to 0.49)

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      // console.log('resizeImage event.target.result:', event.target.result);
      img.src = event.target.result as string;
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        const shouldResize = width > maxWidth || height > maxHeight;

        if (!shouldResize) {
          callback(file);
          return;
        }

        let newWidth: number, newHeight: number;

        if (width > height) {
          newWidth = maxWidth;
          newHeight = (height * maxWidth) / width;
        } else {
          newWidth = (width * maxHeight) / height;
          newHeight = maxHeight;
        }

        // Check if the original size is smaller than the intended size
        newWidth = Math.min(width, newWidth);
        newHeight = Math.min(height, newHeight);

        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;

        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob(
          (blob) => {
            const resizedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            callback(resizedFile);
          },
          'image/jpeg',
          quality,
        );
      };
    };
  }
  // === Upload images - end ===

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

            <div className="row currentOuput">
              <Langchain_currentOutput
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
              <Langchain_previousOutput
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
                <Langchain_context_description t={t} description={contextSelected.description} />
              </div>
            )}
          </div>

          <div
            className="column m-0"
            style={{ flex: '1 1 45%', borderLeft: '1px solid #d9d9d9', paddingLeft: '1.2rem' }}
          >
            <div className="row title">
              <h1>{t.get('Content Creation')}</h1>
            </div>

            <div className="row uploader">
              <Upload
                // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                beforeUpload={(file) => {
                  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                  if (!isJpgOrPng) {
                    message.error('You can only upload JPG/PNG files!');
                    return Upload.LIST_IGNORE;
                  }

                  const isLt3M = file.size / 1024 / 1024 < 3;
                  if (!isLt3M) {
                    message.error('Image must smaller than 3MB!');
                    return Upload.LIST_IGNORE;
                  }

                  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
                  return new Promise((resolve, reject) => {
                    resizeImage(file, 512, 512, 0.8, (resizedFile) => {
                      // console.log('resizedFile', resizedFile);
                      resolve(resizedFile);
                    });
                  });
                }}
                customRequest={({ file, onSuccess }) => {
                  console.log('customRequest file', file);
                  setTimeout(() => {
                    onSuccess('ok');
                  }, 0);
                }}
                listType="picture-card"
                fileList={uploadFileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {uploadFileList.length >= 3 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <AntdImage
                  wrapperStyle={{ display: 'none' }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                  }}
                  src={previewImage}
                />
              )}
            </div>

            <div className="row background">
              <Langchain_background
                t={t}
                backgroundSelected={contextSelected.background}
                background={background}
                setBackground={(newItem: IBackground_v2) => {
                  setBackground(newItem);
                  setInputsCache((prvState: IInputsCache) => ({
                    ...prvState,
                    ...newItem,
                  }));
                }}
              />
            </div>

            <div className="row adjust">
              <Langchain_adjust
                t={t}
                isAdjustCall={currentVersionNum > 0}
                adjustSelected={contextSelected.adjust}
                adjust={adjust}
                setAdjust={(newItem: IAdjust_IMessage_v2) => {
                  setAdjust(newItem);
                  setInputsCache((prvState: IInputsCache) => ({
                    ...prvState,
                    ...newItem,
                  }));
                }}
                contextSelected_type={contextSelected.contextType}
                swtichContextSelected_by_type={swtichContextSelected_by_type}
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
                        style={{ marginLeft: '1rem' }}
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
                  style={{ marginLeft: '1rem' }}
                >
                  {t.get('Stop')}
                </Button>

                {isCalling && <LoadingOutlined style={{ fontSize: 18, marginLeft: '0.4rem' }} />}
              </div>
            </div>
          </div>
        </div>
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
