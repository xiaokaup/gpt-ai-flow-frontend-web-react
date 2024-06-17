import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import { IGetT_frontend_output } from '../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

interface ILangchain_context_description {
  t: IGetT_frontend_output;
  description: string;
}
export const Langchain_context_description = (props: ILangchain_context_description) => {
  const { t, description } = props;

  const [isShow, setIsShow] = useState(false);

  return (
    <div className="row subContainer">
      <div className="block_title" style={{ display: 'flex', paddingLeft: '1rem', paddingRight: '1rem' }}>
        <h1>{t.get('Example')}</h1>
        {isShow && <EyeOutlined style={{ fontSize: 18, marginLeft: '.4rem' }} onClick={() => setIsShow(false)} />}
        {!isShow && (
          <EyeInvisibleOutlined style={{ fontSize: 18, marginLeft: '.4rem' }} onClick={() => setIsShow(true)} />
        )}
      </div>
      {isShow && (
        <div
          className="container_description"
          style={{
            userSelect: 'text',
            border: '1px solid #d9d9d9',
            borderRadius: '.25rem',
            padding: '.4rem',
            paddingLeft: '1rem',
            paddingRight: '1rem',
          }}
        >
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};
