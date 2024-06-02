import React, { useCallback, useState } from 'react';
import { DatePicker, Form, Input, InputNumber, Tooltip } from 'antd';

import _ from 'lodash';
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';

import { EyeOutlined, EyeInvisibleOutlined, RedoOutlined, InfoCircleOutlined } from '@ant-design/icons';

import { IGetT_frontend_output } from '../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import {
  IPromode_v4_tabPane_context_for_type_langchain_formItems,
  IBackground_for_type_langchain,
  IFormItem,
} from '../../../../../../gpt-ai-flow-common/interface-app/ProMode_v4/interface-type/03-langchain/IProMode_v4_context_type_langchain';

// const { RangePicker } = DatePicker;
const { TextArea } = Input;

export const Langchain_background = (props: {
  t: IGetT_frontend_output;
  backgroundSelected: IPromode_v4_tabPane_context_for_type_langchain_formItems<IBackground_for_type_langchain>;
  background: IBackground_for_type_langchain;
  setBackground: (newItem: IBackground_for_type_langchain) => void;
  onResetAll: () => void;
}) => {
  const { t, backgroundSelected, background, setBackground, onResetAll } = props;

  const [form] = Form.useForm();

  const [isShow, setIsShow] = useState(true);

  const debouncedSetBackground = useCallback(
    _.debounce(async ({ url, name, convertedName }) => {
      const loader = new CheerioWebBaseLoader(url);
      const docs = await loader.load();
      const formattedDocs = docs.map(
        (doc) => `<Document name="${doc.metadata?.title}">\n${doc.pageContent}\n</Document>`,
      );
      const urlResults = formattedDocs.join('\n\n');
      const urlContent = urlResults;

      // console.log('name: ', name);
      // console.log('urlContent: ', urlContent);

      const newItem = {
        ...background,
        name: url,
        [convertedName]: urlContent,
      };
      setBackground(newItem);
    }, 500),
    [],
  ); // 500 毫秒的防抖时间

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
            {backgroundSelected.formItems.map((item: IFormItem<IBackground_for_type_langchain>) => {
              const {
                componentType,
                label,
                name,
                isAutoSize_minRows,
                tooltip,
                tooltip_isNeedTranslate,
                minNum = 1,
                maxNum = 4,
                isHidden,
              } = item;

              if (componentType === 'InputNumber') {
                return (
                  <Tooltip title={tooltip && tooltip_isNeedTranslate ? t.get(tooltip) : tooltip}>
                    <Form.Item
                      name={name}
                      label={
                        tooltip && tooltip_isNeedTranslate ? (
                          <>
                            {t.get(label)}&nbsp;
                            <InfoCircleOutlined />
                          </>
                        ) : (
                          t.get(label)
                        )
                      }
                    >
                      <InputNumber
                        min={minNum}
                        max={maxNum}
                        onChange={(value) => {
                          const newItem = {
                            ...background,
                            [name]: String(value),
                          };
                          setBackground(newItem);
                        }}
                      />
                    </Form.Item>
                  </Tooltip>
                );
              }

              if (componentType === 'Input') {
                return (
                  <Tooltip title={tooltip && tooltip_isNeedTranslate ? t.get(tooltip) : tooltip}>
                    <Form.Item
                      name={name}
                      label={
                        tooltip && tooltip_isNeedTranslate ? (
                          <>
                            {t.get(label)}&nbsp;
                            <InfoCircleOutlined />
                          </>
                        ) : (
                          t.get(label)
                        )
                      }
                    >
                      <Input
                        onChange={(event) => {
                          const newItem = {
                            ...background,
                            [name]: event.target.value,
                          };
                          setBackground(newItem);
                        }}
                      />
                    </Form.Item>
                  </Tooltip>
                );
              }
              if (componentType === 'TextArea') {
                return (
                  <Tooltip title={tooltip && tooltip_isNeedTranslate ? t.get(tooltip) : tooltip}>
                    <Form.Item
                      className={isHidden ? 'hidden' : ''}
                      name={name}
                      label={
                        tooltip && tooltip_isNeedTranslate ? (
                          <>
                            {t.get(label)}&nbsp;
                            <InfoCircleOutlined />
                          </>
                        ) : (
                          t.get(label)
                        )
                      }
                    >
                      <TextArea
                        autoSize={{ minRows: isAutoSize_minRows ?? 1 }}
                        onChange={(event) => {
                          const newItem = {
                            ...background,
                            [name]: event.target.value,
                          };
                          setBackground(newItem);
                        }}
                      />
                    </Form.Item>
                  </Tooltip>
                );
              }
              if (componentType === 'URLCrawler') {
                return (
                  <Tooltip title={tooltip && tooltip_isNeedTranslate ? t.get(tooltip) : tooltip}>
                    <Form.Item
                      name={name}
                      label={
                        tooltip && tooltip_isNeedTranslate ? (
                          <>
                            {t.get(label)}&nbsp;
                            <InfoCircleOutlined />
                          </>
                        ) : (
                          t.get(label)
                        )
                      }
                    >
                      <TextArea
                        autoSize={{ minRows: isAutoSize_minRows ?? 1 }}
                        onChange={(event) => {
                          // const newItem = {
                          //   ...background,
                          //   [name]: event.target.value,
                          // };
                          if (event.target.value === '') {
                            const newItem = {
                              ...background,
                              [name]: '',
                              urlContent: '',
                            };
                            setBackground(newItem);
                            return;
                          }
                          debouncedSetBackground({
                            url: event.target.value,
                            name,
                            convertedName: 'urlContent',
                          });
                        }}
                      />
                    </Form.Item>
                  </Tooltip>
                );
              }
              if (componentType === 'DatePicker') {
                return (
                  <Tooltip title={tooltip && tooltip_isNeedTranslate ? t.get(tooltip) : tooltip}>
                    <Form.Item
                      name={name}
                      label={
                        tooltip && tooltip_isNeedTranslate ? (
                          <>
                            {t.get(label)}&nbsp;
                            <InfoCircleOutlined />
                          </>
                        ) : (
                          t.get(label)
                        )
                      }
                    >
                      <DatePicker
                        onChange={(date, dates) => {
                          const newItem = {
                            ...background,
                            [name]: dates.toLocaleString(),
                          };
                          setBackground(newItem);
                        }}
                      />
                    </Form.Item>
                  </Tooltip>
                );
              }

              return <>None for componentType: {componentType}</>;
            })}
          </Form>
        </div>
      )}
    </div>
  );
};
