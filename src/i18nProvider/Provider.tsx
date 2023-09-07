import React, { Fragment } from 'react';
import { IntlProvider } from 'react-intl';

import messages from './messages';

const Provider = ({ children, locale }: any) => (
  <IntlProvider textComponent={Fragment as any} locale={locale} messages={messages[locale]}>
    {children}
  </IntlProvider>
);

export default Provider;
