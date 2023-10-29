import React from 'react';

import { Alert, Card } from 'antd';

import TStripeConstant, { ECurrencySymbol } from '../../../../../gpt-ai-flow-common/tools/TStripeConstant';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';

interface SettingsWindow_4_proMode_CNY_casse_hasStripeCustomerId_notSubscription_input {
  currencySymbol: ECurrencySymbol;
}
export const SettingsWindow_4_proMode_CNY_casse_hasStripeCustomerId_notSubscription = (
  props: SettingsWindow_4_proMode_CNY_casse_hasStripeCustomerId_notSubscription_input
) => {
  const { currencySymbol } = props;

  const stripePrices = TStripeConstant.getStripePrices(CONSTANTS_GPT_AI_FLOW_COMMON, currencySymbol);

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
                      <a
                        href={oneProduct.paymentUrl}
                        target="_blank"
                        style={{
                          display: 'inline',
                          padding: '.5rem',
                          borderRadius: '.4rem',
                          color: '#fff',
                          backgroundColor: '#3875f6',
                        }}
                      >
                        订阅
                      </a>,
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
                      <a
                        href={oneProduct.paymentUrl}
                        target="_blank"
                        style={{
                          display: 'inline',
                          padding: '.5rem',
                          borderRadius: '.4rem',
                          color: '#fff',
                          backgroundColor: '#3875f6',
                        }}
                      >
                        订阅
                      </a>,
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
          <h3>年</h3>
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
                      <a
                        href={oneProduct.paymentUrl}
                        target="_blank"
                        style={{
                          display: 'inline',
                          padding: '.5rem',
                          borderRadius: '.4rem',
                          color: '#fff',
                          backgroundColor: '#3875f6',
                        }}
                      >
                        订阅
                      </a>,
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
