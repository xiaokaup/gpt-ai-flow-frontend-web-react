import { useState, useEffect } from 'react';
import { Input } from 'antd';
import { ELocale } from '../../../gpt-ai-flow-common/enum-app/ELocale';
import { Card_with_click } from './Card_with_click';
import { Card_without_click } from './Card_without_click';
import { webAppUrl, docBaseUrl } from './constant';
import { IOneFeature } from './interface';
import { getRoles, getModules } from './constant_fetures';

const { Search } = Input;

const isHomePage = false;

const getFeatures = (features_type: string, locale: ELocale) => {
  if (features_type === 'module') {
    return getModules(isHomePage, locale);
  }

  // 'role'
  return getRoles(isHomePage, locale);
};

interface IProModeWindowFeatures_module_input {
  locale: ELocale;
  features_type: string;
  isShowMoreCard: boolean;
}
export const ProModeWindowFeatures_cards = (props: IProModeWindowFeatures_module_input) => {
  const { locale, features_type, isShowMoreCard } = props;

  // console.log('features', features);
  const [searchInput, setSearchInput] = useState<string>('');
  const [featuresFiltered, setFeaturesFiltered] = useState<IOneFeature[]>([]);

  const _getTextFrom_IOneFeature_featureTextItem = (item: string | JSX.Element): string => {
    let results = '';

    if (typeof item === 'string') {
      results += item;
      return results;
    }

    if (typeof item.props.children === 'string') {
      results += item.props.children;
      return results;
    }

    if (Array.isArray(item.props.children)) {
      item.props.children.forEach((childItem: string | JSX.Element) => {
        results += _getTextFrom_IOneFeature_featureTextItem(childItem);
      });

      return results;
    }
  };

  const _getTextFrom_IOneFeature = (item: IOneFeature): string => {
    let results = '';

    results += item.proModeModuleName + ' ';

    results += _getTextFrom_IOneFeature_featureTextItem(item.featureText_1) + ' ';
    results += _getTextFrom_IOneFeature_featureTextItem(item.featureText_2) + ' ';
    results += _getTextFrom_IOneFeature_featureTextItem(item.featureText_3) + ' ';

    return results;
  };

  useEffect(() => {
    const features = getFeatures(features_type, locale);
    if (!searchInput) {
      setFeaturesFiltered(features);
      return;
    }

    const searchInputLower = searchInput.toLowerCase();
    const featuresFiltered = features.filter((item: IOneFeature) => {
      return _getTextFrom_IOneFeature(item).toLowerCase().includes(searchInputLower);
    });

    setFeaturesFiltered(featuresFiltered);
  }, [searchInput, features_type]);

  return (
    <>
      <div className="search mt-8 px-10 flex justify-between">
        {locale === ELocale.ZH && <p>请选择专业模块，并开始使用:</p>}
        {locale === ELocale.EN && <p>Please select a professional module and begin using it:</p>}

        <Search
          size="large"
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
          style={{ width: 200 }}
        />
      </div>
      <div
        className={
          features_type === 'role'
            ? 'grid divide-x divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-3xl border border-gray-100 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-2 lg:divide-y-0 xl:grid-cols-2'
            : 'grid divide-x divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-3xl border border-gray-100 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4'
        }
      >
        {featuresFiltered.map((item) => {
          const { webAppOpenLink: openLink } = item;

          if (!openLink || (openLink && openLink === '#'))
            return <Card_without_click key={item.proModeModuleName} item={item} imgBaseUrl={docBaseUrl} />;

          return (
            <Card_with_click
              key={item.proModeModuleName}
              item={item}
              locale={locale}
              baseUrl={webAppUrl}
              imgBaseUrl={docBaseUrl}
            />
          );
        })}

        {/* More cards for homePage */}
        {isShowMoreCard && isHomePage && (
          <div className="group relative bg-gray-50 dark:bg-gray-900 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
            <a className="!no-underline" href={'/app'}>
              <div className="relative space-y-8 py-12 p-8 transition duration-300 group-hover:bg-white dark:group-hover:bg-gray-800">
                <img
                  src={docBaseUrl + '/img/icons/2023-09-18-img-14-icon-more-features-easy-use.png'}
                  className="w-12"
                  // width="512"
                  // height="512"
                  alt="icon-image"
                />

                <div className="space-y-2">
                  {locale === 'en' && (
                    <>
                      <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                        More Features
                      </h5>
                      <p className="text-gray-600 dark:text-gray-300">
                        ✍️ Utilize <b>SEO content optimization</b> and professional copywriting to enhance brand
                        visibility and support sales growth.
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        📊 Combine <b>SWOT analysis</b> and <b>OKR methods</b> to ensure product advantages and team
                        objectives align with organizational strategy.
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        💡 Continuously optimize product features to ensure <b>meeting user needs</b>.
                      </p>
                    </>
                  )}
                  {locale === 'zh' && (
                    <>
                      <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                        更多功能
                      </h5>
                      <p className="text-gray-600 dark:text-gray-300">
                        ✍️ 利用<b>SEO内容优化</b>和专业文案，提升品牌可见度并助力销售增长。
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        📊 结合<b>SWOT分析</b>和<b>OKR方法</b>，确保产品优势与团队目标与组织战略一致。
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        💡 不断优化产品功能，确保<b>满足用户需求</b>
                      </p>
                    </>
                  )}
                </div>
                <div className="flex items-center justify-between group-hover:text-secondary">
                  <span className="text-sm">
                    {locale === 'en' && <>Learn More</>}
                    {locale === 'zh' && <>了解更多</>}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        )}

        {/* More cards for application-senarios */}
        {isShowMoreCard && !isHomePage && (
          <>
            <div className="group relative bg-gray-50 dark:bg-gray-900 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
              <a className="!no-underline" href={'/app'}>
                <div className="relative space-y-8 py-12 p-8 transition duration-300 group-hover:bg-white dark:group-hover:bg-gray-800 h-full">
                  <img
                    src={docBaseUrl + '/img/icons/2023-09-22-img-16-treasure.png'}
                    className="w-12"
                    // width="512"
                    // height="512"
                    alt="icon-image"
                  />

                  <div className="space-y-2">
                    {locale === 'en' && (
                      <>
                        <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                          Future Exploration
                        </h5>
                        <p className="text-gray-600 dark:text-gray-300">
                          🔮 We are continuously <b>researching and innovating</b>
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          💡 Looking forward to bringing you <b>more practical features</b> and tools
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          🚀 Stay tuned, <b>join us in stepping into the future</b>!
                        </p>
                      </>
                    )}
                    {locale === 'zh' && (
                      <>
                        <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                          未来探索
                        </h5>
                        <p className="text-gray-600 dark:text-gray-300">
                          🔮 我们正在不断地<b>研发与创新</b>
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          💡 期待为您带来<b>更多实用的功能</b>和工具
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          🚀 请持续关注，<b>与我们一起走进未来</b>!
                        </p>
                      </>
                    )}
                  </div>
                  <div className="hidden flex items-center justify-between group-hover:text-secondary">
                    <span className="text-sm">
                      {locale === 'en' && <>Learn More</>}
                      {locale === 'zh' && <>了解更多</>}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
};
