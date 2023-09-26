import '../../../../../styles/global.css';
import '../../../../../styles/layout.scss';

import React, { Dispatch, SetStateAction, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import copy from 'copy-to-clipboard';

import { Button, Input, Empty, message } from 'antd';
import { RedoOutlined, BorderOutlined, CopyOutlined, EditOutlined } from '@ant-design/icons';

import {
  IAICommandsResults_v4,
  IAICommands_v4,
} from '../../../../../gpt-ai-flow-common/interface-app/ProMode/IProModeAICommands';

const { TextArea } = Input;

export interface IOuputIndicatorComponent_input {
  stopInstructionAIFlowResults: (paraRequestControllersMap: Map<string, AbortController>) => void;
  getInstructionAIFlowResults: () => void;
  getOneInstructionAiFlowResult: (
    oneInstructionAiFlowResult: IAICommands_v4,
    index: number,
    requestController: AbortController
  ) => void;

  requestControllersMap: Map<string, AbortController>;
  addRequestControllerItem: (key: string, value: AbortController) => void;
  removeRequestControllerItem: (key: string) => void;

  aiCommands: IAICommands_v4[];
  aiComandsResults: IAICommandsResults_v4[];
  setAiComandsResults: Dispatch<SetStateAction<IAICommandsResults_v4[]>>;
}
export const OutputResultColumn_v3 = (props: IOuputIndicatorComponent_input) => {
  const {
    stopInstructionAIFlowResults,
    getOneInstructionAiFlowResult,
    getInstructionAIFlowResults,

    requestControllersMap,
    addRequestControllerItem,
    removeRequestControllerItem,

    aiCommands,
    aiComandsResults,
    setAiComandsResults,
  } = props;

  return (
    <>
      <div className="row row_buttons">
        <label>结果</label>

        <Button
          size="small"
          onClick={() => {
            stopInstructionAIFlowResults(requestControllersMap);
          }}
          style={{ marginLeft: 6 }}
        >
          停止
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            getInstructionAIFlowResults();
          }}
          style={{ marginLeft: 6 }}
          disabled={false}
        >
          获取
        </Button>
      </div>

      <div className="row row_results">
        {aiComandsResults.length <= 0 && <Empty description="暂无结果" style={{ marginTop: 30 }} />}

        {aiCommands.map((item: IAICommands_v4, index: number) => {
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
              {!aiComandsResults[index].isEditing && (
                <div
                  style={{
                    border: '1px solid #d9d9d9',
                    borderRadius: '.25rem',
                    padding: '.25rem',

                    flex: '1 1 auto',
                  }}
                >
                  <div className="output_block">
                    <ReactMarkdown>{aiComandsResults[index].value}</ReactMarkdown>
                  </div>
                </div>
              )}
              {aiComandsResults[index].isEditing && (
                <TextArea
                  rows={8}
                  value={aiComandsResults[index].value}
                  onChange={(e) => {
                    const newAiCommandsResults = [...aiComandsResults];
                    newAiCommandsResults[index].value = e.target.value;
                    setAiComandsResults(newAiCommandsResults);
                  }}
                />
              )}

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
                      message.success('复制成功');
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
