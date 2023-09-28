import '../../../styles/global.css';

import React from 'react';

export const SettingsWindow_6_about = () => {
  return (
    <div
      id="SettingsWindow_6_about"
      className="container"
      style={{
        marginTop: 12,
        marginLeft: 12,
        padding: '2rem',
        background: '#fff',
        border: '1px solid #E8E8E8',
        borderRadius: '.4rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div id="settingsWindowContainer" className="container" style={{ padding: '8px 10px' }}>
        <div className="row">
          官方网站: <a href="https://gptaiflow.com">gptaiflow.com</a>
          <br />
          常见问题: <a href="https://www.gptaiflow.com/docs/proudct/faq">点击这里</a>
        </div>
        <div className="row">
          如有任何反馈(bug 或 建议), 请发送至邮箱 <a href="mailto:hello@gptaiflow.com">hello@gptaiflow.com</a> 或通过{' '}
          <a href="https://wj.qq.com/s2/13154598/1770/">产品反馈页面</a> 告诉我们
        </div>

        <hr />
        <div className="row">
          <span>版本: v0.1.29</span>
        </div>
      </div>
    </div>
  );
};
