import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import iconSuccessful from '../../../../../../../../../assets/icons-customize/icon-status-successful/icon-status-successful-512x512.png';
import iconWrong from '../../../../../../../../../assets/icons-customize/icon-status-wrong/icon-status-wrong-512x512.png';
import TBackendPuppeteerFile from '../../../../../../../../gpt-ai-flow-common/tools/3_unit/TBackendPuppeteer';
import { ELocale } from '../../../../../../../../gpt-ai-flow-common/enum-app/ELocale';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { IInternalRequest } from '../../../../../../../../gpt-ai-flow-common/interface-app/3_unit/IRequest';

const { Search } = Input;

export const Langchain_right_01_xiaohongshu_shareUrl = () => {
  const [xiaohongshu_shareUrl, setXiaohongshu_shareUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [hasAnalyseRequests, setHasAnalyseRequests] = useState<boolean>(false);
  const [hasSourceUrl, setHasSourceUrl] = useState<boolean>(false);

  const [analyseRequests, setAnalyseRequests] = useState<IInternalRequest[]>([]);

  const analyseRequests_for_shareUrl = async (shareUrl: string) => {
    setHasAnalyseRequests(true);

    const results = await TBackendPuppeteerFile.getAnalyseRequests_for_shareUrl_by_backend(
      shareUrl,
      ELocale.ZH,
      CONSTANTS_GPT_AI_FLOW_COMMON,
    );

    console.log('results: ', results);
    setAnalyseRequests(results);

    const filterUrl = results.find((item: IInternalRequest) => {
      return item.url.startsWith('https://www.xiaohongshu.com/discovery/item');
    });

    setHasSourceUrl(filterUrl);
    console.log('filterUrl', filterUrl);
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
            suffix={
              <>
                {hasAnalyseRequests && !loading && hasSourceUrl && (
                  <img src={iconSuccessful} alt="" style={{ width: 18, marginLeft: '.2rem', marginRight: '.2rem' }} />
                )}
                {hasAnalyseRequests && !loading && !hasSourceUrl && (
                  <img src={iconWrong} alt="" style={{ width: 18, marginLeft: '.4rem' }} />
                )}
              </>
            }
          />
        </Form.Item>
      </div>
    </>
  );
};
