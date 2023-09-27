import '../../../../../styles/global.css';
import '../../../../../styles/layout.scss';

import paymentPageDemo from '../../../../../../assets/presentation/2023-08-23-payment-page.png';

import React, { useEffect, useState } from 'react';

import { Alert, Button, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

import { SettingsWindow_4_proMode_EUR_casse_hasStripeCustomerId_notSubscription } from './SettingsWindow_4_proMode_EUR_casse_hasStripeCustomerId_notSubscription';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import TStripeConstantFile, { ECurrencySymbol } from '../../../../../gpt-ai-flow-common/tools/TStripeConstant';
import {
  ESubscriptionPaymentType,
  ESubscriptionPeriod,
} from '../../../../../gpt-ai-flow-common/enum-app/ESubscription';
import { IUseSubscriptionData_output } from '../../../../../gpt-ai-flow-common/hooks/useSubscriptionData';
import { IStripeSubscriptionInfo } from '../../../../../gpt-ai-flow-common/interface-app/IStripe';
import { IUserData } from '../../../../../gpt-ai-flow-common/interface-app/IUserData';
import ITokenDBFile from '../../../../../gpt-ai-flow-common/interface-database/ITokenDB';
import { ISubscriptionDB } from '../../../../../gpt-ai-flow-common/interface-database/ISubscriptionDB';
import CopyToClipboard from 'react-copy-to-clipboard';

interface SettingsWindow_4_proMode_EUR_input {
  userData: IUserData;
  useSubscriptionDataOutput: IUseSubscriptionData_output;
}
export const SettingsWindow_4_proMode_EUR = (props: SettingsWindow_4_proMode_EUR_input) => {
  const { userData, useSubscriptionDataOutput } = props;
  const {
    id: userId,
    email: userEmail,
    token: { accessToken: userAccessToken } = ITokenDBFile.ITokenDB_default,
    stripeCustomerId = '',
  } = userData;

  const {
    init: initStripeSubscriptionInfo,
    subscriptionData,
    check: { hasNoAvailableSubscription },
  } = useSubscriptionDataOutput;
  const isExpired = new Date((subscriptionData as ISubscriptionDB)?.expiredAt) < new Date();

  const [subscriptionName, setSubscriptionName] = useState<string>(subscriptionData.name);

  useEffect(() => {
    const stripePriceListAllPeriod = TStripeConstantFile.getStripePrices(
      CONSTANTS_GPT_AI_FLOW_COMMON.APP_ENV,
      ECurrencySymbol.EUR
    );

    const stripePriceListCurrentPeriod = stripePriceListAllPeriod[subscriptionData?.period ?? ESubscriptionPeriod.NONE];
    const userSubscriptionName =
      stripePriceListCurrentPeriod?.find(
        (item) => item.priceId === (subscriptionData as IStripeSubscriptionInfo)?.priceId
      )?.name ?? '';

    if (userSubscriptionName) {
      setSubscriptionName(userSubscriptionName);
    }
  }, [
    subscriptionData.name,
    subscriptionData,
    subscriptionData?.period,
    // @ts-ignore
    subscriptionData?.priceId,
  ]);

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
            <h3>开始试用(已付费或单次成功付款成功后请刷新页面)</h3>
          </Button>
        </div>
      )}

      {stripeCustomerId && !isExpired && subscriptionData.paymentType === ESubscriptionPaymentType.ONE_OFF_PAYMENT && (
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
              套餐名称: {subscriptionName}
              <br />
              套餐时长: {subscriptionData?.period}
              <br />
              套餐版本: {subscriptionData?.version}
              <br />
              套餐状态: {(subscriptionData as IStripeSubscriptionInfo)?.status}
              <br />
              套餐到期:{' '}
              {(subscriptionData as ISubscriptionDB)?.expiredAt &&
                new Date((subscriptionData as ISubscriptionDB)?.expiredAt)?.toISOString().split('T')[0]}
              {(subscriptionData as ISubscriptionDB)?.expiredAt && isExpired ? '(已失效)' : ''}
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
