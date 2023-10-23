import '../../../../../styles/global.css';
import '../../../../../styles/layout.scss';
import './index.scss';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input, message } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';

import { IReduxRootState } from 'store/reducer';
import { udpateSubscriptionAction } from '../../../../../store/actions/subscriptionActions';

import TBackendOpenAIFile from '../../../../../tools/3_unit/TBackendOpenAI-web';
import {
  IAICommandsResults_v4,
  IAICommands_v4,
} from '../../../../../gpt-ai-flow-common/interface-app/ProMode/IProModeAICommands';
import { useCreativityValueContext } from '../../../../../gpt-ai-flow-common/contexts/CreativityValueProviderContext';
import { IAIFlow, IPrompt, EAIFlowRole } from '../../../../../gpt-ai-flow-common/interface-app/IAIFlow';
import TString from '../../../../../gpt-ai-flow-common/tools/TString';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { useSubscriptionMixValueContext } from '../../../../../gpt-ai-flow-common/contexts/SubscriptionMixProviderContext';

import { useLocalInfo } from '../../../../../hooks/useLocalInfo';

import IUserDataFile, { IUserData } from '../../../../../gpt-ai-flow-common/interface-app/IUserData';
import { useUserData } from '../../../../../gpt-ai-flow-common/hooks/useUserData';
import {
  IUseSubscriptionMixData_output,
  useSubscriptionMixData,
} from '../../../../../gpt-ai-flow-common/hooks/useSubscriptionMixData';
import ISubscriptionMixFile, {
  ISubscirptionMix,
} from '../../../../../gpt-ai-flow-common/interface-app/3_unit/ISubscriptionMix';

import { OutputResultColumn_v3 } from './OutputResultColumn_v3';
import { InstructionInputColumn_v3 } from './InstructionInputColumn_v3';

const { TextArea } = Input;

