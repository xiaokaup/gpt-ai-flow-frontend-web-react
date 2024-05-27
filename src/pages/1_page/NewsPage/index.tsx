import './index.scss';

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
import { RedditHotCard } from './component/NewsCard/RedditHotCard';
import { V2exCreateCard } from './component/NewsCard/V2exCreateCard';
import { GithubTrendingCard } from './component/NewsCard/GithubTrendingCard';
import { ProductHuntRankingCard } from './component/NewsCard/ProductHuntRankingCard';

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
          <h1>{t.get('News')}</h1>
          {news === undefined && <p>Loading...</p>}

          {news && (
            <ul className="hidden">
              <li>toutiao-search: {news['toutiao-search']?.length}</li>
              <li>weibo-search: {news['weibo-search']?.length}</li>
              <li>zhihu-questions: {news['zhihu-questions']?.length}</li>
              <li>zhihu-search: {news['zhihu-search']?.length}</li>
              <li>zhihu-video: {news['zhihu-video']?.length}</li>
              <li>reddit-hot: {news['reddit-hot']?.length}</li>
              <li>v2ex-create: {news['v2ex-create']?.length}</li>
            </ul>
          )}
        </div>

        <div className="row news mb-10">
          <div className="row">
            <h2>{t.get('News')} 🇺🇸</h2>
            {news && (
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {news['reddit-hot'] && (
                  <div className="oneNews">
                    <RedditHotCard news={news['reddit-hot']} />
                  </div>
                )}
                {news['v2ex-create'] && (
                  <div className="oneNews">
                    <V2exCreateCard news={news['v2ex-create']} />
                  </div>
                )}
                {news['github-trending'] && (
                  <div className="oneNews">
                    <GithubTrendingCard news={news['github-trending']} />
                  </div>
                )}
                {news['product-hunt-ranking'] && (
                  <div className="oneNews">
                    <ProductHuntRankingCard news={news['product-hunt-ranking']} />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="row ">
            <h2>{t.get('News')} 🇨🇳</h2>
            {news && (
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {news['toutiao-search'] && (
                  <div className="oneNews">
                    <ToutiaoSearchCard news={news['toutiao-search']} />
                  </div>
                )}

                {news['weibo-search'] && (
                  <div className="oneNews">
                    <WeiboSearchCard news={news['weibo-search']} />
                  </div>
                )}

                {news['zhihu-questions'] && (
                  <div className="oneNews">
                    <ZhihuQuestions news={news['zhihu-questions']} />
                  </div>
                )}

                {news['zhihu-search'] && (
                  <div className="oneNews">
                    <ZhihuSearch news={news['zhihu-search']} />
                  </div>
                )}

                {news['zhihu-video'] && (
                  <div className="oneNews">
                    <ZhihuVideo news={news['zhihu-video']} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <pre>{JSON.stringify(news, null, 2)}</pre> */}
    </div>
  );
};
