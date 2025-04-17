import './SelectableCardList.css';

import { Dispatch, SetStateAction, useState } from 'react';
import { Typography, Row, Col, Card, Button } from 'antd';
import Stripe from 'stripe';

import { EStripe_currency, EStripePrice_nickname } from '../../../../gpt-ai-flow-common/enum-app/EStripe';
import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { pricingLocaleDict } from '../pricingLocale';
import { ELocale } from '../../../../gpt-ai-flow-common/enum-app/ELocale';
import TStripeConstantFile_v3File from '../../../../gpt-ai-flow-common/tools/TStripeConstant_v3';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import TBackendStripeFile from '../../../../gpt-ai-flow-common/tools/3_unit/TBackendStripe';

const { Text } = Typography;

interface ICardContent_modelEdition_input {
  locale: ELocale;
}
const CardContent_modelEdition = (props: ICardContent_modelEdition_input) => {
  const { locale } = props;

  return (
    <ul role="list" className="mt-6 space-y-6 p-0">
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
  );
};

const CardContent_dutyEdition = (props: ICardContent_modelEdition_input) => {
  const { locale } = props;

  return (
    <ul role="list" className="mt-6 space-y-6 p-0">
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
  );
};

interface ISelectableCardList_input {
  t: IGetT_frontend_output;
  userAccessToken: string;
  oneSubscription: Stripe.Subscription;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}
export const SelectableCardList = (props: ISelectableCardList_input) => {
  const { t, userAccessToken, oneSubscription, setIsEdit } = props;
  const locale = t.currentLocale;

  const { id: subscriptionId, currency: subscriptionCurrency } = oneSubscription;

  const priceSign_of_totalPrices = subscriptionCurrency === EStripe_currency.CNY ? '¥' : '$';

  const stripePrices_locale = subscriptionCurrency === EStripe_currency.CNY ? ELocale.ZH : ELocale.EN;
  const stripePrices_with_locale = TStripeConstantFile_v3File.getStripePrices(CONSTANTS_GPT_AI_FLOW_COMMON.IS_PROD)[
    stripePrices_locale
  ];

  // 卡片数据
  const cardData: Record<
    EStripe_currency,
    { id: string; title: string; priceSign: string; price: string; prices: { price: string }[] }[]
  > = {
    [EStripe_currency.USD]: [
      {
        id: EStripePrice_nickname.STARTAI_MODEL,
        title: t.get('Model_version'),
        priceSign: '$',
        price: '0.95',
        prices: stripePrices_with_locale[EStripePrice_nickname.STARTAI_MODEL],
      },
      {
        id: EStripePrice_nickname.MODULE_DUTY_GENIE,
        title: t.get(EStripePrice_nickname.MODULE_DUTY_GENIE),
        priceSign: '$',
        price: '9.95',
        prices: stripePrices_with_locale[EStripePrice_nickname.MODULE_DUTY_GENIE],
      },
    ],
    [EStripe_currency.CNY]: [
      {
        id: EStripePrice_nickname.STARTAI_MODEL,
        title: t.get('Model_version'),
        priceSign: '¥',
        price: '6.95',
        prices: stripePrices_with_locale[EStripePrice_nickname.STARTAI_MODEL],
      },
      {
        id: EStripePrice_nickname.MODULE_DUTY_GENIE,
        title: t.get(EStripePrice_nickname.MODULE_DUTY_GENIE),
        priceSign: '¥',
        price: '69.95',
        prices: stripePrices_with_locale[EStripePrice_nickname.MODULE_DUTY_GENIE],
      },
    ],
  };

  // 存储选中的卡片信息
  const [selectedModuleItems, setSelectedModuleItems] = useState(
    cardData[subscriptionCurrency].filter((item) => item.id === EStripePrice_nickname.STARTAI_MODEL),
  );

  // 处理卡片点击事件
  const handleCardClick = (item) => {
    // 检查该卡片是否已被选中
    const isSelected = selectedModuleItems.some((selected) => selected.id === item.id);

    if (isSelected) {
      // 如果已选中，则移除
      setSelectedModuleItems(selectedModuleItems.filter((selected) => selected.id !== item.id));
    } else {
      // 如果未选中，则添加
      setSelectedModuleItems([...selectedModuleItems, item]);
    }
  };

  // 检查卡片是否被选中
  const isCardSelected = (id) => {
    return selectedModuleItems.some((item) => item.id === id);
  };

  // 计算总价
  const totalPrice = selectedModuleItems.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);

  const putOneStripeSubscription = () => {
    const newStripePrices = selectedModuleItems
      .reduce((allPrices, item) => {
        return [...allPrices, ...item.prices];
      }, [])
      .map((item) => item.price);

    TBackendStripeFile.putOneStripeSubscription_from_backend(
      {
        subscriptionId,
        oldStripeItems: oneSubscription.items.data.map((item: Stripe.SubscriptionItem) => item.id),
        newStripePrices,
      },
      userAccessToken,
      t.currentLocale,
      CONSTANTS_GPT_AI_FLOW_COMMON,
    );
  };

  return (
    <div className="card-list-container">
      <Row gutter={16}>
        {cardData[subscriptionCurrency].map((card) => {
          const { id, priceSign, price } = card;

          return (
            <Col span={8} key={card.id}>
              <Card
                title={card.title}
                variant="borderless"
                className={`selectable-card ${isCardSelected(card.id) ? 'selected' : ''}`}
                onClick={() => handleCardClick(card)}
              >
                <div className="card-content">
                  {id === EStripePrice_nickname.STARTAI_MODEL && <CardContent_modelEdition locale={locale} />}
                  {id === EStripePrice_nickname.MODULE_DUTY_GENIE && <CardContent_dutyEdition locale={locale} />}

                  <p className="card-price">
                    {priceSign}
                    {price}
                  </p>
                  {isCardSelected(card.id) && <div className="selected-indicator">✓</div>}
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

      <div className="selected-summary">
        <h3>
          {t.get('Selected modules')}: {selectedModuleItems.length}
        </h3>
        <ul>
          {selectedModuleItems.map((item) => {
            const cardInfo = cardData[subscriptionCurrency].find((card) => card.id === item.id);
            return (
              <li key={item.id}>
                {cardInfo.title}: {item.priceSign}
                {item.price}
              </li>
            );
          })}
        </ul>
        <Text strong>
          {t.get('Total Price')}: {priceSign_of_totalPrices}
          {totalPrice}
        </Text>
        <div className="row">
          <Button
            type="primary"
            className="mt-4"
            onClick={() => {
              putOneStripeSubscription();
            }}
          >
            {t.get('Submit')}
          </Button>

          <Button
            className="ml-4"
            onClick={() => {
              setIsEdit(false);
            }}
          >
            {t.get('Cancel')}
          </Button>
        </div>
      </div>
    </div>
  );
};
