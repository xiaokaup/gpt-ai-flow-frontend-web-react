import '../../../../../styles/global.css';
import '../../../../../styles/layout.scss';

import React, { useEffect, useState } from 'react';

import { Input, message } from 'antd';

import { sendChatGPTRequestAsStreamToBackendProxy } from '../../../../../tools/3_unit/TBackendOpenAI';
import {
  IInstructionINputCommandsResults_v3,
  IInstructionInputCommands_v3,
} from '../../../../../gpt-ai-flow-common/interface-app/ProMode/IProModeAIFlowRow_v3';
import { ISendChatGPTRequestToBackend_ouput } from '../../../../../gpt-ai-flow-common/interface-backend/IBackendOpenAI';
import { IAIFlow, IPrompt, EAIFlowRole } from '../../../../../gpt-ai-flow-common/interface-app/IAIFlow';
import TString from '../../../../../gpt-ai-flow-common/tools/TString';
import { OutputResultColumn_v3 } from './OutputResultColumn_v3';
import { InstructionInputColumn_v3 } from './InstructionInputColumn_v3';
import { useUserInfo } from '../../../../../hooks/useUserInfo';
import { useLocalInfo } from '../../../../../hooks/useLocalInfo';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';

const { TextArea } = Input;

interface ProModeAIFlowRow_v3_input {
  clickSearchAllResultsButtonCount: number;
  clickStopSearchAllResultsButtonCount: number;
  handledContextPrompt: string;
  defaulInstructionAiCommands: IAIFlow[];
  defaultOutputIndicatorAiCommands: IAIFlow[];
  aiCommandsSettings: IInstructionInputCommands_v3[];
}
export const ProModeAIFlowRow_v3 = (props: ProModeAIFlowRow_v3_input) => {
  const {
    clickSearchAllResultsButtonCount,
    clickStopSearchAllResultsButtonCount,
    handledContextPrompt,
    defaulInstructionAiCommands,
    defaultOutputIndicatorAiCommands,
    aiCommandsSettings,
  } = props;

  const { localData } = useLocalInfo();
  const {
    openAIApiKey,
    proMode: { model_type: proModeModelType },
  } = localData;

  const { userData } = useUserInfo();

  const userAccessToken = userData?.token?.accessToken ?? '';

  // === 用户输入部分 - start ===
  const [textInputContent, setTextInputContent] = useState<string>();
  const [isTextInputAsText, setIsTextInputAsText] = useState<boolean>(false);

  const onInputContentTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);

    setTextInputContent(e.target.value);
  };
  // === 用户输入部分 - end ===

  // === 获取全部结果 与 停止全部结果 - start ===
  useEffect(() => {
    clickSearchAllResultsButtonCount && getInstructionAIFlowResults();
  }, [clickSearchAllResultsButtonCount]);
  useEffect(() => {
    clickStopSearchAllResultsButtonCount && stopInstructionAIFlowResults(requestControllersMap);
  }, [clickStopSearchAllResultsButtonCount]);
  // === 获取全部结果 与 停止全部结果 - end ===

  // === 指令集部分 - start ===
  // Request controllers - start
  const [requestControllersMap, setRequestControllersMap] = useState(new Map<string, AbortController>());

  const addRequestControllerItem = (key: string, value: AbortController) => {
    console.log('addRequestControllerItem key', key);
    const newMap = new Map(requestControllersMap);
    newMap.set(key, value);
    setRequestControllersMap(newMap);
  };

  const removeRequestControllerItem = (key: string) => {
    const newMap = new Map(requestControllersMap);
    const isDeleted = newMap.delete(key);
    console.log('isDeleted: ', isDeleted);
    setRequestControllersMap(newMap);
  };
  // Request controllers - end

  // Instruction input commands - start
  const [aiCommands, setAiCommands] = useState<IInstructionInputCommands_v3[]>(aiCommandsSettings ?? []);
  useEffect(() => {
    // Update Selects UI after swith context
    setAiCommands(
      aiCommandsSettings.map((item) => {
        const hasPlaceholder = TString.hasPlaceholder(item.aiFlowInstance.defaultValue);
        return {
          ...item,
          hasPlaceholder,
          isTemporary: false,
          isShowInputsForm: hasPlaceholder,
        };
      })
    );
  }, [aiCommandsSettings]);

  const stopInstructionAIFlowResults = (paraRequestControllersMap: Map<string, AbortController>) => {
    console.log('stopInstructionAIFlowResults - start');

    let index = 0;
    for (let [uuid, requestController] of paraRequestControllersMap.entries()) {
      console.log(`uuid: ${uuid}, controller: ${requestController}`);
      requestController.abort();
      index++;
    }

    // setRequestControllersMap(tempMap);

    console.log('stopInstructionAIFlowResults - end');
  };
  const getInstructionAIFlowResults = async () => {
    console.log('getInstructionAIFlowResults - start');

    stopInstructionAIFlowResults(requestControllersMap);

    const tempMap = new Map(requestControllersMap);

    for (let index = 0; index < aiCommands.length; index++) {
      const oneInstructionInputCommand = aiCommands[index];

      const requestController = new AbortController();
      tempMap.set(oneInstructionInputCommand.uuid, requestController);
    }
    setRequestControllersMap(tempMap); // Set all requestControllers first

    for (let index = 0; index < aiCommands.length; index++) {
      const oneInstructionInputCommand = aiCommands[index];

      const requestController = tempMap.get(oneInstructionInputCommand.uuid) ?? new AbortController();

      // multiple requests at the same time
      await getOneInstructionAiFlowResult(oneInstructionInputCommand, index, requestController);
    }

    console.log('getInstructionAIFlowResults - end');
  };

  const buildPrompt = (
    index: number,
    paraInstructionInputCCommandList: IInstructionInputCommands_v3[],
    paraRequestReultsList: IInstructionINputCommandsResults_v3[]
  ): IPrompt[] => {
    const results = [
      {
        role: EAIFlowRole.SYSTEM,
        content: handledContextPrompt,
      },
    ];

    // === buildPrompt - init command for this ${index} - start ===
    const oneInstructionOuputIndicatorCommand = paraInstructionInputCCommandList[index];

    let resquestContentForThisIndex = '';

    if (oneInstructionOuputIndicatorCommand.aiFlowInstance.value) {
      resquestContentForThisIndex += oneInstructionOuputIndicatorCommand.aiFlowInstance.value;
    }
    // === buildPrompt - init command for this ${index} - end ===

    // === buildPrompt - first command - start ===
    if (index === 0) {
      if (textInputContent && isTextInputAsText) {
        resquestContentForThisIndex += `\n---\n文本:"""\n${textInputContent}\n"""`;
      }

      if (textInputContent && !isTextInputAsText) {
        resquestContentForThisIndex += `\n---\n${textInputContent}`;
      }

      results.push({
        role: EAIFlowRole.USER,
        content: resquestContentForThisIndex,
      });

      return results;
    }
    // === buildPrompt - first command - end ===

    // === buildPrompt - for the rest commands - start ===
    // Add Previous history - start
    for (let i = 0; i < index; i++) {
      const oneInstructionOuputIndicatorCommandLoop = paraInstructionInputCCommandList[i];

      let resquestContentForPrevious = '';

      if (oneInstructionOuputIndicatorCommandLoop.aiFlowInstance.value) {
        resquestContentForPrevious += oneInstructionOuputIndicatorCommandLoop.aiFlowInstance.value;
      }

      results.push({
        role: EAIFlowRole.USER,
        content: resquestContentForPrevious,
      });

      if (paraRequestReultsList[i].value) {
        results.push({
          role: EAIFlowRole.ASSISTANT,
          content: paraRequestReultsList[i].value,
        });
      }
    }
    // Add Previous history - end

    results.push({
      role: EAIFlowRole.USER,
      content: resquestContentForThisIndex,
    });
    // === buildPrompt - for the rest commands - end ===

    return results;
  };
  const getOneInstructionAiFlowResult = async (
    oneInstructionInputCommnad: IInstructionInputCommands_v3,
    index: number,
    requestController: AbortController
  ) => {
    try {
      console.log('getOneInstructionAiFlowResult');

      const { signal } = requestController;

      const resquestContentPrompt = buildPrompt(index, aiCommands, aiComandsResults);
      // console.log('resquestContent', resquestContentPrompt);

      const reponseResult: void | ISendChatGPTRequestToBackend_ouput = await sendChatGPTRequestAsStreamToBackendProxy(
        {
          openaiSecret: openAIApiKey,
          prompt: resquestContentPrompt,
          openaiOptions: {
            // openaiModel: EOpenAiModel.GPT_4,
            openaiModel: proModeModelType,
          },
        },
        () => {
          console.log('beforeSendRequestAsStreamFunc');
        },
        ((index: number) => (resultText: string) => {
          // console.log('resultText', resultText);
          aiComandsResults[index].value = resultText || '';
          aiComandsResults[index].isEditing = false;
          setAiComandsResults(aiComandsResults);
          setUpdateRequestResultsCount((prevState) => prevState + 1); // Refresh the component
        })(index),
        ((index: number) => () => {
          console.log('AfterRequestAsStreamFunc');
        })(index),
        userAccessToken,
        CONSTANTS_GPT_AI_FLOW_COMMON,
        signal
      ).catch((error: Error) => {
        if (error.name === 'AbortError') {
          console.log('Fetch request was aborted', oneInstructionInputCommnad.uuid);
        } else {
          message.error(error.message);
          console.error('Fetch request failed:', error);
        }
      });
    } catch (error) {
      console.log('Error', error);
    }
  };
  // Instruction input commands - end
  // === 指令集部分 - end ===

  // === 指令集输出结果部分 - start ===
  const [aiComandsResults, setAiComandsResults] = useState<IInstructionINputCommandsResults_v3[]>([]);
  const [updateRequestResultsCount, setUpdateRequestResultsCount] = useState<number>(0); // Refresh the component

  const syncAiCommandsResultsByAiCommands = (
    paraAiCommands: IInstructionInputCommands_v3[],
    paraAiCommandsReuslts: IInstructionINputCommandsResults_v3[]
  ) => {
    if (paraAiCommandsReuslts.length >= paraAiCommands.length) {
      return;
    }

    for (let i = 0; i < paraAiCommands.length; i++) {
      if (!paraAiCommandsReuslts[i]) {
        paraAiCommandsReuslts[i] = {
          value: '',
          isEditing: false,
        };
      }
    }
    setAiComandsResults(paraAiCommandsReuslts);
  };

  useEffect(() => {
    console.log('syncAiCommandsResultsByAiCommands');
    syncAiCommandsResultsByAiCommands(aiCommands, aiComandsResults);
  }, [aiCommands.length]);
  // === 指令集输出结果部分 - end ===

  return (
    <div className="row" style={{ display: 'flex', alignItems: 'stretch' }}>
      <div className="column" style={{ flex: '1 1 30%' }}>
        <div className="row">
          <InstructionInputColumn_v3
            defaultInstructionAiCommands={defaulInstructionAiCommands}
            defaultOutputIndicatorAiCommands={defaultOutputIndicatorAiCommands}
            aiCommands={aiCommands}
            setAiCommands={setAiCommands}
            addRequestControllerItem={addRequestControllerItem}
            removeRequestControllerItem={removeRequestControllerItem}
            setAiComandsResults={setAiComandsResults}
          />
        </div>

        <div className="row">
          <div className="row">
            <label>内容: 补充信息</label>
            {/* <Button
            size="small"
            onClick={() => {
              console.log('requestControllersMap:', requestControllersMap);
              console.log(
                'instructionInputCommands:',
                instructionInputCommands
              );
              console.log('requestResults:', requestResults);
            }}
            style={{ marginLeft: 6 }}
          >
            Show variable
          </Button> */}
          </div>
          <div className="row">
            <div>
              <TextArea
                name="inputContent"
                // showCount
                // maxLength={100}
                rows={6}
                // style={{ height: 120, marginBottom: 24 }}
                value={textInputContent}
                onChange={onInputContentTextAreaChange}
                placeholder="根据此段内容运行指令"
              />
            </div>
            <div>
              <Checkbox
                value={isTextInputAsText}
                onChange={(e: CheckboxChangeEvent) => {
                  console.log(`checked = ${e.target.checked}`);
                  setIsTextInputAsText(e.target.checked);
                }}
              >
                作为文本
              </Checkbox>
            </div>
          </div>
        </div>
      </div>
      <div className="column" style={{ flex: '1 1 70%' }}>
        <OutputResultColumn_v3
          // Call requests
          stopInstructionAIFlowResults={stopInstructionAIFlowResults}
          getInstructionAIFlowResults={getInstructionAIFlowResults}
          getOneInstructionAiFlowResult={getOneInstructionAiFlowResult}
          // Manage requests
          requestControllersMap={requestControllersMap}
          addRequestControllerItem={addRequestControllerItem}
          removeRequestControllerItem={removeRequestControllerItem}
          // Commands and Results
          aiCommands={aiCommands}
          aiComandsResults={aiComandsResults}
          setAiComandsResults={setAiComandsResults}
        />
      </div>
    </div>
  );
};
