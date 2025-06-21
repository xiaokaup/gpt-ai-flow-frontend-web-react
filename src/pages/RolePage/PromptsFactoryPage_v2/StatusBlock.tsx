import { useDroppable } from '@dnd-kit/core';
import { IPrompt_v3_for_promptsFactory } from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3_for_promptsFactory';
import { StatusBlcok_Card } from './StatusBlock_Card';

export interface IPrompts_v3_for_promptsFactory_status {
  id: string;
  title: string;
}

interface IStatusBlock {
  block: IPrompts_v3_for_promptsFactory_status;
  prompts_v3_for_promptsFactory_filtered: IPrompt_v3_for_promptsFactory[];
}
export const StatusBlock = (props: IStatusBlock) => {
  const { block, prompts_v3_for_promptsFactory_filtered } = props;
  const { id, title } = block;

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} className="flex w-80 flex-col rounded-lg bg-neutral-600 p-4 shadow-md">
      <h2 className="mb-4 font-semibold text-neutral-100">{title}</h2>
      <div className="flex flex-1 flex-col gap-4">
        {prompts_v3_for_promptsFactory_filtered.map((onePrompt) => (
          <StatusBlcok_Card onePrompt={onePrompt} />
        ))}
      </div>
    </div>
  );
};
