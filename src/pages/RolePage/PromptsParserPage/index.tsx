import { useMemo, useState } from 'react';
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Button, message, Radio, RadioChangeEvent, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { IPrompts_v3_for_promptsFactory_status, StatusBlock } from './StatusBlock';
import {
  IPrompt_v3_for_promptsFactory,
  IPrompt_v3_for_promptsFactory_default,
} from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3_for_promptsFactory';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { updatePrompts_v3_elements } from '../../../store/actions/prompts_v3Actions';
import { IReduxRootState } from '../../../store/reducer';
import { usePrompts_v3_elements_v2_for_web } from '../../../gpt-ai-flow-common/hooks/usePrompts_v3_elements_v2_for_web';
import { PromptsFactoryForm_v2 } from './PromptsFactoryForm_v2';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import TCryptoJSFile from '../../../gpt-ai-flow-common/tools/TCrypto-web';
import { SLLM_v2_common } from '../../../gpt-ai-flow-common/tools/2_class/SLLM_v2_common';
import { ELLM_name } from '../../../gpt-ai-flow-common/enum-backend/ELLM';
import IStoreStorageFile, {
  IStoreStorage_settings_local,
} from '../../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { IPrompt, IPrompt_default } from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt';
import { EAIFlowRole } from '../../../gpt-ai-flow-common/enum-app/EAIFlow';
import { extractJsonFromString } from '../../../gpt-ai-flow-common/tools/TString';
import { Link } from 'react-router-dom';
import { PromptsFeedbackForm_v2 } from './PromptsFeedbackForm_v2';
import { saveLocalAction } from '../../../store/actions/localActions';
import { ILLMOptions } from '../../../gpt-ai-flow-common/interface-app/3_unit/ILLMModels';
import { post_microservice_endpoint } from '../../../gpt-ai-flow-common/tools/1_endpoint/TBackendMicroservice';
import { IAPI_microservice_input } from '../../../gpt-ai-flow-common/interface-backend-microservice/IAPI_microservice_input';

const getCreationModeOptions = (t: IGetT_frontend_output) => {
  return [
    { label: t.get('Precise'), value: 0.6 },
    { label: t.get('Balanced'), value: 0.8 },
    { label: t.get('Creative'), value: 1 },
  ];
};

