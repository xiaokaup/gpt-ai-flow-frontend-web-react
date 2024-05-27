import React from 'react';
import { Divider, List } from 'antd';

import { IWEIBO_SEARCH } from '../../../../../gpt-ai-flow-common/interface-app/3_unit/INews';

interface IWeiboSearchCard {
  news: IWEIBO_SEARCH[];
}
export const WeiboSearchCard = (props: IWeiboSearchCard) => {
  const { news: onePlatformNews } = props;

  return (
    <>
      <Divider orientation="left">微博 (手机版)</Divider>
      <List
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={onePlatformNews ?? []}
        renderItem={(item) => {
          const { url, title, realurl } = item;

          return (
            <List.Item style={{ userSelect: 'text' }}>
              <a href={realurl} target="_blank" className="text-black">
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
