import { CopyToClipboard } from 'react-copy-to-clipboard';

import { CopyOutlined } from '@ant-design/icons';

import Stripe from 'stripe';

import { EProductItemDB_name } from '../../../../gpt-ai-flow-common/enum-database/EProductItemDB';
import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { ELocale } from '../../../../gpt-ai-flow-common/enum-app/ELocale';
import TBackendStripeFile from '../../../../gpt-ai-flow-common/tools/3_unit/TBackendStripe';
import { Button, message, Tag } from 'antd';

interface ISettingsWindow_4_payment_subscriptionInfo {
  subscriptionName: EProductItemDB_name;
  t: IGetT_frontend_output;
  userId: number;
  userEmail: string;
  userAccessToken: string;
  locale: ELocale;
  subscriptionStauts: Stripe.Subscription.Status;
  isShowExpired: boolean;
  expiredAt: Date;
}
export const SettingsWindow_4_payment_subscriptionInfo = (props: ISettingsWindow_4_payment_subscriptionInfo) => {
  const {
    subscriptionName,
    t,
    userId,
    userEmail,
    userAccessToken,
    locale,
    subscriptionStauts: status,
    isShowExpired,
    expiredAt,
  } = props;
  const isExpired = expiredAt ? new Date(expiredAt) < new Date() : false;

  const createAndOpenStripeBillingSession = async () => {
    const billingSessionResults = await TBackendStripeFile.createStripeBillingPortal(
      userId,
      userAccessToken,
      locale,
      CONSTANTS_GPT_AI_FLOW_COMMON,
    );

    if (billingSessionResults?.status === 'error') {
      message.error(billingSessionResults.message);
    }

    window.open(billingSessionResults.url, '_blank', 'noreferrer');
  };

  return (
    <div className="oneSubscription">
      <div className="row">
        {t.get('Email')}: {userEmail}
        <CopyToClipboard
          text={userEmail}
          onCopy={() => {
            message.success({
              content: <span>{t.get('Copy successful')} !</span>,
              key: 'copy',
              duration: 3,
            });
          }}
        >
          <CopyOutlined style={{ fontSize: 16, marginLeft: '0.4rem' }} />
        </CopyToClipboard>
      </div>

      <div className="row">
        <Button
          type="primary"
          onClick={() => {
            createAndOpenStripeBillingSession();
          }}
        >
          {t.get('My Subscription')}
        </Button>
      </div>

      <div className="row">
        <span className="column">
          {t.get('Subscription Name')}: {subscriptionName}
        </span>

        {status && (
          <span className="column">
            <Tag>{t.get(status)}</Tag>
          </span>
        )}
      </div>

      {isShowExpired && (
        <div className="row">
          {t.get('Subscription Expiry Date')}:{' '}
          <span>
            <span className="column">{expiredAt && new Date(expiredAt)?.toISOString().split('T')[0]}</span>

            <span className="column">
              {isExpired ? <Tag color="#f50">{t.get('Expired')}</Tag> : <Tag color="#2db7f5">{t.get('Valid')}</Tag>}
            </span>
          </span>
        </div>
      )}
    </div>
  );
};