export interface IPromptsParserPage {
  t: IGetT_frontend_output;
  userAccessToken: string;
}
export const PromptsParserPage = (props: IPromptsParserPage) => {
  const { t, userAccessToken } = props;

  const localFromStore: IStoreStorage_settings_local = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorageFile.IStoreStorage_settings_local_default;
  });
  const {
    apiKeys_v2: { llm: llmOption_secrets },
    proMode: { model_type: llmName_from_store },
  } = localFromStore;

  const [creativityValue, setCreativityValue] = useState<number>(0.8);
  const [llmName, setLLMName] = useState<ELLM_name>(llmName_from_store);

  const llmOptions: ILLMOptions = useMemo(() => {
    return {
      llmName,
      llmImageName: null,
      llmSecret: SLLM_v2_common.getApiKey_by_llmName(llmName, llmOption_secrets),
      llmTemperature: creativityValue,
    };
  }, [llmName, llmOption_secrets, creativityValue]);

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
      id: 'ready',
      title: 'Ready',
    },
    {
      id: 'parsed',
      title: 'Parsed',
    },
  ];

  const [view, setView] = useState<'simple' | 'advanced'>('advanced');

  const [formTitle, setFormTitle] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showForm_data, setShowForm_data] = useState<IPrompt_v3_for_promptsFactory>(
    IPrompt_v3_for_promptsFactory_default,
  );

  const [requestController, setRequestController] = useState<AbortController>(new AbortController());
  const [isCalling, setIsCalling] = useState<boolean>(false);

  const [feedbackForm_data, setFeedbackForm_data] = useState<IPrompt>(IPrompt_default);

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
      <div
        className="row top_block"
        // style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <div
          className="block_creativity_value_slider gap-2"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            alignItems: 'center',

            position: 'sticky',
            top: 0,

            backgroundColor: '#fff',
            zIndex: 10,
            borderBottom: '1px solid #E8E8E8',
            paddingBottom: '.8rem',
          }}
        >
          <div>
            <span style={{ color: '#5D6370', marginRight: '1rem' }}>{t.get('Creation mode')}:</span>

            <Radio.Group
              options={getCreationModeOptions(t)}
              onChange={({ target: { value } }: RadioChangeEvent) => {
                console.log('radio checked', value);
                setCreativityValue(value);
              }}
              value={creativityValue}
              optionType="button"
              buttonStyle="solid"
            />
          </div>
          <div className="modelSwitch">
            <span style={{ color: '#5D6370', marginRight: '1rem' }}>{t.get('Model')}:</span>

            <Select
              value={llmName}
              showSearch
              placeholder={t.get('Select Model')}
              optionFilterProp="children"
              onChange={(value: string) => {
                console.log(`selected ${value}`);
                setLLMName(value as ELLM_name);
                dispatch<IStoreStorage_settings_local | any>(
                  saveLocalAction({
                    ...localFromStore,
                    proMode: {
                      ...localFromStore.proMode,
                      model_type: value as ELLM_name,
                    },
                  }),
                );
              }}
              onSearch={(value: string) => {
                console.log('search:', value);
              }}
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={SLLM_v2_common.getAllLLM_selectOptions_for_web(t)}
              style={{
                width: 450,
              }}
            />
          </div>
        </div>
      </div>
      <h1>{`${t.get('Prompts Parser')} 🔬`}</h1>
      <div className="promtps_parser_container">
        <div className="block_buttons flex justify-between items-center px-2">
          <div>
            <Button
              type="primary"
              disabled={isCalling}
              onClick={() => {
                console.log("click 'Parse' button");

                if (!feedbackForm_data.content || feedbackForm_data.content.trim() === '') {
                  message.error(t.get('Please enter your {text}', { text: t.get('Prompt') }));
                  return;
                }

                try {
                  setIsCalling(true);

                  const newRequestController = new AbortController();
                  setRequestController(newRequestController);
                  const { signal } = newRequestController;

                  const urlSlug = '/lambda_url/2025-07-15-func-05-node-langchain-parsePrompt-dev';
                  const bodyData: IAPI_microservice_input = {
                    history: [],
                    input: JSON.stringify({
                      role: EAIFlowRole.USER,
                      content: feedbackForm_data.content,
                    } as IPrompt),
                    llmOptions,
                  };
                  // console.log('urlSlug', urlSlug);
                  // console.log('bodyData', bodyData);

                  post_microservice_endpoint(
                    CONSTANTS_GPT_AI_FLOW_COMMON.BACKEND_NODE.BACKEND_ENDPOINT_MICROSERVICES + urlSlug,
                    bodyData,
                    () => {
                      console.log('afterReceiveResponseFunc');
                    },
                    () => {
                      console.log('beforeSendRequestFunc');
                    },
                    (writingResultText: string) => {
                      console.log('updateResultFromRequestFunc', writingResultText);
                    },
                    (resultText: string) => {
                      console.log('AfterRequestFunc', resultText);

                      const newPrompts_v3_elements: IPrompt_v3_for_promptsFactory[] = extractJsonFromString(
                        resultText,
                      ).map((item) => ({ ...JSON.parse(item), status: 'parsed' as const }));

                      setPrompts_v3_elements([...newPrompts_v3_elements, ...prompts_v3_elements]);

                      setIsCalling(false);
                    },
                    userAccessToken,
                    t.currentLocale,
                    CONSTANTS_GPT_AI_FLOW_COMMON,
                    TCryptoJSFile.encrypt_v2(
                      CONSTANTS_GPT_AI_FLOW_COMMON.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string,
                    ),
                    signal,
                  ).catch((error) => {
                    console.error('Error during request:', error);
                    setIsCalling(false);
                    message.error(error instanceof Error ? error.message : String(error));
                  });
                } catch (error) {
                  console.error('Error during request:', error);
                  setIsCalling(false);
                  message.error(error instanceof Error ? error.message : String(error));
                }
              }}
            >
              {t.get('Parse')}
            </Button>

            {isCalling && (
              <Button
                className="ml-[1rem]"
                onClick={() => {
                  requestController.abort();
                  setIsCalling(false);
                }}
              >
                {t.get('Stop')}
              </Button>
            )}
          </div>

          <div>
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
                const newPrompts_v3_elements = prompts_v3_elements.filter((item) => item.status !== 'parsed');
                setPrompts_v3_elements(newPrompts_v3_elements);
                message.success(t.get('Clean parsed elements'));
              }}
            >
              {`${t.get('Clean parsed elements')}`}
            </Button>

            <Link className="ml-[1rem]" to="/app/modules/prompts-factory">{`${t.get('Prompts Factory')}`}</Link>
          </div>
        </div>

        <div className="flex">
          <div className="mt-4 pl-2 flex-1 pr-2">
            <div className="input_textarea_block_v2">
              <PromptsFeedbackForm_v2
                t={t}
                userAccessToken={userAccessToken}
                llmOptions={llmOptions}
                feedbackForm_data={feedbackForm_data}
                setFeedbackForm_data={setFeedbackForm_data}
              />
            </div>

            <div>
              {showForm && (
                <div className="showForm_block">
                  <h2>{formTitle}</h2>
                  <PromptsFactoryForm_v2
                    t={t}
                    form={form}
                    formTitle={formTitle}
                    setShowForm={setShowForm}
                    showForm_data={showForm_data}
                    prompts_v3_elements={prompts_v3_elements}
                    setPrompts_v3_elements={setPrompts_v3_elements}
                  />
                </div>
              )}
            </div>
          </div>

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
        </div>
      </div>
    </div>
  );
};
