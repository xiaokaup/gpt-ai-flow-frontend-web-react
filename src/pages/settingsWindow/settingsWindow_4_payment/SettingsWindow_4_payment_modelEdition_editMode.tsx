import Stripe from 'stripe';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { SelectableCardList } from './components/SelectableCardList';
import { Dispatch, SetStateAction } from 'react';

interface ISettingsWindow_4_payment_modelEdition_editMode_input {
  t: IGetT_frontend_output;
  userAccessToken: string;
  oneSubscription: Stripe.Subscription;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}
export const SettingsWindow_4_payment_modelEdition_editMode = (
  props: ISettingsWindow_4_payment_modelEdition_editMode_input,
) => {
  const { t, userAccessToken, oneSubscription, setIsEdit } = props;

  console.log('oneSubscription', oneSubscription);

  return (
    <div className="row">
      <SelectableCardList
        t={t}
        userAccessToken={userAccessToken}
        setIsEdit={setIsEdit}
        oneSubscription={oneSubscription}
      />
    </div>
  );
};
