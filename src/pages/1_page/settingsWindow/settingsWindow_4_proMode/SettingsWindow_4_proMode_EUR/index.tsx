import '../../../../../styles/global.css';
import '../../../../../styles/layout.scss';

// import paymentPageDemo from '../../../../../../assets/presentation/2023-11-08-img-2-Add-default-payment-method.png';

import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { Button, Tag, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import ITokenDBFile from '../../../../../gpt-ai-flow-common/interface-database/ITokenDB';
import { ECurrencySymbol } from '../../../../../gpt-ai-flow-common/tools/TStripeConstant';
import { IUserData } from '../../../../../gpt-ai-flow-common/interface-app/IUserData';
import { IUseSubscriptionDB_v2Data_output } from '../../../../../gpt-ai-flow-common/hooks/useSubscription_v2Data';
import TBackendStripeFile from '../../../../../gpt-ai-flow-common/tools/3_unit/TBackendStripe';
import TBackendSubscription_v2File from '../../../../../gpt-ai-flow-common/tools/3_unit/TBackendSubscription_v2';
import { ERegionDB_code } from '../../../../../gpt-ai-flow-common/enum-database/ERegionDB';

import { SettingsWindow_4_proMode_EUR_casse_hasStripeCustomerId_notSubscription } from './SettingsWindow_4_proMode_EUR_casse_hasStripeCustomerId_notSubscription';

interface SettingsWindow_4_proMode_EUR_input {
  userData: IUserData;
  useSubscription_v2DataOutput: IUseSubscriptionDB_v2Data_output;
}
export const SettingsWindow_4_proMode_EUR = (props: SettingsWindow_4_proMode_EUR_input) => {
  const { userData, useSubscription_v2DataOutput } = props;
  const {
    id: userId,
    email: userEmail,
    token: { accessToken: userAccessToken } = ITokenDBFile.ITokenDB_default,
  } = userData;

  if (!userId) {
    return <>请登录</>;
  }

  const {
    init: initStripeSubscriptionInfo,
    subscription_v2Data,
    setSubscription_v2Data,
    check: { hasAvailableSubscription_v2 },
    // hasDefaultPamentMethod,
  } = useSubscription_v2DataOutput;
  const [hasTrialForSubscription_v2, setHasTrialForSubscription_v2] = useState<boolean>(subscription_v2Data.hasTrial);
  const isExpired = new Date(subscription_v2Data?.expiredAt) < new Date();

  useEffect(() => {
    setHasTrialForSubscription_v2(subscription_v2Data.hasTrial);
  }, [
    subscription_v2Data.id,
    subscription_v2Data.userId,
    subscription_v2Data.productLimitId,
    subscription_v2Data.regionId,
    subscription_v2Data.hasTrial,
    subscription_v2Data.expiredAt,
  ]);

  const startATrialSubscriptionForEUR = async () => {
    if (!userId) {
      message.error('请登录');
      return;
    }

    const stripeCustomer = await TBackendStripeFile.createStripeCustomer(
      userId.toString(),
      userAccessToken,
      CONSTANTS_GPT_AI_FLOW_COMMON
    );
    const { id: stripeCustomerId } = stripeCustomer;
    const results = await TBackendSubscription_v2File.startATrialSubscription_v2ForEUR(
      userId.toString(),
      stripeCustomerId,
      userAccessToken,
      CONSTANTS_GPT_AI_FLOW_COMMON
    );

    message.success('免费试用已开启');

    setHasTrialForSubscription_v2(true);
    setSubscription_v2Data(results);
  };

  const createAndOpenStripeBillingSession = async () => {
    const billingSessionResults = await TBackendStripeFile.createStripeBillingPortal(
      userId.toString(),
      userAccessToken,
      CONSTANTS_GPT_AI_FLOW_COMMON
    );

    window.open(billingSessionResults.url, '_blank', 'noreferrer');
  };

  return (
    <div className="row">
      {!hasTrialForSubscription_v2 && (
        <div className="row hasNotStartTrial">
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
          <Button
            type="primary"
            onClick={() => {
              startATrialSubscriptionForEUR();
            }}
          >
            开始试用(已付费或单次成功付款成功后请刷新页面)
          </Button>
        </div>
      )}

      {hasTrialForSubscription_v2 && (
        <div className="row hasStartTrial">
          {subscription_v2Data.Region?.code === ERegionDB_code.ZH && (
            <div className="row">
              <p>请到国内地区查看您的订阅</p>
            </div>
          )}

          {subscription_v2Data.Region?.code === ERegionDB_code.EN && (
            <div className="row subscription_en">
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
                <Button
                  type="primary"
                  onClick={() => {
                    createAndOpenStripeBillingSession();
                  }}
                >
                  我的订阅
                </Button>
              </div>

              <div className="row">
                套餐名称: {subscription_v2Data?.Product_Limit?.Product?.name}
                <br />
                套餐时长: {subscription_v2Data.period}
                <br />
                套餐版本: {subscription_v2Data?.Product_Limit?.Product?.version}
                <br />
                套餐到期:{' '}
                <span>
                  <span className="column">
                    {subscription_v2Data.expiredAt &&
                      new Date(subscription_v2Data.expiredAt)?.toISOString().split('T')[0]}
                  </span>
                  <span className="column">
                    {subscription_v2Data?.expiredAt && isExpired ? (
                      <Tag color="#f50">已过期</Tag>
                    ) : (
                      <Tag color="#2db7f5">有效</Tag>
                    )}
                  </span>
                </span>
              </div>

              {/* 
              <div className="row">
                是否有默认支付方式:
                {hasDefaultPamentMethod ? '是' : '否'}
                {!hasDefaultPamentMethod && (
                  <div className="row">
                    <Alert
                      type="info"
                      message={
                        <span>
                          需要重新购买订阅，请先点击‘我的订阅’按钮，在支付管理页面中添加并设置为
                          <b style={{ color: '#3875f6' }}>默认</b>支付方式
                        </span>
                      }
                    />
                    <img src={paymentPageDemo} alt="" style={{ width: '100%', marginTop: '1rem' }} />
                  </div>
                )}
              </div> */}

              {userId && (
                <div className="row">
                  <SettingsWindow_4_proMode_EUR_casse_hasStripeCustomerId_notSubscription
                    createAndOpenStripeBillingSession={createAndOpenStripeBillingSession}
                    userId={userId.toString()}
                    userAccessToken={userAccessToken}
                    currencySymbol={ECurrencySymbol.EUR}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
