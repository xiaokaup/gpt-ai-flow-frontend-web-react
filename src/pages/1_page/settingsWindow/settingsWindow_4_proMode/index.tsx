import '../../../../styles/global.css';
import '../../../../styles/layout.scss';

import paymentPageDemo from '../../../../../assets/presentation/2023-08-23-payment-page.png';

import React from 'react';
import _ from 'lodash';

import { Alert, Button } from 'antd';

import ITokenDB from '../../../../gpt-ai-flow-common/interface-database/ITokenDB';
import { useUserInfo } from '../../../../hooks/useUserInfo';
import { useUserStripeinfo } from '../../../../hooks/useUserStripeInfo';
import { SettingsWindow_4_proMode_casse_hasStripeCustomerId_notSubscription } from './SettingsWindow_4_proMode_casse_hasStripeCustomerId_notSubscription';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';

export const SettingsWindow_4_proMode = () => {
  const { userData } = useUserInfo();
  const {
    id: userId,
    email: userEmail,
    token: { accessToken: userAccessToken } = ITokenDB.ITokenDB_default,
    stripeCustomerId = '',
  } = userData;

  if (!userId) {
    return (
      <div id="settingsWindowContainer" className="container" style={{ padding: '.4rem' }}>
        请先注册用户并登录
      </div>
    );
  }

  const {
    init: initStripeSubscriptionInfo,
    stripeSubscriptionInfo,
    check: { hasAvailableSubscription, hasNoAvailableSubscription },
  } = useUserStripeinfo({
    userId,
    stripeCustomerId,
    accessToken: userAccessToken,
  });

  return (
    <div
      id="settingsWindowContainer"
      className="container"
      style={{
        marginTop: 12,
        marginLeft: 12,
        padding: '2rem',
        background: '#fff',
        border: '1px solid #E8E8E8',
        borderRadius: '.4rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.05)',
      }}
    >
      {!stripeCustomerId && (
        <div className="row">
          <div className="row">
            <div>(请确保填写的邮箱与账户邮箱一致)</div>
            <div>邮箱: {userEmail}</div>
          </div>
          <Button type="link" href="https://www.gptaiflow.com/business/prices">
            <h3>成为早期用户(已付费或单次成功付款成功后请刷新页面)</h3>
          </Button>
        </div>
      )}

      {stripeCustomerId && (
        <div className="row">
          <div className="row">邮箱: {userEmail}</div>
          <div className="row">
            <a
              href={CONSTANTS_GPT_AI_FLOW_COMMON.STRIPE.STRIPE_PRICE_TABLE_URL}
              target="_blank"
              style={{ background: '#1677ff', color: '#fff', padding: '.5rem', borderRadius: '.4rem' }}
            >
              我的订阅
            </a>
          </div>

          <div className="row">
            套餐名称: {stripeSubscriptionInfo?.name}
            <br />
            套餐状态: {stripeSubscriptionInfo?.status}
          </div>

          <div className="row">
            是否有默认支付方式:
            {stripeSubscriptionInfo?.hasDefaultPamentMethod ? '是' : '否'}
          </div>

          {hasNoAvailableSubscription && (
            <div className="row">
              {!stripeSubscriptionInfo?.hasDefaultPamentMethod && (
                <div className="row">
                  <Alert
                    message={
                      <span>
                        需要重新购买订阅，请先点击‘我的订阅’按钮，在支付管理页面中添加并设置为
                        <b style={{ color: '#3875f6' }}>默认</b>支付方式
                      </span>
                    }
                    type="info"
                  />
                  <img src={paymentPageDemo} alt="" style={{ width: '100%', marginTop: '1rem' }} />
                </div>
              )}

              {stripeSubscriptionInfo?.hasDefaultPamentMethod && userId && (
                <SettingsWindow_4_proMode_casse_hasStripeCustomerId_notSubscription
                  userId={userId.toString()}
                  stripeCustomerId={stripeCustomerId}
                  accessToken={userAccessToken}
                  initStripeSubscriptionInfo={initStripeSubscriptionInfo}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
