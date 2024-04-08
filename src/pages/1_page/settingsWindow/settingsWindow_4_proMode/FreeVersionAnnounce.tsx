/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { ELocale } from '../../../../gpt-ai-flow-common/enum-app/ELocale';
import { ISubscriptionDB_v2 } from '../../../../gpt-ai-flow-common/interface-database/ISubscriptionDB_v2';
import TCheckFreeVersionFile from './TCheckFreeVersion';

interface IFreeVersionAnnounce {
  locale: ELocale;
  subscription_v2Data: ISubscriptionDB_v2;
}
export const FreeVersionAnnounce = (props: IFreeVersionAnnounce) => {
  const { locale, subscription_v2Data } = props;

  if (!TCheckFreeVersionFile.checkIsFreeVersion(subscription_v2Data)) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  if (locale === ELocale.ZH) {
    return (
      <div className="freeVersion freeVersion_zh row">
        亲爱的用户，
        <br />
        <br />
        我们很高兴地宣布，现在我们推出了本软件的<b>免费版本</b>
        ！这是我们对社区支持的回馈，也是我们不断追求卓越和创新的体现。
        <br />
        <br />
        <p>免费版本的特点: </p>
        <ul>
          <li>
            <b>完全免费使用</b>: 您可以免费享受我们软件的基础功能，无需支付任何费用。
          </li>
          <li>
            <b>质量保证</b>: 虽然是免费的，但我们仍然确保软件的高质量和稳定性。
          </li>
          <li>
            <b>持续更新</b>: 我们会定期更新免费版本，确保您拥有良好的使用体验。
          </li>
        </ul>
        <b>我们鼓励您充分利用这个免费版本，并且非常期待您的反馈。</b>
        您的意见和需求是我们改进和增强软件的宝贵资源。请随时通过邮箱联系{' '}
        <a href="mailto:hello@gptaiflow.com">hello@gptaiflow.com</a> 我们，也可以我们的反馈系统{' '}
        <span
          style={{ color: '#1677ff', cursor: 'pointer' }}
          onClick={() => {
            console.log('click settingsWindow-menu-7-2-github-issues');
            window.open('https://github.com/GPT-AI-Flow/gpt-ai-flow-doc-docusaurus/issues');
          }}
        >
          提交您的建议和需求
        </span>
        。
        <br />
        <br />
        再次感谢您对我们产品的支持。希望我们的软件能为您的日常工作和生活带来便利！
        <br />
        <br />
        敬请享用！
      </div>
    );
  }

  // ELocale.EN
  return (
    <div className="freeVersion freeVersion_en row">
      Dear users,
      <br />
      <br />
      We are pleased to announce that we are now releasing a <b>free version</b> of this software! This is our way of
      giving back to the support of our community and our continuous pursuit of excellence and innovation.
      <br />
      <br />
      <p>Features of the free version: </p>
      <ul>
        <li>
          <b>Completely free to use</b>: You can enjoy all the features of our software for free, without paying any
          fees.
        </li>
        <li>
          <b>Quality Assurance</b>: Although it is free, we still ensure the high quality and stability of the software.
        </li>
        <li>
          <b>Continuous Updates</b>: We regularly update the free version to ensure you have a great experience.
        </li>
      </ul>
      <b>We encourage you to take full advantage of this free version and very much look forward to your feedback.</b>
      Your comments and requests are an invaluable resource for us to improve and enhance our software. Please feel free
      to contact us at <a href="mailto:hello@gptaiflow.com">hello@gptaiflow.com</a> or{' '}
      <span
        style={{ color: '#1677ff', cursor: 'pointer' }}
        onClick={() => {
          console.log('click settingsWindow-menu-7-2-github-issues');
          window.open('https://github.com/GPT-AI-Flow/gpt-ai-flow-doc-docusaurus/issues');
        }}
      >
        submit your suggestions and requests
      </span>{' '}
      through our feedback system.
      <br />
      <br />
      Thank you again for your support of our products. We hope that our software will bring convenience to your daily
      work and life!
      <br />
      <br />
      Enjoy!
    </div>
  );
};
