import React from 'react';
import { Divider, List } from 'antd';

import { IProductHunt } from '../../../../gpt-ai-flow-common/interface-app/3_unit/INews';

interface IProductHuntRankingCard {
  news: IProductHunt[];
}
export const ProductHuntRankingCard = (props: IProductHuntRankingCard) => {
  const { news: onePlatformNews } = props;

  return (
    <>
      <Divider orientation="left">Product Hunt Ranking</Divider>
      <List
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={onePlatformNews ?? []}
        renderItem={(item) => {
          const { name, description, url, website, votesCount } = item;

          return (
            <List.Item style={{ userSelect: 'text' }}>
              <a href={website} target="_blank" className="text-black">
                {name}&nbsp;:&nbsp;<span className="text-gray-600">{description}</span>
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
