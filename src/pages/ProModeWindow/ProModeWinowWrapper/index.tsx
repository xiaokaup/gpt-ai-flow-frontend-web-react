import { useState } from 'react';
import { Select } from 'antd';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { ELocale } from '../../../gpt-ai-flow-common/enum-app/ELocale';

import ProModeWindow_v4 from './ProModeWindow_v4';
import ProModeWindow_v3 from './to_deprecate_ProModeWindow_v3';
import { useSearchParams } from 'react-router-dom';
import { ProModeWindow_v5 } from '../../betaPages/to_plan_ProModeWindow_v5';

interface IProModeWindow_warpper {
  webCase: {
    t: IGetT_frontend_output;
    locale: ELocale;
  };
}
export const ProModeWindow_warpper = (props: IProModeWindow_warpper) => {
  const { t, locale } = props.webCase;

  const [searchParams] = useSearchParams();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [version, setVersion] = useState<string>(searchParams.get('version') ?? 'v4');

  return (
    <div className="w-full">
      <div className="text-center mt-2 hidden">
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
          ]}
        />
      </div>

      {version === 'v3' && <ProModeWindow_v3 t={t} />}
      {version === 'v4' && <ProModeWindow_v4 t={t} locale={locale} />}
      {version === 'v5' && <ProModeWindow_v5 t={t} locale={locale} />}
    </div>
  );
};
