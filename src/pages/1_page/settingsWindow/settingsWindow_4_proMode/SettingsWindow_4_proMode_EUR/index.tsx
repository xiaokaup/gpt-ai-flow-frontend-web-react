import '../../../../../styles/global.css';
import '../../../../../styles/layout.scss';

import paymentPageDemo from '../../../../../../assets/presentation/2023-08-23-payment-page.png';

import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { Alert, Button, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import ITokenDBFile from '../../../../../gpt-ai-flow-common/interface-database/ITokenDB';
import { ECurrencySymbol } from '../../../../../gpt-ai-flow-common/tools/TStripeConstant';
import { ESubscriptionPaymentType } from '../../../../../gpt-ai-flow-common/enum-app/ESubscription';
import { IStripeSubscriptionInfo } from '../../../../../gpt-ai-flow-common/interface-app/IStripe';
import { IUserData } from '../../../../../gpt-ai-flow-common/interface-app/IUserData';
import { IUseSubscriptionMixData_output } from '../../../../../gpt-ai-flow-common/hooks/useSubscriptionMixData';
import { ISubscriptionDB } from '../../../../../gpt-ai-flow-common/interface-database/ISubscriptionDB';

import { SettingsWindow_4_proMode_EUR_casse_hasStripeCustomerId_notSubscription } from './SettingsWindow_4_proMode_EUR_casse_hasStripeCustomerId_notSubscription';

interface SettingsWindow_4_proMode_EUR_input {
  userData: IUserData;
  useSubscriptionDataOutput: IUseSubscriptionMixData_output;
}
export const SettingsWindow_4_proMode_EUR = (props: SettingsWindow_4_proMode_EUR_input) => {
  const { userData, useSubscriptionDataOutput } = props;
  const {
    id: userId,
    email: userEmail,
    subscription,
    token: { accessToken: userAccessToken } = ITokenDBFile.ITokenDB_default,
    stripeCustomerId = '',
  } = userData;
  const hasAnyoneSubscriptionRecord = !!(subscription as ISubscriptionDB)?.id;

  const {
    init: initStripeSubscriptionInfo,
    subscriptionMixData: subscriptionData,
    check: { hasNoAvailableSubscription },
  } = useSubscriptionDataOutput;
  const isExpired = new Date(subscriptionData?.expiredAt) < new Date();

  return (
    <div className="row">
      {!stripeCustomerId && (
        <div className="row">
          <div className="row">
            <div>(请确保填写的邮箱与账户邮箱一致)</div>
            <div>
              邮箱: {userEmail}
              <CopyToClipboard
                text={userEmail}
                onCopy={() => {
                  message.success({
                    content: <span>复制成功 !</span>,
                    key: 'copy',
                    duration: 3,
                  });
                }}
              >
                <CopyOutlined style={{ fontSize: 16, marginLeft: '0.4rem' }} />
              </CopyToClipboard>
            </div>
          </div>
          <Button type="link" target="_blank" href="https://www.gptaiflow.com/business/prices">
            <h3>
              开始试用(已付费或单次成功付款成功后请 <b>重新登录</b>)
            </h3>
          </Button>
        </div>
      )}

      {hasAnyoneSubscriptionRecord &&
        !isExpired &&
        subscriptionData.paymentType === ESubscriptionPaymentType.ONE_OFF_PAYMENT && (
          <div className="row">
            <p>请到国内地区查看您的订阅</p>
          </div>
        )}

      {stripeCustomerId &&
        (subscriptionData.paymentType === ESubscriptionPaymentType.NONE ||
          subscriptionData.paymentType === ESubscriptionPaymentType.RECURRING_PAYMENT ||
          isExpired) && (
          <div className="row">
            <div className="row">
              邮箱: {userEmail}
              <CopyToClipboard
                text={userEmail}
                onCopy={() => {
                  message.success({
                    content: <span>复制成功 !</span>,
                    key: 'copy',
                    duration: 3,
                  });
                }}
              >
                <CopyOutlined style={{ fontSize: 16, marginLeft: '0.4rem' }} />
              </CopyToClipboard>
            </div>
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
              套餐名称: {subscriptionData?.name}
              <br />
              套餐时长: {subscriptionData?.period}
              <br />
              套餐版本: {subscriptionData?.version}
              <br />
              套餐状态: {(subscriptionData as IStripeSubscriptionInfo)?.status}
              <br />
              套餐到期:{' '}
              {subscriptionData?.expiredAt && new Date(subscriptionData?.expiredAt)?.toISOString().split('T')[0]}
              {subscriptionData?.expiredAt && isExpired ? '(已失效)' : ''}
            </div>
            <div className="row">
              是否有默认支付方式:
              {(subscriptionData as IStripeSubscriptionInfo)?.hasDefaultPamentMethod ? '是' : '否'}
            </div>

            {hasNoAvailableSubscription && (
              <div className="row">
                {!(subscriptionData as IStripeSubscriptionInfo)?.hasDefaultPamentMethod && (
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

                {(subscriptionData as IStripeSubscriptionInfo)?.hasDefaultPamentMethod && userId && (
                  <SettingsWindow_4_proMode_EUR_casse_hasStripeCustomerId_notSubscription
                    userId={userId.toString()}
                    stripeCustomerId={stripeCustomerId}
                    accessToken={userAccessToken}
                    initStripeSubscriptionInfo={initStripeSubscriptionInfo}
                    currencySymbol={ECurrencySymbol.EUR}
                  />
                )}
              </div>
            )}
          </div>
        )}
    </div>
  );
};
