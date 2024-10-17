import { useCallback, useState } from 'react';
import { AutoComplete, AutoCompleteProps, DatePicker, Form, Input, InputNumber, Tooltip } from 'antd';

import _ from 'lodash';
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { convert } from 'html-to-text';

import { EyeOutlined, EyeInvisibleOutlined, InfoCircleOutlined } from '@ant-design/icons';

import { IGetT_frontend_output } from '../../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import {
  IProMode_v4_tabPane_context_for_type_langchain_formItems,
  IBackground_for_type_langchain,
  IFormItem,
} from '../../../../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/03-langchain';

// const { RangePicker } = DatePicker;
const { TextArea } = Input;

export const Langchain_background = (props: {
  t: IGetT_frontend_output;
  backgroundSelected: IProMode_v4_tabPane_context_for_type_langchain_formItems<IBackground_for_type_langchain>;
  background: IBackground_for_type_langchain;
  setBackground: (newItem: IBackground_for_type_langchain) => void;
}) => {
  const { t, backgroundSelected, background, setBackground } = props;

  const [form] = Form.useForm();

  const [isShow, setIsShow] = useState(true);

  const [autoCompleteOptions_for_input, setAutoCompleteOptions_for_input] = useState<AutoCompleteProps['options']>([]);
  const [autoCompleteOptions_for_textArea, setAutoCompleteOptions_for_textArea] = useState<
    AutoCompleteProps['options']
  >([]);

  const debouncedSetBackground = useCallback(
    _.debounce(async ({ name, urlValue, convertedName }) => {
      const loader = new CheerioWebBaseLoader(urlValue);
      const docs = await loader.load();

      const formattedDocs = docs.map((doc) => {
        // console.log('doc.metadata: ', doc.metadata);
        return `<Document name="${doc.metadata?.title}">\n${doc.pageContent}\n</Document>`;
      });
      const urlHtmlContent = formattedDocs.join('\n\n');
      const urlContent = convert(urlHtmlContent);

      // console.log('name: ', name);
      // console.log('urlValue: ', urlValue);
      // console.log('convertedName: ', convertedName);
      // console.log('urlHtmlContent: ', urlHtmlContent);
      // console.log('urlContent: ', urlContent);

      const newItem = {
        ...background,
        [name]: urlValue,
        [convertedName]: urlContent,
      };
      setBackground(newItem);
    }, 600),
    [],
  ); // 600 毫秒的防抖时间

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
        <div className="right">{/* void */}</div>
      </div>
      {isShow && (
        <div className="row">
          <Form form={form} initialValues={background}>
            {backgroundSelected.formItems.map((item: IFormItem<IBackground_for_type_langchain>) => {
              const {
                componentType,
                label,
                name,
                isRequired,
                isAutoSize_minRows,
                tooltip,
                tooltip_isNeedTranslate,
                minNum = 1,
                maxNum = 4,
                isHidden,
                autoCompleteOptions,
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
                      rules={
                        isRequired
                          ? [{ required: true, message: t.getHTML('Please input your {text}', { text: t.get(label) }) }]
                          : []
                      }
                    >
                      {autoCompleteOptions && autoCompleteOptions.length > 0 && (
                        <AutoComplete
                          options={autoCompleteOptions_for_input}
                          onSelect={(value: string) => {
                            const newItem = {
                              ...background,
                              [name]: value,
                            };
                            setBackground(newItem);
                          }}
                          onFocus={() => {
                            console.log('onFocus');
                            setAutoCompleteOptions_for_input(autoCompleteOptions);
                          }}
                          onSearch={(searchValue: string) => {
                            console.log('onSearch', searchValue);
                            setAutoCompleteOptions_for_input(
                              autoCompleteOptions.filter((item) => item.value.includes(searchValue)),
                            );
                          }}
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
                        </AutoComplete>
                      )}
                      {!(autoCompleteOptions && autoCompleteOptions.length > 0) && (
                        <Input
                          onChange={(event) => {
                            const newItem = {
                              ...background,
                              [name]: event.target.value,
                            };
                            setBackground(newItem);
                          }}
                        />
                      )}
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
                      rules={
                        isRequired
                          ? [
                              {
                                required: true,
                                message: t.getHTML('Please input your {text}', { text: t.get(label) }),
                              },
                            ]
                          : []
                      }
                    >
                      {autoCompleteOptions && autoCompleteOptions.length > 0 && (
                        <AutoComplete
                          options={autoCompleteOptions_for_textArea}
                          onSelect={(value: string) => {
                            const newItem = {
                              ...background,
                              [name]: value,
                            };
                            setBackground(newItem);
                          }}
                          onFocus={() => {
                            console.log('onFocus');
                            setAutoCompleteOptions_for_textArea(autoCompleteOptions);
                          }}
                          onSearch={(searchValue: string) => {
                            console.log('onSearch', searchValue);
                            setAutoCompleteOptions_for_textArea(
                              autoCompleteOptions.filter((item) => item.value.includes(searchValue)),
                            );
                          }}
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
                        </AutoComplete>
                      )}
                      {!(autoCompleteOptions && autoCompleteOptions.length > 0) && (
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
                      )}
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
                          const urlValue = event.target.value;
                          if (event.target.value === '') {
                            const newItem = {
                              ...background,
                              [name]: '',
                              urlContent: '',
                            };
                            setBackground(newItem);
                            return;
                          }
                          if (!urlValue) {
                            return;
                          }
                          debouncedSetBackground({
                            name,
                            urlValue,
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
