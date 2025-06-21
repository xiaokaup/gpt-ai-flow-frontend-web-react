import { createContext, useContext } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { IPrompt_v3_for_promptsFactory } from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3_for_promptsFactory';
import { useSortable } from '@dnd-kit/sortable';

// 创建一个上下文来跟踪拖拽模式
export const DragModeContext = createContext('sort'); // 'sort' 或 'drag'

interface IStatusBlock_Card {
  onePrompt: IPrompt_v3_for_promptsFactory;
}
export const StatusBlock_Card = (props: IStatusBlock_Card) => {
  const { onePrompt } = props;
  const { title: id, title, content } = onePrompt;

  const dragMode = useContext(DragModeContext);

  // 根据拖拽模式决定是否允许拖拽
  const shouldAllowDrag = dragMode === 'sort';

  // 使用 useSortable 处理排序
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: {
      type: 'card',
      prompt: onePrompt,
    },
    disabled: shouldAllowDrag ? false : true, // 如果不允许拖拽，则禁用
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...(shouldAllowDrag ? listeners : {})}
      {...attributes}
      key={title}
      className="cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md"
      style={style}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-neutral-100">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-neutral-400">{content}</p>
    </div>
  );
};
