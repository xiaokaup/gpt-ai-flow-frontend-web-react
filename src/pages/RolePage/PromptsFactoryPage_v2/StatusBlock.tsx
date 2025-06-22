import { useDroppable } from '@dnd-kit/core';
import { IPrompt_v3_for_promptsFactory } from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3_for_promptsFactory';
import { StatusBlock_Card } from './StatusBlock_Card';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Dispatch } from 'react';
import { FormInstance } from 'antd';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

export interface IPrompts_v3_for_promptsFactory_status {
  id: string;
  title: string;
}

interface IStatusBlock {
  t: IGetT_frontend_output;
  view: 'simple' | 'advanced';
  block: IPrompts_v3_for_promptsFactory_status;
  prompts_v3_for_promptsFactory_filtered: IPrompt_v3_for_promptsFactory[];
  form: FormInstance<any>;
  setFormTitle: Dispatch<React.SetStateAction<string>>;
  showForm: boolean;
  setShowForm: Dispatch<React.SetStateAction<boolean>>;
  setShowForm_data: Dispatch<React.SetStateAction<IPrompt_v3_for_promptsFactory>>;
}
export const StatusBlock = (props: IStatusBlock) => {
  const {
    t,
    view,
    block,
    prompts_v3_for_promptsFactory_filtered,
    form,
    setFormTitle,
    showForm,
    setShowForm,
    setShowForm_data,
  } = props;
  const { id, title } = block;

  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: 'status-block',
    },
  });

  // 获取所有卡片的ID列表
  const itemIds = prompts_v3_for_promptsFactory_filtered.map((item) => item.title);

  return (
    <div className="flex w-80 flex-col rounded-lg bg-neutral-600 p-4 shadow-md">
      <h2 className="mb-4 font-semibold text-neutral-100">{t.get(title)}</h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          {prompts_v3_for_promptsFactory_filtered.map((onePrompt) => (
            <StatusBlock_Card
              t={t}
              key={onePrompt.title}
              view={view}
              onePrompt={onePrompt}
              form={form}
              setFormTitle={setFormTitle}
              showForm={showForm}
              setShowForm={setShowForm}
              setShowForm_data={setShowForm_data}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};
