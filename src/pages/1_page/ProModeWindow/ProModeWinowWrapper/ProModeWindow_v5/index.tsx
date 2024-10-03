import { ELocale } from '../../../../../gpt-ai-flow-common/enum-app/ELocale';
import { IGetT_frontend_output } from '../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

interface IProModeWindow_v5_input {
  t: IGetT_frontend_output;
  locale: ELocale;
}
export const ProModeWindow_v5 = (props: IProModeWindow_v5_input) => {
  return (
    <div className="drag-region" style={{ width: '100%' }}>
      <div
        className="container proModeContainer"
        style={{ position: 'relative', overflow: 'auto', margin: '1rem auto' }}
      >
        proModeContainer_v5
      </div>
    </div>
  );
};
