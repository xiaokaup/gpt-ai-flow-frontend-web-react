import React from 'react';
import { ELocale } from '../../../../gpt-ai-flow-common/enum-app/ELocale';

interface IToolsVersionAnnounce {
  locale: ELocale;
}
export const ToolsVersionAnnounce = (props: IToolsVersionAnnounce) => {
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
        <p>工具版的特点: </p>
        <ul>
          <li>
            <b>高级AI对话功能</b>：享受更复杂的对话和更精细的用户交互。
          </li>
          <li>
            <b>无限使用次数</b>：放心大胆地使用，无需担心使用限制。
          </li>
          <li>
            <b>专业模式全面支持</b>：根据具体需求定制功能，满足您的各种专业需求。
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
          <b>Advanced AI dialogue capabilities</b>: Enjoy more complex conversations and more refined user interactions.
        </li>
        <li>
          <b>Unlimited usage</b>: Use freely without worrying about usage limits.
        </li>
        <li>
          <b>Comprehensive support for professional modes</b>: Customize features based on specific needs to meet your
          various professional demands.
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
