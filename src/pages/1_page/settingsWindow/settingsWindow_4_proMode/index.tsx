import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IReduxRootState } from 'store/reducer';

import { ELocale } from '../../../../gpt-ai-flow-common/enum-app/ELocale';

import IUserDataFile, { IUserData } from '../../../../gpt-ai-flow-common/interface-app/IUserData';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { useUserData } from '../../../../gpt-ai-flow-common/hooks/useUserData';
import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { EProductItemDB_name } from '../../../../gpt-ai-flow-common/enum-database/EProductItemDB';
import { IProductItemDB_with_expiredAt } from '../../../../gpt-ai-flow-common/interface-database/IProductItemDB';
import { getProductItem_by_userId_from_backend } from '../../../../gpt-ai-flow-common/tools/3_unit/TBackendProductItem';
import TStripeConstantFile_v2File from '../../../../gpt-ai-flow-common/tools/TStripeConstant_v2';
import { EStripeCheckoutSessionPaymentMode } from '../../../../gpt-ai-flow-common/enum-app/EStripe';
import { IError } from '../../../../gpt-ai-flow-common/interface-app/3_unit/IError';
import TBackendStripeFile from '../../../../gpt-ai-flow-common/tools/3_unit/TBackendStripe';

import { FreeVersionAnnounce } from './FreeVersionAnnounce';
import { SettingsWindow_4_proMode_locale } from './SettingsWindow_4_proMode_locale';
import { Alert, message } from 'antd';

