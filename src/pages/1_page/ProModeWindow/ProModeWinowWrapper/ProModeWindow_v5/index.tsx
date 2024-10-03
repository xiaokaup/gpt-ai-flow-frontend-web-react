import { Tabs } from 'antd';
import { CreativityValueProvider } from '../../../../../gpt-ai-flow-common/contexts/CreativityValueProviderContext';
import { ProModeModelValueProvider } from '../../../../../gpt-ai-flow-common/contexts/ProModeModelValueProviderContext';
import { ELocale } from '../../../../../gpt-ai-flow-common/enum-app/ELocale';
import { IGetT_frontend_output } from '../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { Mermaid } from '../components/Mermaid';
import { useState } from 'react';
import { ELLM_name } from '../../../../../gpt-ai-flow-common/enum-backend/ELLM';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { HorizontalScrollingBanner } from '../components/HorizontalScrollingBanner';

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
  const { t, locale } = props;

  const [creativityValue, setCreativityValue] = useState<number>(0.8);
  const [llmName, setLLMName] = useState<ELLM_name>(ELLM_name.CLAUDE_3_haiku);

  return (
    <div className="drag-region" style={{ width: '100%' }}>
      <div
        className="container proModeContainer"
        style={{ position: 'relative', overflow: 'auto', margin: '1rem auto' }}
      >
        <div className="top_block">
          <div className="horizontalScrollingBanner">
            <HorizontalScrollingBanner
              webCase={{
                t,
                locale,
                env: CONSTANTS_GPT_AI_FLOW_COMMON,
              }}
            />
          </div>
        </div>

        <div className="tabs_blcok">
          <ProModeModelValueProvider value={llmName}>
            <CreativityValueProvider value={creativityValue}>
              <Tabs
                size="small"
                hideAdd
                // activeKey={activeTabPanelKey}
                type="card"
                // type="editable-card"
                // onChange={onTabsChange}
                // onEdit={onEditTabPanel}
              >
                <Tabs.TabPane tab={'企业家'} key={'entrepreneur'} disabled={false}>
                  <Mermaid chart={mermaidChartCode} />
                </Tabs.TabPane>
              </Tabs>
            </CreativityValueProvider>
          </ProModeModelValueProvider>
        </div>
      </div>
    </div>
  );
};
