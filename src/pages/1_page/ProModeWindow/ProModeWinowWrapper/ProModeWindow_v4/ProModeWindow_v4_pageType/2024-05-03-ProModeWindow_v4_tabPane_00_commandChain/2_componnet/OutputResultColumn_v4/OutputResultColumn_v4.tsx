import '../../../../../../../../../styles/global.css';
import '../../../../../../../../../styles/layout.scss';
import './OutputResultColumn_v4.scss';

import iconShare from '../../../../../../../../../../assets/icons-customize/icon-share/icon-share-18x18.png';

import { Dispatch, SetStateAction, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import html2canvas from 'html2canvas';
import copy from 'copy-to-clipboard';

import { Button, Input, Empty, message } from 'antd';
import { RedoOutlined, BorderOutlined, CopyOutlined, EditOutlined } from '@ant-design/icons';

import { IGetT_frontend_output } from '../../../../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { ELocale } from '../../../../../../../../../gpt-ai-flow-common/enum-app/ELocale';
import {
  IAICommands_v4_new,
  IAICommands_v4_new_resultRow,
} from '../../../../../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/IProModeAICommands_v4_new';

const { TextArea } = Input;

export interface IOutputResultColumn_v4_input {
  t: IGetT_frontend_output;

  stopInstructionAIFlowResults: (paraRequestControllersMap: Map<string, AbortController>) => void;
  checkAiCommandsThenUploadCustomizedAiCommand: (locale: ELocale) => void;
  getInstructionAIFlowResults: () => void;
  getOneInstructionAiFlowResult: (
    oneAiCommand_v5: IAICommands_v4_new,
    index: number,
    requestController: AbortController,
  ) => void;

  requestControllersMap: Map<string, AbortController>;
  addRequestControllerItem: (key: string, value: AbortController) => void;
  removeRequestControllerItem: (key: string) => void;

  contextHandled: string;
  aiCommands: IAICommands_v4_new[];
  aiComandsResults: IAICommands_v4_new_resultRow[];
  setAiComandsResults: Dispatch<SetStateAction<IAICommands_v4_new_resultRow[]>>;
}
export const OutputResultColumn_v4 = (props: IOutputResultColumn_v4_input) => {
  const captureOuputResultsRef = useRef<HTMLDivElement>(null);

  const {
    t,

    stopInstructionAIFlowResults,
    checkAiCommandsThenUploadCustomizedAiCommand,
    getInstructionAIFlowResults,
    getOneInstructionAiFlowResult,

    requestControllersMap,
    addRequestControllerItem,
    removeRequestControllerItem,

    contextHandled,
    aiCommands,
    aiComandsResults,
    setAiComandsResults,
  } = props;

  const isShow_GPTAIFLOW_watermarker = true;

  return (
    <>
      <div
        className="row row_buttons"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}
      >
        <div>
          <span>{t.get('Result')}</span>

          <Button
            size="small"
            onClick={() => {
              stopInstructionAIFlowResults(requestControllersMap);
            }}
            style={{ marginLeft: '.4rem' }}
          >
            {t.get('Stop')}
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              checkAiCommandsThenUploadCustomizedAiCommand(t.currentLocale);
              getInstructionAIFlowResults();
            }}
            style={{ marginLeft: '.4rem' }}
            disabled={false}
          >
            {t.get('Request')}
          </Button>
        </div>

        <div style={{ display: 'flex' }}>
          <img
            className="share_button"
            style={{
              border: '1px solid #d9d9d9',
              borderRadius: '.25rem',
              padding: 4,
              cursor: 'pointer',

              marginLeft: '.4rem',

              flex: '0 1 auto',
            }}
            src={iconShare}
            alt="shareButton"
            onClick={() => {
              const resultsElement = captureOuputResultsRef.current;
              if (!resultsElement) {
                return;
              }
              // eslint-disable-next-line promise/catch-or-return, promise/always-return
              html2canvas(resultsElement).then(function (canvas) {
                // Convert canvas to a Blob
                canvas.toBlob(function (blob) {
                  if (!blob) {
                    return;
                  }

                  // Create a blob URL
                  const blobURL = URL.createObjectURL(blob);
                  // Create a link element for downloading
                  const downloadLink = document.createElement('a');
                  downloadLink.href = blobURL;

                  // Set the filename for the downloaded file (you can customize this)
                  // Get the current date and time
                  const now = new Date();

                  // Extract date and time components
                  const year = now.getFullYear();
                  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1 and pad with '0'
                  const day = now.getDate().toString().padStart(2, '0');
                  const hours = now.getHours().toString().padStart(2, '0');
                  const minutes = now.getMinutes().toString().padStart(2, '0');
                  const seconds = now.getSeconds().toString().padStart(2, '0');
                  const dateTimeString = `${year}${month}${day}-${hours}${minutes}${seconds}`;
                  const capturedImageFileName = `${dateTimeString}_captured_image.png`;

                  downloadLink.download = capturedImageFileName;

                  // Trigger the download by simulating a click on the link
                  downloadLink.click();
                  // Clean up the blob URL
                  URL.revokeObjectURL(blobURL);
                }, 'image/png'); // Specify the desired file format (e.g., image/png)
              });
            }}
          />
        </div>
      </div>

      <div ref={captureOuputResultsRef} className="row row_results">
        {aiComandsResults.length <= 0 && <Empty description={t.get('No results yet')} style={{ marginTop: 30 }} />}

        {aiCommands.map((item: IAICommands_v4_new, index: number) => {
          const { uuid } = item;

          if (!aiComandsResults[index]) {
            return;
          }

          const isRequesting = requestControllersMap.has(uuid);

          if (!aiComandsResults[index].value) {
            return;
          }

          return (
            <div
              key={uuid}
              className="row"
              style={{
                userSelect: 'text',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ flex: '1 1 auto' }}>
                {!aiComandsResults[index].isEditing && (
                  <div
                    style={{
                      border: '1px solid #d9d9d9',
                      borderRadius: '.25rem',
                      padding: '.25rem',
                    }}
                  >
                    <div
                      className={
                        isShow_GPTAIFLOW_watermarker ? 'output_block output_block_with_watermarker' : 'output_block'
                      }
                    >
                      <ReactMarkdown>{aiComandsResults[index].value}</ReactMarkdown>
                    </div>
                  </div>
                )}
                {aiComandsResults[index].isEditing && (
                  <TextArea
                    autoSize
                    value={aiComandsResults[index].value}
                    onChange={(e) => {
                      const newAiCommandsResults = [...aiComandsResults];
                      newAiCommandsResults[index].value = e.target.value;
                      setAiComandsResults(newAiCommandsResults);
                    }}
                  />
                )}
              </div>

              <div className="buttons_group">
                <div className="edit_button">
                  <EditOutlined
                    style={{
                      fontSize: 18,
                      border: '1px solid #d9d9d9',
                      borderRadius: '.25rem',
                      padding: 4,
                      cursor: 'pointer',

                      marginLeft: 6,

                      flex: '0 1 auto',
                    }}
                    onClick={() => {
                      const newAiCommandsResults = [...aiComandsResults];
                      newAiCommandsResults[index].isEditing = !newAiCommandsResults[index].isEditing;
                      setAiComandsResults(newAiCommandsResults);
                    }}
                  />
                </div>

                <div className="copy_button" style={{ marginTop: '.2rem' }}>
                  <CopyOutlined
                    style={{
                      fontSize: 18,
                      border: '1px solid #d9d9d9',
                      borderRadius: '.25rem',
                      padding: 4,
                      cursor: 'pointer',

                      marginLeft: 6,

                      flex: '0 1 auto',
                    }}
                    onClick={() => {
                      console.log('复制结果');
                      copy(aiComandsResults[index].value);
                      message.success(t.get('Copy successful'));
                    }}
                  />
                </div>

                <div className="pause_or_restart_button" style={{ marginTop: '.2rem' }}>
                  {isRequesting && (
                    <BorderOutlined
                      style={{
                        fontSize: 18,
                        border: '1px solid #d9d9d9',
                        borderRadius: '.25rem',
                        padding: 4,
                        cursor: 'pointer',

                        marginLeft: 6,

                        flex: '0 1 auto',
                      }}
                      onClick={() => {
                        const oneInstructionAiFlowResult = aiCommands[index];

                        // eslint-disable-next-line @typescript-eslint/no-shadow
                        const { uuid } = oneInstructionAiFlowResult;
                        console.log('暂停结果', uuid);

                        const oneRequestController = requestControllersMap.get(uuid);
                        if (!oneRequestController) {
                          console.error('OuputIndicatorComponent oneRequestController 不存在');
                          return;
                        }
                        console.log('find oneRequestController', oneRequestController);
                        oneRequestController.abort();
                        removeRequestControllerItem(oneInstructionAiFlowResult.uuid);
                      }}
                    />
                  )}

                  {!isRequesting && (
                    <RedoOutlined
                      style={{
                        fontSize: 18,
                        border: '1px solid #d9d9d9',
                        borderRadius: '.25rem',
                        padding: 4,
                        cursor: 'pointer',

                        marginLeft: 6,

                        flex: '0 1 auto',
                      }}
                      onClick={() => {
                        // eslint-disable-next-line no-console
                        console.log('重新获取结果');

                        const requestController = new AbortController();
                        addRequestControllerItem(item.uuid, requestController);
                        getOneInstructionAiFlowResult(item, index, requestController);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
