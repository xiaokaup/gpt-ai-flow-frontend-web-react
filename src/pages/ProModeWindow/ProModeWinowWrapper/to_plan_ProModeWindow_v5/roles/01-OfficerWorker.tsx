import ReactMarkdown from 'react-markdown';
import { MermaidComponent } from '../../components/Mermaid';

const markdownResumeCode = `
## 功能总结

- 职场工作
`;
const mermaidChartCode = `
flowchart LR
subgraph "[角色背景]"
  职场 --> 宣传工作 & 行政工作 & 文书工作

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
