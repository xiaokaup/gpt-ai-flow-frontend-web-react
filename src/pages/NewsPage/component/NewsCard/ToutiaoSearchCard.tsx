import React from 'react';
import { Divider, List } from 'antd';

import { ITOUTIAO_SEARCH } from '../../../../gpt-ai-flow-common/interface-app/3_unit/INews';

interface IToutiaoSearchCard {
  news: ITOUTIAO_SEARCH[];
}
export const ToutiaoSearchCard = (props: IToutiaoSearchCard) => {
  const { news: onePlatformNews } = props;

  return (
    <>
      <Divider orientation="left">头条</Divider>
      <List
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={onePlatformNews ?? []}
        renderItem={(item) => {
          const { url, word } = item;

          return (
            <List.Item style={{ userSelect: 'text' }}>
              <a href={url} target="_blank" className="text-black">
                {word}
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
