import { ELocale } from '../../../../gpt-ai-flow-common/enum-app/ELocale';

interface ILifetimeVersionAnnounce {
  locale: ELocale;
}
export const LifetimeToolsEditionAnnounce = (props: ILifetimeVersionAnnounce) => {
  const { locale } = props;

  if (locale === ELocale.ZH) {
    return (
      <div className="lifetimeVersion lifetimeVersion_zh row" style={{ marginTop: '2rem' }}>
        亲爱的用户，
        <br />
        <br />
        感谢您选择<b>终身版</b>，成为我们产品的长期伙伴和支持者！这表明您不仅投资于软件，更是对我们创新旅程的信任。
        <br />
        <br />
        <p>终身版的特点: </p>
        <ul>
          <li>
            <b>一次购买，终身享受</b>：我们承诺提供持续的功能更新和完善，保证软件随时间进化。
          </li>
          <li>
            <b>持续的功能更新</b>：您将免费获得所有未来的功能增强和升级。
          </li>
          <li>
            <b>专属客户支持</b>：享受个性化的支持和服务，确保您的需求得到优先响应。
          </li>
        </ul>
        <br />
        <b>我们鼓励您将任何需求告诉我们，我们愿意提供必要的支持。</b>
        您是我们的天使投资人，您的意见和需求对我们至关重要。请随时通过邮箱联系{' '}
        <a href="mailto:hello@gptaiflow.com" style={{ color: '#1677ff', cursor: 'pointer' }}>
          hello@gptaiflow.com
        </a>{' '}
        或在我们的反馈系统{' '}
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
        再次感谢您对我们未来发展的贡献和支持！我们希望这个软件能成为您可信赖的伙伴。
        <br />
        <br />
        敬请享受我们的服务！
      </div>
    );
  }

  // ELocale.EN
  return (
    <div className="lifetimeVersion lifetimeVersion_en row" style={{ marginTop: '2rem' }}>
      {/* Dear users,
      <br />
      <br />
      Thank you for choosing the <b>Lifetime version</b> and becoming a long-term partner and supporter of our product! This shows your investment not only in our software but in our journey of innovation.
      <br />
      <br />
      <p>Features of the Lifetime version: </p>
      <ul>
        <li>
          <b>One-time purchase, lifetime enjoyment</b>: We commit to continuous functionality updates and improvements, ensuring the software evolves over time.
        </li>
        <li>
          <b>Continuous feature updates</b>: You will receive all future enhancements and upgrades at no additional cost.
        </li>
        <li>
          <b>Exclusive customer support</b>: Enjoy personalized support and service, ensuring your needs are prioritized.
        </li>
      </ul> */}
      <b>We encourage you to share any needs with us, and we are willing to provide the necessary support.</b>
      You are our angel investor, and your opinions and needs are crucial to us. Please feel free to contact us at{' '}
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
      Thank you again for your contribution and support towards our future development! We hope this software becomes a
      trusted partner in your endeavors.
      <br />
      <br />
      Enjoy our services!
    </div>
  );
};
