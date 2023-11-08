import React from 'react';

import { Alert, Button, Card } from 'antd';

import TStripeConstant, { ECurrencySymbol } from '../../../../../gpt-ai-flow-common/tools/TStripeConstant';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import TBackendStripeFile from '../../../../../gpt-ai-flow-common/tools/3_unit/TBackendStripe';

interface SettingsWindow_4_proMode_CNY_casse_hasStripeCustomerId_notSubscription_input {
  currencySymbol: ECurrencySymbol;
  userId: string;
  userAccessToken: string;
}
export const SettingsWindow_4_proMode_CNY_casse_hasStripeCustomerId_notSubscription = (
  props: SettingsWindow_4_proMode_CNY_casse_hasStripeCustomerId_notSubscription_input
) => {
  const { currencySymbol, userId, userAccessToken } = props;

  const stripePrices = TStripeConstant.getStripePrices(CONSTANTS_GPT_AI_FLOW_COMMON, currencySymbol);

  const createAndOpenStripeCheckoutSession = async (priceId: string) => {
    const checkoutSessionResults = await TBackendStripeFile.createStripeCheckoutSessionForCNY(
      userId,
      priceId,
      userAccessToken,
      CONSTANTS_GPT_AI_FLOW_COMMON
    );

    window.open(checkoutSessionResults.url, '_blank', 'noreferrer');
  };

  return (
    <div className="row">
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
                          createAndOpenStripeCheckoutSession(oneProduct.priceId);
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
                          createAndOpenStripeCheckoutSession(oneProduct.priceId);
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
                          createAndOpenStripeCheckoutSession(oneProduct.priceId);
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
      </div>
    </div>
  );
};