interface ISettingsWindow_4_proMode_login_input {
  t: IGetT_frontend_output;
  localeForSettingsWindow: ELocale;
  userData: IUserData;
  dispatch: any;
}
const SettingsWindow_4_proMode_login = (props: ISettingsWindow_4_proMode_login_input) => {
  const { t, localeForSettingsWindow: locale, userData, dispatch } = props;

  const {
    id: userId,
    token: { accessToken: userAccessToken },
  } = userData;

  const [productItem, setProductItem] = useState<IProductItemDB_with_expiredAt | null>(null);
  const [stripePrices, setStripePrices] = useState<Record<EProductItemDB_name, string>>();

  const init = async (paraLocale: ELocale) => {
    const itemFound: IProductItemDB_with_expiredAt | null = await getProductItem_by_userId_from_backend(
      userAccessToken,
      paraLocale,
      CONSTANTS_GPT_AI_FLOW_COMMON,
    );
    if (itemFound) setProductItem(itemFound);

    const pricesFound = await TStripeConstantFile_v2File.getStripePrices(
      CONSTANTS_GPT_AI_FLOW_COMMON.APP_ENV === 'Prod',
    );
    setStripePrices(pricesFound[paraLocale]);
  };

  useEffect(() => {
    init(locale);
  }, []);

  if (!userId) {
    return <>{t.get('Please register a user and log in first')}</>;
  }

  const createAndOpenStripeCheckoutSession = async (
    priceId: string,
    paymentMode: EStripeCheckoutSessionPaymentMode,
  ) => {
    try {
      const checkoutSessionResults = await TBackendStripeFile.createStripeCheckoutSession(
        userId,
        priceId,
        paymentMode,
        userAccessToken,
        locale,
        CONSTANTS_GPT_AI_FLOW_COMMON,
      );

      if ((checkoutSessionResults as IError)?.status === 'error') {
        throw new Error((checkoutSessionResults as IError)?.message);
      }

      // console.log('checkoutSessionResults', checkoutSessionResults);

      window.open((checkoutSessionResults as { url: string }).url, '_blank', 'noreferrer');
    } catch (error: any) {
      console.error('createAndOpenStripeCheckoutSession', error);
      message.error(error.message);
    }
  };

  return (
    <div id="settingsWindowContainer" className="container" style={{ padding: '.4rem' }}>
      {(!productItem || productItem?.name === EProductItemDB_name.STARTAI_FREE) && (
        <FreeVersionAnnounce locale={t.currentLocale} />
      )}

      <hr style={{ marginTop: '1rem', marginBottom: '1rem' }} />

      {stripePrices && (
        <SettingsWindow_4_proMode_locale t={t} locale={locale} userData={userData} productItem={productItem} />
      )}

      {(!productItem || productItem?.name === EProductItemDB_name.STARTAI_FREE) && stripePrices && (
        <>
          <div className="row pricing">
            <div>
              <h2 className="text-3xl font-bold tracki text-center mt-12 sm:text-5xl ">{t.get('Pricing')}</h2>
              <p className="max-w-3xl mx-auto mt-4 text-xl text-center ">
                {t.get('Get started on our free plan and upgrade when you are ready.')}
              </p>
            </div>
            <div className="mt-24 container space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8">
              <div className="relative p-8  border border-gray-200 rounded-2xl shadow-sm flex flex-col">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold ">{t.get('Tools')}</h3>
                  <p className="mt-4 flex items-baseline ">
                    <span className="text-5xl font-extrabold tracking-tight">
                      {locale === ELocale.EN ? '$4.95' : '￥34.95'}
                    </span>
                    <span className="ml-1 text-xl font-semibold">/{t.get('year')}</span>
                  </p>
                  <p className="mt-6 ">{t.get('You want to learn and have a personal assistant')}</p>
                  <ul role="list" className="mt-6 space-y-6">
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="flex-shrink-0 w-6 h-6 text-emerald-500"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="ml-3 ">{t.get('Advanced AI dialogue capabilities')}</span>
                    </li>
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="flex-shrink-0 w-6 h-6 text-emerald-500"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="ml-3 ">{t.get('Unlimited usage')}</span>
                    </li>
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="flex-shrink-0 w-6 h-6 text-emerald-500"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="ml-3 ">{t.get('Comprehensive support for professional modes')}</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
                  onClick={() => {
                    createAndOpenStripeCheckoutSession(
                      stripePrices[EProductItemDB_name.STARTAI_TOOLS],
                      EStripeCheckoutSessionPaymentMode.SUBSCRIPTION,
                    );
                  }}
                >
                  {t.get('Get started')}
                </button>
              </div>
              <div className="relative p-8  border border-gray-200 rounded-2xl shadow-sm flex flex-col">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold ">{t.get('Lifetime')}</h3>
                  <p className="absolute top-0 py-1.5 px-4 bg-emerald-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide  transform -translate-y-1/2">
                    Most popular
                  </p>
                  <p className="mt-4 flex items-baseline ">
                    <span className="text-5xl font-extrabold tracking-tight">
                      {locale === ELocale.EN ? '$14.95' : '￥99.95'}
                    </span>
                    <span className="ml-1 text-xl font-semibold">/{t.get('lifetime')}</span>
                  </p>
                  <p className="mt-6 ">{t.get('You want a comprehensive solution and ongoing updates')}</p>
                  <ul role="list" className="mt-6 space-y-6">
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="flex-shrink-0 w-6 h-6 text-emerald-500"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="ml-3 ">{t.get('One-time purchase, lifetime enjoyment')}</span>
                    </li>
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="flex-shrink-0 w-6 h-6 text-emerald-500"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="ml-3 ">{t.get('Continuous feature updates')}</span>
                    </li>
                    <li className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="flex-shrink-0 w-6 h-6 text-emerald-500"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="ml-3 ">{t.get('Exclusive customer support')}</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  className="bg-emerald-500 text-white  hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
                  onClick={() => {
                    createAndOpenStripeCheckoutSession(
                      stripePrices[EProductItemDB_name.STARTAI_LIFETIME],
                      EStripeCheckoutSessionPaymentMode.PAYMENT,
                    );
                  }}
                >
                  {t.get('Get started')}
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <Alert
              type="warning"
              message={
                <span>
                  {t.get(
                    'If you are unable to access your subscription while changing subscription types, try logging into your user account again',
                  )}
                </span>
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

const SettingsWindow_4_proMode_logout = (props: { t: IGetT_frontend_output }) => {
  const { t } = props;
  return (
    <div id="settingsWindowContainer" className="container" style={{ padding: '.4rem' }}>
      {t.get('Please register a user and log in first')}
    </div>
  );
};

interface ISettingsWindow_4_proMode {
  t: IGetT_frontend_output;
  localeForSettingsWindow: ELocale;
}
export const SettingsWindow_4_proMode = (props: ISettingsWindow_4_proMode) => {
  const dispatch = useDispatch();

  const { t, localeForSettingsWindow } = props;

  const userDataFromStorage: IUserData = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserDataFile.IUserData_default;
  });

  const { userData } = useUserData({
    userDataFromStorage,
    onUserDataChange: (newUserData_without_token: IUserData) => {},
    locale: t.currentLocale,
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });
  const { id: userId } = userData;

  return (
    <>
      {userId && (
        <SettingsWindow_4_proMode_login
          t={t}
          localeForSettingsWindow={localeForSettingsWindow}
          userData={userData}
          dispatch={dispatch}
        />
      )}
      {!userId && <SettingsWindow_4_proMode_logout t={t} />}
    </>
  );
};
