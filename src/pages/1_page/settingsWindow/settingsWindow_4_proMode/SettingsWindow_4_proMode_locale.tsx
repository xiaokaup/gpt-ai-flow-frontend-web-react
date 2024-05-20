import '../../../../styles/global.css';
import '../../../../styles/layout.scss';

import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';

import { Alert, Button, Tag, message } from 'antd';

import ITokenDBFile from '../../../../gpt-ai-flow-common/interface-database/ITokenDB';
import { IUserData } from '../../../../gpt-ai-flow-common/interface-app/IUserData';
import { IProductItemDB_with_expiredAt_and_blance } from '../../../../gpt-ai-flow-common/interface-database/IProductItemDB';
import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

import { EProductItemDB_name } from '../../../../gpt-ai-flow-common/enum-database/EProductItemDB';
import TBackendStripeFile from '../../../../gpt-ai-flow-common/tools/3_unit/TBackendStripe';
import { LifetimeVersionAnnounce } from './LifetimeVersionAnnounce';
import { ELocale } from '../../../../gpt-ai-flow-common/enum-app/ELocale';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { EStripe_currency } from '../../../../gpt-ai-flow-common/enum-app/EStripe';
import { ToolsVersionAnnounce } from './ToolsVersionAnnounce';
import { SettingWIndow_4_proMode_recharge_form } from './SettingWIndow_4_proMode_recharge_form';

interface SettingsWindow_4_proMode_locale_input {
  t: IGetT_frontend_output;
  locale: ELocale;
  userData: IUserData;
  productItem: IProductItemDB_with_expiredAt_and_blance;
}
export const SettingsWindow_4_proMode_locale = (props: SettingsWindow_4_proMode_locale_input) => {
  const { t, locale, userData, productItem } = props;
  const {
    id: userId,
    email: userEmail,
    token: { accessToken: userAccessToken } = ITokenDBFile.ITokenDB_default,
  } = userData;

  if (!userId) {
    return <>{t.get('Please register a user and log in first')}</>;
  }

  const [isShow_blanceTransactionForm, setIsShow_blanceTransactionForm] = useState(false);

  const { name, expiredAt, balance, currency } = productItem;

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
    <div className="row pageContainer">
      <div className="row subscirption">
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

        {(balance === 0 || balance) && (
          <div className="row">
            {t.get('Balance')}:<span>&nbsp;{-balance / 100}</span>
            <span>{currency === EStripe_currency.USD && <>$</>}</span>
            <span>{currency === EStripe_currency.CNY && <>¥</>}</span>
          </div>
        )}

        <div className="row">
          <Button
            type="primary"
            onClick={() => {
              createAndOpenStripeBillingSession();
            }}
          >
            {t.get('My Subscription')}
          </Button>

          {name === EProductItemDB_name.STARTAI_MODEL && (
            <Button
              onClick={() => {
                setIsShow_blanceTransactionForm((prevState: boolean) => !prevState);
              }}
              style={{ marginLeft: 10 }}
            >
              {isShow_blanceTransactionForm && <>{t.get('Hide {text} form', { text: t.get('Recharge') })}</>}
              {!isShow_blanceTransactionForm && <>{t.get('Show {text} form', { text: t.get('Recharge') })}</>}
            </Button>
          )}
        </div>

        {isShow_blanceTransactionForm && (
          <SettingWIndow_4_proMode_recharge_form t={t} userAccessToken={userAccessToken} />
        )}

        <div className="row">
          {t.get('Subscription Name')}: {name ?? EProductItemDB_name.STARTAI_FREE}
        </div>

        {name && (
          <>
            <div className="row">
              {(name === EProductItemDB_name.STARTAI_TOOLS || name === EProductItemDB_name.STARTAI_MODEL) && (
                <>
                  {t.get('Subscription Expiry Date')}:{' '}
                  <span>
                    <span className="column">{expiredAt && new Date(expiredAt)?.toISOString().split('T')[0]}</span>

                    <span className="column">
                      {isExpired ? (
                        <Tag color="#f50">{t.get('Expired')}</Tag>
                      ) : (
                        <Tag color="#2db7f5">{t.get('Valid')}</Tag>
                      )}
                    </span>
                  </span>
                </>
              )}
            </div>

            {name === EProductItemDB_name.STARTAI_TOOLS && <ToolsVersionAnnounce locale={locale} />}
            {name === EProductItemDB_name.STARTAI_LIFETIME && <LifetimeVersionAnnounce locale={locale} />}
          </>
        )}
      </div>
    </div>
  );
};
