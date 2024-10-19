import { Button, Card, Drawer, Tag } from 'antd';
import { useSelector } from 'react-redux';
import { IReduxRootState } from '../../../../store/reducer';
import { Dispatch, SetStateAction, useState } from 'react';
import { IPrompt_v3_type_persona } from '../../../../gpt-ai-flow-common/interface-app/2_component/IPrompt_v3/IPrompt_v3_IPersonaModel';
import { IPrompt_v3_category } from '../../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3';
import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { useLastFocusedElement } from '../../../../gpt-ai-flow-common/contexts/LastFocusedElementContext';

interface IDrawer_prompt_v3_persona_input {
  t: IGetT_frontend_output;
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  setPrompt_v3_persona: Dispatch<SetStateAction<IPrompt_v3_type_persona>>;
}

export const Drawer_prompt_v3_persona = (props: IDrawer_prompt_v3_persona_input) => {
  const { t, isShow, setIsShow: setShow } = props;

  const { updateLastFocusedElement } = useLastFocusedElement();

  const [isExpand, setIsExpand] = useState<boolean>(false);

  const prompts_v3_persona = useSelector((state: IReduxRootState) => state.prompts_v3.user);
  console.log('prompts_v3_persona in drawer', prompts_v3_persona);

  const onClose = () => {
    setShow(false);
  };
  return (
    <Drawer
      title="Persona"
      open={isShow}
      onClose={onClose}
      placement="left"
      mask={false}
      extra={
        <Button
          type="link"
          onClick={() => {
            setIsExpand(!isExpand);
          }}
        >
          {isExpand ? 'collapse' : 'Expand'}
        </Button>
      }
    >
      {prompts_v3_persona.map((thisPrompts_v3_persona: IPrompt_v3_type_persona) => {
        const { uuid, type, name, value, category, tags, description, metadata } = thisPrompts_v3_persona;

        return (
          <Card
            key={uuid}
            size="small"
            className="mt-2"
            title={name}
            extra={
              <Button
                type="link"
                onClick={() => {
                  console.log('selected 这个', thisPrompts_v3_persona);
                  updateLastFocusedElement(thisPrompts_v3_persona.value);
                  // setShow(false);
                }}
              >
                Select
              </Button>
            }
          >
            <div style={{ height: isExpand ? 200 : 60, overflow: 'auto' }}>
              <p>{value}</p>
            </div>

            {category?.map((oneCategory: IPrompt_v3_category) => {
              return (
                <Tag key={oneCategory} color="#108ee9">
                  {t.get(oneCategory)}
                </Tag>
              );
            })}
            {tags?.map((oneTag: string) => {
              return <Tag key={oneTag}>{oneTag}</Tag>;
            })}
          </Card>
        );
      })}
    </Drawer>
  );
};
