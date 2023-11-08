import React, { useEffect, useState } from 'react';
import { Alert, Button, Card } from 'antd';
import TStripeConstant, { ECurrencySymbol } from '../../../../../gpt-ai-flow-common/tools/TStripeConstant';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import TBackendStripeFile from '../../../../../gpt-ai-flow-common/tools/3_unit/TBackendStripe';

interface SettingsWindow_4_proMode_EUR_casse_hasStripeCustomerId_notSubscription_input {
  createAndOpenStripeBillingSession: () => void;
  userId: string;
  userAccessToken: string;
  currencySymbol: ECurrencySymbol;
}
export const SettingsWindow_4_proMode_EUR_casse_hasStripeCustomerId_notSubscription = (
  props: SettingsWindow_4_proMode_EUR_casse_hasStripeCustomerId_notSubscription_input
) => {
  const { createAndOpenStripeBillingSession, userId, userAccessToken, currencySymbol } = props;

  const [hasSubscriptions, setHasSubscriptions] = useState<boolean>(false);

  const init = async () => {
    const subscriptionResults = await TBackendStripeFile.getListStripeSubscriptionsByStripeCustomerId(
      userId,
      userAccessToken,
      CONSTANTS_GPT_AI_FLOW_COMMON
    );

    if (subscriptionResults.data.length > 0) {
      setHasSubscriptions(true);
      return;
    }
    setHasSubscriptions(false);
  };

  useEffect(() => {
    init();
  }, []);

  const stripePrices = TStripeConstant.getStripePrices(CONSTANTS_GPT_AI_FLOW_COMMON, currencySymbol);

  const createAndOpenStripeCheckoutSession = async (priceId: string) => {
    const checkoutSessionResults = await TBackendStripeFile.createStripeCheckoutSessionForEUR(
      userId,
      priceId,
      userAccessToken,
      CONSTANTS_GPT_AI_FLOW_COMMON
    );

    window.open(checkoutSessionResults.url, '_blank', 'noreferrer');
  };

  return (
    <div className="row">
      <div className="row">是否已有订阅: {hasSubscriptions ? '是' : '否'}</div>
      <div className="row">
        <Alert type="info" message={<span>如果更换订阅类型过程中出现无法访问的情况，请尝试重新登录用户账号</span>} />
      </div>
      <div className="row">
        <div className="row">
          <h3>月度</h3>
          <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {stripePrices.month
              .filter((item) => !item.name.includes('FreeAI'))
              .map((oneProduct) => {
                return (
                  <Card
                    key={oneProduct.priceId}
                    title={oneProduct.name}
                    // extra={<a href="#">More</a>}
                    style={{
                      width: 350,
                      marginLeft: '.8rem',
                      marginBottom: '.8rem',
                    }}
                    bodyStyle={{}}
                    actions={[
                      <Button
                        type="primary"
                        onClick={() => {
                          if (!hasSubscriptions) {
                            createAndOpenStripeCheckoutSession(oneProduct.priceId);
                            return;
                          }
                          createAndOpenStripeBillingSession();
                        }}
                      >
                        订阅
                      </Button>,
                    ]}
                  >
                    {oneProduct.features.map((oneFeature) => {
                      return <p key={`${oneProduct.priceId}-${oneFeature}`}>{oneFeature}</p>;
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
              .map((oneProduct) => {
                return (
                  <Card
                    key={oneProduct.priceId}
                    title={oneProduct.name}
                    // extra={<a href="#">More</a>}
                    style={{
                      width: 350,
                      marginLeft: '.8rem',
                      marginBottom: '.8rem',
                    }}
                    actions={[
                      <Button
                        type="primary"
                        onClick={() => {
                          if (!hasSubscriptions) {
                            createAndOpenStripeCheckoutSession(oneProduct.priceId);
                            return;
                          }
                          createAndOpenStripeBillingSession();
                        }}
                      >
                        订阅
                      </Button>,
                    ]}
                  >
                    {oneProduct.features.map((oneFeature) => {
                      return <p key={`${oneProduct.priceId}-${oneFeature}`}>{oneFeature}</p>;
                    })}
                  </Card>
                );
              })}
          </div>
        </div>
        <div className="row">
          <h3>年度</h3>
          <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {stripePrices.year
              .filter((item) => !item.name.includes('FreeAI'))
              .map((oneProduct) => {
                return (
                  <Card
                    key={oneProduct.priceId}
                    title={oneProduct.name}
                    // extra={<a href="#">More</a>}
                    style={{
                      width: 350,
                      marginLeft: '.8rem',
                      marginBottom: '.8rem',
                    }}
                    actions={[
                      <Button
                        type="primary"
                        onClick={() => {
                          if (!hasSubscriptions) {
                            createAndOpenStripeCheckoutSession(oneProduct.priceId);
                            return;
                          }
                          createAndOpenStripeBillingSession();
                        }}
                      >
                        订阅
                      </Button>,
                    ]}
                  >
                    {oneProduct.features.map((oneFeature: string) => {
                      return <p key={`${oneProduct.priceId}-${oneFeature}`}>{oneFeature}</p>;
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
