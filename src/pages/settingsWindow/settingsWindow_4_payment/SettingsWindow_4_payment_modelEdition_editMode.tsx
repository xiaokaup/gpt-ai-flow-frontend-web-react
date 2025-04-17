import Stripe from 'stripe';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { useState } from 'react';
import TBackendStripeFile from '../../../gpt-ai-flow-common/tools/3_unit/TBackendStripe';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { Button } from 'antd';

interface ISettingsWindow_4_payment_modelEdition_editMode_input {
  t: IGetT_frontend_output;
  userAccessToken: string;
  oneSubscription: Stripe.Subscription;
}
export const SettingsWindow_4_payment_modelEdition_editMode = (
  props: ISettingsWindow_4_payment_modelEdition_editMode_input,
) => {
  const { t, userAccessToken, oneSubscription } = props;

  console.log('oneSubscription', oneSubscription);

  const { id: subscriptionId } = oneSubscription;

  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  const putOneStripeSubscription = () => {
    TBackendStripeFile.putOneStripeSubscription_from_backend(
      {
        subscriptionId,
        oldStripeItems: oneSubscription.items.data.map((item: Stripe.SubscriptionItem) => item.id),
        newStripePrices: [],
      },
      userAccessToken,
      t.currentLocale,
      CONSTANTS_GPT_AI_FLOW_COMMON,
    );
  };

  return (
    <div className="row">
      <div>SettingsWindow_4_payment_modelEdition_editMode</div>
      <Button
        type="primary"
        onClick={() => {
          putOneStripeSubscription();
        }}
      >
        test
      </Button>
    </div>
  );
};
