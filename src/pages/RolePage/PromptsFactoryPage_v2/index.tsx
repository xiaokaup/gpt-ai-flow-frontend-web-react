import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Button, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { IPrompts_v3_for_promptsFactory_status, StatusBlock } from './StatusBlock';
import {
  // EPrompt_v3_for_promptsFactory_type,
  IPrompt_v3_for_promptsFactory,
  IPrompt_v3_for_promptsFactory_default,
} from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3_for_promptsFactory';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
// import { EPrompt_v3_type } from '../../../gpt-ai-flow-common/enum-app/EPrompt_v3';
// import { usePrompts_v3_user_v2_for_web } from '../../../gpt-ai-flow-common/hooks/usePrompts_v3_user_v2_for_web';
// import { IPrompt_v3_type_persona } from '../../../gpt-ai-flow-common/interface-app/2_component/IPrompt_v3/IPrompt_v3_type_persona';
// import { IPrompt_v3 } from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3';
import { updatePrompts_v3_elements } from '../../../store/actions/prompts_v3Actions';
import { IReduxRootState } from '../../../store/reducer';
import { usePrompts_v3_elements_v2_for_web } from '../../../gpt-ai-flow-common/hooks/usePrompts_v3_elements_v2_for_web';
import { PromptsFactoryForm_v2 } from './PromptsFactoryForm_v2';
import TBackendLangchainFile from '../../../gpt-ai-flow-common/ProMode_v4/tools-ProMode_v4/TBackendLangchain';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import TCryptoJSFile from '../../../gpt-ai-flow-common/tools/TCrypto-web';
import { EProMode_v4_module_contextType } from '../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/EProMode_v4_module';
import { SLLM_v2_common } from '../../../gpt-ai-flow-common/tools/2_class/SLLM_v2_common';
import { ELLM_name } from '../../../gpt-ai-flow-common/enum-backend/ELLM';
import IStoreStorageFile, {
  IStoreStorage_settings_local,
} from '../../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { IProMode_module_request_v4_subVersion_2_for_web_v2 } from '../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-call/IProMode_module_request_v4_subVersion_2';
import { IToolOptions_default } from '../../../gpt-ai-flow-common/interface-app/3_unit/ITools';
import { IPrompt, IPrompt_default } from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt';
import { EAIFlowRole } from '../../../gpt-ai-flow-common/enum-app/EAIFlow';

