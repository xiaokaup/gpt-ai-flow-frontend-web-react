import { useEffect, useState } from 'react';
import { message } from 'antd';

import { IStripeSubscriptionInfo } from '../gpt-ai-flow-common/interface-app/IStripe';
import { ISubscriptionDB } from '../gpt-ai-flow-common/interface-database/ISubscriptionDB';
import { EStripeSubscriptionStatus } from '../gpt-ai-flow-common/enum-app/EStripeSubscription';
import { ESubscriptionName } from '../gpt-ai-flow-common/enum-app/ESubscription';
import ISubscriptionMixFile, { ISubscirptionMix } from '../gpt-ai-flow-common/interface-app/3_unit/ISubscriptionMix';
import { STORE_USER_SUBSCRIPTION_INFO } from '../tools/4_base/TConstant';
import TBackendSubscriptionFile from '../tools/3_unit/TBackendSubscription';

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

  const userSubscriptionInfoFromStore = window.electron.store.get(STORE_USER_SUBSCRIPTION_INFO);

  const [userSubscriptionInfo, setUserSubscriptionInfo] = useState<ISubscirptionMix>(
    userSubscriptionInfoFromStore ?? ISubscriptionMixFile.ISubscriptionMix_default
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

    const userSubscriptionResults: ISubscirptionMix = await TBackendSubscriptionFile.getSubscriptionInfo(
      userId.toString(),
      accessToken,
      window.env
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.electron.store.set(STORE_USER_SUBSCRIPTION_INFO, userSubscriptionInfo);
  }, [userSubscriptionInfo]);

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
