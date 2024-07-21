import '../../../../../../../styles/global.css';
import '../../../../../../../styles/layout.scss';
import './index.scss';

import _ from 'lodash';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Input, message } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import { SwapOutlined } from '@ant-design/icons';

import { IReduxRootState } from '../../../../../../../store/reducer';
import { saveLocalAction } from '../../../../../../../store/actions/localActions';

import { useCreativityValueContext } from '../../../../../../../gpt-ai-flow-common/contexts/CreativityValueProviderContext';

import { IAIFlow } from '../../../../../../../gpt-ai-flow-common/interface-app/2_component/IAIFlow';
import TString from '../../../../../../../gpt-ai-flow-common/tools/TString';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../../../gpt-ai-flow-common/config/constantGptAiFlow';

import IStoreStorageFile, {
  IStoreStorageLocalSettings,
} from '../../../../../../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { useUserData } from '../../../../../../../gpt-ai-flow-common/hooks/useUserData';
import { useLocalSettings } from '../../../../../../../gpt-ai-flow-common/hooks/useLocalSettings';
import { EAIFlowRole, EAIFlow_type } from '../../../../../../../gpt-ai-flow-common/enum-app/EAIFlow';
import TBackendUserInputFile from '../../../../../../../gpt-ai-flow-common/tools/3_unit/TBackendUserInput';
import { ELangchainRetrievalDocType } from '../../../../../../../gpt-ai-flow-common/enum-backend/ELangchain';
import { IBuildOpenAIPrompts_ouput } from '../../../../../../../gpt-ai-flow-common/interface-backend/to_deprecate_IBackendOpenAI';
import EInputTypeDBFile, {
  EInputTypeDB_typeName,
} from '../../../../../../../gpt-ai-flow-common/enum-database/EInputTypeDB';
import { useProModeModelValueProviderContext } from '../../../../../../../gpt-ai-flow-common/contexts/ProModeModelValueProviderContext';
import { IGetT_frontend_output } from '../../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { LangchainRetrivalService } from '../../../../../../../gpt-ai-flow-common/tools/2_class/SLangchainRetrieval';
import { EProductItemDB_type } from '../../../../../../../gpt-ai-flow-common/enum-database/EProductItemDB';
import TBackendLangchainFile from '../../../../../../../gpt-ai-flow-common/tools/3_unit/TBackendLangchain';
import TCryptoJSFile from '../../../../../../../gpt-ai-flow-common/tools/TCrypto-web';

import { OutputResultColumn_v3 } from './OutputResultColumn_v3';
import { InstructionInputColumn_v3 } from './InstructionInputColumn_v3';
import {
  IAICommandsResults_v4,
  IAICommands_v4,
} from '../../../../../../../gpt-ai-flow-common/interface-app/2_component/ProMode/IProModeAICommands';
import { IUserData, IUserData_default } from '../../../../../../../gpt-ai-flow-common/interface-app/3_unit/IUserData';
import { IPrompt } from '../../../../../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt';
import { IProMode_v3_onePromode_oneContext_oneStage_examples } from '../../../../../../../gpt-ai-flow-common/interface-backend/IProMode_v3/IProMode_v3_onePromode_oneContext_oneStage_examples';
import { ELLM_name } from '../../../../../../../gpt-ai-flow-common/enum-backend/ELLM';

const { TextArea } = Input;

