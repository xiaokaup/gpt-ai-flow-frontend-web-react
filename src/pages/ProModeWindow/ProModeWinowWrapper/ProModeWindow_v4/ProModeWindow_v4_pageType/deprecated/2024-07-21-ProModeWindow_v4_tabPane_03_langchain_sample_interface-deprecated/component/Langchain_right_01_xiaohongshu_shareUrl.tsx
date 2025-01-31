import iconSuccessful from '../../../../../../../../../assets/icons-customize/icon-status-successful/icon-status-successful-512x512.png';
import iconWrong from '../../../../../../../../../assets/icons-customize/icon-status-wrong/icon-status-wrong-512x512.png';

import { useState } from 'react';
import { Form, Input, Tooltip } from 'antd';
import TBackendPuppeteerFile from '../../../../../../../../gpt-ai-flow-common/tools/3_unit/TBackendPuppeteer';
import { ELocale } from '../../../../../../../../gpt-ai-flow-common/enum-app/ELocale';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { IAdjust_IMessage_v2 } from '../../../../../../../../gpt-ai-flow-common/interface-app/2_component/IMessageExchange/IAdjust';
import { IGetT_frontend_output } from '../../../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

const { Search, TextArea } = Input;

interface ILangchain_right_01_xiaohongshu_shareUrl_input {
  t: IGetT_frontend_output;
  adjust: IAdjust_IMessage_v2;
  setAdjust: (newAdjust: IAdjust_IMessage_v2) => void;
}
export const Langchain_right_01_xiaohongshu_shareUrl = (props: ILangchain_right_01_xiaohongshu_shareUrl_input) => {
  const { t, adjust, setAdjust } = props;

  const [form] = Form.useForm();

  const [loading, setLoading] = useState<boolean>(false);
  const [hasAnalyseRequests, setHasAnalyseRequests] = useState<boolean>(false);

  const [xiaohongshu_shareUrl, setXiaohongshu_shareUrl] = useState<string>('');
  const [sourceUrlPostMetaContent, setSourceUrlPostMetaContent] = useState<{ [key: string]: string }>(null);

  const analyseRequests_for_shareUrl = async (shareUrl: string) => {
    setHasAnalyseRequests(true);

    const sourceUrlResponse = await TBackendPuppeteerFile.getAnalyseRequests_for_shareUrl_by_backend(
      shareUrl,
      ELocale.ZH,
      CONSTANTS_GPT_AI_FLOW_COMMON,
    );

    // console.log('sourceUrlTextResult: ', sourceUrlResponse);

    if (sourceUrlResponse instanceof Error) {
      return;
    }

    // 正则表达式，用于匹配 <meta> 标签，并捕获其 name 属性和 content 属性的值
    const metaTagRegex = /<meta\s+name="(og:title|description)"\s+content="([^"]*)"\s*\/?>/g;

    // 声明一个对象来存储提取到的标题和描述
    const metaContent: { [key: string]: string } = {};

    // 使用正则表达式匹配，并提取内容
    let match;
    while ((match = metaTagRegex.exec(sourceUrlResponse)) !== null) {
      let name = match[1]; // 捕获的 name 属性值
      const content = match[2]; // 捕获的 content 属性值
      if (name === 'og:title') {
        name = 'title'; // 将 og:title 改为 title
      }
      metaContent[name] = content;
    }

    // 打印结果
    // console.log(metaContent);

    // 将提取到的标题和描述存储到 state 中, 并更新 adjust.example 内容
    setSourceUrlPostMetaContent(metaContent);
    const newAdjustExample = `## 标题\n${metaContent.title}\n\n## 内容\n${metaContent.description}`;
    setAdjust({ ...adjust, example: newAdjustExample });
    form.setFieldValue('example', newAdjustExample);
  };

  return (
    <>
      {/* <div className="row @DEV">
        <Button
          onClick={() => {
            console.log('xiaohongshu_shareUrl: ', xiaohongshu_shareUrl);
          }}
        >
          xiaohongshu_shareUrl
        </Button>
        <Button
          onClick={() => {
            console.log('sourceUrlPostMetaContent: ', sourceUrlPostMetaContent);
          }}
        >
          sourceUrlPostMetaContent
        </Button>
        <Button
          onClick={() => {
            console.log('adjust.example: ', adjust.example);
          }}
        >
          adjust.example
        </Button>
      </div> */}

      <div className="row">
        <Form form={form} initialValues={adjust}>
          <Tooltip
            title={
              <>
                {t.get('Using the XiaoHongShu Share Link: ')}
                <a
                  href={
                    t.currentLocale === ELocale.ZH
                      ? `https://www.gptaiflow.com/zh/docs/product/guide-xiaohongshu-copy-shareUrl`
                      : 'https://www.gptaiflow.com/docs/product/guide-xiaohongshu-copy-shareUrl'
                  }
                  target="_blank"
                >
                  {t.get('click here')}
                </a>
              </>
            }
          >
            <Form.Item name={'xiaohongshu_shareUrl'} label={t.get("xiaohongshu's share URL")} rules={[]}>
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
                    {hasAnalyseRequests &&
                      !loading &&
                      sourceUrlPostMetaContent?.title &&
                      sourceUrlPostMetaContent?.description && (
                        <img
                          src={iconSuccessful}
                          alt=""
                          style={{ width: 18, marginLeft: '.2rem', marginRight: '.2rem' }}
                        />
                      )}
                    {hasAnalyseRequests &&
                      !loading &&
                      !(sourceUrlPostMetaContent?.title && sourceUrlPostMetaContent?.description) && (
                        <img src={iconWrong} alt="" style={{ width: 18, marginLeft: '.4rem' }} />
                      )}
                  </>
                }
              />
            </Form.Item>
          </Tooltip>
          {(adjust.example || (!adjust.example && hasAnalyseRequests)) && (
            <Form.Item name={'example'} label={t.get('Example')} rules={[]}>
              <TextArea
                value={adjust.example}
                onChange={(event) => {
                  setAdjust({ ...adjust, example: event.target.value });
                }}
                autoSize={{ minRows: 2 }}
              />
            </Form.Item>
          )}
        </Form>
      </div>
    </>
  );
};
