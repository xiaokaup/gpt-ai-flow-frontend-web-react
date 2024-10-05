import { useState } from 'react';
import { Select } from 'antd';
import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { ELocale } from '../../../../gpt-ai-flow-common/enum-app/ELocale';

import ProModeWindow_v4 from './ProModeWindow_v4';
import ProModeWindow_v3 from './to_deprecate_ProModeWindow_v3';
import { ProModeWindow_v4_v2 } from './ProModeWindow_v4_v2';
// import { ProModeWindow_v5 } from './ProModeWindow_v5';

interface IProModeWindow_warpper {
  webCase: {
    t: IGetT_frontend_output;
    locale: ELocale;
  };
}
export const ProModeWindow_warpper = (props: IProModeWindow_warpper) => {
  const { t, locale } = props.webCase;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [version, setVersion] = useState<string>('v4_v2');

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', top: '.5rem' }}>
        <Select
          defaultValue={version}
          onChange={(value) => setVersion(value)}
          style={{ margin: 'auto', width: '8rem' }}
          options={[
            {
              label: t.get('Version') + ' 3',
              value: 'v3',
            },
            {
              label: t.get('Version') + ' 4',
              value: 'v4',
            },
            {
              label: t.get('Version') + ' 4 (UI v2)',
              value: 'v4_v2',
            },
            // {
            //   label: t.get('Version') + ' 5 (beta)',
            //   value: 'v5',
            // },
          ]}
        />
      </div>

      {/* {version === 'v5' && <ProModeWindow_v5 t={t} locale={locale} />} */}
      {version === 'v4' && <ProModeWindow_v4 t={t} locale={locale} />}
      {version === 'v4_v2' && <ProModeWindow_v4_v2 t={t} />}
      {version === 'v3' && <ProModeWindow_v3 t={t} />}
    </div>
  );
};
