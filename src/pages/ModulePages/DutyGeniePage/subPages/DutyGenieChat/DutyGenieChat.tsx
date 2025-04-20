import React, { useState, useRef, useEffect } from 'react';
import './DutyGenieChat.css';

function DutyGenieChat() {
  const [messages, setMessages] = useState([
    { text: '你好！我是 关税精灵，你想要获得哪个 HTS 关税的查询结果？', sender: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 处理发送消息
  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    // 添加用户消息到聊天记录
    const userMessage = { text: inputText, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // 这里应该是调用实际的 AI API
      // 模拟 API 调用延迟
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 模拟 AI 回复
      const botResponse = {
        text: `我收到了你的消息: "${inputText}"。这是一个模拟回复。`,
        sender: 'bot',
      };

      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error getting response from AI:', error);
      setMessages((prevMessages) => [...prevMessages, { text: '抱歉，发生了错误，请稍后再试。', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理按下 Enter 键
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>关税精灵 (单次 HTS 关税查询报告)</h2>
      </div>

      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}>
            {message.text}
          </div>
        ))}
        {isLoading && (
          <div className="message bot-message loading">
            <div className="loading-dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="输入消息..."
          rows={1}
        />
        <button onClick={handleSendMessage} disabled={isLoading || inputText.trim() === ''}>
          发送
        </button>
      </div>
    </div>
  );
}

export default DutyGenieChat;
