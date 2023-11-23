import React from 'react';
import { FormattedMessage } from 'react-intl';

// @ts-expect-error: TODO: fix this
const translate = (id: string, value = {}) => <FormattedMessage id={id} values={{ ...value }} />;

export default translate;
