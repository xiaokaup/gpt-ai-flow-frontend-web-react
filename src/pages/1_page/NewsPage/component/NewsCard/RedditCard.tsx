import React from 'react';
import { Divider, List } from 'antd';

import { IReddit } from '../../../../../gpt-ai-flow-common/interface-app/3_unit/INews';

interface IRedditHotCard {
  news: IReddit[];
}
export const RedditHotCard = (props: IRedditHotCard) => {
  const { news: onePlatformNews } = props;

  return (
    <>
      <Divider orientation="left">Reddit</Divider>
      <List
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={onePlatformNews ?? []}
        renderItem={(item) => {
          const { title, ups, selftext, subreddit, num_comments, permalink } = item;

          return (
            <List.Item style={{ userSelect: 'text' }}>
              <a href={permalink} target="_blank" className="text-black">
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
