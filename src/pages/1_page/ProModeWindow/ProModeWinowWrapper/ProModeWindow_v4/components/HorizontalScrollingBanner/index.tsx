import { useState, useEffect } from 'react';
import { IGetNewsDaily_output, getNewsDaily } from '../../../../../../../gpt-ai-flow-common/tools/3_unit/TBackendNews';
import './index.scss';
import { IConstantGptAiFlowHandler } from '../../../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { ELocale } from '../../../../../../../gpt-ai-flow-common/enum-app/ELocale';
import { IGetT_frontend_output } from '../../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IWEIBO_SEARCH } from '../../../../../../../gpt-ai-flow-common/interface-app/3_unit/INews';
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
  const [weiboSearchNews, setWeiboSearchNews] = useState<IWEIBO_SEARCH[]>();
  const [randomWeiboSearchNews, setRandomWeiboSearchNews] = useState<IWEIBO_SEARCH[]>();

  const init = async () => {
    // fetch news
    const results: IGetNewsDaily_output = await getNewsDaily(locale, env);
    console.log('results', results);
    // setNews(results);
    const newWeiboSearchNews = results['weibo-search'];
    console.log('newWeiboSearchNews', newWeiboSearchNews);
    setWeiboSearchNews(newWeiboSearchNews);
    setRandomWeiboSearchNews(_.sampleSize(newWeiboSearchNews, 20));
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
        {/* <div
          className="marquee__element"
          // style="transform: translate3d(-39.083%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d; will-change: transform;"
        >
          <div className="marquee__logo">
            <img src="https://www.xiaokaup.com/digitechJoy/2024-03-08-img-64-design-44.svg" loading="lazy" alt="" />
          </div>
          <div className="marquee__logo">
            <img src="https://www.xiaokaup.com/digitechJoy/2024-03-08-img-65-design-45.svg" loading="lazy" alt="" />
          </div>
          <div className="marquee__logo">
            <img src="https://www.xiaokaup.com/digitechJoy/2024-03-08-img-66-design-46.svg" loading="lazy" alt="" />
          </div>
          <div className="marquee__logo">
            <img src="https://www.xiaokaup.com/digitechJoy/2024-03-08-img-13-Vector-2.svg" loading="lazy" alt="" />
          </div>
          <div className="marquee__logo">
            <img
              src="https://www.xiaokaup.com/digitechJoy/2024-03-08-img-9-nectar-sleep-logo.svg"
              loading="lazy"
              alt=""
            />
          </div>
          <div className="marquee__logo domatron" style={{ maxWidth: '8%' }}>
            <img src="https://www.xiaokaup.com/digitechJoy/2024-03-08-img-10-Frame-2.svg" loading="lazy" alt="" />
          </div>
          <div className="marquee__logo">
            <img src="https://www.xiaokaup.com/digitechJoy/2024-03-08-img-11-Frame-3.svg" loading="lazy" alt="" />
          </div>
          <div className="marquee__logo">
            <img src="https://www.xiaokaup.com/digitechJoy/2024-03-08-img-12-cometchat.svg" loading="lazy" alt="" />
          </div>
        </div> */}
      </div>
    </div>
  );
};
