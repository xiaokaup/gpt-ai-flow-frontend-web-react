import iconCleanRight from '../../../../../../../assets/icons-customize/icon-clean-right/icon-clean-right-24x24.png';

import { Dispatch, SetStateAction } from 'react';
import ReactMarkdown from 'react-markdown';

import copyToClipboard from 'copy-to-clipboard';

import { Button, Form, message, Tooltip } from 'antd';
import { EditOutlined, CopyOutlined } from '@ant-design/icons';

import { IChatMessage } from '../../../../../../gpt-ai-flow-common/interface-app/3_unit/IChatMessage';
import { IGetT_frontend_output } from '../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import TextArea from 'antd/es/input/TextArea';

interface ProModePage_ChatMessages_input {
  t: IGetT_frontend_output;
  currentVersionNum: number;
  chatMessages: IChatMessage[];
  setChatMessages: Dispatch<SetStateAction<IChatMessage[]>>;
}

export const ProModePage_ChatMessages = (props: ProModePage_ChatMessages_input) => {
  const { t, currentVersionNum, chatMessages, setChatMessages } = props;

  const chatMessages_to_show = [
    ...chatMessages.slice(currentVersionNum > 1 ? currentVersionNum - 2 : 0, currentVersionNum),
  ].sort((a: IChatMessage, b: IChatMessage) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const title = t.get('Chat Messages');

  const [form] = Form.useForm();

  return (
    <div className="row subContainer">
      <div className="row flex flex-start items-center pr-2">
        <div className="col_1">
          <h1>{title}</h1>
        </div>
        <div className="col_2 ml-4">
          <Tooltip title={t.get('Reset all')}>
            <img
              id="reset-messages-history-button"
              src={iconCleanRight}
              alt="reset messages history"
              className="button resetMessagesHistoryButton"
              style={{
                fontSize: 18,
                width: 30,
                border: '1px solid #d9d9d9',
                borderRadius: '.25rem',
                padding: 4,
                cursor: 'pointer',

                marginTop: 8,

                flex: '0 1 auto',
              }}
              onClick={() => {
                setChatMessages([]);
                form.resetFields();
              }}
            />
          </Tooltip>
        </div>
      </div>
      {chatMessages_to_show.map((oneChatMessage: IChatMessage, oneChatMessage_index: number) => {
        const { isEdit, content } = oneChatMessage;

        return (
          <div
            className={`block_chatMessages_container ${oneChatMessage_index > 0 ? 'mt-4' : ''}`}
            style={{
              userSelect: 'text',
              border: '1px solid #d9d9d9',
              borderRadius: '.25rem',
              padding: '.4rem',
              paddingLeft: '1rem',
              paddingRight: '1rem',
            }}
          >
            <div
              className="block_top"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div className="column_1" style={{ display: 'flex' }}>
                <EditOutlined
                  style={{ fontSize: 18, marginLeft: '.4rem' }}
                  onClick={() => {
                    setChatMessages(
                      chatMessages.map((oneChatMessage: IChatMessage, item_index: number) => {
                        if (item_index === oneChatMessage_index) {
                          return {
                            ...oneChatMessage,
                            isEdit: !oneChatMessage.isEdit,
                          };
                        }
                        return oneChatMessage;
                      }),
                    );
                  }}
                />

                <CopyOutlined
                  style={{ fontSize: 16, marginLeft: '0.4rem' }}
                  onClick={() => {
                    copyToClipboard(content);

                    message.success({
                      content: <span>{t.get('Copy successful')} !</span>,
                      key: 'copy',
                      duration: 3,
                    });
                  }}
                />
              </div>

              <div className="column_2"></div>
            </div>
            <div className="block_chatMessages">
              {!isEdit && content && (
                <div className="row view relative watermark">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              )}
              {isEdit && (
                <div className="row editing">
                  <Form
                    form={form}
                    initialValues={{ content }}
                    onFinish={(values) => {
                      values.content;
                    }}
                  >
                    {/* <Form.Item name="title" label="Title">
              <Input
                onChange={(event) => {
                  setCurrentOutput({
                    ...currentOutput,
                    title: event.target.value,
                  });
                }}
              />
            </Form.Item> */}

                    <Form.Item name="content" className="relative watermark">
                      <TextArea autoSize className="pb-6" />
                    </Form.Item>

                    <Form.Item>
                      <Button className="confirmChangeContent" type="primary" htmlType="submit">
                        {t.get('Submit')}
                      </Button>
                      <Button
                        type="default"
                        onClick={() => {
                          setChatMessages(
                            chatMessages.map((oneChatMessage: IChatMessage, item_index: number) => {
                              if (item_index === oneChatMessage_index) {
                                return {
                                  ...oneChatMessage,
                                  isEdit: !oneChatMessage.isEdit,
                                };
                              }
                              return oneChatMessage;
                            }),
                          );
                        }}
                        style={{ marginLeft: '1rem' }}
                      >
                        {t.get('Return')}
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
