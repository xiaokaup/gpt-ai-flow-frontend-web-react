import { IGetT_frontend_output } from '../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

interface IProModeWindow_v4_tabPane_05_CardGenerate {
  t: IGetT_frontend_output;
}
export const ProModeWindow_v4_tabPane_05_CardGenerate = (props: IProModeWindow_v4_tabPane_05_CardGenerate) => {
  const { t } = props;

  return (
    <div>
      <iframe
        id="memoCard"
        src="https://memocard.net/"
        frameBorder="0"
        style={{ width: '100%', height: 1000 }}
        lang={t.currentLocale}
      ></iframe>
      {/* <iframe src="https://geekcard.app/" frameBorder="0" style={{ width: '100%', height: 800 }}></iframe> */}
    </div>
  );
};
