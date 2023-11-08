import '../../../../../styles/global.css';
import '../../../../../styles/layout.scss';

import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';

import { Button, Tag, message } from 'antd';

import { IUserData } from '../../../../../gpt-ai-flow-common/interface-app/IUserData';
import { ECurrencySymbol } from '../../../../../gpt-ai-flow-common/tools/TStripeConstant';
import ITokenDBFile from '../../../../../gpt-ai-flow-common/interface-database/ITokenDB';
import { IUseSubscriptionDB_v2Data_output } from '../../../../../gpt-ai-flow-common/hooks/useSubscription_v2Data';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import TBackendSubscription_v2File from '../../../../../gpt-ai-flow-common/tools/3_unit/TBackendSubscription_v2';
import { ERegionDB_code } from '../../../../../gpt-ai-flow-common/enum-database/ERegionDB';
import TBackendStripeFile from '../../../../../gpt-ai-flow-common/tools/3_unit/TBackendStripe';

import { SettingsWindow_4_proMode_CNY_casse_hasStripeCustomerId_notSubscription } from './SettingsWindow_4_proMode_CNY_casse_hasStripeCustomerId_notSubscription';

interface SettingsWindow_4_proMode_CNY_input {
  userData: IUserData;
  useSubscription_v2DataOutput: IUseSubscriptionDB_v2Data_output;
}
export const SettingsWindow_4_proMode_CNY = (props: SettingsWindow_4_proMode_CNY_input) => {
  const { userData, useSubscription_v2DataOutput } = props;
  const {
    id: userId,
    email: userEmail,
    token: { accessToken: userAccessToken } = ITokenDBFile.ITokenDB_default,
  } = userData;

  if (!userId) {
    return <>请登录</>;
  }

  const { subscription_v2Data, setSubscription_v2Data } = useSubscription_v2DataOutput;
  const { hasTrial, stripeCustomerId } = subscription_v2Data;
  const [hasTrialForSubscription_v2, setHasTrialForSubscription_v2] = useState<boolean>(hasTrial);
  const isExpired = new Date(subscription_v2Data.expiredAt) < new Date();

  useEffect(() => {
    setSubscription_v2Data(subscription_v2Data);
    setHasTrialForSubscription_v2(subscription_v2Data.hasTrial);
  }, [
    subscription_v2Data.id,
    subscription_v2Data.userId,
    subscription_v2Data.productLimitId,
    subscription_v2Data.period,
    subscription_v2Data.regionId,
    subscription_v2Data.hasTrial,
    subscription_v2Data.expiredAt,
    subscription_v2Data.stripeCustomerId,
  ]);

  const startATrialSubscriptionForCNY = async () => {
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
    const results = await TBackendSubscription_v2File.startATrialSubscription_v2ForCNY(
      userId.toString(),
      stripeCustomerId,
      userAccessToken,
      CONSTANTS_GPT_AI_FLOW_COMMON
    );

    message.success('免费试用已开启');
    setHasTrialForSubscription_v2(true);
    setSubscription_v2Data(results);
  };

  return (
    <div className="row pageContainer">
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
              startATrialSubscriptionForCNY();
            }}
          >
            开始试用(已付费或单次成功付款成功后请刷新页面)
          </Button>
        </div>
      )}

      {hasTrialForSubscription_v2 && (
        <div className="row hasStartTrial">
          {stripeCustomerId && subscription_v2Data.Region?.code === ERegionDB_code.EN && (
            <div className="row">
              <p>请到海外地区查看您的订阅</p>
            </div>
          )}

          {subscription_v2Data.Region?.code === ERegionDB_code.ZH && (
            <div className="row subscirption_zh">
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
                    {subscription_v2Data.expiredAt && isExpired ? (
                      <Tag color="#f50">已过期</Tag>
                    ) : (
                      <Tag color="#2db7f5">有效</Tag>
                    )}
                  </span>
                </span>
              </div>

              <div className="row">
                <SettingsWindow_4_proMode_CNY_casse_hasStripeCustomerId_notSubscription
                  currencySymbol={ECurrencySymbol.CNY}
                  userId={userId.toString()}
                  userAccessToken={userAccessToken}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
