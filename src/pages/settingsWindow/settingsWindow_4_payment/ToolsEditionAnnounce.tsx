import React from 'react';
import { ELocale } from '../../../gpt-ai-flow-common/enum-app/ELocale';

interface IToolsVersionAnnounce {
  locale: ELocale;
}
export const ToolsEditionAnnounce = (props: IToolsVersionAnnounce) => {
  const { locale } = props;

  if (locale === ELocale.ZH) {
    return (
      <div className="toolsVersion toolsVersion_zh row" style={{ marginTop: '2rem' }}>
        亲爱的用户，
        <br />
        <br />
        感谢您选择<b>工具版</b>，您的选择让我们能够继续追求更高的技术创新和服务升级！
        <br />
        <br />
        <p>工具版的特点:</p>
        <ul>
          <li>
            <b>人物角色设定系统</b>：能够自定义和管理不同的人物角色配置。
          </li>
          <li>
            <b>自备大模型密匙</b>：可以自由绑定并使用自己的大模型密匙，增加使用的灵活性和安全性。
          </li>
          <li>
            <b>所有AI工作流模块可无限次使用</b>：包括职场、小红书平台、领英平台和产品经理等多种场景。
          </li>
        </ul>
        <br />
        <b>我们非常感谢您成为我们的天使投资人，并鼓励您向我们发送需求，我们愿意提供必要的支持。</b>
        您的反馈对我们至关重要，是我们不断进步和完善的动力。请随时通过邮箱联系{' '}
        <a href="mailto:hello@gptaiflow.com" style={{ color: '#1677ff', cursor: 'pointer' }}>
          hello@gptaiflow.com
        </a>{' '}
        或通过我们的反馈系统{' '}
        <span
          style={{ color: '#1677ff', cursor: 'pointer' }}
          onClick={() => {
            window.open('https://wj.qq.com/s2/13154598/1770/');
          }}
        >
          提交您的建议和需求
        </span>
        。
        <br />
        <br />
        再次感谢您的支持和信任。我们期待您的每一次反馈，并承诺将其转化为产品的持续改进和升级。
        <br />
        <br />
        敬请享用我们的服务！
      </div>
    );
  }

  // ELocale.EN
  return (
    <div className="toolsVersion toolsVersion_en row" style={{ marginTop: '2rem' }}>
      Dear users,
      <br />
      <br />
      Thank you for choosing the <b>Tools version</b>. Your selection enables us to continue our pursuit of higher
      technological innovation and service upgrades!
      <br />
      <br />
      <p>Features of the Tools version: </p>
      <ul>
        <li>
          <b>Character Role Setting System</b>: Able to customize and manage different character role configurations.
        </li>
        <li>
          <b>Self-provided Large Model Key</b>: Can freely bind and use your own large model key, increasing flexibility
          and security of use.
        </li>
        <li>
          <b>Unlimited Use of All AI Workflow Modules</b>: Including various scenarios such as workplace, Xiaohongshu
          platform, LinkedIn platform, and product manager.
        </li>
      </ul>
      <br />
      <b>
        We deeply appreciate you being our angel investor and encourage you to send us your requirements, as we are
        willing to provide the necessary support.
      </b>
      Your feedback is crucial to us and is the driving force behind our continuous improvement and perfection. Please
      feel free to contact us at{' '}
      <a href="mailto:hello@gptaiflow.com" style={{ color: '#1677ff', cursor: 'pointer' }}>
        hello@gptaiflow.com
      </a>{' '}
      or{' '}
      <span
        style={{ color: '#1677ff', cursor: 'pointer' }}
        onClick={() => {
          window.open('https://forms.gle/rnn7x9NWnk5koeHa6');
        }}
      >
        submit your suggestions and requests
      </span>{' '}
      through our feedback system.
      <br />
      <br />
      Thank you again for your support and trust. We look forward to each of your feedbacks and commit to transforming
      them into ongoing product improvements and upgrades.
      <br />
      <br />
      Enjoy our services!
    </div>
  );
};
