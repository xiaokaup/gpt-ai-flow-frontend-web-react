import { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Button } from 'antd';
import { IPrompts_v3_for_promptsFactory_status, StatusBlock } from './StatusBlock';
import {
  EPrompt_v3_for_promptsFactory_type,
  IPrompt_v3_for_promptsFactory,
  IPrompt_v3_for_promptsFactory_default,
} from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3_for_promptsFactory';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

export interface IPromptsFactoryPage {
  t: IGetT_frontend_output;
  userAccessToken: string;
}
export const PromptsFactoryPage_v2 = (props: IPromptsFactoryPage) => {
  const { t } = props;

  const prompts_v3_for_promptsFactory_deafult: IPrompt_v3_for_promptsFactory[] = [
    {
      ...IPrompt_v3_for_promptsFactory_default,
      title: 'context',
      type: EPrompt_v3_for_promptsFactory_type.CONTEXT,
      status: 'ready',
      tags: ['background', 'setting'],
    },
    {
      ...IPrompt_v3_for_promptsFactory_default,
      title:
        '你是一位25-35岁的职场白领，每天朝九晚五工作，晚上有闲暇空间。你渴望拥有自己的事业，但面临着如何开始、如何起步、如何积累的挑战，同时也有尝试自媒体的想法。你急需找到一个能够帮助你完成起步阶段的工具。在日常生活中，你习惯记录自己的兴趣爱好。',
      type: EPrompt_v3_for_promptsFactory_type.CONTEXT,
      status: 'ready',
      tags: ['background', 'setting'],
    },
  ];
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

  const [prompts_v3_for_promptsFactory, setPrompts_v3_for_promptsFactory] = useState<IPrompt_v3_for_promptsFactory[]>(
    prompts_v3_for_promptsFactory_deafult,
  );

  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;

    console.log('active', active);
    console.log('over', over);

    if (!over) return;

    const cardTitle = active.id as IPrompt_v3_for_promptsFactory['title'];
    const newStatus = over.id as IPrompt_v3_for_promptsFactory['status'];

    setPrompts_v3_for_promptsFactory(() => {
      return prompts_v3_for_promptsFactory.map((onePrompt) => {
        return onePrompt.title === cardTitle
          ? {
              ...onePrompt,
              status: newStatus,
            }
          : onePrompt;
      });
    });
  }

  return (
    <div className="container p-10 w-full">
      <h1>{`${t.get('Prompts Factory')} 🏭`}</h1>
      <div className="factory_container">
        <div className="block_buttons">
          <Button
            type="primary"
            onClick={() => {
              console.log('generate');
            }}
          >
            Generate
          </Button>
          <Button
            type="primary"
            className="ml-[1rem]"
            onClick={() => {
              console.log('create');
            }}
          >
            Create
          </Button>
        </div>
        <div className="flex">
          <DndContext onDragEnd={handleDragEnd}>
            <div className="flex flex-col gap-8 mt-4 pr-2">
              {/* {!parent ? draggable : null}
          {!parent ? draggable_2 : null}
          <Droppable id="droppable">{parent === 'droppable' ? draggable : 'Drop here'}</Droppable> */}

              {prompts_v3_for_promptsFactory_status.map((statusItem) => {
                return (
                  <StatusBlock
                    key={statusItem.id}
                    block={statusItem}
                    prompts_v3_for_promptsFactory_filtered={prompts_v3_for_promptsFactory.filter(
                      (item) => item.status === statusItem.id,
                    )}
                  />
                );
              })}
            </div>
          </DndContext>

          <div className="mt-4 pl-2">right panel</div>
        </div>
      </div>
    </div>
  );
};
