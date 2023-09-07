import React from 'react';
import { FormattedMessage } from 'react-intl';

// @ts-expect-error: TODO: fix this
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const translate = (id: string, value = {}) => <FormattedMessage id={id} values={{ ...value }} />;

export default translate;
