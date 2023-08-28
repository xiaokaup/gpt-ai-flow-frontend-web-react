import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import IStripe, { IStripeSubscriptionInfo } from '../gpt-ai-flow-common/interface-app/IStripe';
import { EStripeSubscriptionStatus } from '../gpt-ai-flow-common/enum-app/EStripeSubscription';
import IStripeFile from '../gpt-ai-flow-common/interface-app/IStripe';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../gpt-ai-flow-common/config/constantGptAiFlow';
import { getSubscriptionNicknameAndStatusAction } from '../store/actions/stripeActions';
import { IReduxRootState } from '../store/reducer';

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
  const { userId, stripeCustomerId, accessToken } = props;

  const dispatch = useDispatch();

  const userStripeSubscritptionInfoFromStore: IStripeSubscriptionInfo = useSelector((state: IReduxRootState) => {
    return state.stripe ?? IStripeFile.IStripeSubscriptionInfo_default;
  });

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
    if (!stripeCustomerId) {
      return IStripeFile.IStripeSubscriptionInfo_default;
    }

    const stripeResult: IStripeSubscriptionInfo = await dispatch(
      getSubscriptionNicknameAndStatusAction(
        userId.toString(),
        stripeCustomerId,
        accessToken,
        CONSTANTS_GPT_AI_FLOW_COMMON
      ) as any
    );

    if (!stripeResult) {
      message.error('获取订阅信息失败，请联系管理员');
      return IStripeFile.IStripeSubscriptionInfo_default;
    }

    setStripeSubscriptionInfo(stripeResult);

    return stripeResult;
  };

  useEffect(() => {
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
