import { useEffect, useState } from 'react';
import { message } from 'antd';
import IStripe, { IStripeSubscriptionInfo } from '../gpt-ai-flow-common/interface-app/IStripe';
import { EStripeSubscriptionStatus } from '../gpt-ai-flow-common/enum-app/EStripeSubscription';
import TBackendStripe from '../tools/3_unit/TBackendStripe';
import IStripeFile from '../gpt-ai-flow-common/interface-app/IStripe';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../gpt-ai-flow-common/config/constantGptAiFlow';

interface useUserStripeinfo_input {
  userId: number;
  stripeCustomerId: string;
  accessToken: string;
}
interface useUserStripeinfo_output {
  init: () => Promise<IStripeSubscriptionInfo>;
  stripeSubscriptionInfo: IStripeSubscriptionInfo;
  setStripeSubscriptionInfo: (stripeSubscriptionInfo: IStripeSubscriptionInfo) => void;
}
export const useUserStripeinfo = (
  props: useUserStripeinfo_input
): useUserStripeinfo_output & {
  check: {
    hasAvailableSubscription: boolean;
    hasNoAvailableSubscription: Boolean;
  };
} => {
  const userStripeSubscritptionInfoFromStore: IStripeSubscriptionInfo = IStripeFile.IStripeSubscriptionInfo_default; // @DEVELOP
  console.log('useUserStripeinfo props', props);
  const { userId, stripeCustomerId, accessToken } = props;

  const [stripeSubscriptionInfo, setStripeSubscriptionInfo] = useState<IStripeSubscriptionInfo>(
    userStripeSubscritptionInfoFromStore ?? IStripe.IStripeSubscriptionInfo_default
  );

  const hasAvailableSubscription =
    stripeSubscriptionInfo &&
    (stripeSubscriptionInfo.status === EStripeSubscriptionStatus.TRIALING ||
      stripeSubscriptionInfo.status === EStripeSubscriptionStatus.ACTIVE);

  const hasNoAvailableSubscription =
    stripeSubscriptionInfo &&
    stripeSubscriptionInfo.status !== EStripeSubscriptionStatus.TRIALING &&
    stripeSubscriptionInfo.status !== EStripeSubscriptionStatus.ACTIVE;

  const init = async (): Promise<IStripeSubscriptionInfo> => {
    console.log('stripeCustomerId', stripeCustomerId);
    console.log('start init in useUserStripeinfo', stripeCustomerId);
    if (!stripeCustomerId) {
      return IStripeFile.IStripeSubscriptionInfo_default;
    }
    console.log('2 init in useUserStripeinfo');

    const stripeResult: IStripeSubscriptionInfo = await TBackendStripe.getSubscriptionNicknameAndStatus(
      userId.toString(),
      stripeCustomerId,
      accessToken,
      CONSTANTS_GPT_AI_FLOW_COMMON
    );

    console.log('stripeResult init', stripeResult);

    if (!stripeResult) {
      message.error('获取订阅信息失败，请联系管理员');
      return IStripeFile.IStripeSubscriptionInfo_default;
    }

    setStripeSubscriptionInfo(stripeResult);

    return stripeResult;
  };

  useEffect(() => {
    console.log('useEffect init in useUserStripeinfo');
    init();
  }, [stripeCustomerId]);

  useEffect(() => {
    // window.electron.store.set(STORE_USER_STRIPE_SUBSCRIPTION_INFO, stripeSubscriptionInfo);
  }, [stripeSubscriptionInfo]);

  return {
    init,
    stripeSubscriptionInfo,
    setStripeSubscriptionInfo,
    check: {
      hasAvailableSubscription,
      hasNoAvailableSubscription,
    },
  };
};
