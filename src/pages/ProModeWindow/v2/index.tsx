import { useState } from 'react';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { ELocale } from '../../../gpt-ai-flow-common/enum-app/ELocale';

import { useSearchParams } from 'react-router-dom';

interface IProModeWindow_v2_warpper {
  webCase: {
    t: IGetT_frontend_output;
    locale: ELocale;
  };
}
export const ProModeWindow_v2_warpper = (props: IProModeWindow_v2_warpper) => {
  const { t, locale } = props.webCase;

  const [searchParams] = useSearchParams();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [version, setVersion] = useState<string>(searchParams.get('version') ?? 'v4');

  return (
    <div className="w-full">
      <p>ProModeWindow_v2</p>
    </div>
  );
};
