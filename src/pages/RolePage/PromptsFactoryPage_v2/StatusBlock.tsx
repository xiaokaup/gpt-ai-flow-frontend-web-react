import { IPrompt_v3_for_promptsFactory } from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3_for_promptsFactory';

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
  const { title } = block;

  return (
    <div className="flex w-80 flex-col rounded-lg bg-neutral-600 p-4 shadow-md">
      <h2 className="mb-4 font-semibold text-neutral-100">{title}</h2>
      <div className="flex flex-1 flex-col gap-4">
        {prompts_v3_for_promptsFactory_filtered.map((onePrompt) => (
          <div
            key={onePrompt.title}
            className="flex items-center justify-between rounded-lg bg-neutral-700 p-2 hover:bg-neutral-500"
          >
            <span className="text-neutral-100">{onePrompt.title}</span>
            <span className="text-sm text-neutral-400">{onePrompt.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
