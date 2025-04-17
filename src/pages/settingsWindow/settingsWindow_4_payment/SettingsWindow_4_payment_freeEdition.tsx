import { message, Select, Alert } from 'antd';
import { useState } from 'react';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { ELocale } from '../../../gpt-ai-flow-common/enum-app/ELocale';
import { EStripePrice_nickname, EStripeCheckoutSessionPaymentMode } from '../../../gpt-ai-flow-common/enum-app/EStripe';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IStripePriceItem } from '../../../gpt-ai-flow-common/interface-app/3_unit/IStripe_v2';
import TBackendStripeFile from '../../../gpt-ai-flow-common/tools/3_unit/TBackendStripe';
import { pricingLocaleDict } from './pricingLocale';

interface ISettingsWindow_4_payment_freeEdition_input {
  t: IGetT_frontend_output;
  userId: number;
  userAccessToken: string;
  locale_for_currency: ELocale;
  setLocale_for_currency: (value: ELocale) => void;
  stripePrices_for_locales: Record<ELocale, Record<EStripePrice_nickname, IStripePriceItem[]>>;
}
export const SettingsWindow_4_payment_freeEdition = (props: ISettingsWindow_4_payment_freeEdition_input) => {
  const { t, userId, userAccessToken, locale_for_currency, setLocale_for_currency, stripePrices_for_locales } = props;

  const locale = t.currentLocale;
  const stripePrice: Record<EStripePrice_nickname, IStripePriceItem[]> = stripePrices_for_locales[locale_for_currency];

  const [tabSelected, setTabSelected] = useState<string>('Model');

  const createAndOpenStripeCheckoutSession_v3 = async (
    priceItems: IStripePriceItem[],
    paymentMode: EStripeCheckoutSessionPaymentMode,
    subscriptionData: {
      trial_period_days?: number;
    },
  ) => {
    const checkoutSessionResults = await TBackendStripeFile.createStripeCheckoutSession_v3(
      {
        userId,
        priceItems,
        paymentMode,
        subscriptionData,
      },
      userAccessToken,
      locale_for_currency,
      CONSTANTS_GPT_AI_FLOW_COMMON,
    );

    if (checkoutSessionResults instanceof Error) {
      const error = checkoutSessionResults;
      console.error('createAndOpenStripeCheckoutSession', error);
      message.error(error.message);
    }

    // console.log('checkoutSessionResults', checkoutSessionResults);

    window.open((checkoutSessionResults as { url: string }).url, '_blank', 'noreferrer');
  };

  return (
    <>
      <div className="row currency">
        {t.get('Currency')}:&nbsp;
        <Select
          value={locale_for_currency}
          onChange={(value) => {
            setLocale_for_currency(value);
          }}
          style={{ width: 100 }}
        >
          <Select.Option value={ELocale.EN}>{t.get('USD')}</Select.Option>
          <Select.Option value={ELocale.ZH}>{t.get('CNY')}</Select.Option>
        </Select>
      </div>
      <div className="row pricing">
        <div>
          <h2 className="text-3xl font-bold tracki text-center mt-12 sm:text-5xl ">{t.get('Pricing')}</h2>
          <p className="max-w-3xl mx-auto mt-4 text-xl text-center ">
            {t.get('Get started on our free plan and upgrade when you are ready.')}
          </p>
        </div>

        {/* <!--Switch--> */}
        <div className="tabs mt-12">
          <div className="flex justify-center items-center bg-gray-100 rounded-full p-1.5 max-w-lg mx-auto">
            <a
              href="javascript:void(0)"
              className={
                tabSelected === 'Model'
                  ? 'inline-block w-1/2 text-balance text-center transition-all duration-500 rounded-full text-gray-400 font-semibold py-3 px-3 lg:px-11 hover:text-white bg-emerald-500 rounded-full text-white tablink whitespace-nowrap'
                  : 'inline-block w-1/2 text-balance text-center transition-all duration-500 rounded-full text-gray-400 font-semibold py-3 px-3 lg:px-11 hover:text-emerald-500 tab-active:bg-emerald-500 tab-active:rounded-full tab-active:text-white tablink whitespace-nowrap'
              }
              onClick={() => setTabSelected('Model')}
            >
              {t.get('Model_version')}
            </a>

            <a
              href="javascript:void(0)"
              className={
                tabSelected === 'Tool'
                  ? 'hidden inline-block w-1/2 text-balance text-center transition-all duration-500 rounded-full text-gray-400 font-semibold py-3 px-3 lg:px-11 hover:text-white bg-emerald-500 rounded-full text-white tablink whitespace-nowrap'
                  : 'hidden inline-block w-1/2 text-balance text-center transition-all duration-500 rounded-full text-gray-400 font-semibold py-3 px-3 lg:px-11 hover:text-emerald-500 tab-active:bg-emerald-500 tab-active:rounded-full tab-active:text-white tablink whitespace-nowrap'
              }
              onClick={() => setTabSelected('Tool')}
            >
              {t.get('Tools_version')}
              {/* <span>({t.get('Requires your own OpenAI key')})</span> */}
            </a>

            <a
              href="javascript:void(0)"
              className={
                tabSelected === 'Module'
                  ? 'inline-block w-1/2 text-balance text-center transition-all duration-500 rounded-full text-gray-400 font-semibold py-3 px-3 lg:px-11 hover:text-white bg-emerald-500 rounded-full text-white tablink whitespace-nowrap'
                  : 'inline-block w-1/2 text-balance text-center transition-all duration-500 rounded-full text-gray-400 font-semibold py-3 px-3 lg:px-11 hover:text-emerald-500 tab-active:bg-emerald-500 tab-active:rounded-full tab-active:text-white tablink whitespace-nowrap'
              }
              onClick={() => setTabSelected('Module')}
            >
              {t.get('Module_version')}
              {/* <span>({t.get('Requires your own OpenAI key')})</span> */}
            </a>
          </div>
        </div>

        {/* <!--Pricing table--> */}
        <div className="pricing-table-container">
          {tabSelected === 'Model' && (
            <div className="pricing-table paricing-table-model !mt-12 container space-y-12 md:space-y-0 md:grid md:grid-cols-1 md:gap-x-8">
              {/* 享受工具版所有权益，使用多少付多少，官方大模型支持 */}
              <div className="relative p-8  border border-gray-200 rounded-2xl shadow-sm flex flex-col w-1/2 m-auto">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold ">{t.get('Model_version')}</h3>
                  <p className="absolute top-0 py-1.5 px-4 bg-emerald-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide  transform -translate-y-1/2">
                    {t.get('Most popular')}
                  </p>
                  <p className="mt-4 flex items-baseline ">
                    <span className="text-5xl font-extrabold tracking-tight">
                      {locale_for_currency === ELocale.EN ? '$0.95' : '￥6.95'}
                    </span>
                    <span className="ml-1 text-xl font-semibold">/{t.get('month')}</span>
                    &nbsp;
                    <span className="text-2xl"> + {t.get('Excess usage fees')}</span>
                  </p>
                  <p className="mt-6 ">
                    {t.get('You want to use official large model support and enjoy a flexible pay-as-you-go plan')}
                  </p>
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
                      <span className="ml-3 ">{pricingLocaleDict[locale]['人设系统']}</span>
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
                      <span className="ml-3 ">{pricingLocaleDict[locale]['官方提供大模型支持']}</span>
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
                      <span className="ml-3 ">{pricingLocaleDict[locale]['所有 AI 工作流模块无限使用次数']}</span>
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
                      <span className="ml-3 ">{pricingLocaleDict[locale]['使用多少支付多少']}</span>
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
                      <span className="ml-3 ">{pricingLocaleDict[locale]['定制化需求模块支持']}</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  className="bg-emerald-500 text-white  hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
                  onClick={() => {
                    createAndOpenStripeCheckoutSession_v3(
                      stripePrice[EStripePrice_nickname.STARTAI_MODEL],
                      EStripeCheckoutSessionPaymentMode.SUBSCRIPTION,
                      {
                        trial_period_days: 7,
                      },
                    );
                  }}
                >
                  {t.get('Start Trial')}
                </button>
              </div>
            </div>
          )}
          {tabSelected === 'Tool' && (
            <div className="pricing-table paricing-table-tool !mt-12 container space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8">
              <div className="relative p-8  border border-gray-200 rounded-2xl shadow-sm flex flex-col">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold ">{t.get('Tools_version')}</h3>
                  <p className="mt-4 flex items-baseline ">
                    <span className="text-5xl font-extrabold tracking-tight">
                      {locale_for_currency === ELocale.EN ? '$4.95' : '￥34.95'}
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
                      <span className="ml-3 ">{pricingLocaleDict[locale]['人设系统']}</span>
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
                      <span className="ml-3 ">{pricingLocaleDict[locale]['自备大模型密钥']}</span>
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
                      <span className="ml-3 ">{pricingLocaleDict[locale]['所有 AI 工作流模块无限使用次数']}</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
                  onClick={() => {
                    createAndOpenStripeCheckoutSession_v3(
                      stripePrice[EStripePrice_nickname.STARTAI_TOOLS],
                      EStripeCheckoutSessionPaymentMode.SUBSCRIPTION,
                      {
                        trial_period_days: 7,
                      },
                    );
                  }}
                >
                  {t.get('Start Trial')}
                </button>
              </div>
              <div className="relative p-8  border border-gray-200 rounded-2xl shadow-sm flex flex-col">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold ">{t.get('Lifetime_version')}</h3>
                  <p className="absolute top-0 py-1.5 px-4 bg-emerald-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide  transform -translate-y-1/2">
                    {t.get('Most popular')}
                  </p>
                  <p className="mt-4 flex items-baseline ">
                    <span className="text-5xl font-extrabold tracking-tight">
                      {locale_for_currency === ELocale.EN ? '$14.95' : '￥99.95'}
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
                      <span className="ml-3 ">{pricingLocaleDict[locale]['人设系统']}</span>
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
                      <span className="ml-3 ">{pricingLocaleDict[locale]['自备大模型密钥']}</span>
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
                      <span className="ml-3 ">{pricingLocaleDict[locale]['所有 AI 工作流模块无限使用次数']}</span>
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
                      <span className="ml-3 ">{pricingLocaleDict[locale]['一次购买，终身使用']}</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  className="bg-emerald-500 text-white  hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
                  onClick={() => {
                    createAndOpenStripeCheckoutSession_v3(
                      stripePrice[EStripePrice_nickname.STARTAI_LIFETIME_TOOLS],
                      EStripeCheckoutSessionPaymentMode.SUBSCRIPTION,
                      {
                        // trial_period_days: 0,
                      },
                    );
                  }}
                >
                  {t.get('Get started')}
                </button>
              </div>
            </div>
          )}
          {tabSelected === 'Module' && (
            <div className="pricing-table paricing-table-model !mt-12 container space-y-12 md:space-y-0 md:grid md:grid-cols-1 md:gap-x-8">
              {/* 模块: 关税精灵 */}
              <div className="relative p-8  border border-gray-200 rounded-2xl shadow-sm flex flex-col w-1/2 m-auto">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold ">{t.get('Duty Genie')}</h3>
                  <p className="absolute top-0 py-1.5 px-4 bg-emerald-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide  transform -translate-y-1/2">
                    {t.get('Most popular')}
                  </p>
                  <p className="mt-4 flex items-baseline ">
                    <span className="text-5xl font-extrabold tracking-tight">
                      {locale_for_currency === ELocale.EN ? '$9.95' : '￥69.95'}
                    </span>
                    <span className="ml-1 text-xl font-semibold">/{t.get('month')}</span>
                  </p>
                  <p className="mt-6 ">
                    {pricingLocaleDict[locale]['你希望获得专业的关税查询服务，并享受全面的通关资讯支持']}
                  </p>
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
                      <span className="ml-3 ">
                        <b>{pricingLocaleDict[locale]['关税精灵_功能_1_key']}</b>:{' '}
                        {pricingLocaleDict[locale]['关税精灵_功能_1_value']}
                      </span>
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
                      <span className="ml-3 ">
                        <b>{pricingLocaleDict[locale]['关税精灵_功能_2_key']}</b>:{' '}
                        {pricingLocaleDict[locale]['关税精灵_功能_2_value']}
                      </span>
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
                      <span className="ml-3 ">
                        <b>{pricingLocaleDict[locale]['关税精灵_功能_3_key']}</b>:{' '}
                        {pricingLocaleDict[locale]['关税精灵_功能_3_value']}
                      </span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  className="bg-emerald-500 text-white  hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
                  onClick={() => {
                    createAndOpenStripeCheckoutSession_v3(
                      stripePrice[EStripePrice_nickname.MODULE_DUTY_GENIE],
                      EStripeCheckoutSessionPaymentMode.SUBSCRIPTION,
                      {
                        trial_period_days: 0,
                      },
                    );
                  }}
                >
                  {t.get('Start Trial')}
                </button>
              </div>
            </div>
          )}
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
  );
};
