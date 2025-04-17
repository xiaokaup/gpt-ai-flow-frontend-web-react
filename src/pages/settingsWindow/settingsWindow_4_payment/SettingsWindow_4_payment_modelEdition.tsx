import copyToClipboard from 'copy-to-clipboard';

import { Button, message, Tag } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

import Stripe from 'stripe';

import { ELocale } from '../../../gpt-ai-flow-common/enum-app/ELocale';
import { EStripePrice_nickname } from '../../../gpt-ai-flow-common/enum-app/EStripe';
import TBackendStripeFile from '../../../gpt-ai-flow-common/tools/3_unit/TBackendStripe';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { getT_with_i18next } from '../../../gpt-ai-flow-common/i18nProvider/localesFrontendFactory_v2';
import { useState } from 'react';
import { SettingsWindow_4_payment_modelEdition_editMode } from './SettingsWindow_4_payment_modelEdition_editMode';

interface ISettingsWindow_4_payment_modelEdition {
  subscriptionName: EStripePrice_nickname;
  oneSubscription: Stripe.Subscription;
  t: IGetT_frontend_output;
  userId: number;
  userEmail: string;
  userAccessToken: string;
  locale: ELocale;
}
export const SettingsWindow_4_payment_modelEdition = (props: ISettingsWindow_4_payment_modelEdition) => {
  const {
    subscriptionName,
    oneSubscription,

    t,
    userId,
    userEmail,
    userAccessToken,
    locale,
  } = props;
  const { status, current_period_end } = oneSubscription;
  const expiredAt = new Date(current_period_end * 1000);

  const t_with_i18next = getT_with_i18next(t.currentLocale);
  const isExpired = expiredAt ? new Date(expiredAt) < new Date() : false;

  const [isEdit, setIsEdit] = useState<boolean>(true);

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
      <div className="view_mode">
        <div className="row">
          {t.get('Email')}: {userEmail}
          <CopyOutlined
            style={{ fontSize: 16, marginLeft: '0.4rem' }}
            onClick={() => {
              copyToClipboard(userEmail);

              message.success({
                content: <span>{t.get('Copy successful')} !</span>,
                key: 'copy',
                duration: 3,
              });
            }}
          />
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
          <Button
            className="ml-4"
            onClick={() => {
              setIsEdit(!isEdit);
            }}
          >
            修改模块
          </Button>
        </div>

        <div className="row">
          <span className="column">
            {t.get('Subscription Name')}: {t_with_i18next.get(subscriptionName) ?? subscriptionName}
          </span>

          {status && (
            <span className="column">
              <Tag>{t.get(status)}</Tag>
            </span>
          )}
        </div>

        <div className="row">
          {t.get('Subscription Expiry Date')}:{' '}
          <span>
            <span className="column">{expiredAt && new Date(expiredAt)?.toISOString().split('T')[0]}</span>

            <span className="column">
              {isExpired ? <Tag color="#f50">{t.get('Expired')}</Tag> : <Tag color="#2db7f5">{t.get('Valid')}</Tag>}
            </span>
          </span>
        </div>
      </div>

      <div className="edit_mode mt-4">
        {isEdit && (
          <SettingsWindow_4_payment_modelEdition_editMode
            t={t}
            oneSubscription={oneSubscription}
            userAccessToken={userAccessToken}
          />
        )}
      </div>
    </div>
  );
};
