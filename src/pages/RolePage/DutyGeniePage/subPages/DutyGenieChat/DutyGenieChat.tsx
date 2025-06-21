import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { queryHtsCode_searchModule_for_dutyGenie_from_backend } from '../../../../../gpt-ai-flow-common/Module_v5/TBackendExternalSource_for_dutyGenie';
import { IDutyGeniePage_input } from '../..';
import TCryptoJSFile from '../../../../../gpt-ai-flow-common/tools/TCrypto-web';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { ELLM_IMAGE_name, ELLM_name } from '../../../../../gpt-ai-flow-common/enum-backend/ELLM';
import { EModule_name } from '../../../../../gpt-ai-flow-common/enum-app/EModule';
import { ELocale } from '../../../../../gpt-ai-flow-common/enum-app/ELocale';
import './DutyGenieChat.css';

const RobotLogo = () => {
  return (
    <img
      src="https://www.gptaiflow.tech/pages/module-pages/duty-genie/2025-04-17-img-1-logo-taxes.png"
      alt="logo-taxes"
      width={30}
    />
  );
};

const DutyGenieChat: React.FC<IDutyGeniePage_input> = (props) => {
  const { t, userAccessToken } = props;

  const [messages, setMessages] = useState([
    { text: t.get('你好！我是关税精灵。你想查询哪个 HTS 关税？'), sender: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 自动调整文本区域高度
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [inputText]);

  // 处理发送消息
  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    // 添加用户消息到聊天记录
    const userMessage = { text: inputText, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const llmOptions = {
        llmName: ELLM_name.DEEPSEEK_V3,
        llmImageName: ELLM_IMAGE_name.DEFAULT,
        llmSecret: '',
        llmTemperature: 0,
      };
      const data = {
        input: userMessage.text,
        llmOptions,
        contextType: EModule_name.DUTY_GENIE_01_CHECK_HTS_CODE,
      };

      const restuts_report = await queryHtsCode_searchModule_for_dutyGenie_from_backend(
        data,
        userAccessToken,
        t.currentLocale,
        CONSTANTS_GPT_AI_FLOW_COMMON,
        TCryptoJSFile.encrypt_v2(CONSTANTS_GPT_AI_FLOW_COMMON.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string),
      );
      // console.log('restuts_report', restuts_report);

      // AI 回复消息
      const botResponse = {
        text: restuts_report,
        sender: 'bot',
      };

      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error getting response from AI:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: t.get('抱歉，发生了错误，请稍后再试。'), sender: 'bot' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理按下 Enter 键
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isLoading) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="duty-genie-chat">
      <div className="chat-header">
        <h1>
          {t.get('Duty Genie')}
          <span className="subtitle">{t.get('单次 HTS 关税查询报告')}</span>
          {t.currentLocale === ELocale.ZH && <span className="locale-flag">🇨🇳</span>}
          {t.currentLocale === ELocale.EN && <span className="locale-flag">🇺🇸</span>}
        </h1>
      </div>

      <div className="chat-container">
        <div className="messages-area">
          {messages.map((message, index) => (
            <div key={index} className={`message-wrapper ${message.sender}`}>
              {message.sender === 'user' && <div className="avatar">👤</div>}
              <div className="message-content">
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
              {message.sender === 'bot' && (
                <div className="avatar">
                  <RobotLogo />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="message-wrapper bot">
              <div className="message-content loading">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="avatar">
                <RobotLogo />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <div className="input-container">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              // onKeyPress={handleKeyPress}
              placeholder={t.get('输入 HTS 代码或产品描述...')}
              rows={1}
            />
            <button className="send-button" onClick={handleSendMessage} disabled={isLoading || inputText.trim() === ''}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22 2L11 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 2L15 22L11 13L2 9L22 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="input-footer">
            <span>{t.get('按 Enter 发送，Shift+Enter 换行')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DutyGenieChat;
