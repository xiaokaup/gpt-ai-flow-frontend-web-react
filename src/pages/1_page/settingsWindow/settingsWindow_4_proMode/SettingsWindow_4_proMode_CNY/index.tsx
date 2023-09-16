/* eslint-disable react/jsx-pascal-case */
import '../../../../../styles/global.css';
import '../../../../../styles/layout.scss';

import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';

import { Button, message } from 'antd';

import { ISubscriptionDB } from '../../../../../gpt-ai-flow-common/interface-database/ISubscriptionDB';
import { IUserData } from '../../../../../gpt-ai-flow-common/interface-app/IUserData';
import { IStripeSubscriptionInfo } from '../../../../../gpt-ai-flow-common/interface-app/IStripe';
import TStripeConstantFile, { ECurrencySymbol } from '../../../../../gpt-ai-flow-common/tools/TStripeConstant';
import {
  ESubscriptionPaymentType,
  ESubscriptionPeriod,
} from '../../../../../gpt-ai-flow-common/enum-app/ESubscription';
import { useUserSubscriptionInfo_output } from '../../../../../hooks/useUserSubscriptionInfo';

// @ts-ignore
import { SettingsWindow_4_proMode_CNY_casse_hasStripeCustomerId_notSubscription } from './SettingsWindow_4_proMode_CNY_casse_hasStripeCustomerId_notSubscription';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';

interface SettingsWindow_4_proMode_CNY_input {
  userData: IUserData;
  userSubscriptionInfoHookResult: useUserSubscriptionInfo_output;
}
export const SettingsWindow_4_proMode_CNY = (props: SettingsWindow_4_proMode_CNY_input) => {
  const { userData, userSubscriptionInfoHookResult } = props;
  const { id: userId, email: userEmail, stripeCustomerId = '' } = userData;

  const {
    userSubscriptionInfo,
    check: { hasNoAvailableSubscription },
  } = userSubscriptionInfoHookResult;
  const isExpired = new Date((userSubscriptionInfo as ISubscriptionDB)?.expiredAt) < new Date();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [subscriptionName, setSubscriptionName] = useState<string>(userSubscriptionInfo.name);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const stripePriceListAllPeriod = TStripeConstantFile.getStripePrices(
      CONSTANTS_GPT_AI_FLOW_COMMON.APP_ENV,
      ECurrencySymbol.CNY
    );

    const stripePriceListCurrentPeriod =
      stripePriceListAllPeriod[userSubscriptionInfo?.period ?? ESubscriptionPeriod.NONE];
    const userSubscriptionName =
      stripePriceListCurrentPeriod?.find(
        (item) => item.priceId === (userSubscriptionInfo as IStripeSubscriptionInfo)?.priceId
      )?.name ?? '';

    if (userSubscriptionName) {
      setSubscriptionName(userSubscriptionName);
    }
  }, [
    userSubscriptionInfo.name,
    userSubscriptionInfo,
    userSubscriptionInfo?.period,
    // @ts-ignore
    userSubscriptionInfo?.priceId,
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
          <Button type="link" href="https://www.gptaiflow.com/business/prices-zh">
            <h3>开始试用(已付费或单次成功付款成功后请刷新页面)</h3>
          </Button>
        </div>
      )}

      {stripeCustomerId &&
        !isExpired &&
        userSubscriptionInfo.paymentType === ESubscriptionPaymentType.RECURRING_PAYMENT && (
          <div className="row">
            <p>请到海外地区查看您的订阅</p>
          </div>
        )}

      {stripeCustomerId &&
        (userSubscriptionInfo.paymentType === ESubscriptionPaymentType.NONE ||
          userSubscriptionInfo.paymentType === ESubscriptionPaymentType.ONE_OFF_PAYMENT ||
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
              套餐名称: {subscriptionName}
              <br />
              套餐时长: {userSubscriptionInfo?.period}
              <br />
              套餐版本: {userSubscriptionInfo?.version}
              <br />
              套餐到期:{' '}
              {(userSubscriptionInfo as ISubscriptionDB)?.expiredAt &&
                new Date((userSubscriptionInfo as ISubscriptionDB)?.expiredAt)?.toISOString().split('T')[0]}
              {(userSubscriptionInfo as ISubscriptionDB)?.expiredAt && isExpired ? '(已失效)' : ''}
            </div>

            {hasNoAvailableSubscription && userId && (
              <div className="row">
                {/* <SettingsWindow_4_proMode_CNY_casse_hasStripeCustomerId_notSubscription
                  currencySymbol={ECurrencySymbol.CNY}
                /> */}
              </div>
            )}
          </div>
        )}
    </div>
  );
};
