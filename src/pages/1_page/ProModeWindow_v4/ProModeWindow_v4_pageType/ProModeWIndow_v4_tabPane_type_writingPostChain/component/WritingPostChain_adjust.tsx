import { Form, Input } from 'antd';

import { IGetT_frontend_output } from '../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IAjust_for_IPost } from '../../../../../../gpt-ai-flow-common/interface-app/solution_ProMode_v4/type/langchain/IProMode_v4_context_type_writingPostChain';
import React from 'react';

const { TextArea } = Input;

export const WritingPostChain_adjust = (props: {
  t: IGetT_frontend_output;
  adjust: IAjust_for_IPost;
  setAdjust: (newItem: IAjust_for_IPost) => void;
}) => {
  const { t, adjust, setAdjust } = props;

  const [form] = Form.useForm();

  return (
    <div className="row subContainer">
      <h1 style={{ marginTop: 0 }}>{t.get('Content adjust')}</h1>
      <div className="row">
        <Form form={form} initialValues={adjust}>
          <Form.Item name="title" label={t.get('Title')}>
            <Input
              onChange={(event) => {
                setAdjust({
                  ...adjust,
                  title: event.target.value,
                });
              }}
            />
          </Form.Item>

          <Form.Item name="content" label={t.get('Content')}>
            <TextArea
              autoSize
              onChange={(event) => {
                setAdjust({
                  ...adjust,
                  content: event.target.value,
                });
              }}
            />
          </Form.Item>

          <Form.Item name="feedback" label={t.get('Input')}>
            <TextArea
              autoSize={{ minRows: 4 }}
              onChange={(event) => {
                setAdjust({
                  ...adjust,
                  feedback: event.target.value,
                });
              }}
            />
          </Form.Item>

          <Form.Item name="locale" label={t.get('Language')}>
            <Input
              onChange={(event) => {
                setAdjust({
                  ...adjust,
                  locale: event.target.value,
                });
              }}
            />
          </Form.Item>

          <Form.Item name="example" label={t.get('Example')}>
            <TextArea
              autoSize={{ minRows: 2 }}
              onChange={(event) => {
                setAdjust({
                  ...adjust,
                  example: event.target.value,
                });
              }}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