interface ProModeAIFlowRow_v3_input {
  clickSearchAllResultsButtonCount: number;
  clickStopSearchAllResultsButtonCount: number;
  handledContextPrompt: string;
  defaulInstructionAiCommands: IAIFlow[];
  defaultOutputIndicatorAiCommands: IAIFlow[];
  aiCommandsSettings: IAICommands_v4[];
}
export const ProModeAIFlowRow_v3 = (props: ProModeAIFlowRow_v3_input) => {
  const dispatch = useDispatch();

  const creativityValue = useCreativityValueContext();
  const useSubscriptionDataOutput: IUseSubscriptionMixData_output = useSubscriptionMixValueContext();
  const {
    check: { hasAvailableSubscription },
  } = useSubscriptionDataOutput;

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

  const userDataFromStorage: IUserData = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserDataFile.IUserData_default;
  });

  const { userData } = useUserData({
    userDataFromStorage,
    onUserDataChange: (newUserData_without_update_token: IUserData) => {},
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });
  const { id: userId, token: userToken } = userData;
  const userAccessToken = userToken?.accessToken;

  const subscriptionDataFromStorage: ISubscirptionMix = useSelector((state: IReduxRootState) => {
    return state.subscription ?? ISubscriptionMixFile.ISubscriptionMix_default;
  });
  const { subscriptionMixData: subscriptionData } = useSubscriptionMixData({
    userId: userId as number,
    accessToken: userAccessToken as string,
    subscriptionDataFromStorage,
    onSubscriptionDataChange: (newItem: ISubscirptionMix) => {
      dispatch(udpateSubscriptionAction(newItem) as any);
    },
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });

  // === 用户输入部分 - start ===
  const [textInputContent, setTextInputContent] = useState<string>();
  const [isTextInputAsText, setIsTextInputAsText] = useState<boolean>(false);
  const [hasExampleText, setHasExampleText] = useState<boolean>();
  const [exampleText, setExampleText] = useState<string>();

  const onInputContentTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);

    setTextInputContent(e.target.value);
  };
  const onInputExampleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);

    setExampleText(e.target.value);
  };
  // === 用户输入部分 - end ===

  // === 获取全部结果 与 停止全部结果 - start ===
  useEffect(() => {
    if (clickSearchAllResultsButtonCount) {
      getInstructionAIFlowResults();
    }
  }, [clickSearchAllResultsButtonCount]);
  useEffect(() => {
    if (clickStopSearchAllResultsButtonCount) {
      stopInstructionAIFlowResults(requestControllersMap);
    }
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
  const [aiCommands, setAiCommands] = useState<IAICommands_v4[]>(aiCommandsSettings ?? []);
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

    for (const [uuid, requestController] of paraRequestControllersMap.entries()) {
      console.log(`uuid: ${uuid}, controller: ${requestController}`);
      requestController.abort();
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

  const buildOpenAIPrompts = (
    index: number,
    paraAICommandsList: IAICommands_v4[],
    paraAICommandsReultsList: IAICommandsResults_v4[]
  ): IPrompt[] => {
    const newPrompts = [
      {
        role: EAIFlowRole.SYSTEM,
        content: handledContextPrompt,
      },
    ];

    // === buildOpenAIPrompts - init command for this ${index} - start ===
    const finalOneAICommand = paraAICommandsList[index];

    let finalResquestContent = '';

    if (finalOneAICommand.aiFlowInstance.value) {
      finalResquestContent += finalOneAICommand.aiFlowInstance.value;
    }
    // === buildOpenAIPrompts - init command for this ${index} - end ===

    // === buildOpenAIPrompts - first command - start ===
    if (index === 0) {
      if (hasExampleText && exampleText) {
        newPrompts.push(
          {
            role: EAIFlowRole.USER,
            content: '仿写要求',
          },
          {
            role: EAIFlowRole.ASSISTANT,
            content: exampleText,
          }
        );
      }

      if (textInputContent && isTextInputAsText) {
        finalResquestContent += `\n---\n文本:"""\n${textInputContent}\n"""`;
      }

      if (textInputContent && !isTextInputAsText) {
        finalResquestContent += `\n---\n${textInputContent}`;
      }

      newPrompts.push({
        role: EAIFlowRole.USER,
        content: finalResquestContent,
      });

      return newPrompts;
    }
    // === buildOpenAIPrompts - first command - end ===

    // === buildOpenAIPrompts - for the rest commands - start ===
    // Add Previous history - start
    for (let i = 0; i < index; i++) {
      const oneAICommand = paraAICommandsList[i];
      const oneAICommandResult = paraAICommandsReultsList[i];

      let resquestContentForPrevious = '';

      if (oneAICommand.aiFlowInstance.value) {
        resquestContentForPrevious += oneAICommand.aiFlowInstance.value;
      }

      newPrompts.push({
        role: EAIFlowRole.USER,
        content: resquestContentForPrevious,
      });

      if (oneAICommandResult && oneAICommandResult.value) {
        newPrompts.push({
          role: EAIFlowRole.ASSISTANT,
          content: oneAICommandResult.value,
        });
      }
    }
    // Add Previous history - end

    if (hasExampleText && exampleText) {
      newPrompts.push(
        {
          role: EAIFlowRole.USER,
          content: '仿写要求',
        },
        {
          role: EAIFlowRole.ASSISTANT,
          content: exampleText,
        }
      );
    }

    if (textInputContent && isTextInputAsText) {
      finalResquestContent += `\n---\n文本:"""\n${textInputContent}\n"""`;
    }

    if (textInputContent && !isTextInputAsText) {
      finalResquestContent += `\n---\n${textInputContent}`;
    }

    newPrompts.push({
      role: EAIFlowRole.USER,
      content: finalResquestContent,
    });
    // === buildOpenAIPrompts - for the rest commands - end ===

    return newPrompts;
  };
  const getOneInstructionAiFlowResult = async (
    oneInstructionInputCommnad: IAICommands_v4,
    index: number,
    requestController: AbortController
  ) => {
    try {
      console.log('getOneInstructionAiFlowResult');

      const { signal } = requestController;

      const resquestContentPrompt = buildOpenAIPrompts(index, aiCommands, aiComandsResults);
      // console.log('resquestContentPrompt', resquestContentPrompt);

      /* const reponseResult: void | ISendChatGPTRequestAsStreamToBackendProxy_output = */ await TBackendOpenAIFile.sendChatGPTRequestAsStreamToBackendProxy(
        {
          userId: userId?.toString() ?? '',
          openaiSecret: openAIApiKey,
          prompt: resquestContentPrompt,
          openaiOptions: {
            // openaiModel: EOpenAiModel.GPT_4,
            openaiModel: proModeModelType,
            temperature: creativityValue,
          },
          subscriptionData,
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
        // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
        ((index: number) => () => {
          console.log('AfterRequestAsStreamFunc');
        })(index),
        userAccessToken as string,
        CONSTANTS_GPT_AI_FLOW_COMMON,
        signal
      ).catch((error: Error) => {
        if (error.name === 'AbortError') {
          console.log('Fetch request was aborted', oneInstructionInputCommnad.uuid);
        } else {
          console.error('Fetch request failed:', error);
          message.error(error.message);
        }
      });
    } catch (error) {
      console.log('Error', error);
    }
  };
  // Instruction input commands - end
  // === 指令集部分 - end ===

  // === 指令集输出结果部分 - start ===
  const [aiComandsResults, setAiComandsResults] = useState<IAICommandsResults_v4[]>([]);
  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  const [updateRequestResultsCount, setUpdateRequestResultsCount] = useState<number>(0); // Refresh the component

  const syncAiCommandsResultsByAiCommands = (
    paraAiCommands: IAICommands_v4[],
    paraAiCommandsReuslts: IAICommandsResults_v4[]
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
    <div className="row proModeAiFlowRow_v3_container" style={{ display: 'flex', alignItems: 'stretch' }}>
      <div className="left_side_user_input_column column" style={{ flex: '1 1 30%' }}>
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
            <div>内容: 补充信息</div>
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
            {hasExampleText && (
              <div>
                <TextArea
                  name="inputContent"
                  // showCount
                  // maxLength={100}
                  rows={4}
                  style={{ marginBottom: -1 }}
                  value={exampleText}
                  onChange={onInputExampleTextChange}
                  placeholder="根据此段内容作为模仿内容"
                />
              </div>
            )}
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
              <Checkbox
                value={isTextInputAsText}
                onChange={(e: CheckboxChangeEvent) => {
                  console.log(`checked = ${e.target.checked}`);
                  setHasExampleText(e.target.checked);
                }}
              >
                模仿段落
              </Checkbox>
            </div>
          </div>
        </div>
      </div>
      <div className="right_side_results_column column" style={{ flex: '1 1 70%' }}>
        <OutputResultColumn_v3
          hasAvailableSubscription={hasAvailableSubscription}
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
