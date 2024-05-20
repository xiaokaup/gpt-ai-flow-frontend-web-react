import React, { useState } from 'react';
import { Alert, Button, Form, InputNumber, Select, message } from 'antd';
import { EStripe_currency } from '../../../../gpt-ai-flow-common/enum-app/EStripe';
import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import TBackendStripeFile, {
  ICreateStripeBalanceTransaction_results,
} from '../../../../gpt-ai-flow-common/tools/3_unit/TBackendStripe';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { IError } from '../../../../gpt-ai-flow-common/interface-app/3_unit/IError';
import messages from '../../../../gpt-ai-flow-common/i18nProvider/messages';
import { useForm } from 'antd/es/form/Form';

interface ISettingWIndow_4_proMode_recharge_form_input {
  t: IGetT_frontend_output;
  userAccessToken: string;
  currency: string;
}
export const SettingWIndow_4_proMode_recharge_form = (props: ISettingWIndow_4_proMode_recharge_form_input) => {
  const { t, userAccessToken, currency: currencyForStripeUser } = props;

  const [form] = useForm();

  const getDefaultMinAmount = (currency: string): number => {
    if (currency === EStripe_currency.USD) {
      return 1;
    }
    if (currency === EStripe_currency.CNY) {
      return 10;
    }

    return 0;
  };

  const [minAmount, setMinAmount] = useState(getDefaultMinAmount(currencyForStripeUser)); // Doller

  const onFinish = async (values: any) => {
    // console.log('onFinish', values);

    const { amount, currency } = values;

    if (amount < 0) {
      message.error(t.get("The amount value can't be zero or negative"));
      return;
    }

    const results: ICreateStripeBalanceTransaction_results | IError =
      await TBackendStripeFile.createStripeBalanceTransaction(
        {
          amount: -amount * 100, // Credit value
          currency,
        },
        userAccessToken,
        t.currentLocale,
        CONSTANTS_GPT_AI_FLOW_COMMON,
      );

    // console.log('results', results);

    message.success(messages[t.currentLocale]['Save successfully']);
  };
  return (
    <div className="balance_form container" style={{ marginTop: '1rem', padding: 20 }}>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{
          amount: getDefaultMinAmount(currencyForStripeUser),
          currency: currencyForStripeUser,
        }}
      >
        <Form.Item label={t.get('Amount')} name="amount">
          <InputNumber size={'middle'} min={minAmount} precision={2} />
        </Form.Item>

        <Form.Item label={t.get('Currency')} name="currency">
          <Select
            disabled
            onChange={(value) => {
              console.log('value', value);
              if (value === EStripe_currency.USD) {
                setMinAmount(1);
                form.setFieldsValue({ amount: getDefaultMinAmount(value), currency: EStripe_currency.USD });
              }
              if (value === EStripe_currency.CNY) {
                setMinAmount(10);
                form.setFieldsValue({ amount: getDefaultMinAmount(value), currency: EStripe_currency.CNY });
              }
            }}
          >
            {Object.entries(EStripe_currency).map(([key, item]) => {
              return <Select.Option value={item}>{key}</Select.Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t.get('Submit')}
          </Button>
        </Form.Item>
      </Form>

      <Alert
        message={<span>{t.get("Please make sure you have the default payment method in 'My Subscription'")}</span>}
        type="info"
      />
    </div>
  );
};
