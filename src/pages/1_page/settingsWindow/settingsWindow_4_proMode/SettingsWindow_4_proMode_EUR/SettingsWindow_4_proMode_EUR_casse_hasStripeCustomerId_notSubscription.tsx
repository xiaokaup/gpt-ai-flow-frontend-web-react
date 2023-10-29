import React, { useState } from 'react';
import { Alert, Button, Card, message } from 'antd';
import TStripeConstant, { ECurrencySymbol } from '../../../../../gpt-ai-flow-common/tools/TStripeConstant';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { IStripePrice } from '../../../../../gpt-ai-flow-common/interface-app/IStripe';
import TBackendStripe from '../../../../../gpt-ai-flow-common/tools/3_unit/TBackendStripe';
import { ISubscirptionMix } from '../../../../../gpt-ai-flow-common/interface-app/3_unit/ISubscriptionMix';

interface SettingsWindow_4_proMode_EUR_casse_hasStripeCustomerId_notSubscription_input {
  userId: string;
  stripeCustomerId: string;
  accessToken: string;
  initStripeSubscriptionInfo: () => Promise<ISubscirptionMix>;
  currencySymbol: ECurrencySymbol;
}
export const SettingsWindow_4_proMode_EUR_casse_hasStripeCustomerId_notSubscription = (
  props: SettingsWindow_4_proMode_EUR_casse_hasStripeCustomerId_notSubscription_input
) => {
  const { userId, stripeCustomerId, accessToken, initStripeSubscriptionInfo, currencySymbol } = props;

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

  return (
    <div className="row">
      <div className="row">
        <Alert message={<span>如果更换订阅类型过程中出现无法访问的情况，请尝试重新登录用户账号</span>} type="info" />
      </div>
      <div className="row">
        <div className="row">
          <h3>月</h3>
          <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {stripePrices.month
              .filter((item) => !item.name.includes('FreeAI'))
              .map((onePrice: IStripePrice) => {
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
            {stripePrices.quarter
              .filter((item) => !item.name.includes('FreeAI'))
              .map((onePrice: IStripePrice) => {
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
            {stripePrices.year
              .filter((item) => !item.name.includes('FreeAI'))
              .map((onePrice: IStripePrice) => {
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
