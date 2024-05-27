import React, { useEffect, useState } from 'react';

import { ELocale } from '../../../gpt-ai-flow-common/enum-app/ELocale';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IGetNewsDaily_output, getNewsDaily } from '../../../gpt-ai-flow-common/tools/3_unit/TBackendNews';
import { IConstantGptAiFlowHandler } from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { ToutiaoSearchCard } from './component/NewsCard/ToutiaoSearchCard';
import { WeiboSearchCard } from './component/NewsCard/WeiboSearchCard';
import { ZhihuQuestions } from './component/NewsCard/ZhihuQuestions';
import { ZhihuSearch } from './component/NewsCard/ZhihuSearch';
import { ZhihuVideo } from './component/NewsCard/ZhihuVideo';

interface INewsPageProps {
  webCase: {
    t: IGetT_frontend_output;
    locale: ELocale;
    env: IConstantGptAiFlowHandler;
  };
}
export const NewsPage = (props: INewsPageProps) => {
  const { webCase } = props;
  const { t, locale, env } = webCase;

  const [news, setNews] = useState<IGetNewsDaily_output>();

  const init = async () => {
    // fetch news
    const results: IGetNewsDaily_output = await getNewsDaily(locale, env);
    console.log('results', results);
    setNews(results);
  };

  useEffect(() => {
    console.log('run init');
    init();
  }, []);

  return (
    <div className="drag-region" style={{ width: '100%' }}>
      <div className="container newsPage my-4">
        <div className="row top_block">
          <h1>{t.get('News')} 🇨🇳</h1>
          {news === undefined && <p>Loading...</p>}
          {/* {news && (
            <ul>
              <li>toutiao-search: {(news['toutiao-search'] as any[]).length}</li>
              <li>weibo-search: {(news['weibo-search'] as any[]).length}</li>
              <li>zhihu-questions: {(news['zhihu-questions'] as any[]).length}</li>
              <li>zhihu-search: {(news['zhihu-search'] as any[]).length}</li>
              <li>zhihu-video: {(news['zhihu-video'] as any[]).length}</li>
            </ul>
          )} */}
        </div>

        {news && (
          <div className="news_block mb-10" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {news['toutiao-search'] && (
              <div style={{ flex: '0 1 32%', marginLeft: '1rem' }}>
                <ToutiaoSearchCard news={news['toutiao-search']} />
              </div>
            )}

            {news['weibo-search'] && (
              <div style={{ flex: '0 1 32%', marginLeft: '1rem' }}>
                <WeiboSearchCard news={news['weibo-search']} />
              </div>
            )}

            {news['zhihu-questions'] && (
              <div style={{ flex: '0 1 32%', marginLeft: '1rem' }}>
                <ZhihuQuestions news={news['zhihu-questions']} />
              </div>
            )}

            {news['zhihu-search'] && (
              <div style={{ flex: '0 1 32%', marginLeft: '1rem' }}>
                <ZhihuSearch news={news['zhihu-search']} />
              </div>
            )}

            {news['zhihu-video'] && (
              <div style={{ flex: '0 1 32%', marginLeft: '1rem' }}>
                <ZhihuVideo news={news['zhihu-video']} />
              </div>
            )}
          </div>
        )}
      </div>
      {/* <pre>{JSON.stringify(news, null, 2)}</pre> */}
    </div>
  );
};
