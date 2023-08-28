import React, { useState } from 'react';
import { Button, Card, message } from 'antd';
import TStripeConstant from '../../../../gpt-ai-flow-common/tools/TStripeConstant';
import TBackendStripe from '../../../../tools/3_unit/TBackendStripe';
import { IStripeSubscriptionInfo } from '../../../../gpt-ai-flow-common/interface-app/IStripe';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';

interface SettingsWindow_4_proMode_casse_hasStripeCustomerId_notSubscription_input {
  userId: string;
  stripeCustomerId: string;
  accessToken: string;
  initStripeSubscriptionInfo: () => Promise<IStripeSubscriptionInfo>;
}
export const SettingsWindow_4_proMode_casse_hasStripeCustomerId_notSubscription = (
  props: SettingsWindow_4_proMode_casse_hasStripeCustomerId_notSubscription_input
) => {
  const { userId, stripeCustomerId, accessToken, initStripeSubscriptionInfo } = props;
  const stripePrices = TStripeConstant.getStripePrices(CONSTANTS_GPT_AI_FLOW_COMMON);

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

  return (
    <div className="row">
      <div className="row">
        <h3>月</h3>
        <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {stripePrices.month.map((onePrice) => {
            return (
              <Card
                key={onePrice.priceId}
                title={onePrice.name}
                // extra={<a href="#">More</a>}
                style={{
                  width: 300,
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
                {onePrice.features.map((oneFeature) => {
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
          {stripePrices.quarter.map((onePrice) => {
            return (
              <Card
                key={onePrice.priceId}
                title={onePrice.name}
                // extra={<a href="#">More</a>}
                style={{
                  width: 300,
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
                {onePrice.features.map((oneFeature) => {
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
          {stripePrices.year.map((onePrice) => {
            return (
              <Card
                key={onePrice.priceId}
                title={onePrice.name}
                // extra={<a href="#">More</a>}
                style={{
                  width: 300,
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
                {onePrice.features.map((oneFeature) => {
                  return <p key={`${onePrice.priceId}-${oneFeature}`}>{oneFeature}</p>;
                })}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
