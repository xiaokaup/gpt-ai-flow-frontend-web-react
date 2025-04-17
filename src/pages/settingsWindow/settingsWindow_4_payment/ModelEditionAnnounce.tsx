import { ELocale } from '../../../gpt-ai-flow-common/enum-app/ELocale';

interface ILifetimeVersionAnnounce {
  locale: ELocale;
}
export const ModelEditionAnnounce = (props: ILifetimeVersionAnnounce) => {
  const { locale } = props;

  if (locale === ELocale.ZH) {
    return (
      <div>
        亲爱的用户，
        <br />
        <br />
        感谢您选择我们的<b>模型版</b>服务！这是为希望使用官方大模型支持并享受灵活按需付费的用户精心设计的方案。
        <br />
        <br />
        <p>模型版特权:</p>
        <ul>
          <li>
            <b>完整人设系统</b>: 享有全面的人设配置功能，满足多样化的个性化需求。
          </li>
          <li>
            <b>官方大模型支持</b>: 直接使用我们提供的高质量模型 (包括OpenAI、Anthropic Claude、DeepSeek 等)。
          </li>
          <li>
            <b>无限使用工作流模块</b>: 小红书、领英、推特、脸书等所有AI工作流模块均可无限次使用。
          </li>
          <li>
            <b>灵活的计费方式</b>: 基础月费加上超额部分按实际使用量计费，用多少付多少
          </li>
          <li>
            <b>定制化支持</b>: 可根据您的特定需求提供定制化模块支持
          </li>
        </ul>
        <br />
        <b>我们重视您的每一个建议和需求。</b>
        如有任何问题或建议，请随时通过邮箱联系{' '}
        <a href="mailto:hello@gptaiflow.com" style={{ color: '#1677ff', cursor: 'pointer' }}>
          hello@gptaiflow.com
        </a>{' '}
        或通过我们的反馈系统
        <span
          style={{ color: '#1677ff', cursor: 'pointer' }}
          onClick={() => {
            window.open('https://wj.qq.com/s2/13154598/1770/');
          }}
        >
          提交您的意见
        </span>
        。
        <br />
        <br />
        选择模型版, 既能享受专业AI能力, 又能灵活控制成本。我们期待与您一起, 将AI的力量融入您的日常工作与生活 !
        <br />
        <br />
        敬请享受我们的服务！
      </div>
    );
  }

  // ELocale.EN
  return (
    <div>
      Dear users,
      <br />
      <br />
      Thank you for choosing our <b>Model Version</b> service! This is a solution carefully designed for users who want
      to use official large models and enjoy flexible pay-as-you-go pricing.
      <br />
      <br />
      <p>Model Version privileges:</p>
      <ul>
        <li>
          <b>Complete persona system</b>: Enjoy comprehensive persona configuration features to meet diverse
          personalization needs
        </li>
        <li>
          <b>Official large model support</b>: Directly use our high-quality models (including OpenAI, Anthropic Claude,
          DeepSeek, etc.)
        </li>
        <li>
          <b>Unlimited use of workflow modules</b>: All AI workflow modules such as Xiaohongshu, LinkedIn, Twitter,
          Facebook, etc. can be used unlimited times
        </li>
        <li>
          <b>Flexible billing method</b>: Basic monthly fee plus excess usage billed according to actual usage, pay only
          for what you use
        </li>
        <li>
          <b>Customized support</b>: Customized module support based on your specific needs
        </li>
      </ul>
      <br />
      <b>We value each of your suggestions and requirements.</b>
      If you have any questions or suggestions, please feel free to contact us via email at{' '}
      <a href="mailto:hello@gptaiflow.com" style={{ color: '#1677ff', cursor: 'pointer' }}>
        hello@gptaiflow.com
      </a>{' '}
      or submit your feedback through our feedback system{' '}
      <span
        style={{ color: '#1677ff', cursor: 'pointer' }}
        onClick={() => {
          window.open('https://forms.gle/rnn7x9NWnk5koeHa6');
        }}
      >
        submit your feedback
      </span>
      .
      <br />
      <br />
      Choose the Model Version to enjoy professional AI capabilities while flexibly controlling costs. We look forward
      to working with you to integrate the power of AI into your daily work and life!
      <br />
      <br />
      Enjoy our services!
    </div>
  );
};
