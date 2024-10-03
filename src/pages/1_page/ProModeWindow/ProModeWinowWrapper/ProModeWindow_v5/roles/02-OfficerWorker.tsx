import ReactMarkdown from 'react-markdown';
import { MermaidComponent } from '../../components/Mermaid';

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
    - 文生图能力
`;
const mermaidChartCode = `
flowchart LR
subgraph "[角色背景]"
  职场工作者 --> 宣传工作 & 行政工作 & 文书工作

  宣传工作 --> 邮件写作
  行政工作 --> 同事聊天 & 会议纪要整理
  文书工作 --> 会议纪要整理
end
`;

export const OfficerWorker = () => {
  return (
    <>
      <ReactMarkdown>{markdownResumeCode}</ReactMarkdown>
      <MermaidComponent chart={mermaidChartCode} />
    </>
  );
};
