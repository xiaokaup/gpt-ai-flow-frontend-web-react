import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { IStripeSubscriptionInfo } from '../gpt-ai-flow-common/interface-app/IStripe';
import { EStripeSubscriptionStatus } from '../gpt-ai-flow-common/enum-app/EStripeSubscription';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../gpt-ai-flow-common/config/constantGptAiFlow';
import { IReduxRootState } from '../store/reducer';
import { ESubscriptionName } from '../gpt-ai-flow-common/enum-app/ESubscription';
import ISubscriptionMixFile, { ISubscirptionMix } from '../gpt-ai-flow-common/interface-app/3_unit/ISubscriptionMix';
import { ISubscriptionDB } from '../gpt-ai-flow-common/interface-database/ISubscriptionDB';
import { getSubscriptionInfoAction } from '../store/actions/subscriptionActions';

interface useUserSubscriptionInfo_input {
  userId: number;
  accessToken: string;
}
export interface useUserSubscriptionInfo_output {
  init: () => Promise<ISubscirptionMix>;
  userSubscriptionInfo: ISubscirptionMix;
  setUserSubscriptionInfo: (newItem: ISubscirptionMix) => void;
  check: {
    hasAvailableSubscription: boolean;
    hasNoAvailableSubscription: boolean;
  };
}
export const useUserSubscriptionInfo = (props: useUserSubscriptionInfo_input): useUserSubscriptionInfo_output => {
  const { userId, accessToken } = props;

  const dispatch = useDispatch();

  const userSubscriptionInfoFromStore: ISubscirptionMix = useSelector((state: IReduxRootState) => {
    return state.subscriptionInfo ?? ISubscriptionMixFile.ISubscriptionMix_default;
  });

  const [userSubscriptionInfo, setUserSubscriptionInfo] = useState<ISubscirptionMix>(
    userSubscriptionInfoFromStore ?? ISubscriptionMixFile.ISubscriptionMix_default
    // IStripeFile.IStripeSubscriptionInfo_default_payed_startAI_tool // 付费工具版
    // IStripeFile.IStripeSubscriptionInfo_default_payed_startAI_officialModal // 付费模型版
  );

  const hasAvailableSubscriptionForStripe =
    userSubscriptionInfo &&
    [ESubscriptionName.START_AI, ESubscriptionName.EXPERT_AI, ESubscriptionName.MASTER_AI].includes(
      userSubscriptionInfo.name
    ) &&
    (userSubscriptionInfo as IStripeSubscriptionInfo).status &&
    ((userSubscriptionInfo as IStripeSubscriptionInfo).status === EStripeSubscriptionStatus.TRIALING ||
      (userSubscriptionInfo as IStripeSubscriptionInfo).status === EStripeSubscriptionStatus.ACTIVE);
  const hasAvailableSubscriptionForSubscription =
    userSubscriptionInfo &&
    [ESubscriptionName.START_AI, ESubscriptionName.EXPERT_AI, ESubscriptionName.MASTER_AI].includes(
      userSubscriptionInfo.name as ESubscriptionName
    ) &&
    (userSubscriptionInfo as ISubscriptionDB).expiredAt &&
    new Date((userSubscriptionInfo as ISubscriptionDB).expiredAt) >= new Date();
  const hasAvailableSubscription = hasAvailableSubscriptionForStripe || hasAvailableSubscriptionForSubscription;

  const hasNoAvailableSubscriptionForStripe =
    userSubscriptionInfo &&
    (userSubscriptionInfo as IStripeSubscriptionInfo).status &&
    (userSubscriptionInfo as IStripeSubscriptionInfo).status !== EStripeSubscriptionStatus.TRIALING &&
    (userSubscriptionInfo as IStripeSubscriptionInfo).status !== EStripeSubscriptionStatus.ACTIVE;
  const hasNoAvailableSubscriptionForSubscription =
    userSubscriptionInfo &&
    (userSubscriptionInfo as ISubscriptionDB).expiredAt &&
    new Date((userSubscriptionInfo as ISubscriptionDB).expiredAt) < new Date();
  const hasNoAvailableSubscription = hasNoAvailableSubscriptionForStripe || hasNoAvailableSubscriptionForSubscription;

  const init = async (): Promise<ISubscirptionMix> => {
    if (!userId) {
      return ISubscriptionMixFile.ISubscriptionMix_default;
    }

    const userSubscriptionResults: ISubscirptionMix = await dispatch(
      getSubscriptionInfoAction(userId.toString(), accessToken, CONSTANTS_GPT_AI_FLOW_COMMON) as any
    );

    if (!userSubscriptionResults) {
      message.error('获取订阅信息(subscription)失败，请联系管理员');
      return ISubscriptionMixFile.ISubscriptionMix_default;
    }

    setUserSubscriptionInfo(userSubscriptionResults);

    return userSubscriptionResults;
  };

  useEffect(() => {
    init();
  }, []);

  return {
    init,
    userSubscriptionInfo,
    setUserSubscriptionInfo,
    check: {
      hasAvailableSubscription,
      hasNoAvailableSubscription,
    },
  };
};
