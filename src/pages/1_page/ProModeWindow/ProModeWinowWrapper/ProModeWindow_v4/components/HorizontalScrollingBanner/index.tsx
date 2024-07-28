import { useState, useEffect } from 'react';
import { IGetNewsDaily_output, getNewsDaily } from '../../../../../../../gpt-ai-flow-common/tools/3_unit/TBackendNews';
import './index.scss';
import { IConstantGptAiFlowHandler } from '../../../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { ELocale } from '../../../../../../../gpt-ai-flow-common/enum-app/ELocale';
import { IGetT_frontend_output } from '../../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import {
  IGithubTrending,
  IProductHunt,
  IWEIBO_SEARCH,
} from '../../../../../../../gpt-ai-flow-common/interface-app/3_unit/INews';
import _ from 'lodash';

interface IHorizontalScrollingBanner_input {
  webCase: {
    t: IGetT_frontend_output;
    locale: ELocale;
    env: IConstantGptAiFlowHandler;
  };
}
export const HorizontalScrollingBanner = (props: IHorizontalScrollingBanner_input) => {
  const { webCase } = props;
  const { locale, env } = webCase;

  // const [news, setNews] = useState<IGetNewsDaily_output>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [randomWeiboSearchNews, setRandomWeiboSearchNews] = useState<IWEIBO_SEARCH[]>();
  const [randomProductHuntNews, setRandomProductHuntNews] = useState<(IGithubTrending | IProductHunt)[]>();

  const init = async () => {
    // fetch news
    const results: IGetNewsDaily_output = await getNewsDaily(locale, env);
    // console.log('results', results);
    // setNews(results);
    setRandomWeiboSearchNews(_.sampleSize(results['weibo-search'], 20));
    setRandomProductHuntNews(_.sampleSize(results['product-hunt-ranking'], 20));
  };

  useEffect(() => {
    console.log('run init');
    init();
  }, []);

  return (
    <div
      className="marquee__wrapper horizontalScrollingBanner"
      style={{
        borderBottom: '1px solid #E8E8E8',
        marginBottom: '.4rem',
      }}
    >
      <div className="marquee__inner">
        {locale === ELocale.ZH && (
          <>
            <div
              className="marquee__element"
              // style="transform: translate3d(-39.083%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d; will-change: transform;"
            >
              {randomWeiboSearchNews &&
                randomWeiboSearchNews.map((item: IWEIBO_SEARCH) => {
                  const { title, realurl } = item;
                  return (
                    <a href={realurl} target="_blank">
                      <div className="marquee__logo">
                        <span style={{ color: 'rgba(0, 0, 0, 0.88)', whiteSpace: 'nowrap' }}>{title}</span>
                      </div>
                    </a>
                  );
                })}
            </div>
            <div
              className="marquee__element"
              // style="transform: translate3d(-39.083%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d; will-change: transform;"
            >
              {randomWeiboSearchNews &&
                randomWeiboSearchNews.map((item) => {
                  return (
                    <div className="marquee__logo">
                      <span style={{ color: 'rgba(0, 0, 0, 0.88)', whiteSpace: 'nowrap' }}>{item.title}</span>
                    </div>
                  );
                })}
            </div>
          </>
        )}

        {locale === ELocale.EN && (
          <>
            <div
              className="marquee__element"
              // style="transform: translate3d(-39.083%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d; will-change: transform;"
              style={{
                animation: 'slide 120s linear infinite',
              }}
            >
              {randomProductHuntNews &&
                randomProductHuntNews.map((item: IGithubTrending | IProductHunt) => {
                  const { name, description, website } = item as IProductHunt;

                  return (
                    <a href={website} target="_blank">
                      <div className="marquee__logo">
                        <span style={{ color: 'rgba(0, 0, 0, 0.88)', whiteSpace: 'nowrap' }}>
                          {name}&nbsp;:&nbsp;<span className="text-gray-600">{description}</span>
                        </span>
                      </div>
                    </a>
                  );
                })}
            </div>
            <div
              className="marquee__element"
              // style="transform: translate3d(-39.083%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d; will-change: transform;"
              style={{
                animation: 'slide 120s linear infinite',
              }}
            >
              {randomProductHuntNews &&
                randomProductHuntNews.map((item: IGithubTrending | IProductHunt) => {
                  const { name, description, website } = item as IProductHunt;

                  return (
                    <a href={website} target="_blank">
                      <div className="marquee__logo">
                        <span style={{ color: 'rgba(0, 0, 0, 0.88)', whiteSpace: 'nowrap' }}>
                          {name}&nbsp;:&nbsp;<span className="text-gray-600">{description}</span>
                        </span>
                      </div>
                    </a>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
