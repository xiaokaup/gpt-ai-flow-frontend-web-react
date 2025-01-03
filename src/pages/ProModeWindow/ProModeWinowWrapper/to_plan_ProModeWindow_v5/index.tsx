import { useState } from 'react';
import { Tabs } from 'antd';

import { CreativityValueProvider } from '../../../../gpt-ai-flow-common/contexts/CreativityValueProviderContext';
import { ProModeModelValueProvider } from '../../../../gpt-ai-flow-common/contexts/ProModeModelValueProviderContext';
import { ELocale } from '../../../../gpt-ai-flow-common/enum-app/ELocale';
import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { ELLM_name } from '../../../../gpt-ai-flow-common/enum-backend/ELLM';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';

import { HorizontalScrollingBanner } from '../components/HorizontalScrollingBanner';

import ReactFlowDemo from './features/01-ReactFlow';
import { WordCloudDemo } from './features/02-WordCloud';

import { OfficerWorker } from './roles/01-OfficerWorker';
import { ContentWorker } from './roles/02-ContentWorker';

interface IProModeWindow_v5_input {
  t: IGetT_frontend_output;
  locale: ELocale;
}
export const ProModeWindow_v5 = (props: IProModeWindow_v5_input) => {
  const { t, locale } = props;

  const [creativityValue, setCreativityValue] = useState<number>(0.8);
  const [llmName, setLLMName] = useState<ELLM_name>(ELLM_name.ANTHROPIC_CLAUDE_3_5_HAIKU);

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
                // activeKey={'office-worker'}
                type="card"
                // type="editable-card"
                // onChange={onTabsChange}
                // onEdit={onEditTabPanel}
              >
                <Tabs.TabPane tab={'职场'} key={'office-worker'} disabled={false}>
                  <OfficerWorker />
                </Tabs.TabPane>
                <Tabs.TabPane tab={'内容创作者'} key={'content-worker'} disabled={false}>
                  <ContentWorker />
                </Tabs.TabPane>
                <Tabs.TabPane tab={'React Flow Demo'} key={'react-flow-demo'} disabled={false}>
                  <ReactFlowDemo />
                </Tabs.TabPane>
                <Tabs.TabPane tab={'Word Cloud Demo'} key={'word-cloud-demo'} disabled={false}>
                  <WordCloudDemo />
                </Tabs.TabPane>
              </Tabs>
            </CreativityValueProvider>
          </ProModeModelValueProvider>
        </div>
      </div>
    </div>
  );
};
