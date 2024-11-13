import { ELocale } from '../../../gpt-ai-flow-common/enum-app/ELocale';
import { getT_with_i18next } from '../../../gpt-ai-flow-common/i18nProvider/localesFrontendFactory_v2';
import {
  EProMode_v4_role,
  EProMode_v4_module_uuid,
  EProMode_v4_role_labels,
} from '../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/EProMode_v4_module';
import { docBaseUrl, webAppUrl } from './constant';
import { IOneFeature } from './interface';

export const getModules = (isHomePage: boolean, locale: ELocale) => {
  // const t = getT_with_i18next(locale);

  const homePageModules_zh: IOneFeature[] = [
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
      docOpenLink: isHomePage
        ? `${docBaseUrl}/${locale}/docs/application-scenarios/overview`
        : `${docBaseUrl}/${locale}/docs/application-scenarios/social-media-post-creator`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=writingPostAgent`,
    },
    {
      icon: '/img/icons/2024-06-15-img-23-icon-communication-expression-megaphone.png',
      proModeModuleName: '对话优化',
      featureText_1: (
        <>
          🤖 输入现有对话，智能<b>提出替代表达和回答</b>
        </>
      ),
      featureText_2: (
        <>
          👥 设定目标听众，<b>定向调整对话风格和内容</b>
        </>
      ),
      featureText_3: (
        <>
          📌 提供反馈，不断<b>优化对话表达与回答方式</b>
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=communicationChain`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=communicationChain`,
    },
    {
      icon: '/img/icons/2024-10-18-img-32-summary.png',
      proModeModuleName: '总结工具',
      featureText_1: (
        <>
          📚 <b>快速提取关键信息</b>，节省阅读时间
        </>
      ),
      featureText_2: (
        <>
          🔍 <b>多角度分析内容</b>，深入理解核心要点
        </>
      ),
      featureText_3: (
        <>
          📊 <b>生成结构化摘要</b>，便于复习和分享
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=${EProMode_v4_module_uuid.MODULE_14_SUMMARY}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=${EProMode_v4_module_uuid.MODULE_14_SUMMARY}`,
    },
    {
      icon: '/img/icons/2024-10-18-img-34-meeting-table.png',
      proModeModuleName: '会议报告',
      featureText_1: (
        <>
          🎯 <b>自动提取会议要点</b>，确保重要信息不遗漏
        </>
      ),
      featureText_2: (
        <>
          👥 <b>智能分配任务和跟进事项</b>，提高会议效率
        </>
      ),
      featureText_3: (
        <>
          📅 <b>生成清晰的会议纪要</b>，便于后续追踪和执行
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=${EProMode_v4_module_uuid.MODULE_15_MEETING_REPORT}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=${EProMode_v4_module_uuid.MODULE_15_MEETING_REPORT}`,
    },
    {
      icon: '/img/icons/2024-10-18-img-31-outline.png',
      proModeModuleName: '大纲工具',
      featureText_1: (
        <>
          🌳 <b>快速生成层次分明的结构</b>，理清思路
        </>
      ),
      featureText_2: (
        <>
          🔀 <b>灵活调整大纲顺序</b>，优化内容逻辑
        </>
      ),
      featureText_3: (
        <>
          📝 <b>一键展开大纲为文章</b>，提高写作效率
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=${EProMode_v4_module_uuid.MODULE_13_OUTLINE_TOOL}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=${EProMode_v4_module_uuid.MODULE_13_OUTLINE_TOOL}`,
    },
    {
      icon: '/img/icons/2024-06-30-img-25-seo.png',
      proModeModuleName: 'SEO 优化工具',
      featureText_1: (
        <>
          🔍 <b>直接抓取页面内容</b>, 作为优化的起点
        </>
      ),
      featureText_2: (
        <>
          💡 <b>直接提供优化结果</b>, 查看效果立竿见影
        </>
      ),
      featureText_3: (
        <>
          🔁 <b>根据反馈迭代</b>, 不断优化SEO内容
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=SEOChain`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=SEOChain`,
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
      docOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=xiaoHongShu`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=xiaoHongShu`,
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
      docOpenLink: isHomePage
        ? `${docBaseUrl}/${locale}/docs/application-scenarios/overview`
        : `${docBaseUrl}/${locale}/docs/application-scenarios/post-rewriting-tool`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=morePostsChain`,
    },
  ];
  const homePageModules_en: IOneFeature[] = [
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
      docOpenLink: isHomePage
        ? `${docBaseUrl}/docs/application-scenarios/overview`
        : `${docBaseUrl}/docs/application-scenarios/social-media-post-creator`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=writingPostAgent`,
    },
    {
      icon: '/img/icons/2024-06-15-img-23-icon-communication-expression-megaphone.png',
      proModeModuleName: 'Dialogue Optimization',
      featureText_1: (
        <>
          🤖 Enter existing conversations and intelligently <b>suggest alternative expressions and responses</b>
        </>
      ),
      featureText_2: (
        <>
          👥 Set target audience and <b>customize the dialogue style and content</b>
        </>
      ),
      featureText_3: (
        <>
          📌 Provide feedback to continuously <b>improve the expression and response methods in dialogues</b>
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=communicationChain`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=communicationChain`,
    },
    {
      icon: '/img/icons/2024-10-18-img-32-summary.png',
      proModeModuleName: 'Summary Tool',
      featureText_1: (
        <>
          📚 <b>Quickly extract key information</b>, saving reading time
        </>
      ),
      featureText_2: (
        <>
          🔍 <b>Analyze content from multiple angles</b>, deepening understanding of core points
        </>
      ),
      featureText_3: (
        <>
          📊 <b>Generate structured abstracts</b>, facilitating review and sharing
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=${EProMode_v4_module_uuid.MODULE_14_SUMMARY}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=${EProMode_v4_module_uuid.MODULE_14_SUMMARY}`,
    },
    {
      icon: '/img/icons/2024-10-18-img-34-meeting-table.png',
      proModeModuleName: 'Meeting Report',
      featureText_1: (
        <>
          🎯 <b>Automatically extract meeting key points</b>, ensuring no important information is missed
        </>
      ),
      featureText_2: (
        <>
          👥 <b>Intelligently assign tasks and follow-up items</b>, enhancing meeting efficiency
        </>
      ),
      featureText_3: (
        <>
          📅 <b>Generate clear meeting minutes</b>, facilitating subsequent tracking and execution
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=${EProMode_v4_module_uuid.MODULE_15_MEETING_REPORT}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=${EProMode_v4_module_uuid.MODULE_15_MEETING_REPORT}`,
    },
    {
      icon: '/img/icons/2024-10-18-img-31-outline.png',
      proModeModuleName: 'Outline Tool',
      featureText_1: (
        <>
          🌳 <b>Quickly generate hierarchical structures</b>, clarifying thoughts
        </>
      ),
      featureText_2: (
        <>
          🔀 <b>Flexibly adjust outline order</b>, optimizing content logic
        </>
      ),
      featureText_3: (
        <>
          📝 <b>Expand outline into article with one click</b>, improving writing efficiency
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=${EProMode_v4_module_uuid.MODULE_13_OUTLINE_TOOL}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=${EProMode_v4_module_uuid.MODULE_13_OUTLINE_TOOL}`,
    },
    {
      icon: '/img/icons/2024-06-30-img-25-seo.png',
      proModeModuleName: 'SEO Optimization Tool',
      featureText_1: (
        <>
          🔍 <b>Directly extract page content</b> as the starting point for optimization
        </>
      ),
      featureText_2: (
        <>
          💡 <b>Provide immediate optimization results</b>, see effects instantly
        </>
      ),
      featureText_3: (
        <>
          🔁 <b>Iterate based on feedback</b>, continuously optimize SEO content
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=SEOChain`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=SEOChain`,
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
      docOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=xiaoHongShu`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=xiaoHongShu`,
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
      docOpenLink: isHomePage
        ? `${docBaseUrl}/docs/application-scenarios/overview`
        : `${docBaseUrl}/docs/application-scenarios/post-rewriting-tool`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=morePostsChain`,
    },
  ];
  const proModePageModules_en: IOneFeature[] = [
    {
      icon: '/img/icons/2024-10-19-img-35-translate.png',
      proModeModuleName: 'Translation Tool',
      featureText_1: (
        <>
          🌐 <b>Support multi-language translation</b>, breaking language barriers
        </>
      ),
      featureText_2: (
        <>
          🧠 <b>Intelligent context understanding</b>, ensuring translation accuracy
        </>
      ),
      featureText_3: (
        <>
          📚 <b>Professional terminology database support</b>, providing industry-specific precise translations
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=${EProMode_v4_module_uuid.MODULE_12_TRANSLATE_TOOLS}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=${EProMode_v4_module_uuid.MODULE_12_TRANSLATE_TOOLS}`,
    },
    {
      icon: '/img/icons/2023-09-22-img-7-fountain-pen.png',
      proModeModuleName: 'Article Refinement and Optimization',
      featureText_1: (
        <>
          📝 Select <b>varied writing styles and structures</b> to enrich the presentation of the article
        </>
      ),
      featureText_2: (
        <>
          ✨ Adjust and optimize the article based on user feedback to <b>enhance the reading experience</b>
        </>
      ),
      featureText_3: (
        <>
          🔄 <b>Switch between different draft versions with one click</b> for easy comparison of editing effects
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=contentWritingChain`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=contentWritingChain`,
    },
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
      docOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=product_manager`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=product_manager`,
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
      docOpenLink: isHomePage
        ? `${docBaseUrl}/docs/application-scenarios/overview`
        : `${docBaseUrl}/docs/application-scenarios/self-media-type-recommendation`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=selfMediaRecommandChain`,
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
      docOpenLink: isHomePage
        ? `${docBaseUrl}/docs/application-scenarios/overview`
        : `${docBaseUrl}/docs/application-scenarios/topic-expansion-for-content-creators`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=topicFindingToolChain`,
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
      docOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=communicationChain`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=tool-image-crop`,
    },
    {
      icon: '/img/icons/2024-06-30-img-24-comment.png',
      proModeModuleName: 'Comment Writing Wizard',
      featureText_1: (
        <>
          📖 Provide original text analysis and{' '}
          <b>automatically generate initial drafts of comments closely related to the topic</b>
        </>
      ),
      featureText_2: (
        <>
          📌 Customize comment content <b>based on specific backgrounds and target audiences</b> to meet the needs of
          different contexts
        </>
      ),
      featureText_3: (
        <>
          ♻️ Refine each comment through <b>continuous version iterations</b>
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=writingCommentChain`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=writingCommentChain`,
    },
  ];
  const proModePageModules_zh: IOneFeature[] = [
    {
      icon: '/img/icons/2024-10-19-img-35-translate.png',
      proModeModuleName: '翻译工具',
      featureText_1: (
        <>
          🌐 <b>支持多种语言互译</b>，打破语言障碍
        </>
      ),
      featureText_2: (
        <>
          🧠 <b>智能理解上下文</b>，确保翻译准确性
        </>
      ),
      featureText_3: (
        <>
          📚 <b>专业术语库支持</b>，提供行业精准翻译
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=${EProMode_v4_module_uuid.MODULE_12_TRANSLATE_TOOLS}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=${EProMode_v4_module_uuid.MODULE_12_TRANSLATE_TOOLS}`,
    },
    {
      icon: '/img/icons/2023-09-22-img-7-fountain-pen.png',
      proModeModuleName: '文章细化与优化',
      featureText_1: (
        <>
          📝 挑选多样的文风与结构，<b>丰富文章表现力</b>
        </>
      ),
      featureText_2: (
        <>
          ✨ 基于反馈调整和优化文章，<b>提升阅读体验</b>
        </>
      ),
      featureText_3: (
        <>
          🔄 <b>一键切换草稿版本</b>，方便比较编辑效果
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=contentWritingChain`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=contentWritingChain`,
    },
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
      docOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=product_manager`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=product_manager`,
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
      docOpenLink: isHomePage
        ? `${docBaseUrl}/${locale}/docs/application-scenarios/overview`
        : `${docBaseUrl}/${locale}/docs/application-scenarios/self-media-type-recommendation`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=selfMediaRecommandChain`,
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
      docOpenLink: isHomePage
        ? `${docBaseUrl}/${locale}/docs/application-scenarios/overview`
        : `${docBaseUrl}/${locale}/docs/application-scenarios/topic-expansion-for-content-creators`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=topicFindingToolChain`,
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
      docOpenLink: isHomePage
        ? `${docBaseUrl}/${locale}/docs/application-scenarios/overview`
        : `${docBaseUrl}/${locale}/docs/application-scenarios/tool-for-image-resizing-social-media`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=tool-image-crop`,
    },
    {
      icon: '/img/icons/2024-06-30-img-24-comment.png',
      proModeModuleName: '写评论神器',
      featureText_1: (
        <>
          📖 提供原文分析，<b>自动引出与主题紧密相关的评论初稿</b>
        </>
      ),
      featureText_2: (
        <>
          📌 根据特定背景和目标读者群体，<b>定制评论内容</b>以满足不同语境需求
        </>
      ),
      featureText_3: (
        <>
          ♻️ 通过<b>持续版本迭代</b>，对每一个评论进行精细的语句打磨
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=writingCommentChain`,
      webAppOpenLink: `${webAppUrl}/app/proMode?tabPane_uuid=writingCommentChain`,
    },
  ];

  if (!isHomePage) {
    if (locale === 'zh') {
      return [...homePageModules_zh, ...proModePageModules_zh];
    }

    return [...homePageModules_en, ...proModePageModules_en];
  }

  if (locale === 'zh') {
    return homePageModules_zh;
  }

  return homePageModules_en;
};

export const getRoles = (isHomePage: boolean, locale: ELocale) => {
  const t = getT_with_i18next(locale);

  const homePageRoles_zh: IOneFeature[] = [];
  const homePageRoles_en: IOneFeature[] = [];

  const proModePageRoles_zh: IOneFeature[] = [
    {
      icon: '/img/icons/2024-10-05-img-27-office-worker-working-at-home.png',
      proModeModuleName: '职场',
      featureText_1: (
        <>
          💼 <b>高效的职场精英</b>：善于管理时间,制定计划,并高质量完成工作
        </>
      ),
      featureText_2: (
        <>
          🤝 <b>沟通协调能手</b>：与同事和上级保持良好沟通,促进团队协作
        </>
      ),
      featureText_3: (
        <>
          📈 <b>敏锐的行业洞察者</b>：紧跟行业动态,不断学习新知识和技能
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?role=${EProMode_v4_role.ROLE_01_WORK_PLACE}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_04_COMMUNICATION}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?role=${EProMode_v4_role.ROLE_01_WORK_PLACE}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_04_COMMUNICATION}`,
    },
    {
      icon: '/img/icons/2024-10-05-img-28-content-worker-writer.png',
      proModeModuleName: '内容工作者',
      featureText_1: (
        <>
          ✒️ <b>创意无限的内容创造者</b>：擅长创作引人入胜、独具一格的内容
        </>
      ),
      featureText_2: (
        <>
          🎥 <b>多媒体制作专家</b>：熟练掌握图文、音视频等多种内容形式
        </>
      ),
      featureText_3: (
        <>
          🔍 <b>用户需求的洞察者</b>：深入了解受众需求,创造有价值的内容
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?role=${EProMode_v4_role.ROLE_02_CONTENT_WORKER}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_06_CONTENT_WRITING}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?role=${EProMode_v4_role.ROLE_02_CONTENT_WORKER}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_06_CONTENT_WRITING}`,
    },
    {
      icon: '/img/icons/2024-10-05-img-29-social-media-influencer.png',
      proModeModuleName: t.get(EProMode_v4_role_labels[EProMode_v4_role.ROLE_05_PLATFORM_XIAOHONGSHU]),
      featureText_1: (
        <>
          📱 <b>社交媒体的原住民</b>：熟悉各大平台,善于利用平台特性传播内容
        </>
      ),
      featureText_2: (
        <>
          🎤 <b>个人品牌的缔造者</b>：通过独特的内容和风格,建立个人品牌影响力
        </>
      ),
      featureText_3: (
        <>
          📈 <b>商业价值的创造者</b>：将流量转化为商业价值,实现内容变现
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?role=${EProMode_v4_role.ROLE_05_PLATFORM_XIAOHONGSHU}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_07_WRITING_POST_AGENT}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?role=${EProMode_v4_role.ROLE_05_PLATFORM_XIAOHONGSHU}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_07_WRITING_POST_AGENT}`,
    },
    {
      icon: '/img/icons/2024-10-05-img-30-product-manager.png',
      proModeModuleName: '产品经理',
      featureText_1: (
        <>
          🔍 <b>用户需求的探索者</b>：深入了解用户痛点,挖掘产品机会
        </>
      ),
      featureText_2: (
        <>
          🧩 <b>产品方案的设计师</b>：设计满足用户需求、具备市场竞争力的产品方案
        </>
      ),
      featureText_3: (
        <>
          🚀 <b>产品成长的推动者</b>：制定产品路线图,推动产品迭代与优化
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?role=${EProMode_v4_role.ROLE_04_PRODUCT_MANAGER}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_10_PRODUCT_MANAGER}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?role=${EProMode_v4_role.ROLE_04_PRODUCT_MANAGER}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_10_PRODUCT_MANAGER}`,
    },
  ];
  const proModePageRoles_en: IOneFeature[] = [
    {
      icon: '/img/icons/2024-10-05-img-27-office-worker-working-at-home.png',
      proModeModuleName: 'Workplace',
      featureText_1: (
        <>
          💼 <b>Efficient Professional</b>: Skilled in time management, planning, and delivering high-quality work
        </>
      ),
      featureText_2: (
        <>
          🤝 <b>Communication and Coordination Expert</b>: Maintains good communication with colleagues and superiors,
          promoting team collaboration
        </>
      ),
      featureText_3: (
        <>
          📈 <b>Keen Industry Insights</b>: Stays up-to-date with industry trends, continuously learning new knowledge
          and skills
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?role=${EProMode_v4_role.ROLE_01_WORK_PLACE}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_04_COMMUNICATION}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?role=${EProMode_v4_role.ROLE_01_WORK_PLACE}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_04_COMMUNICATION}`,
    },
    {
      icon: '/img/icons/2024-10-05-img-28-content-worker-writer.png',
      proModeModuleName: 'Content Creator',
      featureText_1: (
        <>
          ✒️ <b>Creative Content Producer</b>: Skilled in creating engaging and unique content
        </>
      ),
      featureText_2: (
        <>
          🎥 <b>Multimedia Production Expert</b>: Proficient in various content formats, including text, images, audio,
          and video
        </>
      ),
      featureText_3: (
        <>
          🔍 <b>User Needs Insights</b>: Deeply understands audience needs and creates valuable content
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?role=${EProMode_v4_role.ROLE_02_CONTENT_WORKER}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_06_CONTENT_WRITING}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?role=${EProMode_v4_role.ROLE_02_CONTENT_WORKER}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_06_CONTENT_WRITING}`,
    },
    {
      icon: '/img/icons/2024-10-05-img-29-social-media-influencer.png',
      proModeModuleName: t.get(EProMode_v4_role_labels[EProMode_v4_role.ROLE_05_PLATFORM_XIAOHONGSHU]),
      featureText_1: (
        <>
          📱 <b>Social Media Native</b>: Familiar with various platforms and skilled in leveraging platform features to
          spread content
        </>
      ),
      featureText_2: (
        <>
          🎤 <b>Personal Brand Builder</b>: Establishes personal brand influence through unique content and style
        </>
      ),
      featureText_3: (
        <>
          📈 <b>Business Value Creator</b>: Converts traffic into business value, achieving content monetization
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?role=${EProMode_v4_role.ROLE_05_PLATFORM_XIAOHONGSHU}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_07_WRITING_POST_AGENT}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?role=${EProMode_v4_role.ROLE_05_PLATFORM_XIAOHONGSHU}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_07_WRITING_POST_AGENT}`,
    },
    {
      icon: '/img/icons/2024-10-05-img-30-product-manager.png',
      proModeModuleName: 'Product Manager',
      featureText_1: (
        <>
          🔍 <b>User Needs Explorer</b>: Deeply understands user pain points and identifies product opportunities
        </>
      ),
      featureText_2: (
        <>
          🧩 <b>Product Solution Designer</b>: Designs product solutions that meet user needs and have market
          competitiveness
        </>
      ),
      featureText_3: (
        <>
          🚀 <b>Product Growth Driver</b>: Develops product roadmaps and drives product iteration and optimization
        </>
      ),
      docOpenLink: `${webAppUrl}/app/proMode?role=${EProMode_v4_role.ROLE_04_PRODUCT_MANAGER}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_10_PRODUCT_MANAGER}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?role=${EProMode_v4_role.ROLE_04_PRODUCT_MANAGER}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_10_PRODUCT_MANAGER}`,
    },
  ];

  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  const proModePageRoles_zh_next: IOneFeature[] = [
    {
      icon: '/img/icons/2024-07-15-img-3-freelancer.png',
      proModeModuleName: '自由职业者',
      featureText_1: (
        <>
          🎨 <b>全能的创意专家</b>：涉猎广泛,能够提供多元化的创意服务
        </>
      ),
      featureText_2: (
        <>
          ⏰ <b>灵活的时间管理大师</b>：自由安排工作时间,兼顾工作与生活
        </>
      ),
      featureText_3: (
        <>
          💼 <b>独立自主的个体经营者</b>：自己就是老板,掌控职业发展方向
        </>
      ),
      docOpenLink: '/app/proMode?tabPane_uuid=freelancerProfile',
      webAppOpenLink: '/app/proMode?tabPane_uuid=freelancerProfile',
    },
    // 设计师
    // 程序员
    // 市场营销专员
    // 数据分析师
    // 人力资源专员
    // 客户服务代表
    // 销售代表
    // 财务专员
    // 法律顾问
    // 公关专员
    // 翻译
    // 作家
    // 教师
    // 培训师
    // 创业者
  ];

  if (!isHomePage) {
    if (locale === 'zh') {
      return [...homePageRoles_zh, ...proModePageRoles_zh];
    }

    return [...homePageRoles_en, ...proModePageRoles_en];
  }

  if (locale === 'zh') {
    return homePageRoles_zh;
  }

  return homePageRoles_en;
};
