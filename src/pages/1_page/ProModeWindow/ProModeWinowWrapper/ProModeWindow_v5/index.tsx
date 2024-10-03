import { ELocale } from '../../../../../gpt-ai-flow-common/enum-app/ELocale';
import { IGetT_frontend_output } from '../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { Mermaid } from '../components/Mermaid';

const mermaidChartCode = `
graph TB; 
A[Start] --> B[Ques 1];
B --> C[Ques 2];
B --> D[Ques 3];
C --> E[Ques 4];
D --> E[Ques 4];
E --> F;
F[Ques 5] --> id7[End];
F --> B
`;
interface IProModeWindow_v5_input {
  t: IGetT_frontend_output;
  locale: ELocale;
}
export const ProModeWindow_v5 = (props: IProModeWindow_v5_input) => {
  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  const { t, locale } = props;
  return (
    <div className="drag-region" style={{ width: '100%' }}>
      <div
        className="container proModeContainer"
        style={{ position: 'relative', overflow: 'auto', margin: '1rem auto' }}
      >
        proModeContainer_v5
        <div className="row">
          <Mermaid chart={mermaidChartCode} />
        </div>
      </div>
    </div>
  );
};
