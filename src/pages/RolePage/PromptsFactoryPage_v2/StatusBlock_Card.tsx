import { CSS } from '@dnd-kit/utilities';
import { IPrompt_v3_for_promptsFactory } from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3_for_promptsFactory';
import { useSortable } from '@dnd-kit/sortable';

interface IStatusBlock_Card {
  onePrompt: IPrompt_v3_for_promptsFactory;
}
export const StatusBlock_Card = (props: IStatusBlock_Card) => {
  const { onePrompt } = props;
  const { title: id, title, content } = onePrompt;

  // 使用 useSortable 处理排序
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: {
      type: 'status-block-card',
      prompt: onePrompt,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      key={title}
      className="cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md"
      style={style}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-neutral-100">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-neutral-400 max-h-[200px] overflow-auto">{content}</p>
    </div>
  );
};
