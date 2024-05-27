import React from 'react';
import { Divider, List } from 'antd';

import { IZHIHU_SEARCH } from '../../../../../gpt-ai-flow-common/interface-app/3_unit/INews';

interface IZhihuSearch {
  news: IZHIHU_SEARCH[];
}
export const ZhihuSearch = (props: IZhihuSearch) => {
  const { news: onePlatformNews } = props;

  return (
    <>
      <Divider orientation="left">知乎搜索</Divider>
      <List
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={onePlatformNews ?? []}
        renderItem={(item) => {
          const { url, query, display_query } = item;

          return (
            <List.Item>
              <a href={url} target="_blank" className="text-black">
                {display_query}
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
