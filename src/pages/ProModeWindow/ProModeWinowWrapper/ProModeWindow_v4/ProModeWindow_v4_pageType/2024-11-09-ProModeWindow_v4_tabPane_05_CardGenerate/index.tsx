import { useEffect, useState } from 'react';
import { ELocale } from '../../../../../../gpt-ai-flow-common/enum-app/ELocale';
import { IGetT_frontend_output } from '../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

interface IProModeWindow_v4_tabPane_05_CardGenerate {
  t: IGetT_frontend_output;
}
export const ProModeWindow_v4_tabPane_05_CardGenerate = (props: IProModeWindow_v4_tabPane_05_CardGenerate) => {
  const { t } = props;

  const [srcUrl, setSrcUrl] = useState<string>('https://memocard.net/');

  useEffect(() => {
    if (t.currentLocale === ELocale.ZH) {
      setSrcUrl('https://memocard.net/');
    }

    if (t.currentLocale === ELocale.EN) {
      setSrcUrl('https://poet.so/');
    }
  }, []);

  return (
    <div>
      <iframe
        id="memoCard"
        src={srcUrl}
        frameBorder="0"
        scrolling="no"
        style={{ width: '100%', height: '100vh' }}
        lang={t.currentLocale}
      ></iframe>
      {/* <iframe src="https://geekcard.app/" frameBorder="0" style={{ width: '100%', height: 800 }}></iframe> */}
    </div>
  );
};
