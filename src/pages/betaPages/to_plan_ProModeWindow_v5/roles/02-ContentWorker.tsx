import ReactMarkdown from 'react-markdown';
import { MermaidComponent } from '../../../ProModeWindow/ProModeWinowWrapper/components/Mermaid';

const markdownResumeCode = `
## 功能总结

- 内容工作 (文字与图文方向)
  - 角色背景设定能力
  - 文字创作能力
    - 找到创作方向与关键字能力
    - 创作方向与关键字的可视化与延伸能力
    - 根据关键字创作内容的能力
      - 帖子标题
      - 帖子内容
      - 图片描述
  - 图片创作能力
    - 读图能力
    - 文生图能力
`;
const mermaidChartCode = `
flowchart LR
subgraph "[角色背景]"
  long-content-creation-text-creation[文字创作]
  short-content-creation-text-creation[文字创作]
  %% long-content-creation-picture-and-text-creation[图文创作]
  short-content-creation-picture-and-text-creation[图文创作]
  %% long-content-creation-video-creation[视频创作]
  %% short-content-creation-video-creation[视频创作]


  内容工作 --> 短内容创作 & 长内容创作
  长内容创作 -.-> 短内容创作

  长内容创作 --> 视频创作 --> B站 & 微信视频号
  长内容创作 --> long-content-creation-text-creation --> 微信公众号  & 知乎

  短内容创作 --> short-content-creation-text-creation --> Linkedin & Twitter & Facebook
  短内容创作 --> short-content-creation-picture-and-text-creation --> 小红书 & Instagram
end
`;

export const ContentWorker = () => {
  return (
    <>
      <ReactMarkdown>{markdownResumeCode}</ReactMarkdown>
      <MermaidComponent chart={mermaidChartCode} />
    </>
  );
};
