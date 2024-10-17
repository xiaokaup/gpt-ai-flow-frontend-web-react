import React from 'react';
import { Divider, List } from 'antd';

import { IZHIHU_QUESTIONS } from '../../../../gpt-ai-flow-common/interface-app/3_unit/INews';

interface IZhihuQuestions {
  news: IZHIHU_QUESTIONS[];
}
export const ZhihuQuestions = (props: IZhihuQuestions) => {
  const { news: onePlatformNews } = props;

  return (
    <>
      <Divider orientation="left">知乎问答</Divider>
      <List
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={onePlatformNews ?? []}
        renderItem={(item) => {
          const { url, title } = item;

          return (
            <List.Item style={{ userSelect: 'text' }}>
              <a href={url} target="_blank" className="text-black">
                {title}
              </a>
              {/* <Typography.Text mark>[ITEM]</Typography.Text> {item} */}
            </List.Item>
          );
        }}
        style={{ overflowY: 'auto', height: 1000 }}
      />
    </>
  );
};
