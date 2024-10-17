import React from 'react';
import { Divider, List } from 'antd';

import { IGithubTrending } from '../../../../gpt-ai-flow-common/interface-app/3_unit/INews';

interface IGithubTrendingCard {
  news: IGithubTrending[];
}
export const GithubTrendingCard = (props: IGithubTrendingCard) => {
  const { news: onePlatformNews } = props;

  return (
    <>
      <Divider orientation="left">Github Trending</Divider>
      <List
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={onePlatformNews ?? []}
        renderItem={(item) => {
          const { repo, repo_link, desc, lang, stars, added_stars, author } = item;

          return (
            <List.Item style={{ userSelect: 'text' }}>
              <a href={repo_link} target="_blank" className="text-black">
                {repo}&nbsp;:&nbsp;<span className="text-gray-600">{desc}</span>
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