export interface IPromptsFactoryPage {
  t: IGetT_frontend_output;
  userAccessToken: string;
}
export const PromptsFactoryPage_v2 = (props: IPromptsFactoryPage) => {
  const { t, userAccessToken } = props;

  const localFromStore: IStoreStorage_settings_local = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorageFile.IStoreStorage_settings_local_default;
  });
  const {
    apiKeys: llmOption_secrets,
    proMode: { model_type: llmName_from_store },
  } = localFromStore;

  const [creativityValue] = useState<number>(0.8);
  const [llmName] = useState<ELLM_name>(llmName_from_store);

  const [form] = useForm();
  const dispatch = useDispatch();

  // const prompts_v3_userFromStorage: (IPrompt_v3 | IPrompt_v3_type_persona)[] = useSelector((state: IReduxRootState) => {
  //   return state.prompts_v3.user;
  // });
  const prompts_v3_elementsFromStorage: IPrompt_v3_for_promptsFactory[] = useSelector((state: IReduxRootState) => {
    return state.prompts_v3.elements;
  });

  // const { prompts_v3_user, setPrompts_v3_user } = usePrompts_v3_user_v2_for_web({
  //   prompts_v3_userFromStorage,
  //   onChangePrompts_v3_user: (newPrompts_v3_user: (IPrompt_v3 | IPrompt_v3_type_persona)[]) => {
  //     dispatch<any>(updateUserPrompts_v3(newPrompts_v3_user));
  //   },
  // });
  const { prompts_v3_elements, setPrompts_v3_elements } = usePrompts_v3_elements_v2_for_web({
    prompts_v3_elementsFromStorage,
    onChangePrompts_v3_elements: (newPrompts_v3_elements: IPrompt_v3_for_promptsFactory[]) => {
      dispatch<any>(updatePrompts_v3_elements(newPrompts_v3_elements));
    },
  });

  // const prompts_v3_for_promptsFactory_default: IPrompt_v3_for_promptsFactory[] = prompts_v3_user.map(
  //   (item: IPrompt_v3 | IPrompt_v3_type_persona) => {
  //     let newType = IPrompt_v3_for_promptsFactory_default.type;
  //     if (item.type === EPrompt_v3_type.PERSONA_MODEL) {
  //       newType = EPrompt_v3_for_promptsFactory_type.SUBJECT;
  //     } else if (item.type === EPrompt_v3_type.PROMPT) {
  //       newType = EPrompt_v3_for_promptsFactory_type.INSTRUCTION;
  //     }

  //     return {
  //       ...IPrompt_v3_for_promptsFactory_default,
  //       type: newType,
  //       title: item.name,
  //       content: item.value,
  //       status: 'ready' as const,
  //       tags: item.tags || [],
  //     };
  //   },
  // );
  const prompts_v3_for_promptsFactory_status: IPrompts_v3_for_promptsFactory_status[] = [
    {
      id: 'selected',
      title: 'Selected',
    },
    {
      id: 'ready',
      title: 'Ready',
    },
  ];

  const [view, setView] = useState<'simple' | 'advanced'>('simple');

  const [formTitle, setFormTitle] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showForm_data, setShowForm_data] = useState<IPrompt_v3_for_promptsFactory>(
    IPrompt_v3_for_promptsFactory_default,
  );

  const [requestController, setRequestController] = useState<AbortController>(new AbortController());
  const [isCalling, setIsCalling] = useState<boolean>(false);

  const [result_text, setResult_text] = useState<string>('');
  const [results, setRestuls] = useState<IPrompt[]>([]);

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;

    console.log('active', active);
    console.log('over', over);

    if (!over) return;

    const currentStatus = active.data?.current?.prompt?.status;
    const targetStatus = over.data?.current?.type === 'status-block' ? over?.id : over.data?.current?.prompt?.status;

    // 处理卡片排序（同一状态块内）
    if (currentStatus === targetStatus && active.id !== over.id) {
      console.log('hit same status block');

      setPrompts_v3_elements((items) => {
        const oldIndex = items.findIndex((item) => item.title === active.id);
        const newIndex = items.findIndex((item) => item.title === over.id);

        const newItems = [...items];
        const [movedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, movedItem);

        return newItems;
      });
    }

    // 处理卡片拖拽（跨状态块）
    else if (over.data?.current?.type === 'status-block' || currentStatus !== targetStatus) {
      console.log('hit cross status block');

      const currentTitle = active.data?.current?.prompt?.title;

      setPrompts_v3_elements((items) => {
        return items.map((item) => {
          if (item.title === currentTitle) {
            return { ...item, status: targetStatus };
          }
          return item;
        });
      });
    }
  };

  return (
    <div className="container p-10 w-full">
      <h1>{`${t.get('Prompts Factory')} 🏭`}</h1>
      <div className="factory_container">
        <div className="block_buttons">
          <Button
            onClick={() => {
              if (view === 'simple') {
                setView('advanced');
                return;
              }
              setView('simple');
            }}
          >
            {t.get('View')}
          </Button>
          <Button
            className="ml-[1rem]"
            onClick={() => {
              setFormTitle(t.get('Create'));
              setShowForm_data(IPrompt_v3_for_promptsFactory_default);
              setShowForm(!showForm);
            }}
          >
            {t.get('Create')}
          </Button>

          <Button
            type="primary"
            className="ml-[1rem]"
            disabled={isCalling}
            onClick={() => {
              try {
                setIsCalling(true);

                const prompts_v3_elements_selected: IPrompt_v3_for_promptsFactory[] = prompts_v3_elements.filter(
                  (item) => item.status === 'selected',
                );
                console.log('Generate prompts_v3_elements_selected', prompts_v3_elements_selected);

                const newRequestController = new AbortController();
                setRequestController(newRequestController);
                const { signal } = newRequestController;

                const llmOptions = {
                  llmName,
                  llmImageName: null,
                  llmSecret: SLLM_v2_common.getApiKey_by_llmName(llmName, llmOption_secrets),
                  llmTemperature: creativityValue,
                };

                const urlSlug = '/v1.0/post/langchain/chains/generatePrompt_v3/';
                const bodyData: IProMode_module_request_v4_subVersion_2_for_web_v2 = {
                  contextType: EProMode_v4_module_contextType.PROMPTS_FACTORY_V2,
                  history: [],
                  input: JSON.stringify(prompts_v3_elements_selected),
                  llmOptions,
                  toolOptions: IToolOptions_default,
                };
                console.log('urlSlug', urlSlug);
                console.log('bodyData', bodyData);

                TBackendLangchainFile.postProMode_moduleChain_v4_subVersion_2(
                  urlSlug,
                  bodyData,
                  () => {
                    console.log('afterReceiveResponseFunc');
                  },
                  () => {
                    console.log('beforeSendRequestFunc');
                  },
                  (writingResultText: string) => {
                    console.log('updateResultFromRequestFunc', writingResultText);
                    setResult_text(writingResultText);
                  },
                  (resultText: string) => {
                    console.log('AfterRequestFunc', resultText);
                    setResult_text('');
                    setRestuls((prevResults) => [
                      {
                        ...IPrompt_default,
                        role: EAIFlowRole.ASSISTANT,
                        content: resultText,
                        versionDate: new Date().toISOString(),
                        versionNum: prevResults.length + 1,
                      },
                      ...prevResults,
                    ]);
                    setIsCalling(false);
                  },
                  userAccessToken,
                  t.currentLocale,
                  CONSTANTS_GPT_AI_FLOW_COMMON,
                  TCryptoJSFile.encrypt_v2(
                    CONSTANTS_GPT_AI_FLOW_COMMON.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string,
                  ),
                  signal,
                );
              } catch (error) {
                console.error('Error during request:', error);
                setIsCalling(false);
                message.error(error instanceof Error ? error.message : String(error));
              }
            }}
          >
            {t.get('Generate')}
          </Button>

          {isCalling && (
            <Button
              className="ml-[1rem]"
              onClick={() => {
                requestController.abort();
              }}
            >
              {t.get('Stop')}
            </Button>
          )}
        </div>
        <div className="flex">
          <DndContext
            sensors={useSensors(useSensor(PointerSensor))}
            collisionDetection={closestCenter}
            onDragOver={handleDragEnd}
            onDragEnd={handleDragEnd}
          >
            <div className="flex flex-col gap-8 mt-4 pr-2">
              {/* {!parent ? draggable : null}
          {!parent ? draggable_2 : null}
          <Droppable id="droppable">{parent === 'droppable' ? draggable : 'Drop here'}</Droppable> */}

              {prompts_v3_for_promptsFactory_status.map((statusItem) => {
                return (
                  <StatusBlock
                    key={statusItem.id}
                    t={t}
                    view={view}
                    block={statusItem}
                    prompts_v3_for_promptsFactory_filtered={prompts_v3_elements.filter(
                      (item) => item.status === statusItem.id,
                    )}
                    form={form}
                    setFormTitle={setFormTitle}
                    showForm={showForm}
                    setShowForm={setShowForm}
                    setShowForm_data={setShowForm_data}
                  />
                );
              })}
            </div>
          </DndContext>

          <div className="mt-4 pl-2 flex-1">
            <div>
              {showForm && (
                <div className="showForm_block">
                  <h2>{formTitle}</h2>
                  <PromptsFactoryForm_v2
                    t={t}
                    form={form}
                    formTitle={formTitle}
                    setShowForm={setShowForm}
                    prompt={showForm_data}
                    prompts_v3_elements={prompts_v3_elements}
                    setPrompts_v3_elements={setPrompts_v3_elements}
                  />
                </div>
              )}
            </div>

            <div className="results_block">
              {result_text && (
                <div className="results_text">
                  <ReactMarkdown>{result_text}</ReactMarkdown>
                </div>
              )}
              {results.length > 0 && (
                <div className="results_list">
                  {results.map((result, index) => (
                    <>
                      <hr />
                      <div key={index} className="result_item">
                        <ReactMarkdown>{result.content}</ReactMarkdown>
                      </div>
                    </>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
