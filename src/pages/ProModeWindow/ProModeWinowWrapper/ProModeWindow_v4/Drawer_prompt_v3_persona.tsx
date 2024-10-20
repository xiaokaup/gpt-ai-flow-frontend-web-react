import { Dispatch, SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';

import { Button, Card, Drawer, message, Tag } from 'antd';

import { IReduxRootState } from '../../../../store/reducer';
import { IPrompt_v3_type_persona } from '../../../../gpt-ai-flow-common/interface-app/2_component/IPrompt_v3/IPrompt_v3_type_persona';
import { IPrompt_v3_category } from '../../../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3';
import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { useLastFocusedElement } from '../../../../gpt-ai-flow-common/contexts/LastFocusedElementContext';
import { Link } from 'react-router-dom';

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

  const onClose = () => {
    setShow(false);
  };
  return (
    <Drawer
      title={`${t.get('Persona panel')} (${t.get('beta')})`}
      open={isShow}
      onClose={onClose}
      placement="left"
      mask={false}
      extra={
        <>
          <Button type="link">
            <Link to="/app/persona" target="__blank">
              {t.get('Manage')}
            </Link>
          </Button>

          <Button
            type="link"
            onClick={() => {
              setIsExpand(!isExpand);
            }}
          >
            {isExpand ? t.get('Collapse') : t.get('Expand')}
          </Button>
        </>
      }
    >
      {prompts_v3_persona.map((thisPrompts_v3_persona: IPrompt_v3_type_persona) => {
        const { uuid, name, value, category, tags } = thisPrompts_v3_persona;

        return (
          <Card
            key={uuid}
            size="small"
            className="mt-2"
            title={name}
            extra={
              <>
                <CopyToClipboard
                  text={value}
                  onCopy={() => {
                    message.success({
                      content: <span>{t.get('Copy successful')} !</span>,
                      key: 'copy',
                      duration: 3,
                    });
                  }}
                >
                  <Button type="link">{t.get('Copy')}</Button>
                </CopyToClipboard>

                <Button
                  type="link"
                  onClick={() => {
                    console.log('selected in Drawer_prompt_v3_persona', thisPrompts_v3_persona);
                    updateLastFocusedElement(thisPrompts_v3_persona.value);
                    // setShow(false);
                  }}
                >
                  {t.get('Select')}
                </Button>
              </>
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
