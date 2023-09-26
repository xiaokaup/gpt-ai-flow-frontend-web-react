import '../../../../../styles/global.css';
import '../../../../../styles/layout.scss';

import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';

import { Button, message } from 'antd';

import { IUserData } from '../../../../../gpt-ai-flow-common/interface-app/IUserData';
import { ECurrencySymbol } from '../../../../../gpt-ai-flow-common/tools/TStripeConstant';
import { ESubscriptionPaymentType } from '../../../../../gpt-ai-flow-common/enum-app/ESubscription';
import ITokenDBFile from '../../../../../gpt-ai-flow-common/interface-database/ITokenDB';
import { useUserSubscriptionInfo_output } from '../../../../../hooks/useUserSubscriptionInfo';
import { ISubscirptionMix } from '../../../../../gpt-ai-flow-common/interface-app/3_unit/ISubscriptionMix';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { startATrialSubscriptionForCNY } from '../../../../../tools/3_unit/TBackendSubscription';

import { SettingsWindow_4_proMode_CNY_casse_hasStripeCustomerId_notSubscription } from './SettingsWindow_4_proMode_CNY_casse_hasStripeCustomerId_notSubscription';

interface SettingsWindow_4_proMode_CNY_input {
  userData: IUserData;
  userSubscriptionInfoHookResult: useUserSubscriptionInfo_output;
}
export const SettingsWindow_4_proMode_CNY = (props: SettingsWindow_4_proMode_CNY_input) => {
  const { userData, userSubscriptionInfoHookResult } = props;
  const {
    id: userId,
    email: userEmail,
    Subscription,
    token: { accessToken: userAccessToken } = ITokenDBFile.ITokenDB_default,
  } = userData;

  const {
    userSubscriptionInfo: userSubscriptionInfoFromInput,
    // check: { hasNoAvailableSubscription },
  } = userSubscriptionInfoHookResult;
  const [hasAnyoneSubscriptionRecord, setHasAnyoneSubscriptionRecord] = useState<boolean>(!!Subscription?.id);
  const [userSubscriptionInfo, setUserSubscriptionInfo] = useState<ISubscirptionMix>(userSubscriptionInfoFromInput);
  const [isExpired, setIsExpired] = useState<boolean>(new Date(userSubscriptionInfo.expiredAt) < new Date());

  const startATrialSubscription = async () => {
    if (!userId) {
      message.error('请登录');
      return;
    }
    const results = await startATrialSubscriptionForCNY(
      userId?.toString(),
      userAccessToken,
      CONSTANTS_GPT_AI_FLOW_COMMON
    );
    message.success('免费试用已开启');
    setHasAnyoneSubscriptionRecord(true);
    setUserSubscriptionInfo(results);
    const newIsExpired = new Date(results.expiredAt) < new Date();
    setIsExpired(newIsExpired);
  };

  return (
    <div className="row">
      {!hasAnyoneSubscriptionRecord && (
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
          <Button
            type="primary"
            onClick={() => {
              startATrialSubscription();
            }}
          >
            开始试用(已付费或单次成功付款成功后请刷新页面)
          </Button>
        </div>
      )}

      {hasAnyoneSubscriptionRecord &&
        !isExpired &&
        userSubscriptionInfo.paymentType === ESubscriptionPaymentType.RECURRING_PAYMENT && (
          <div className="row">
            <p>请到海外地区查看您的订阅</p>
          </div>
        )}

      {hasAnyoneSubscriptionRecord &&
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
              套餐名称: {userSubscriptionInfo?.name}
              <br />
              套餐时长: {userSubscriptionInfo?.period}
              <br />
              套餐版本: {userSubscriptionInfo?.version}
              <br />
              套餐到期:{' '}
              {userSubscriptionInfo.expiredAt && new Date(userSubscriptionInfo.expiredAt)?.toISOString().split('T')[0]}
              {userSubscriptionInfo.expiredAt && isExpired ? '(已失效)' : ''}
            </div>

            {/* {hasNoAvailableSubscription && ( */}
            <div className="row">
              <SettingsWindow_4_proMode_CNY_casse_hasStripeCustomerId_notSubscription
                currencySymbol={ECurrencySymbol.CNY}
              />
            </div>
            {/* )} */}
          </div>
        )}
    </div>
  );
};
