import { Dispatch } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { EditOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd';
import { IPrompt_v3_for_promptsFactory } from '../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3_for_promptsFactory';

interface IStatusBlock_Card {
  view: 'simple' | 'advanced';
  onePrompt: IPrompt_v3_for_promptsFactory;
  form: FormInstance<any>;
  setShowForm: Dispatch<React.SetStateAction<boolean>>;
}
export const StatusBlock_Card = (props: IStatusBlock_Card) => {
  const { view, onePrompt, form, setShowForm } = props;
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
      key={title}
      className="rounded-lg bg-neutral-700 px-2 shadow-sm hover:shadow-md"
      style={style}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="cursor-grab cursor-grab p-2 mr-2 text-neutral-400 hover:text-neutral-200">
            <svg {...listeners} {...attributes} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4 4h2v2H4V4zm0 6h2v2H4v-2zm0-3h2v2H4V7zm5-3h2v2H9V4zm0 6h2v2H9v-2zm0-3h2v2H9V7z" />
            </svg>
          </div>
          <h3 className="font-medium text-neutral-100">{title}</h3>
        </div>

        <div className="font-medium text-neutral-100">
          <EditOutlined
            className="cursor-pointer p-2"
            onClick={() => {
              console.log('Click edit icon for prompt:', onePrompt);
              form.setFieldsValue(onePrompt);
              setShowForm(true);
            }}
          />
        </div>
      </div>
      {view === 'advanced' && <p className="mt-2 text-sm text-neutral-400 max-h-[200px] overflow-auto">{content}</p>}
    </div>
  );
};