interface ProModeAIFlowRow_v3_input {
  t: IGetT_frontend_output;
  clickSearchAllResultsButtonCount: number;
  clickStopSearchAllResultsButtonCount: number;
  contextHandled: string;
  contextExamples: IProMode_v3_onePromode_oneContext_oneStage_examples[];
  defaulInstructionAiCommands: IAIFlow[];
  defaultOutputIndicatorAiCommands: IAIFlow[];
  aiCommandsSettings: IAICommands_v4[];
}
export const ProModeAIFlowRow_v3 = (props: ProModeAIFlowRow_v3_input) => {
  const dispatch = useDispatch();

  const proModeModalValue = useProModeModelValueProviderContext();
  const creativityValue = useCreativityValueContext();

  const {
    t,
    clickSearchAllResultsButtonCount,
    clickStopSearchAllResultsButtonCount,
    contextHandled,
    contextExamples,
    defaulInstructionAiCommands,
    defaultOutputIndicatorAiCommands,
    aiCommandsSettings,
  } = props;
  const langchainRetrievalDocType = LangchainRetrivalService.getRetrievalTypeByContextValue(contextHandled);

  const localSettingsFromStore: IStoreStorageLocalSettings = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorageFile.IStoreStorageLocalSettings_default;
  });
  const { localSettings } = useLocalSettings({
    localSettingsFromStorage: localSettingsFromStore,
    onLocalSettingsChange(newItem: IStoreStorageLocalSettings) {
      const newLocalSettings = { ...localSettings, ...newItem };
      dispatch(saveLocalAction(newLocalSettings) as any);
    },
  });
  const { locale, openAIApiKey } = localSettings;

  const userDataFromStorage: IUserData = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserData_default;
  });

  const { userData } = useUserData({
    userDataFromStorage,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onUserDataChange: (_newUserData_without_token: IUserData) => {},
    locale,
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });
  const { id: userId, Token: userToken } = userData;
  const userAccessToken = userToken?.accessToken;

  if (!userAccessToken) {
    return (
      <div>
        <div>{t.get('Please register a user and log in first')}</div>
        <Link to="/app/logout">{t.get('Logout')}</Link>
      </div>
    );
  }

  // === 用户输入部分 - start ===
  const [textInputContent, setTextInputContent] = useState<string>();
  const [isTextInputAsText, setIsTextInputAsText] = useState<boolean>(false);
  const [isUseOfficialDatabase, setIsUseOfficialDatabase] = useState<boolean>();
  const [isExampleMode, setIsExampleMode] = useState<boolean>();
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
      }),
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

  const checkAiCommandsThenUploadCustomizedAiCommand = async () => {
    // @JIEAN: 可以上传其他指令，只要是了解用户如何使用自定义指令的表格内容
    for (const oneAiCommand of aiCommands) {
      if (
        oneAiCommand.isTemporary &&
        oneAiCommand.aiFlowInstance.type === EAIFlow_type.CUSTOMIZE &&
        oneAiCommand.aiFlowInstance.value
      ) {
        TBackendUserInputFile.postUserInput(
          {
            userId: userId as number,
            inputTypeId: EInputTypeDBFile.EInputTypeDB_preData[EInputTypeDB_typeName.PROMODE_CUSTOME_COMMAND]
              ?.id as number,
            jsonValue: { value: oneAiCommand.aiFlowInstance.value },
            source: 'proModeInterface-web',
          },
          userAccessToken,
          locale,
          CONSTANTS_GPT_AI_FLOW_COMMON,
        );
      }
    }
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
    paraAICommandsReultsList: IAICommandsResults_v4[],
  ): IBuildOpenAIPrompts_ouput => {
    const systemPrompt: IPrompt = {
      role: EAIFlowRole.SYSTEM,
      content: contextHandled,
    };

    const chatHistory = [];

    // === buildOpenAIPrompts - init command for this ${index} - start ===
    const finalOneAICommand = paraAICommandsList[index];

    let finalResquestContent = '';

    finalResquestContent += finalOneAICommand.aiFlowInstance.value || finalOneAICommand.aiFlowInstance.defaultValue;
    // === buildOpenAIPrompts - init command for this ${index} - end ===

    // === buildOpenAIPrompts - first command - start ===
    if (index === 0) {
      if (isExampleMode && exampleText) {
        chatHistory.push(
          {
            role: EAIFlowRole.USER,
            content: `${t.get('According to the content of the following original text, analyze its unique style, including the rhythm of language, rhetorical devices, emotional color, etc., and write a parody based on this style:')}
${t.get('Original content')}: """${exampleText}"""`,
          },
          {
            role: EAIFlowRole.ASSISTANT,
            content: t.get(
              'Okay, have analyzed the style and writing style corresponding to the original text of this content, after that in the message I will help you to imitate a similar content.',
            ),
          },
        );
      }

      if (textInputContent && isTextInputAsText) {
        finalResquestContent += `\n---\n${t.get('texts')}:"""\n${textInputContent}\n"""`;
      }

      if (textInputContent && !isTextInputAsText) {
        finalResquestContent += `\n---\n${textInputContent}`;
      }

      // console.log('newPrompts', newPrompts);

      return {
        systemPrompt,
        chatHistory,
        inputPrompt: {
          role: EAIFlowRole.USER,
          content: finalResquestContent.trim(),
        },
      };
    }
    // === buildOpenAIPrompts - first command - end ===

    // === buildOpenAIPrompts - for the rest commands - start ===
    // Add Previous history - start
    for (let i = 0; i < index; i++) {
      const oneAICommand = paraAICommandsList[i];
      const oneAICommandResult = paraAICommandsReultsList[i];

      const resquestContentForPrevious = oneAICommand.aiFlowInstance.value || oneAICommand.aiFlowInstance.defaultValue;

      chatHistory.push({
        role: EAIFlowRole.USER,
        content: resquestContentForPrevious,
      });

      if (oneAICommandResult && oneAICommandResult.value) {
        chatHistory.push({
          role: EAIFlowRole.ASSISTANT,
          content: oneAICommandResult.value,
        });
      }
    }
    // Add Previous history - end

    // === start - 从第二个指令链开始，我们不会考虑用户输入的补充信息以及模仿内容 ===
    //     if (isExampleMode && exampleText) {
    //       chatHistory.push(
    //         {
    //           role: EAIFlowRole.USER,
    //           content: `根据以下原文本内容, 分析其独特的风格，包括语言节奏、修辞手法、情感色彩等，并基于这种风格进行仿写:
    // 原文本内容: """${exampleText}"""`,
    //         },
    //         {
    //           role: EAIFlowRole.ASSISTANT,
    //           content: '好的，已经分析原文本内容相应的风格和写法，之后的消息中我将帮助您仿写类似的内容。',
    //         }
    //       );
    //     }

    //     if (textInputContent && isTextInputAsText) {
    //       finalResquestContent += `\n---\n文本:"""\n${textInputContent}\n"""`;
    //     }

    //     if (textInputContent && !isTextInputAsText) {
    //       finalResquestContent += `\n---\n${textInputContent}`;
    //     }
    // === end - 从第二个指令链开始，我们不会考虑用户输入的补充信息以及模仿内容 ===

    // === buildOpenAIPrompts - for the rest commands - end ===

    return {
      systemPrompt,
      chatHistory,
      inputPrompt: {
        role: EAIFlowRole.USER,
        content: finalResquestContent.trim(),
      },
    };
  };
  const getOneInstructionAiFlowResult = async (
    oneInstructionInputCommnad: IAICommands_v4,
    index: number,
    requestController: AbortController,
  ) => {
    try {
      console.log('getOneInstructionAiFlowResult');

      const { signal } = requestController;

      const promptsResults: IBuildOpenAIPrompts_ouput = buildOpenAIPrompts(index, aiCommands, aiComandsResults);
      // console.log('promptsResults', promptsResults);
      const { systemPrompt, chatHistory, inputPrompt } = promptsResults;
      const langchainRetrievalDocType = LangchainRetrivalService.getRetrievalTypeByContextValue(systemPrompt.content);

      const beforeSendRequestFunc = () => {
        console.log('beforeSendRequestAsStreamFunc');
      };

      const updateResultsFunc = (index: number) => (resultText: string) => {
        // console.log('resultText', resultText);
        aiComandsResults[index].value = resultText || '';
        aiComandsResults[index].isEditing = false;
        setAiComandsResults(aiComandsResults);
        setUpdateRequestResultsCount((prevState) => prevState + 1); // Refresh the component
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const afterEndRequestFunc = (_index: number) => () => {
        console.log('AfterRequestAsStreamFunc');
      };

      if (isUseOfficialDatabase && langchainRetrievalDocType === ELangchainRetrievalDocType.TYPE_XIAO_HONG_SHU_DOC) {
        // @TOFIX: 修复这部分使用 RAG 技术的代码
        /* const reponseResult: IChatGPTStreamResponse_output = */ await TBackendLangchainFile.to_deprecate_sendConversationalRetrievalChainToBackendProxy(
          {
            langchainRetrievalDocType,
            chatHistory: [systemPrompt, ...chatHistory],
            input: inputPrompt.content,
            openaiOptions: {
              openaiModel: proModeModalValue as ELLM_name as any, // @TODELETE: 临时使用
              openaiModelType: proModeModalValue as ELLM_name as any,
              temperature: creativityValue,
            },
          },
          beforeSendRequestFunc,
          // eslint-disable-next-line @typescript-eslint/no-shadow
          updateResultsFunc(index),
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          afterEndRequestFunc(index),
          userAccessToken,
          locale,
          CONSTANTS_GPT_AI_FLOW_COMMON,
          TCryptoJSFile.encrypt_v2(CONSTANTS_GPT_AI_FLOW_COMMON.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string),
          signal,
        ).catch((error: Error) => {
          if (error.name === 'AbortError') {
            console.log('Fetch request was aborted', oneInstructionInputCommnad.uuid);
          } else {
            console.error('Fetch request failed:', error);
            message.error(error.message);
          }
        });
      } else {
        /* const reponseResult: IChatGPTStreamResponse_output = */ await TBackendLangchainFile.postLangchainChatChain(
          {
            productItem_type: EProductItemDB_type.PRO_MODE_SERVICE,
            llmOptions: {
              llmName: proModeModalValue,
              llmSecret: openAIApiKey,
              llmTemperature: creativityValue,
            },
            history: [systemPrompt, ...chatHistory],
            input: inputPrompt.content,
          },
          beforeSendRequestFunc,
          updateResultsFunc(index),
          // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
          afterEndRequestFunc(index),
          userAccessToken,
          locale,
          CONSTANTS_GPT_AI_FLOW_COMMON,
          TCryptoJSFile.encrypt_v2(CONSTANTS_GPT_AI_FLOW_COMMON.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string),
          signal,
        ).catch((error: Error) => {
          if (error.name === 'AbortError') {
            console.log('Fetch request was aborted', oneInstructionInputCommnad.uuid);
          } else {
            console.error('Fetch request failed:', error);
            message.error(error.message);
          }
        });
      }
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
    paraAiCommandsReuslts: IAICommandsResults_v4[],
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
            t={t}
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
            <div>{t.get('Contents: Additional information')}</div>
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
            {isExampleMode && (
              <div>
                <TextArea
                  name="inputContent"
                  autoSize={{ minRows: 2 }}
                  style={{ marginBottom: -1 }}
                  value={exampleText}
                  onChange={onInputExampleTextChange}
                  placeholder={t.get('Imitation content')}
                />
              </div>
            )}
            <div>
              <TextArea
                name="inputContent"
                autoSize={{ minRows: 4 }}
                value={textInputContent}
                onChange={onInputContentTextAreaChange}
                placeholder={t.get('User input')}
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
                {t.get('As text')}
              </Checkbox>
              {langchainRetrievalDocType === ELangchainRetrievalDocType.TYPE_XIAO_HONG_SHU_DOC && (
                <Checkbox
                  value={isTextInputAsText}
                  onChange={(e: CheckboxChangeEvent) => {
                    console.log(`checked = ${e.target.checked}`);
                    setIsUseOfficialDatabase(e.target.checked);
                  }}
                >
                  {t.get('Official database (testing phase)')}
                </Checkbox>
              )}
              <Checkbox
                value={isTextInputAsText}
                onChange={(e: CheckboxChangeEvent) => {
                  console.log(`checked = ${e.target.checked}`);
                  setIsExampleMode(e.target.checked);
                }}
              >
                {t.get('Imitation content')}
              </Checkbox>
              {isExampleMode && contextExamples.length > 0 && (
                <SwapOutlined
                  style={{
                    marginTop: 4,

                    fontSize: 18,
                    border: '1px solid #d9d9d9',
                    borderRadius: '.25rem',
                    padding: 4,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    const oneContextExample = _.sample(contextExamples);

                    if (!oneContextExample?.defaultValue) {
                      message.error(t.get('No imitation content'));
                      return;
                    }

                    setExampleText(oneContextExample.defaultValue);
                    message.success(t.get('A imitation content has been randomly selected'));
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="right_side_results_column column" style={{ flex: '1 1 70%' }}>
        <OutputResultColumn_v3
          t={t}
          // Call requests
          stopInstructionAIFlowResults={stopInstructionAIFlowResults}
          checkAiCommandsThenUploadCustomizedAiCommand={checkAiCommandsThenUploadCustomizedAiCommand}
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
