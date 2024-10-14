import ISubscriptionDB_v2File, {
  to_deprecate_ISubscriptionDB_v2,
} from '../../../../gpt-ai-flow-common/interface-database/ISubscriptionDB_v2';

const to_deprecate_checkIsFreeVersion = (subscriptionData: to_deprecate_ISubscriptionDB_v2) => {
  if (
    ISubscriptionDB_v2File.ISubscriptionDB_v2_default_tool_version_for_free.userId === subscriptionData.userId &&
    ISubscriptionDB_v2File.ISubscriptionDB_v2_default_tool_version_for_free.productLimitId ===
      subscriptionData.productLimitId &&
    ISubscriptionDB_v2File.ISubscriptionDB_v2_default_tool_version_for_free.regionId === subscriptionData.regionId &&
    ISubscriptionDB_v2File.ISubscriptionDB_v2_default_tool_version_for_free.period === subscriptionData.period &&
    ISubscriptionDB_v2File.ISubscriptionDB_v2_default_tool_version_for_free.paymentType ===
      subscriptionData.paymentType &&
    ISubscriptionDB_v2File.ISubscriptionDB_v2_default_tool_version_for_free.hasTrial === subscriptionData.hasTrial
  ) {
    return true;
  }
  return false;
};

const TCheckFreeVersionFile = {
  to_deprecate_checkIsFreeVersion,
};

export default TCheckFreeVersionFile;
