import { useState } from 'react';
import { Form, Input } from 'antd';

const { Search } = Input;

export const Langchain_right_01_xiaohongshu_shareUrl = () => {
  const [xiaohongshu_shareUrl, setXiaohongshu_shareUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <Form.Item name={'xiaohongshu_shareUrl'} label={'xiaohognshu shareUrl'} rules={[]}>
        <Search
          value={xiaohongshu_shareUrl}
          onChange={(event) => {
            setXiaohongshu_shareUrl(event.target.value);
          }}
          loading={loading}
          onSearch={(value) => {
            console.log('onSearch value', value);
            setLoading(true);
          }}
        />
      </Form.Item>
    </>
  );
};
