import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import TBackendPuppeteerFile from '../../../../../../../../gpt-ai-flow-common/tools/3_unit/TBackendPuppeteer';
import { ELocale } from '../../../../../../../../gpt-ai-flow-common/enum-app/ELocale';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../../../../gpt-ai-flow-common/config/constantGptAiFlow';

const { Search } = Input;

export const Langchain_right_01_xiaohongshu_shareUrl = () => {
  const [xiaohongshu_shareUrl, setXiaohongshu_shareUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [analyseRequests, setAnalyseRequests] = useState<any[]>([]);

  const analyseRequests_for_shareUrl = async (shareUrl: string) => {
    const results = await TBackendPuppeteerFile.getAnalyseRequests_for_shareUrl_by_backend(
      shareUrl,
      ELocale.ZH,
      CONSTANTS_GPT_AI_FLOW_COMMON,
    );

    console.log('results: ', results);
    setAnalyseRequests(results);
  };

  return (
    <>
      <div className="row">
        <Button
          onClick={() => {
            console.log('xiaohongshu_shareUrl: ', xiaohongshu_shareUrl);
          }}
        >
          xiaohongshu_shareUrl
        </Button>
        <Button
          onClick={() => {
            console.log('analyseRequests: ', analyseRequests);
          }}
        >
          analyseRequests
        </Button>
      </div>

      <div className="row">
        <Form.Item name={'xiaohongshu_shareUrl'} label={'xiaohognshu shareUrl'} rules={[]}>
          <Search
            value={xiaohongshu_shareUrl}
            onChange={(event) => {
              if (!event.target.value) return;
              setXiaohongshu_shareUrl(event.target.value);
            }}
            loading={loading}
            enterButton={loading}
            onSearch={async (value) => {
              console.log('onSearch value', value);
              setLoading(true);
              await analyseRequests_for_shareUrl(xiaohongshu_shareUrl);
              setLoading(false);
            }}
          />
        </Form.Item>
      </div>
    </>
  );
};
