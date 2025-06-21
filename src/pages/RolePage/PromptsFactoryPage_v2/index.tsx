import { useState } from 'react';
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Button } from 'antd';
import { IPrompts_v3_for_promptsFactory_status, StatusBlock } from './StatusBlock';
import {
  EPrompt_v3_for_promptsFactory_type,
  IPrompt_v3_for_promptsFactory,
  IPrompt_v3_for_promptsFactory_default,
} from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3_for_promptsFactory';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { useDispatch, useSelector } from 'react-redux';
import { usePrompts_v3_user_v2_for_web } from '../../../gpt-ai-flow-common/hooks/usePrompts_v3_user_v2_for_web';
import { IPrompt_v3_type_persona } from '../../../gpt-ai-flow-common/interface-app/2_component/IPrompt_v3/IPrompt_v3_type_persona';
import { IPrompt_v3 } from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3';
import { udpatePrompts_v3_elements, updateUserPrompts_v3 } from '../../../store/actions/prompts_v3Actions';
import { IReduxRootState } from '../../../store/reducer';
import { EPrompt_v3_type } from '../../../gpt-ai-flow-common/enum-app/EPrompt_v3';
import { PromptsFactoryForm } from './promptsFactoryForm';
import { usePrompts_v3_elements_v2_for_web } from '../../../gpt-ai-flow-common/hooks/usePrompts_v3_elements_v2_for_web';

export interface IPromptsFactoryPage {
  t: IGetT_frontend_output;
  userAccessToken: string;
}
export const PromptsFactoryPage_v2 = (props: IPromptsFactoryPage) => {
  const { t } = props;

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
      dispatch<any>(udpatePrompts_v3_elements(newPrompts_v3_elements));
    },
  });
  console.log('prompts_v3_elements', prompts_v3_elements);

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

  const [prompts_v3_for_promptsFactory, setPrompts_v3_for_promptsFactory] = useState<IPrompt_v3_for_promptsFactory[]>([
    ...prompts_v3_elements,
  ]);
  const [view, setView] = useState<'simple' | 'advanced'>('simple');
  const [showForm, setShowForm] = useState<boolean>(true);
  const [showForm_data, setShowForm_data] = useState<IPrompt_v3_for_promptsFactory>(
    IPrompt_v3_for_promptsFactory_default,
  );

  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;

    console.log('active', active);
    console.log('over', over);

    if (!over) return;

    const currentStatus = active.data?.current?.prompt?.status;
    const targetStatus = over.data?.current?.type === 'status-block' ? over?.id : over.data?.current?.prompt?.status;

    // 处理卡片排序（同一状态块内）
    if (currentStatus === targetStatus && active.id !== over.id) {
      console.log('hit same status block');

      setPrompts_v3_for_promptsFactory((items) => {
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

      setPrompts_v3_for_promptsFactory((items) => {
        return items.map((item) => {
          if (item.title === currentTitle) {
            return { ...item, status: targetStatus };
          }
          return item;
        });
      });
    }
  }

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
            View
          </Button>
          <Button
            className="ml-[1rem]"
            onClick={() => {
              setShowForm_data(IPrompt_v3_for_promptsFactory_default);
              setShowForm(!showForm);
            }}
          >
            Create
          </Button>

          <Button
            type="primary"
            className="ml-[1rem]"
            onClick={() => {
              console.log('generate');
            }}
          >
            Generate
          </Button>
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
                    view={view}
                    block={statusItem}
                    prompts_v3_for_promptsFactory_filtered={prompts_v3_for_promptsFactory.filter(
                      (item) => item.status === statusItem.id,
                    )}
                  />
                );
              })}
            </div>
          </DndContext>

          <div className="mt-4 pl-2 flex-1">
            right panel
            <div>
              {showForm && (
                <div className="showForm_block">
                  <PromptsFactoryForm
                    t={t}
                    prompt={showForm_data}
                    setShowForm={setShowForm}
                    prompts_v3_elements={prompts_v3_elements}
                    setPrompts_v3_elements={setPrompts_v3_elements}
                    prompts_v3_for_promptsFactory={prompts_v3_for_promptsFactory}
                    setPrompts_v3_for_promptsFactory={setPrompts_v3_for_promptsFactory}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
