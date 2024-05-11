import React, { useState } from 'react';
import { DatePicker, Form, Input, Tooltip } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, RedoOutlined } from '@ant-design/icons';

import { IGetT_frontend_output } from '../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IBackground_for_5W2H } from '../../../../../../gpt-ai-flow-common/interface-app/solution_ProMode_v4/type/02-writingPostChain/IProMode_v4_context_type_writingPostChain';

// const { RangePicker } = DatePicker;
const { TextArea } = Input;

export const WritingPostChain_background = (props: {
  t: IGetT_frontend_output;
  background: IBackground_for_5W2H;
  setBackground: (newItem: IBackground_for_5W2H) => void;
  onResetAll: () => void;
}) => {
  const { t, background, setBackground, onResetAll } = props;

  const [form] = Form.useForm();

  const [isShow, setIsShow] = useState(true);

  return (
    <div className="row subContainer">
      <div className="block_title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="left" style={{ display: 'flex' }}>
          {isShow && (
            <>
              <h1>{t.get('Background')}</h1>
              <Tooltip title={t.get('Hide {text}', { text: t.get('Background') })}>
                <EyeOutlined style={{ fontSize: 18, marginLeft: '.4rem' }} onClick={() => setIsShow(false)} />
              </Tooltip>
            </>
          )}

          {!isShow && (
            <>
              <h1 style={{ margin: 0 }}>{t.get('Background')}</h1>
              <Tooltip title={t.get('Show {text}', { text: t.get('Background') })}>
                <EyeInvisibleOutlined style={{ fontSize: 18, marginLeft: '.4rem' }} onClick={() => setIsShow(true)} />
              </Tooltip>
            </>
          )}
        </div>
        <div className="right">
          <Tooltip title={t.get('Reset all')}>
            <RedoOutlined
              style={{
                fontSize: 18,
                border: '1px solid #d9d9d9',
                borderRadius: '.25rem',
                padding: 4,
                cursor: 'pointer',

                marginLeft: 6,

                flex: '0 1 auto',
              }}
              onClick={() => {
                onResetAll();
                form.resetFields();
              }}
            />
          </Tooltip>
        </div>
      </div>
      {isShow && (
        <div className="row">
          <Form form={form} initialValues={background}>
            <Form.Item name="subject" label={t.get('Subject')}>
              <TextArea
                autoSize={{ minRows: 2 }}
                onChange={(event) => {
                  setBackground({
                    ...background,
                    subject: event.target.value,
                  });
                }}
              />
            </Form.Item>

            <Form.Item name="when" label={t.get('Date')}>
              <DatePicker
                onChange={(date, dates) => {
                  // console.log('date', date);
                  // console.log('dates', dates);
                  setBackground({
                    ...background,
                    when: dates.toLocaleString(),
                  });
                }}
              />
            </Form.Item>
            {/* <Form.Item name="when_range" label="RangePicker">
              <RangePicker
                onChange={(dates, dateStrings) => {
                  console.log('dates', dates);
                  console.log('dateStrings', dateStrings);
                }}
              />
            </Form.Item> */}

            <Form.Item name="where" label={t.get('Address')}>
              <Input
                onChange={(event) => {
                  setBackground({
                    ...background,
                    where: event.target.value,
                  });
                }}
              />
            </Form.Item>

            <Form.Item name="who" label={t.get('Personage')}>
              <Input
                onChange={(event) => {
                  setBackground({
                    ...background,
                    who: event.target.value,
                  });
                }}
              />
            </Form.Item>

            <Form.Item name="emotion" label={t.get('Emotion')}>
              <Input
                onChange={(event) => {
                  setBackground({
                    ...background,
                    emotion: event.target.value,
                  });
                }}
              />
            </Form.Item>

            <Form.Item name="what" label={t.get('Event')}>
              <TextArea
                autoSize
                onChange={(event) => {
                  setBackground({
                    ...background,
                    what: event.target.value,
                  });
                }}
              />
            </Form.Item>

            <Form.Item name="why" label={t.get('Reason')}>
              <TextArea
                autoSize
                onChange={(event) => {
                  setBackground({
                    ...background,
                    why: event.target.value,
                  });
                }}
              />
            </Form.Item>

            <Form.Item name="how" label={t.get('How')}>
              <TextArea
                autoSize
                onChange={(event) => {
                  setBackground({
                    ...background,
                    how: event.target.value,
                  });
                }}
              />
            </Form.Item>

            <Form.Item name="how_much" label={t.get('How Much')}>
              <TextArea
                autoSize
                onChange={(event) => {
                  setBackground({
                    ...background,
                    how_much: event.target.value,
                  });
                }}
              />
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};
