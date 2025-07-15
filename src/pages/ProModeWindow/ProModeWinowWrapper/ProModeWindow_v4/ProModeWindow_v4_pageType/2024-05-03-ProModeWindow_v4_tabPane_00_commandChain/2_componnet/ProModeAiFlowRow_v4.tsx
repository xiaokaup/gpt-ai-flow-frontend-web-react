import '../../../../../../../styles/global.css';
import '../../../../../../../styles/layout.scss';

import _ from 'lodash';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Input, message } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import { SwapOutlined } from '@ant-design/icons';

import TBackendLangchainFile from '../../../../../../../gpt-ai-flow-common/ProMode_v4/tools-ProMode_v4/TBackendLangchain';
import { EAIFlowRole, EAIFlow_type } from '../../../../../../../gpt-ai-flow-common/enum-app/EAIFlow';
import EInputTypeDBFile, {
  EInputTypeDB_typeName,
} from '../../../../../../../gpt-ai-flow-common/enum-database/EInputTypeDB';
import TString from '../../../../../../../gpt-ai-flow-common/tools/TString';
import { ELocale } from '../../../../../../../gpt-ai-flow-common/enum-app/ELocale';
import { useCreativityValueContext } from '../../../../../../../gpt-ai-flow-common/contexts/CreativityValueProviderContext';
import { useProModeModelValueProviderContext } from '../../../../../../../gpt-ai-flow-common/contexts/ProModeModelValueProviderContext';
import TBackendUserInputFile from '../../../../../../../gpt-ai-flow-common/tools/3_unit/TBackendUserInput';
import { IBuildOpenAIPrompts_output } from '../../../../../../../gpt-ai-flow-common/interface-backend/to_deprecate_IBackendOpenAI';
import { IGetT_frontend_output } from '../../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { ELangchainRetrievalDocType } from '../../../../../../../gpt-ai-flow-common/enum-backend/ELangchain';
import { IStoreStorage_settings_local } from '../../../../../../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { IAIFlow_v2 } from '../../../../../../../gpt-ai-flow-common/interface-app/2_component/IAIFlow_v2';
import TCryptoJSFile from '../../../../../../../gpt-ai-flow-common/tools/TCrypto-web';
import { IPrompt } from '../../../../../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt';
import { ELLM_name } from '../../../../../../../gpt-ai-flow-common/enum-backend/ELLM';
import { SLLM_v2_common } from '../../../../../../../gpt-ai-flow-common/tools/2_class/SLLM_v2_common';
import {
  IAICommands_v4_new,
  IAICommands_v4_new_resultRow,
} from '../../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/IProModeAICommands_v4_new';
import { IProMode_v4_tabPane_example } from '../../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/01-chatChain/IProMode_v4_context_type_commandChain';

import { InstructionInputColumn_v4 } from './InstructionInputColumn_v4';
import { OutputResultColumn_v4 } from './OutputResultColumn_v4/OutputResultColumn_v4';
import { LangchainRetrivalService } from '../../../../../../../gpt-ai-flow-common/tools/2_class/SLangchainRetrieval-to-deprecate';
import { IUserDB } from '../../../../../../../gpt-ai-flow-common/interface-database/IUserDB';
import { ITokenDB_default } from '../../../../../../../gpt-ai-flow-common/interface-database/ITokenDB';

const { TextArea } = Input;

