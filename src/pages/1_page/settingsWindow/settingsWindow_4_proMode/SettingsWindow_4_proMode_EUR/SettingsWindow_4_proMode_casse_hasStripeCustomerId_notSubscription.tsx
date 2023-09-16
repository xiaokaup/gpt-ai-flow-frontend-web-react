import React, { useState } from 'react';
import { Button, Card, Select, message } from 'antd';
import TStripeConstant, { ECurrencySymbol } from '../../../../../gpt-ai-flow-common/tools/TStripeConstant';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { IStripePrice } from '../../../../../gpt-ai-flow-common/interface-app/IStripe';
import TBackendStripe from '../../../../../tools/3_unit/TBackendStripe';
import { ISubscirptionMix } from '../../../../../gpt-ai-flow-common/interface-app/3_unit/ISubscriptionMix';

interface SettingsWindow_4_proMode_casse_hasStripeCustomerId_notSubscription_input {
  userId: string;
  stripeCustomerId: string;
  accessToken: string;
  initStripeSubscriptionInfo: () => Promise<ISubscirptionMix>;
  currencySymbol: ECurrencySymbol;
  setCurrencySymbol: (newCurrencySymbol: ECurrencySymbol) => void;
}
export const SettingsWindow_4_proMode_casse_hasStripeCustomerId_notSubscription = (
  props: SettingsWindow_4_proMode_casse_hasStripeCustomerId_notSubscription_input
) => {
  const { userId, stripeCustomerId, accessToken, initStripeSubscriptionInfo, currencySymbol, setCurrencySymbol } =
    props;

  const stripePrices = TStripeConstant.getStripePrices(CONSTANTS_GPT_AI_FLOW_COMMON, currencySymbol);

  const [hasClickedCreateSubscription, setHasClickedCreateSubscription] = useState(false);

  const handleCreateSubscription = (selectedPriceId: string) => async () => {
    if (!stripeCustomerId) {
      return;
    }

    if (!selectedPriceId) {
      message.error('请选择套餐');
      return;
    }

    setHasClickedCreateSubscription(true);
    const newSubscription = await TBackendStripe.createSubscirptionByStripeCustomerId(
      userId,
      stripeCustomerId,
      selectedPriceId,
      accessToken,
      CONSTANTS_GPT_AI_FLOW_COMMON
    );

    message.success('订阅成功');
    initStripeSubscriptionInfo();

    setTimeout(() => {
      setHasClickedCreateSubscription(false);
    }, 1000);
  };

  const handleCurrencyChange = (value: ECurrencySymbol) => {
    console.log(`selected ${value}`);
    setCurrencySymbol(value);
  };

  return (
    <div className="row">
      <div className="row">
        <Select
          value={currencySymbol}
          style={{ width: 120 }}
          onChange={handleCurrencyChange}
          options={[
            { value: ECurrencySymbol.EUR, label: '欧元' },
            { value: ECurrencySymbol.CNY, label: '人民币' },
          ]}
        />
      </div>
      <div className="row">
        <div className="row">
          <h3>月</h3>
          <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {stripePrices.month.map((onePrice: IStripePrice) => {
              return (
                <Card
                  key={onePrice.priceId}
                  title={onePrice.name}
                  // extra={<a href="#">More</a>}
                  style={{
                    width: 350,
                    marginLeft: '.8rem',
                    marginBottom: '.8rem',
                  }}
                  bodyStyle={{}}
                  actions={[
                    <Button
                      disabled={hasClickedCreateSubscription}
                      type="primary"
                      onClick={handleCreateSubscription(onePrice.priceId)}
                    >
                      订阅
                    </Button>,
                  ]}
                >
                  {onePrice.features.map((oneFeature: string) => {
                    return <p key={`${onePrice.priceId}-${oneFeature}`}>{oneFeature}</p>;
                  })}
                </Card>
              );
            })}
          </div>
        </div>
        <div className="row">
          <h3>季度</h3>
          <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {stripePrices.quarter.map((onePrice: IStripePrice) => {
              return (
                <Card
                  key={onePrice.priceId}
                  title={onePrice.name}
                  // extra={<a href="#">More</a>}
                  style={{
                    width: 350,
                    marginLeft: '.8rem',
                    marginBottom: '.8rem',
                  }}
                  actions={[
                    <Button
                      disabled={hasClickedCreateSubscription}
                      type="primary"
                      onClick={handleCreateSubscription(onePrice.priceId)}
                    >
                      订阅
                    </Button>,
                  ]}
                >
                  {onePrice.features.map((oneFeature: string) => {
                    return <p key={`${onePrice.priceId}-${oneFeature}`}>{oneFeature}</p>;
                  })}
                </Card>
              );
            })}
          </div>
        </div>
        <div className="row">
          <h3>年</h3>
          <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {stripePrices.year.map((onePrice: IStripePrice) => {
              return (
                <Card
                  key={onePrice.priceId}
                  title={onePrice.name}
                  // extra={<a href="#">More</a>}
                  style={{
                    width: 350,
                    marginLeft: '.8rem',
                    marginBottom: '.8rem',
                  }}
                  actions={[
                    <Button
                      disabled={hasClickedCreateSubscription}
                      type="primary"
                      onClick={handleCreateSubscription(onePrice.priceId)}
                    >
                      订阅
                    </Button>,
                  ]}
                >
                  {onePrice.features.map((oneFeature: string) => {
                    return <p key={`${onePrice.priceId}-${oneFeature}`}>{oneFeature}</p>;
                  })}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
