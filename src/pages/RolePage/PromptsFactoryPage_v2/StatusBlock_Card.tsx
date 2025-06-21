import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { IPrompt_v3_for_promptsFactory } from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3_for_promptsFactory';

interface IStatusBlcok_Card {
  onePrompt: IPrompt_v3_for_promptsFactory;
}
export const StatusBlcok_Card = (props: IStatusBlcok_Card) => {
  const { onePrompt } = props;
  const { title: id, title, content } = onePrompt;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
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
      <h3 className="font-medium text-neutral-100">{title}</h3>
      <p className="mt-2 text-sm text-neutral-400">{content}</p>
    </div>
  );
};