interface ProModeAIFlowRow_v4_input {
  t: IGetT_frontend_output;
  clickSearchAllResultsButtonCount: number;
  clickStopSearchAllResultsButtonCount: number;
  globalContext: string;
  globalExamples: IProMode_v4_tabPane_example[];
  contextStageSelected_instructions: IAIFlow_v2[];
  contextStageSelected_outputIndicator: IAIFlow_v2[];
  aiCommandsSettings: IAICommands_v4_new[];
  webCase: {
    userDB: IUserDB;
    localDataFromStorage: IStoreStorage_settings_local;
  };
}
export const ProModeAiFlowRow_v4 = (props: ProModeAIFlowRow_v4_input) => {
  const llmName = useProModeModelValueProviderContext();
  const creativityValue = useCreativityValueContext();

  const {
    t,
    clickSearchAllResultsButtonCount,
    clickStopSearchAllResultsButtonCount,
    globalContext,
    globalExamples,
    contextStageSelected_instructions,
    contextStageSelected_outputIndicator,
    aiCommandsSettings,
    webCase,
  } = props;
  const { userDB, localDataFromStorage } = webCase;
  const { id: userId, Token: { accessToken: userAccessToken } = ITokenDB_default } = userDB;
  const {
    locale,
    apiKeys_deprecated: apiKeys,
    proMode: { model_type },
  } = localDataFromStorage;

  if (!userAccessToken) {
    return (
      <div>
        <div>{t.get('Please register a user and log in first')}</div>
        <Link to="/app/logout">{t.get('Logout')}</Link>
      </div>
    );
  }

  const langchainRetrievalDocType = LangchainRetrivalService.getRetrievalTypeByContextValue(globalContext);

  // === 用户输入部分 - start ===
  const [textInputContent, setTextInputContent] = useState<string>();
  const [isTextInputAsText, setIsTextInputAsText] = useState<boolean>(false);
  const [isUseOfficialDatabase, setIsUseOfficialDatabase] = useState<boolean>();
  const [isExampleMode, setIsExampleMode] = useState<boolean>();
  const [exampleText, setExampleText] = useState<string>();

  const onInputContentTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInputContent(e.target.value);
  };
  const onInputExampleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setExampleText(e.target.value);
  };
  // === 用户输入部分 - end ===

  // === 获取全部结果 与 停止全部结果 - start ===
  useEffect(() => {
    if (clickSearchAllResultsButtonCount) {
      // eslint-disable-next-line no-use-before-define
      getInstructionAIFlowResults();
    }
  }, [clickSearchAllResultsButtonCount]);

  useEffect(() => {
    if (clickStopSearchAllResultsButtonCount) {
      // eslint-disable-next-line no-use-before-define
      stopInstructionAIFlowResults(requestControllersMap);
    }
  }, [clickStopSearchAllResultsButtonCount]);
  // === 获取全部结果 与 停止全部结果 - end ===

  // === 指令集部分 - start ===
  // Request controllers - start
  const [requestControllersMap, setRequestControllersMap] = useState(new Map<string, AbortController>());

  const addRequestControllerItem = (key: string, value: AbortController) => {
    const newMap = new Map(requestControllersMap);
    newMap.set(key, value);
    setRequestControllersMap(newMap);
  };

  const removeRequestControllerItem = (key: string) => {
    const newMap = new Map(requestControllersMap);
    const isDeleted = newMap.delete(key);
    console.log('isDeleted', isDeleted);
    setRequestControllersMap(newMap);
  };
  // Request controllers - end

  // Instruction input commands - start
  const [aiCommands, setAiCommands] = useState<IAICommands_v4_new[]>(aiCommandsSettings);
  // console.log('aiCommands', aiCommands);

  useEffect(() => {
    // Update Selects UI after swith context
    setAiCommands(
      aiCommandsSettings.map((item) => {
        const hasPlaceholder = TString.hasPlaceholder_v2(item.aiFlowInstance.value);
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

  const checkAiCommandsThenUploadCustomizedAiCommand = async (locale: ELocale) => {
    // @JIEAN: 可以上传其他指令，只要是了解用户如何使用自定义指令的表格内容
    // eslint-disable-next-line no-restricted-syntax
    for (const oneAiCommand of aiCommands) {
      if (
        oneAiCommand.isTemporary &&
        oneAiCommand.aiFlowInstance.type === EAIFlow_type.CUSTOMIZE &&
        oneAiCommand.value
      ) {
        TBackendUserInputFile.postUserInput(
          {
            userId: userId as number,
            inputTypeId: EInputTypeDBFile.EInputTypeDB_preData[EInputTypeDB_typeName.PROMODE_CUSTOME_COMMAND]
              ?.id as number,
            jsonValue: { value: oneAiCommand.value },
            source: 'proModeInterface-desktop',
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
      // eslint-disable-next-line no-await-in-loop, no-use-before-define
      await getOneInstructionAiFlowResult(oneInstructionInputCommand, index, requestController);
    }

    console.log('getInstructionAIFlowResults - end');
  };

  const buildOpenAIPrompts_v5 = (
    index: number,
    paraAICommandsList: IAICommands_v4_new[],
    paraAICommandsReultsList: IAICommands_v4_new_resultRow[],
  ): IBuildOpenAIPrompts_output => {
    const systemPrompt: IPrompt = {
      role: EAIFlowRole.SYSTEM,
      content: globalContext,
    };

    const chatHistory = [];

    // === buildOpenAIPrompts - init command for this ${index} - start ===
    const finalOneAICommand = paraAICommandsList[index];

    let finalResquestContent = '';

    finalResquestContent += finalOneAICommand.value;
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
        ragCollectionSearchResults: [], // @Where-Desktop
      };
    }
    // === buildOpenAIPrompts - first command - end ===

    // === buildOpenAIPrompts - for the rest commands - start ===
    // Add Previous history - start
    for (let i = 0; i < index; i++) {
      const oneAICommand = paraAICommandsList[i];
      const oneAICommandResult = paraAICommandsReultsList[i];

      const resquestContentForPrevious = oneAICommand.value;

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

    return {
      systemPrompt,
      chatHistory,
      inputPrompt: {
        role: EAIFlowRole.USER,
        content: finalResquestContent.trim(),
      },
      ragCollectionSearchResults: [], // @Where-Desktop
    };
    // === buildOpenAIPrompts - for the rest commands - end ===
  };
  const getOneInstructionAiFlowResult = async (
    oneAiCommand_v5: IAICommands_v4_new,
    index: number,
    requestController: AbortController,
  ) => {
    try {
      const { signal } = requestController;

      const promptsResults = buildOpenAIPrompts_v5(index, aiCommands, aiComandsResults);
      const { systemPrompt, chatHistory, inputPrompt } = promptsResults;
      const langchainRetrievalDocType = LangchainRetrivalService.getRetrievalTypeByContextValue(systemPrompt.content);

      const afterReceiveResponseFunc = () => {
        console.log('afterReceiveResponseFunc');
      };

      const beforeHandleStreamFunc = () => {
        console.log('beforeHandleStreamFunc');
      };

      const handleAndUpdateMessage_with_streamFunc = (paraIndex: number) => (resultText: string) => {
        // console.log('resultText', resultText);
        aiComandsResults[paraIndex].value = resultText || '';
        aiComandsResults[paraIndex].isEditing = false;
        setAiComandsResults(aiComandsResults);
        setUpdateRequestResultsCount((prevState) => prevState + 1); // Refresh the component
      };

      const afterHandleStreamFunc = (paraIndex: number) => () => {
        console.log('afterHandleStreamFunc', paraIndex);
      };

      if (isUseOfficialDatabase && langchainRetrievalDocType === ELangchainRetrievalDocType.TYPE_XIAO_HONG_SHU_DOC) {
        /* const reponseResult: IChatGPTStreamResponse_output = */ await TBackendLangchainFile.to_deprecate_sendConversationalRetrievalChainToBackendProxy(
          {
            langchainRetrievalDocType,
            chatHistory: [systemPrompt, ...chatHistory],
            input: inputPrompt.content,
            openaiOptions: {
              openaiModel: model_type as ELLM_name as any, // @TODELETE: 临时使用
              openaiModelType: model_type as ELLM_name as any,
              temperature: 0.8,
            },
          },
          beforeHandleStreamFunc,
          handleAndUpdateMessage_with_streamFunc(index),
          afterHandleStreamFunc(index),
          userAccessToken,
          locale,
          CONSTANTS_GPT_AI_FLOW_COMMON,
          TCryptoJSFile.encrypt_v2(CONSTANTS_GPT_AI_FLOW_COMMON.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string),
          signal,
        ).catch((error) => {
          if (error.name === 'AbortError') {
            console.log('Fetch request was aborted', oneAiCommand_v5.uuid);
          } else {
            console.error('Fetch request failed:', error);
            message.error(error.message);
          }
        });
      } else {
        /* const reponseResult: IChatGPTStreamResponse_output = */ await TBackendLangchainFile.postLangchainChatChain(
          {
            history: [systemPrompt, ...chatHistory],
            input: inputPrompt.content,
            llmOptions: {
              llmName,
              llmImageName: null,
              llmSecret: SLLM_v2_common.getApiKey_by_llmName(llmName, apiKeys),
              llmTemperature: creativityValue,
            },
            toolOptions: undefined,
          },
          afterReceiveResponseFunc,
          beforeHandleStreamFunc,
          handleAndUpdateMessage_with_streamFunc(index),
          afterHandleStreamFunc(index),
          userAccessToken,
          locale,
          CONSTANTS_GPT_AI_FLOW_COMMON,
          TCryptoJSFile.encrypt_v2(CONSTANTS_GPT_AI_FLOW_COMMON.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string),
          signal,
        ).catch((error: any) => {
          if (error.name === 'AbortError') {
            console.log('Fetch request was aborted', oneAiCommand_v5.uuid);
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
  const [aiComandsResults, setAiComandsResults] = useState<IAICommands_v4_new_resultRow[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [updateRequestResultsCount, setUpdateRequestResultsCount] = useState<number>(0); // Refresh the component

  const initAiCommandsResults_by_aiCommands = (
    paraAiCommands: IAICommands_v4_new[],
    paraAiCommandsReuslts: IAICommands_v4_new_resultRow[],
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
    initAiCommandsResults_by_aiCommands(aiCommands, aiComandsResults);
    // }, [aiCommands.length]); @TODELETE
  }, [aiComandsResults, aiCommands, aiCommands.length]);
  // === 指令集输出结果部分 - end ===

  return (
    <div className="row" style={{ display: 'flex', alignItems: 'stretch' }}>
      <div className="column" style={{ flex: '1 1 30%' }}>
        <div className="row">
          <InstructionInputColumn_v4
            t={t}
            contextStageSelected_instructions={contextStageSelected_instructions}
            contextStageSelected_outputIndicator={contextStageSelected_outputIndicator}
            aiCommands={aiCommands}
            setAiCommands={setAiCommands}
            addRequestControllerItem={addRequestControllerItem}
            removeRequestControllerItem={removeRequestControllerItem}
            setAiComandsResults={setAiComandsResults}
            webCase={webCase}
          />
        </div>

        <div className="row">
          <div className="row">
            <span>{t.get('Contents: Additional information')}</span>
            {/* <Button
              size="small"
              onClick={() => {
                console.log('requestControllersMap:', requestControllersMap);
                console.log('aiCommands:', aiCommands);
                console.log('aiComandsResults:', aiComandsResults);
              }}
              style={{ marginLeft: 6 }}
            >
              @DEV: Show variable
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
              {isExampleMode && globalExamples.length > 0 && (
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
                    const oneContextExample = _.sample(globalExamples);

                    if (!oneContextExample?.value) {
                      message.error(t.get('No imitation content'));
                      return;
                    }

                    setExampleText(oneContextExample.value);
                    message.success(t.get('A imitation content has been randomly selected'));
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="column" style={{ flex: '1 1 70%' }}>
        <OutputResultColumn_v4
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
          contextHandled={globalContext}
          aiCommands={aiCommands}
          aiComandsResults={aiComandsResults}
          setAiComandsResults={setAiComandsResults}
        />
      </div>
    </div>
  );
};
