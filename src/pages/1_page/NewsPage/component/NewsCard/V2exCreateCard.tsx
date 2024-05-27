import React from 'react';
import { Divider, List } from 'antd';

import { IV2ex } from '../../../../../gpt-ai-flow-common/interface-app/3_unit/INews';

interface IV2exCreateCard {
  news: IV2ex[];
}
export const V2exCreateCard = (props: IV2exCreateCard) => {
  const { news: onePlatformNews } = props;

  return (
    <>
      <Divider orientation="left">V2EX</Divider>
      <List
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={onePlatformNews ?? []}
        renderItem={(item) => {
          const { title, url, content, replies, node } = item;

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
