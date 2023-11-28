import '../../../styles/global.css';

import React from 'react';

export const SettingsWindow_7_about = () => {
  return (
    <div id="SettingsWindow_6_about" className="container">
      <div id="settingsWindowContainer" className="container" style={{ padding: '8px 10px' }}>
        <div className="row">
          官方网站: <a href="https://www.gptaiflow.com">www.gptaiflow.com</a>
          <br />
          常见问题:{' '}
          <a href="https://www.gptaiflow.com/docs/proudct/gpt-ai-flow-guide-and-faq">
            www.gptaiflow.com/docs/proudct/gpt-ai-flow-guide-and-faq
          </a>
        </div>
        <div className="row">
          如有任何反馈(bug 或 建议), 请发送至邮箱 <a href="mailto:hello@gptaiflow.com">hello@gptaiflow.com</a> 或通过{' '}
          <a href="https://wj.qq.com/s2/13154598/1770/">产品反馈页面</a> 告诉我们
        </div>

        <hr />
        <div className="row">
          <span>版本: v0.1.37</span>
        </div>
      </div>
    </div>
  );
};
