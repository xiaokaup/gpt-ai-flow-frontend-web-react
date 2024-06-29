import { useState } from 'react';
import { Select } from 'antd';
import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { ELocale } from '../../../../gpt-ai-flow-common/enum-app/ELocale';

import ProModeWindow_v4 from './ProModeWindow_v4';
import ProModeWindow_v3 from '../proModeWindow_v3';

interface IProModeWindow_warpper {
  webCase: {
    t: IGetT_frontend_output;
    locale: ELocale;
  };
}
export const ProModeWindow_warpper = (props: IProModeWindow_warpper) => {
  const { t, locale } = props.webCase;
  const [version, setVersion] = useState<string>('v4');

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', top: '.5rem' }}>
        <Select
          defaultValue={version}
          onChange={(value) => setVersion(value)}
          style={{ margin: 'auto' }}
          options={[
            {
              label: 'version 3',
              value: 'v3',
            },
            {
              label: 'version 4',
              value: 'v4',
            },
          ]}
        />
      </div>

      {version === 'v4' && <ProModeWindow_v4 t={t} locale={locale} />}
      {version === 'v3' && <ProModeWindow_v3 t={t} />}
    </div>
  );
};
