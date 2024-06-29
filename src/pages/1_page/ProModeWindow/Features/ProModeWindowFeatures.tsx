import { isProd } from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';

interface IOneFeature {
  icon: string;
  proModeModuleName: string;
  featureText_1: JSX.Element;
  featureText_2: JSX.Element;
  featureText_3: JSX.Element;
  openLink: string;
}

interface ICard_with_click {
  locale: string;
  baseUrl: string;
  imgBaseUrl: string;
  item: IOneFeature;
}
const Card_with_click = (props: ICard_with_click) => {
  const {
    locale,
    baseUrl,
    imgBaseUrl,
    item: { icon, proModeModuleName, featureText_1, featureText_2, featureText_3, openLink },
  } = props;

  return (
    <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
      <a className="!no-underline" href={openLink.startsWith('/') ? baseUrl + openLink : openLink}>
        <div className="relative space-y-8 py-12 p-8">
          <img
            src={imgBaseUrl + icon}
            className="w-12"
            // width="512"
            // height="512"
            alt="icon-image"
          />

          <div className="space-y-2">
            <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
              {proModeModuleName}
            </h5>
            <p className="text-gray-600 dark:text-gray-300">{featureText_1}</p>
            <p className="text-gray-600 dark:text-gray-300">{featureText_2}</p>
            <p className="text-gray-600 dark:text-gray-300">{featureText_3}</p>
          </div>
          {openLink && openLink !== '#' && (
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
          )}
        </div>
      </a>
    </div>
  );
};
const Card_without_click = (props: { item: IOneFeature; imgBaseUrl: string }) => {
  const {
    imgBaseUrl,
    item: { icon, proModeModuleName, featureText_1, featureText_2, featureText_3 },
  } = props;

  return (
    <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
      <div className="relative space-y-8 py-12 p-8">
        <img
          src={imgBaseUrl + icon}
          className="w-12"
          // width="512"
          // height="512"
          alt="icon-image"
        />

        <div className="space-y-2">
          <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
            {proModeModuleName}
          </h5>
          <p className="text-gray-600 dark:text-gray-300">{featureText_1}</p>
          <p className="text-gray-600 dark:text-gray-300">{featureText_2}</p>
          <p className="text-gray-600 dark:text-gray-300">{featureText_3}</p>
        </div>
      </div>
    </div>
  );
};

