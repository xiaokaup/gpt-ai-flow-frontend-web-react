import React, { Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import { ELocale } from '../gpt-ai-flow-common/enum-app/ELocale';

import messages from './messages';

interface Provider_input {
  children: any;
  locale: ELocale;
}
const Provider = (props: Provider_input) => {
  const { children, locale } = props;

  return (
    <IntlProvider textComponent={Fragment as any} locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
};

export default Provider;
