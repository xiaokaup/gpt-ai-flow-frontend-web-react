import ReactMarkdown from 'react-markdown';
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

const markdownResumeCode = `
## 功能总结

- 内容工作 (文字与图文方向)
  - 文字创作能力
    - 找到创作方向与关键字能力
    - 创作方向与关键字的可视化与延伸能力
    - 根据关键字创作内容的能力
      - 帖子标题
      - 帖子内容
      - 图片描述
  - 图片创作能力
    - 文生图能力
`;
const mermaidChartCode = `
flowchart LR
long-content-creation-text-creation[文字创作]
short-content-creation-text-creation[文字创作]
%% long-content-creation-picture-and-text-creation[图文创作]
short-content-creation-picture-and-text-creation[图文创作]
%% long-content-creation-video-creation[视频创作]
%% short-content-creation-video-creation[视频创作]

内容工作 --> 短内容创作 & 长内容创作
宣传工作 --> 短内容创作 & short-content-creation-picture-and-text-creation
长内容创作 -.-> 短内容创作

长内容创作 --> 视频创作 --> B站 & 微信视频号
长内容创作 --> long-content-creation-text-creation --> 微信公众号  & 知乎

短内容创作 --> short-content-creation-text-creation --> Linkedin & Twitter & Facebook
短内容创作 --> short-content-creation-picture-and-text-creation --> 小红书 & Instagram

行政工作 --> 同事聊天 & 会议纪要整理
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
                  <ReactMarkdown>{markdownResumeCode}</ReactMarkdown>
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