interface CardsForFeatures_input {
  locale: string;
  location?: string;
}
export const CardsForFeatures = (props: CardsForFeatures_input) => {
  const {
    locale,
    // location
  } = props;

  const baseUrl = isProd ? 'https://www.app.gptaiflow.com' : 'http://localhost:3000';
  const imgBaseUrl = 'https://www.gptaiflow.com';
  const isHomePage = false;

  const homePageFeatures_zh: IOneFeature[] = [
    {
      icon: '/img/icons/2024-05-24-img-17-product-management.png',
      proModeModuleName: '产品经理',
      featureText_1: (
        <>
          📊 <b>从需求到产品特性的转化</b>，精准把握市场和用户需求
        </>
      ),
      featureText_2: (
        <>
          🛠️ <b>项目管理与执行力</b>，确保项目按里程碑高效推进
        </>
      ),
      featureText_3: (
        <>
          🔄 <b>数据驱动的产品优化</b>，持续提升用户体验和产品性能
        </>
      ),
      openLink: '/app/proMode?tabPane_uuid=product_manager',
    },
    {
      icon: '/img/icons/2023-09-18-img-11-icon-social-media.png',
      proModeModuleName: '小红书达人',
      featureText_1: (
        <>
          🖋 制定与执行<b>针对性的内容计划</b>，满足受众需求并增强用户互动
        </>
      ),
      featureText_2: (
        <>
          📈 利用<b>市场趋势和数据分析</b>，优化内容策略并提高内容分发效率
        </>
      ),
      featureText_3: (
        <>
          🎨 应用<b>创意故事讲述和差异化策略</b>，增强品牌形象并突出竞争优势
        </>
      ),
      openLink: '/app/proMode?tabPane_uuid=xiaoHongShu',
    },
    {
      icon: '/img/icons/2024-05-24-img-18-content-writing.png',
      proModeModuleName: '写帖子神器',
      featureText_1: (
        <>
          📝 提供帖子主题并添加背景信息，<b>一键生成精致初稿</b>
        </>
      ),
      featureText_2: (
        <>
          ✏️ 根据反馈意见<b>即时调整初稿</b>，精细打磨帖子内容
        </>
      ),
      featureText_3: (
        <>
          🕒 <b>保存每一步的版本变化</b>，轻松回到任何草稿版本
        </>
      ),
      openLink: '/app/proMode?tabPane_uuid=writingPostChain_v2',
    },
    {
      icon: '/img/icons/2024-05-24-img-19-rubber.png',
      proModeModuleName: '帖子重写',
      featureText_1: (
        <>
          🔄 输入一篇帖子，<b>同时获得四种不同角度的重写版本</b>
        </>
      ),
      featureText_2: (
        <>
          🎯 提出修改意见，<b>定向优化每个版本</b>以满足具体需求
        </>
      ),
      featureText_3: (
        <>
          📌 详细填写背景信息，<b>精细定制帖子的主题和内容质量</b>
        </>
      ),
      openLink: '/app/proMode?tabPane_uuid=morePostsChain',
    },
    {
      icon: '/img/icons/2024-05-24-img-20-recommend.png',
      proModeModuleName: '自媒体类型推荐',
      featureText_1: (
        <>
          🌟 根据您的个人兴趣和市场需求，<b>量身定制自媒体类型建议</b>
        </>
      ),
      featureText_2: (
        <>
          📊 对您的背景和兴趣进行详尽分析，<b>精确推荐符合的自媒体类型</b>
        </>
      ),
      featureText_3: (
        <>
          🚀 为所推荐的自媒体类型提供<b>实用的运营策略和内容创作指导</b>
        </>
      ),
      openLink: '/app/proMode?tabPane_uuid=selfMediaRecommandChain',
    },
    {
      icon: '/img/icons/2024-05-24-img-21-chat-balloons.png',
      proModeModuleName: '话题拓展',
      featureText_1: (
        <>
          🌟 根据博主特性和受众需求，<b>精确定制话题拓展计划</b>
        </>
      ),
      featureText_2: (
        <>
          🔍 提供详细的话题建议，<b>每项包括发展路径和策略重点</b>
        </>
      ),
      featureText_3: (
        <>
          📊 明确每个话题的准备流程、调研方法及<b>实用工具和资源</b>
        </>
      ),
      openLink: '/app/proMode?tabPane_uuid=topicFindingToolChain',
    },
    {
      icon: '/img/icons/2024-05-24-img-22-screenshot.png',
      proModeModuleName: '图片尺寸调整',
      featureText_1: (
        <>
          🖼️ 调整图片尺寸以符合各大社交媒体平台的格式要求，<b>选择想要的位置和截取范围</b>
        </>
      ),
      featureText_2: (
        <>
          🌐 支持小红书、微信、抖音、微博、哔哩哔哩、快手、知乎等图片规格，<b>持续增加新的支持平台</b>
        </>
      ),
      featureText_3: (
        <>
          ⚡ <b>一键调整</b>，操作简便，实现精准的图片定制
        </>
      ),
      openLink: '/app/proMode?tabPane_uuid=tool-image-crop',
    },
  ];

  const homePageFeatures_en: IOneFeature[] = [
    {
      icon: '/img/icons/2024-05-24-img-17-product-management.png',
      proModeModuleName: 'Product Manager',
      featureText_1: (
        <>
          📊 <b>From requirements to product features</b>, accurately grasp market and user needs
        </>
      ),
      featureText_2: (
        <>
          🛠️ <b>Project management and execution</b>, ensuring projects progress efficiently by milestones
        </>
      ),
      featureText_3: (
        <>
          🔄 <b>Data-driven product optimization</b>, continuously enhancing user experience and product performance
        </>
      ),
      openLink: '/app/proMode?tabPane_uuid=product_manager',
    },
    {
      icon: '/img/icons/2023-09-18-img-11-icon-social-media.png',
      proModeModuleName: 'Xiaohongshu Expert',
      featureText_1: (
        <>
          🖋 Create and execute <b>targeted content plans</b>, meet audience needs and enhance user interaction
        </>
      ),
      featureText_2: (
        <>
          📈 Utilize <b>market trends and data analysis</b>, optimize content strategy and improve content distribution
          efficiency
        </>
      ),
      featureText_3: (
        <>
          🎨 Apply <b>creative storytelling and differentiated strategies</b>, enhance brand image and highlight
          competitive advantages
        </>
      ),
      openLink: '/app/proMode?tabPane_uuid=xiaoHongShu',
    },
    {
      icon: '/img/icons/2024-05-24-img-18-content-writing.png',
      proModeModuleName: 'Post Writing Wizard',
      featureText_1: (
        <>
          📝 Provide post themes and add background information, <b>generate a refined draft with one click</b>
        </>
      ),
      featureText_2: (
        <>
          ✏️ <b>Instantly adjust the draft</b> based on feedback, finely polish the content of the post
        </>
      ),
      featureText_3: (
        <>
          🕒 <b>Save each step of version changes</b>, easily revert to any draft version
        </>
      ),
      openLink: '/app/proMode?tabPane_uuid=writingPostChain_v2',
    },
    {
      icon: '/img/icons/2024-05-24-img-19-rubber.png',
      proModeModuleName: 'Post Rewriting',
      featureText_1: (
        <>
          🔄 Input a post, <b>simultaneously get four different rewrites from different perspectives</b>
        </>
      ),
      featureText_2: (
        <>
          🎯 Propose modifications, <b>specifically optimize each version</b> to meet specific needs
        </>
      ),
      featureText_3: (
        <>
          📌 Fill in detailed background information, <b>finely customize the theme and content quality of the post</b>
        </>
      ),
      openLink: '/app/proMode?tabPane_uuid=morePostsChain',
    },
    {
      icon: '/img/icons/2024-05-24-img-20-recommend.png',
      proModeModuleName: 'Self-Media Type Recommendation',
      featureText_1: (
        <>
          🌟 Based on your personal interests and market needs, <b>tailor recommendations for self-media types</b>
        </>
      ),
      featureText_2: (
        <>
          📊 Perform a detailed analysis of your background and interests,{' '}
          <b>accurately recommend suitable self-media types</b>
        </>
      ),
      featureText_3: (
        <>
          🚀 Provide <b>practical operational strategies and content creation guidance</b> for the recommended
          self-media types
        </>
      ),
      openLink: '/app/proMode?tabPane_uuid=selfMediaRecommandChain',
    },
    {
      icon: '/img/icons/2024-05-24-img-21-chat-balloons.png',
      proModeModuleName: 'Topic Expansion',
      featureText_1: (
        <>
          🌟 Based on blogger characteristics and audience needs, <b>precisely customize topic expansion plans</b>
        </>
      ),
      featureText_2: (
        <>
          🔍 Provide detailed topic suggestions, <b>each including development paths and strategic focuses</b>
        </>
      ),
      featureText_3: (
        <>
          📊 Clearly define each topic's preparation process, research methods, and <b>practical tools and resources</b>
        </>
      ),
      openLink: '/app/proMode?tabPane_uuid=topicFindingToolChain',
    },
    {
      icon: '/img/icons/2024-05-24-img-22-screenshot.png',
      proModeModuleName: 'Image Resizing',
      featureText_1: (
        <>
          🖼️ Adjust image sizes to meet the format requirements of major social media platforms,{' '}
          <b>select the desired position and cropping range</b>
        </>
      ),
      featureText_2: (
        <>
          🌐 Supports image specifications for Xiaohongshu, WeChat, Douyin, Weibo, Bilibili, Kuaishou, Zhihu, and more,{' '}
          <b>continuously adding new supported platforms</b>
        </>
      ),
      featureText_3: (
        <>
          ⚡ <b>One-click adjustment</b>, easy to operate, achieving precise image customization
        </>
      ),
      openLink: '/app/proMode?tabPane_uuid=tool-image-crop',
    },
  ];
  const proModePageFeatures_zh: IOneFeature[] = [];

  return (
    <div className="mt-16 grid divide-x divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-3xl border border-gray-100 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
      {locale === 'en' &&
        homePageFeatures_en.map((item) => {
          return <Card_with_click item={item} locale={locale} baseUrl={baseUrl} imgBaseUrl={imgBaseUrl} />;
        })}
      {locale === 'zh' &&
        homePageFeatures_zh.map((item) => {
          return <Card_with_click item={item} locale={locale} baseUrl={baseUrl} imgBaseUrl={imgBaseUrl} />;
        })}

      {/* More cards for homePage */}
      {isHomePage && (
        <div className="group relative bg-gray-50 dark:bg-gray-900 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
          <a className="!no-underline" href={'/app'}>
            <div className="relative space-y-8 py-12 p-8 transition duration-300 group-hover:bg-white dark:group-hover:bg-gray-800">
              <img
                src={imgBaseUrl + '/img/icons/2023-09-18-img-14-icon-more-features-easy-use.png'}
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

      {!isHomePage &&
        proModePageFeatures_zh.map((item) => {
          const { openLink } = item;

          if (!openLink || (openLink && openLink === '#'))
            return <Card_without_click item={item} imgBaseUrl={imgBaseUrl} />;

          return <Card_with_click item={item} locale={locale} baseUrl={baseUrl} imgBaseUrl={imgBaseUrl} />;
        })}

      {/* More cards for application-senarios */}
      {!isHomePage && (
        <>
          <div className="group relative bg-gray-50 dark:bg-gray-900 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
            <a className="!no-underline" href={'/app'}>
              <div className="relative space-y-8 py-12 p-8 transition duration-300 group-hover:bg-white dark:group-hover:bg-gray-800 h-full">
                <img
                  src={imgBaseUrl + '/img/icons/2023-09-22-img-16-treasure.png'}
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
  );
};

interface IProModeWindowFeatures {
  locale: string;
}
export const ProModeWindowFeatures = (props: IProModeWindowFeatures) => {
  const { locale } = props;
  return (
    <div
      id="features"
      style={{
        padding: '1rem',
        margin: '1rem auto',
      }}
    >
      <div className="md:w-2/3 lg:w-1/2" style={{ padding: '0 2rem' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-secondary"
        >
          <path
            fillRule="evenodd"
            d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
            clipRule="evenodd"
          />
        </svg>

        {locale === 'en' && (
          <>
            <h2 className="my-8 text-2xl font-bold text-gray-700 dark:text-white md:text-4xl">
              Smart AI, Making Your Self-Media Marketing Easier
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our AI tools provide you with a powerful platform to automate content generation, analyze audience data,
              and optimize your self-media strategy.
            </p>
          </>
        )}
        {locale === 'zh' && (
          <>
            <h2 className="my-8 text-2xl font-bold text-gray-700 dark:text-white md:text-4xl">
              智能AI，让您的自媒体营销更轻松
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              我们的AI工具为您提供了一个强大的平台，帮助您自动化内容生成、分析受众数据并优化您的自媒体战略。
            </p>
          </>
        )}
      </div>
      <CardsForFeatures
        locale={locale}
        // location="webApp"
      />
    </div>
  );
};
