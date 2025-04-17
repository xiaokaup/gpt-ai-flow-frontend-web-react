import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Stripe from 'stripe';
import { message } from 'antd';

import { IReduxRootState } from '../../../store/reducer';

import { ELocale } from '../../../gpt-ai-flow-common/enum-app/ELocale';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

import { EStripePrice_nickname } from '../../../gpt-ai-flow-common/enum-app/EStripe';
import TBackendStripeFile from '../../../gpt-ai-flow-common/tools/3_unit/TBackendStripe';

import { FreeVersionAnnounce } from './FreeVersionAnnounce';
import { IStripePriceItem } from '../../../gpt-ai-flow-common/interface-app/3_unit/IStripe_v2';
import { ModelSubscriptionAnnounce } from './ModelSubscriptionAnnounce';
import { SettingsWindow_4_payment_modelEdition } from './SettingsWindow_4_payment_modelEdition';
import { IUserDB, IUserDB_default } from '../../../gpt-ai-flow-common/interface-database/IUserDB';
import { ITokenDB_default } from '../../../gpt-ai-flow-common/interface-database/ITokenDB';
import { useUserDB } from '../../../gpt-ai-flow-common/hooks/useUserDB';
import { SettingsWindow_4_payment_freeEdition } from './SettingsWindow_4_payment_freeEdition';

interface ISettingsWindow_4_payment_login_input {
  t: IGetT_frontend_output;
  localeForSettingsWindow: ELocale;
  userDB: IUserDB;
  dispatch: any;
}
const SettingsWindow_4_payment_login = (props: ISettingsWindow_4_payment_login_input) => {
  const { t, localeForSettingsWindow, userDB } = props;

  const { id: userId, email: userEmail, Token: { accessToken: userAccessToken } = ITokenDB_default } = userDB;

  const [locale_for_currency, setLocale_for_currency] = useState<ELocale>(localeForSettingsWindow);

  const [activeSubscriptions, setActiveSubscriptions] = useState<Stripe.Subscription[]>([]);
  const [stripePrices_for_locales, setStripePrices_for_locales] =
    useState<Record<ELocale, Record<EStripePrice_nickname, IStripePriceItem[]>>>();

  const init = async (paraLocale: ELocale) => {
    const activeSubscriptionsFound: Stripe.Subscription[] | Error =
      await TBackendStripeFile.getTrialAndActiveSubscriptions_by_userId_from_backend_v3(
        userAccessToken,
        paraLocale,
        CONSTANTS_GPT_AI_FLOW_COMMON,
      );
    console.log('activeSubscriptions', activeSubscriptionsFound);
    if (activeSubscriptionsFound instanceof Error) {
      const error = activeSubscriptionsFound;
      message.error(error.message);
      return;
    }
    if (activeSubscriptionsFound) setActiveSubscriptions(activeSubscriptionsFound);

    const stripePrices_for_localesResults: Record<
      ELocale,
      Record<EStripePrice_nickname, IStripePriceItem[]>
    > = await TBackendStripeFile.getStripePrices_v3_by_backend(paraLocale, CONSTANTS_GPT_AI_FLOW_COMMON);
    setStripePrices_for_locales(stripePrices_for_localesResults);
  };

  useEffect(() => {
    init(locale_for_currency);
  }, []);

  if (!userId) {
    return <>{t.get('Please register a user and log in first')}</>;
  }

  if (!stripePrices_for_locales) return <>{t.get('loading')}...</>;

  // console.log('activeSubscriptions', activeSubscriptions);

  return (
    <div id="subscription" className="container" style={{ padding: '.4rem' }}>
      {/* 0 subscirption -> Free Edition */}
      {activeSubscriptions.length === 0 && (
        <>
          <SettingsWindow_4_payment_freeEdition
            t={t}
            userId={userId}
            userAccessToken={userAccessToken}
            locale_for_currency={locale_for_currency}
            setLocale_for_currency={setLocale_for_currency}
            stripePrices_for_locales={stripePrices_for_locales}
          />
          <hr style={{ marginTop: '1rem', marginBottom: '1rem' }} />
          <FreeVersionAnnounce locale={t.currentLocale} />
        </>
      )}

      {/* Model Edition */}
      {activeSubscriptions.map((oneSubscription: Stripe.Subscription) => {
        const itemPriceNicknames = oneSubscription.items.data.reduce((acc: string[], item: Stripe.SubscriptionItem) => {
          if (acc.includes(item.price.nickname)) return acc;
          return [...acc, item.price.nickname];
        }, []);

        const { status } = oneSubscription;
        const expiredAt = new Date(oneSubscription.current_period_end * 1000);
        // console.log('itemPriceNicknames', itemPriceNicknames);

        if (itemPriceNicknames.includes(EStripePrice_nickname.STARTAI_MODEL)) {
          return (
            <>
              <SettingsWindow_4_payment_modelEdition
                subscriptionName={EStripePrice_nickname.STARTAI_MODEL}
                t={t}
                userId={userId}
                userEmail={userEmail}
                userAccessToken={userAccessToken}
                locale={localeForSettingsWindow}
                subscriptionStauts={status}
                isShowExpired={true}
                expiredAt={expiredAt}
              />
              <hr style={{ marginTop: '1rem', marginBottom: '1rem' }} />
              <ModelSubscriptionAnnounce locale={t.currentLocale} />
            </>
          );
        }
      })}
    </div>
  );
};

interface ISettingsWindow_4_proMode {
  t: IGetT_frontend_output;
  localeForSettingsWindow: ELocale;
}
export const SettingsWindow_4_payment = (props: ISettingsWindow_4_proMode) => {
  const dispatch = useDispatch();

  const { t, localeForSettingsWindow } = props;

  const userDBFromStorage: IUserDB = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserDB_default;
  });

  const { userDB } = useUserDB({
    userDBFromStorage,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onUserDBChange: (_newUserB_without_token: IUserDB) => {},
    t,
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });
  const { id: userId, Token: { accessToken: userAccessToken } = ITokenDB_default } = userDB;

  if (!userId) {
    return (
      <div id="settingsWindowContainer-subscription-logout" className="container" style={{ padding: '.4rem' }}>
        {t.get('Please register a user and log in first')}
      </div>
    );
  }

  if (!userAccessToken) {
    return (
      <div>
        <div>{t.get('Please register a user and log in first')}</div>
        <Link to="/app/logout">{t.get('Logout')}</Link>
      </div>
    );
  }

  return (
    <SettingsWindow_4_payment_login
      t={t}
      localeForSettingsWindow={localeForSettingsWindow}
      userDB={userDB}
      dispatch={dispatch}
    />
  );
};
