import React, { useEffect, useState } from 'react';

import { ELocale } from '../../../gpt-ai-flow-common/enum-app/ELocale';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { getNewsDaily } from '../../../gpt-ai-flow-common/tools/3_unit/TBackendNews';
import { IConstantGptAiFlowHandler } from '../../../gpt-ai-flow-common/config/constantGptAiFlow';

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

  const [news, setNews] = useState();

  const init = async () => {
    // fetch news
    const results = await getNewsDaily(locale, env);
    console.log('results', results);
    setNews(results);
  };

  useEffect(() => {
    console.log('run init');
    init();
  }, []);

  return (
    <div className="drag-region" style={{ width: '100%' }}>
      <div className="container newsPage">
        <h1>News</h1>
        {news === undefined && <p>Loading...</p>}
        {news && (
          <ul>
            <li>toutiao-search: {(news['toutiao-search'] as any[]).length}</li>
            <li>weibo-search: {(news['weibo-search'] as any[]).length}</li>
            <li>zhihu-questions: {(news['zhihu-questions'] as any[]).length}</li>
            <li>zhihu-search: {(news['zhihu-search'] as any[]).length}</li>
            <li>zhihu-video: {(news['zhihu-video'] as any[]).length}</li>
          </ul>
        )}
        <pre>{JSON.stringify(news, null, 2)}</pre>
      </div>
    </div>
  );
};
