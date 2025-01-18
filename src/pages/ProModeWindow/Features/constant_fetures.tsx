import { ELocale } from '../../../gpt-ai-flow-common/enum-app/ELocale';
import { getT_with_i18next } from '../../../gpt-ai-flow-common/i18nProvider/localesFrontendFactory_v2';
import {
  EProMode_v4_role,
  EProMode_v4_module_uuid,
  EProMode_v4_role_labels,
} from '../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/EProMode_v4_module';
import {
  ESocialPlatform_moduleName,
  ESocialPlatform_platformName,
} from '../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/03-langchain/01-iterate-and-optimize/00-prototype-2024-12-02-socialPlatform/ESocialPlatofrm';
import { docBaseUrl, webAppUrl } from './constant';
import { IOneFeature } from './interface';

export const getModules = (locale: ELocale) => {
  // const t = getT_with_i18next(locale);

  const homePageModules_zh: IOneFeature[] = [
    {
      icon: '/img/icons/2024-05-24-img-18-content-writing.png',
      proModeModuleName: '写帖子神器',
      description: '一键生成帖子草稿，智能打磨内容，随时查看历史版本，让发帖更轻松高效。',
      docOpenLink: `${docBaseUrl}/${locale}/docs/application-scenarios/social-media-post-creator`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_07_WRITING_POST_AGENT_FOR_XIAOHONGSHU_PLATFORM}`,
    },
    {
      icon: '/img/icons/2024-06-15-img-23-icon-communication-expression-megaphone.png',
      proModeModuleName: '对话优化',
      description: '让对话更有效：优化表达方式，调整语气，让沟通更到位。',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_04_COMMUNICATION}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_04_COMMUNICATION}`,
    },
    {
      icon: '/img/icons/2024-10-18-img-32-summary.png',
      proModeModuleName: '总结工具',
      description: '一键提炼文章精华：快速抓住重点，理解更透彻，分享更方便。',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_14_SUMMARY}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_14_SUMMARY}`,
    },
    {
      icon: '/img/icons/2024-10-18-img-34-meeting-table.png',
      proModeModuleName: '会议报告',
      description: '一键整理会议精华：提炼重点、分配任务、生成纪要，让每次会议都高效执行。',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_15_MEETING_REPORT}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_15_MEETING_REPORT}`,
    },
    {
      icon: '/img/icons/2024-10-18-img-31-outline.png',
      proModeModuleName: '大纲工具',
      description: '轻松写文章：一键生成清晰大纲，随心调整结构，快速扩展成文章。',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_13_OUTLINE_TOOL}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_13_OUTLINE_TOOL}`,
    },
    {
      icon: '/img/icons/2024-06-30-img-25-seo.png',
      proModeModuleName: 'SEO 优化工具',
      description: '让网站内容更容易被搜索到：分析页面、获取优化建议、持续提升排名效果。',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_09_SEO_CHAIN}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_09_SEO_CHAIN}`,
    },
    {
      icon: '/img/icons/2023-09-18-img-11-icon-social-media.png',
      proModeModuleName: '小红书达人',
      description: '打造爆款内容：策划主题、把握热点、讲好品牌故事，让你的作品更吸睛。',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_05_XIAOHONGSHU_PLATFORM}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_02_TOPIC_FINDING_FOR_XIAOHONGSHU_PLATFORM}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_05_XIAOHONGSHU_PLATFORM}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_02_TOPIC_FINDING_FOR_XIAOHONGSHU_PLATFORM}`,
    },
    {
      icon: '/img/icons/2024-05-24-img-19-rubber.png',
      proModeModuleName: '帖子重写',
      description: '一键获得四种全新写法：快速改写帖子，按需调整细节，打造完美版本。',
      docOpenLink: `${docBaseUrl}/${locale}/docs/application-scenarios/post-rewriting-tool`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_08_REWRITING_TOOLS}`,
    },
  ];

  const homePageModules_en: IOneFeature[] = [
    {
      icon: '/img/icons/2024-05-24-img-18-content-writing.png',
      proModeModuleName: 'Post Writing Wizard',
      description: 'Write better posts faster: Get themes, create drafts & polish content with easy editing history.',
      docOpenLink: `${docBaseUrl}/docs/application-scenarios/social-media-post-creator`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_07_WRITING_POST_AGENT_FOR_XIAOHONGSHU_PLATFORM}`,
    },
    {
      icon: '/img/icons/2024-06-15-img-23-icon-communication-expression-megaphone.png',
      proModeModuleName: 'Dialogue Optimization',
      description: 'Make conversations better: Suggest better replies and adapt your tone for different audiences.',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_04_COMMUNICATION}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_04_COMMUNICATION}`,
    },
    {
      icon: '/img/icons/2024-10-18-img-32-summary.png',
      proModeModuleName: 'Summary Tool',
      description: 'Turn long content into clear summaries: Extract key points, analyze deeply & share easily.',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_14_SUMMARY}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_14_SUMMARY}`,
    },
    {
      icon: '/img/icons/2024-10-18-img-34-meeting-table.png',
      proModeModuleName: 'Meeting Report',
      description: 'Turn meetings into action: Capture key points, assign tasks & create clear follow-up summaries.',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_15_MEETING_REPORT}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_15_MEETING_REPORT}`,
    },
    {
      icon: '/img/icons/2024-10-18-img-31-outline.png',
      proModeModuleName: 'Outline Tool',
      description:
        'Create clear outlines: Organize ideas, rearrange sections & turn them into full articles instantly.',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_13_OUTLINE_TOOL}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_13_OUTLINE_TOOL}`,
    },
    {
      icon: '/img/icons/2024-06-30-img-25-seo.png',
      proModeModuleName: 'SEO Optimization Tool',
      description: 'Make your content rank higher: Analyze pages, get instant tips & improve SEO step by step.',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_09_SEO_CHAIN}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_09_SEO_CHAIN}`,
    },
    {
      icon: '/img/icons/2023-09-18-img-11-icon-social-media.png',
      proModeModuleName: 'Xiaohongshu Expert',
      description: "Create engaging content that connects: Plan, track trends & tell your brand's unique story.",
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_05_XIAOHONGSHU_PLATFORM}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_02_TOPIC_FINDING_FOR_XIAOHONGSHU_PLATFORM}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_05_XIAOHONGSHU_PLATFORM}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_02_TOPIC_FINDING_FOR_XIAOHONGSHU_PLATFORM}`,
    },
    {
      icon: '/img/icons/2024-05-24-img-19-rubber.png',
      proModeModuleName: 'Post Rewriting',
      description: 'Transform your posts: Get 4 fresh versions instantly, then customize each to fit your needs.',
      docOpenLink: `${docBaseUrl}/docs/application-scenarios/post-rewriting-tool`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_08_REWRITING_TOOLS}`,
    },
  ];
  const proModePageModules_en: IOneFeature[] = [
    {
      icon: '/img/icons/2024-10-19-img-35-translate.png',
      proModeModuleName: 'Translation Tool',
      description: 'Translate accurately across languages with smart context & industry terms built in.',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_12_TRANSLATE_TOOLS}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_12_TRANSLATE_TOOLS}`,
    },
    {
      icon: '/img/icons/2023-09-22-img-7-fountain-pen.png',
      proModeModuleName: 'Article Refinement and Optimization',
      description: 'Create polished articles: Switch styles, refine content & compare versions with one click.',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_06_CONTENT_WRITING}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_06_CONTENT_WRITING}`,
    },
    {
      icon: '/img/icons/2024-05-24-img-17-product-management.png',
      proModeModuleName: 'Product Manager',
      description: 'Turn ideas into successful products: Plan features, manage projects & improve with user feedback.',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_10_PRODUCT_MANAGER}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_10_PRODUCT_MANAGER}`,
    },
    {
      icon: '/img/icons/2024-05-24-img-20-recommend.png',
      proModeModuleName: 'Self-Media Type Recommendation',
      description: 'Find your perfect content niche: Match your interests with audience needs & get a success roadmap.',
      docOpenLink: `${docBaseUrl}/docs/application-scenarios/self-media-type-recommendation`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_01_SELF_MEDIA_RECOMMEND}`,
    },
    {
      icon: '/img/icons/2024-05-24-img-21-chat-balloons.png',
      proModeModuleName: 'Topic Expansion',
      description: 'Plan your blog content: Get personalized topics, outlines & research guides in one place.',
      docOpenLink: `${docBaseUrl}/docs/application-scenarios/topic-expansion-for-content-creators`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_02_TOPIC_FINDING_FOR_XIAOHONGSHU_PLATFORM}`,
    },
    {
      icon: '/img/icons/2024-05-24-img-22-screenshot.png',
      proModeModuleName: 'Image Resizing',
      description: 'Resize photos perfectly for any social media - quick crop & adjust with preset platform sizes.',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=communicationChain`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_03_TOOL_IMAGE_CROP}`,
    },
    {
      icon: '/img/icons/2024-06-30-img-24-comment.png',
      proModeModuleName: 'Comment Writing',
      description: 'Write thoughtful comments: Analyze topics, customize responses & refine your message step by step.',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_05_WRITING_COMMENT}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_05_WRITING_COMMENT}`,
    },
    {
      icon: '/img/icons/2025-01-18-personalized-target-audience-512x512.png',
      proModeModuleName: 'Personalized AI Module',
      description:
        'Tell us about your needs! Take a quick survey to get a customized AI Module that perfectly matches your workflow and goals.',
      docOpenLink: 'https://forms.gle/rnn7x9NWnk5koeHa6',
      webAppOpenLink: 'https://forms.gle/rnn7x9NWnk5koeHa6',
      // 可以添加一些视觉突出的元素
      // highlight: {
      //   badge: 'NEW',
      //   backgroundColor: '#f0f7ff',
      //   border: '2px dashed #1677ff',
      // },
      // 可以添加激励信息
      // incentive: {
      //   text: 'Get 7-day premium access after completing the survey!',
      //   icon: '🎁',
      // },
    },
  ];
  const proModePageModules_zh: IOneFeature[] = [
    {
      icon: '/img/icons/2024-10-19-img-35-translate.png',
      proModeModuleName: '翻译工具',
      description: '多语言精准翻译：智能理解上下文，专业术语库加持，轻松突破语言障碍。',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_12_TRANSLATE_TOOLS}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_12_TRANSLATE_TOOLS}`,
    },
    {
      icon: '/img/icons/2023-09-22-img-7-fountain-pen.png',
      proModeModuleName: '文章细化与优化',
      description: '让文章更出彩：一键切换写作风格，打磨内容，对比多个版本找到最佳效果。',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_06_CONTENT_WRITING}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_06_CONTENT_WRITING}`,
    },
    {
      icon: '/img/icons/2024-05-24-img-17-product-management.png',
      proModeModuleName: '产品经理',
      description: '打造成功产品：洞察需求、高效执行，用数据持续优化用户体验。',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_10_PRODUCT_MANAGER}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_10_PRODUCT_MANAGER}`,
    },
    {
      icon: '/img/icons/2024-05-24-img-20-recommend.png',
      proModeModuleName: '自媒体类型推荐',
      description: '发现最适合你的自媒体方向：基于兴趣和市场，打造专属成功路线图。',
      docOpenLink: `${docBaseUrl}/${locale}/docs/application-scenarios/self-media-type-recommendation`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_01_SELF_MEDIA_RECOMMEND}`,
    },
    {
      icon: '/img/icons/2024-05-24-img-21-chat-balloons.png',
      proModeModuleName: '话题拓展',
      description: '打造精准话题库：定制专属内容方向，获取详细建议和实用资源一站搞定。',
      docOpenLink: `${docBaseUrl}/${locale}/docs/application-scenarios/topic-expansion-for-content-creators`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_02_TOPIC_FINDING_FOR_XIAOHONGSHU_PLATFORM}`,
    },
    {
      icon: '/img/icons/2024-05-24-img-22-screenshot.png',
      proModeModuleName: '图片尺寸调整',
      description: '一键调整照片尺寸，完美适配各大社交平台，快速裁剪不用愁。',
      docOpenLink: `${docBaseUrl}/${locale}/docs/application-scenarios/tool-for-image-resizing-social-media`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_03_TOOL_IMAGE_CROP}`,
    },
    {
      icon: '/img/icons/2024-06-30-img-24-comment.png',
      proModeModuleName: '写评论',
      description: '轻松写好评论：分析原文重点，定制合适内容，逐步打磨完美表达。',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_05_WRITING_COMMENT}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_05_WRITING_COMMENT}`,
    },
    {
      icon: '/img/icons/2025-01-18-personalized-target-audience-512x512.png',
      proModeModuleName: '专属定制 AI 模块',
      description: '告诉我们您的需求！只需完成一份简单问卷，即可获得完全匹配您工作流程和目标的定制化 AI 模块。',
      docOpenLink: 'https://wj.qq.com/s2/13154598/1770/',
      webAppOpenLink: 'https://wj.qq.com/s2/13154598/1770/',
      // 视觉突出元素
      // highlight: {
      //   badge: '新功能',
      //   backgroundColor: '#f0f7ff',
      //   border: '2px dashed #1677ff',
      // },
      // 激励信息
      // incentive: {
      //   text: '完成问卷即可获得 7 天高级版体验！',
      //   icon: '🎁',
      // },
    },
  ];

  if (locale === 'zh') {
    return [...homePageModules_zh, ...proModePageModules_zh];
  }

  return [...homePageModules_en, ...proModePageModules_en];
};

export const getRoles = (locale: ELocale) => {
  const t = getT_with_i18next(locale);

  const homePageRoles_zh: IOneFeature[] = [];
  const homePageRoles_en: IOneFeature[] = [];

  const proModePageRoles_zh: IOneFeature[] = [
    {
      icon: '/img/icons/2024-11-13-img-37-logo-linkedIn.svg',
      proModeModuleName: '领英平台 AI 助手',
      description:
        '打造专业形象、拓展人脉、分享干货，一站式提升你的职场影响力。智能生成个性化简介和社交话术，轻松获得行业洞察，让你在LinkedIn脱颖而出。',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_06_LINKEDIN_PLATFORM}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_20_TOPIC_FINDING_FOR_LINKEDIN_PLATFORM}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_06_LINKEDIN_PLATFORM}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_20_TOPIC_FINDING_FOR_LINKEDIN_PLATFORM}`,
    },
    {
      icon: '/img/icons/2024-12-04-img-39-logo-twitter.jpg',
      proModeModuleName: 'X (推特) 平台 AI 助手',
      description:
        '一键生成精简推文，智能匹配话题标签，轻松创作连续推文。帮你打造吸引眼球的内容，让更多人发现你的精彩分享。',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_08_X_PLATFORM_PRE_TWITTER}&tabPane_uuid=${ESocialPlatform_platformName.TWITTER}-${ESocialPlatform_moduleName.MODULE_04_WRITING_POST_CHAIN}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_08_X_PLATFORM_PRE_TWITTER}&tabPane_uuid=${ESocialPlatform_platformName.TWITTER}-${ESocialPlatform_moduleName.MODULE_04_WRITING_POST_CHAIN}`,
    },
    {
      icon: '/img/icons/2024-12-04-img-38-logo-facebook.png',
      proModeModuleName: '脸书平台 AI 助手',
      description:
        '一键生成吸引眼球的社交动态！智能匹配多种写作风格，轻松创作正式、幽默、励志的内容。还能自动生成有趣话题，让你的粉丝爱上互动和讨论。',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_07_FACEBOOK_PLATFORM}&tabPane_uuid=${ESocialPlatform_platformName.FACEBOOK}-${ESocialPlatform_moduleName.MODULE_04_WRITING_POST_CHAIN}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_07_FACEBOOK_PLATFORM}&tabPane_uuid=${ESocialPlatform_platformName.FACEBOOK}-${ESocialPlatform_moduleName.MODULE_04_WRITING_POST_CHAIN}`,
    },
    {
      icon: '/img/icons/2024-11-13-img-36-logo-xiaoHongShu.png',
      proModeModuleName: t.get(EProMode_v4_role_labels[EProMode_v4_role.ROLE_05_XIAOHONGSHU_PLATFORM]) + ' AI 助手',
      description:
        '一键生成吸引眼球的标题和文案，自动匹配热门标签，获取源源不断的创意灵感。让创作更轻松，让内容更出彩，让传播更高效。',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_05_XIAOHONGSHU_PLATFORM}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_07_WRITING_POST_AGENT_FOR_XIAOHONGSHU_PLATFORM}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_05_XIAOHONGSHU_PLATFORM}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_07_WRITING_POST_AGENT_FOR_XIAOHONGSHU_PLATFORM}`,
    },
    {
      icon: '/img/icons/2024-10-05-img-27-office-worker-working-at-home.png',
      proModeModuleName: '职场 AI 助手',
      description: '专业高效地完成工作任务，擅长团队协作与沟通，持续关注行业趋势并不断提升自我',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_01_WORKPLACE}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_04_COMMUNICATION}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_01_WORKPLACE}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_04_COMMUNICATION}`,
    },
    {
      icon: '/img/icons/2024-10-05-img-30-product-manager.png',
      proModeModuleName: '产品经理 AI 助手',
      description: '专注倾听用户需求，为您打造简单易用的产品体验。从调研规划到设计优化，每一步都为解决产品问题而努力。',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_04_PRODUCT_MANAGER}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_10_PRODUCT_MANAGER}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_04_PRODUCT_MANAGER}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_10_PRODUCT_MANAGER}`,
    },
    {
      icon: '/img/icons/2025-01-18-personalized-target-audience-512x512.png',
      proModeModuleName: '专属定制 AI 助手',
      description: '告诉我们您的需求！只需完成一份简单问卷，即可获得完全匹配您工作流程和目标的定制化 AI 助手。',
      docOpenLink: 'https://wj.qq.com/s2/13154598/1770/',
      webAppOpenLink: 'https://wj.qq.com/s2/13154598/1770/',
      // 视觉突出元素
      // highlight: {
      //   badge: '新功能',
      //   backgroundColor: '#f0f7ff',
      //   border: '2px dashed #1677ff',
      // },
      // 激励信息
      // incentive: {
      //   text: '完成问卷即可获得 7 天高级版体验！',
      //   icon: '🎁',
      // },
    },
    // === 以下角色已废弃 ===
    // {
    //   icon: '/img/icons/2024-10-05-img-28-content-worker-writer.png',
    //   proModeModuleName: '内容工作者',
    //   featureText_1: (
    //     <>
    //       ✒️ <b>创意无限的内容创造者</b>：擅长创作引人入胜、独具一格的内容
    //     </>
    //   ),
    //   featureText_2: (
    //     <>
    //       🎥 <b>多媒体制作专家</b>：熟练掌握图文、音视频等多种内容形式
    //     </>
    //   ),
    //   featureText_3: (
    //     <>
    //       🔍 <b>用户需求的洞察者</b>：深入了解受众需求,创造有价值的内容
    //     </>
    //   ),
    //   docOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.TO_DEPRECATED_ROLE_02_CONTENT_WORKER}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_06_CONTENT_WRITING}`,
    //   webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.TO_DEPRECATED_ROLE_02_CONTENT_WORKER}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_06_CONTENT_WRITING}`,
    // },
    // {
    //   icon: '/img/icons/2024-10-05-img-29-social-media-influencer.png',
    //   proModeModuleName: t.get(EProMode_v4_role_labels[EProMode_v4_role.ROLE_05_XIAOHONGSHU_PLATFORM]),
    //   featureText_1: (
    //     <>
    //       📱 <b>社交媒体的原住民</b>：熟悉各大平台,善于利用平台特性传播内容
    //     </>
    //   ),
    //   featureText_2: (
    //     <>
    //       🎤 <b>个人品牌的缔造者</b>：通过独特的内容和风格,建立个人品牌影响力
    //     </>
    //   ),
    //   featureText_3: (
    //     <>
    //       📈 <b>商业价值的创造者</b>：将流量转化为商业价值,实现内容变现
    //     </>
    //   ),
    //   docOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_05_XIAOHONGSHU_PLATFORM}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_07_WRITING_POST_AGENT}`,
    //   webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_05_XIAOHONGSHU_PLATFORM}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_07_WRITING_POST_AGENT}`,
    // },
  ];
  const proModePageRoles_en: IOneFeature[] = [
    {
      icon: '/img/icons/2024-11-13-img-37-logo-linkedIn.svg',
      proModeModuleName: t.get(EProMode_v4_role_labels[EProMode_v4_role.ROLE_06_LINKEDIN_PLATFORM]) + ' AI Assistant',
      description:
        'Connect & grow faster: Create expert profiles, smart networking messages & pro content that gets noticed.',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_06_LINKEDIN_PLATFORM}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_20_TOPIC_FINDING_FOR_LINKEDIN_PLATFORM}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_06_LINKEDIN_PLATFORM}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_20_TOPIC_FINDING_FOR_LINKEDIN_PLATFORM}`,
    },
    {
      icon: '/img/icons/2024-12-04-img-39-logo-twitter.jpg',
      proModeModuleName: 'X (Twitter) Platform AI Assistant',
      description: 'Create sharp tweets, get smart hashtag suggestions, and craft engaging threads easily.',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_08_X_PLATFORM_PRE_TWITTER}&tabPane_uuid=${ESocialPlatform_platformName.TWITTER}-${ESocialPlatform_moduleName.MODULE_04_WRITING_POST_CHAIN}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_08_X_PLATFORM_PRE_TWITTER}&tabPane_uuid=${ESocialPlatform_platformName.TWITTER}-${ESocialPlatform_moduleName.MODULE_04_WRITING_POST_CHAIN}`,
    },
    {
      icon: '/img/icons/2024-12-04-img-38-logo-facebook.png',
      proModeModuleName: 'Facebook Platform AI Assistant',
      description:
        'Share updates that spark joy! Create fun posts, start conversations, and connect with fans in your own style.',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_07_FACEBOOK_PLATFORM}&tabPane_uuid=${ESocialPlatform_platformName.FACEBOOK}-${ESocialPlatform_moduleName.MODULE_04_WRITING_POST_CHAIN}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_07_FACEBOOK_PLATFORM}&tabPane_uuid=${ESocialPlatform_platformName.FACEBOOK}-${ESocialPlatform_moduleName.MODULE_04_WRITING_POST_CHAIN}`,
    },
    {
      icon: '/img/icons/2024-11-13-img-36-logo-xiaoHongShu.png',
      proModeModuleName:
        t.get(EProMode_v4_role_labels[EProMode_v4_role.ROLE_05_XIAOHONGSHU_PLATFORM]) + ' AI Assistant',
      description:
        'Create trending posts instantly with catchy titles, perfect hashtags, and fresh content ideas that get noticed to grow your social media.',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_05_XIAOHONGSHU_PLATFORM}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_07_WRITING_POST_AGENT_FOR_XIAOHONGSHU_PLATFORM}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_05_XIAOHONGSHU_PLATFORM}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_07_WRITING_POST_AGENT_FOR_XIAOHONGSHU_PLATFORM}`,
    },
    {
      icon: '/img/icons/2024-10-05-img-27-office-worker-working-at-home.png',
      proModeModuleName: 'Workplace AI Assistant',
      description:
        'Plan, deliver, and grow with your team. We help you manage projects and stay on top of industry trends.',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_01_WORKPLACE}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_04_COMMUNICATION}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_01_WORKPLACE}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_04_COMMUNICATION}`,
    },
    {
      icon: '/img/icons/2024-10-05-img-30-product-manager.png',
      proModeModuleName: 'Product Manager AI Assistant',
      description:
        'Find what you need, get smart solutions, and watch your product grow with our step-by-step guidance.',
      docOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_04_PRODUCT_MANAGER}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_10_PRODUCT_MANAGER}`,
      webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_04_PRODUCT_MANAGER}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_10_PRODUCT_MANAGER}`,
    },
    {
      icon: '/img/icons/2025-01-18-personalized-target-audience-512x512.png',
      proModeModuleName: 'Personalized AI Assistant',
      description:
        'Tell us about your needs! Take a quick survey to get a customized AI assistant that perfectly matches your workflow and goals.',
      docOpenLink: 'https://forms.gle/rnn7x9NWnk5koeHa6',
      webAppOpenLink: 'https://forms.gle/rnn7x9NWnk5koeHa6',
      // 可以添加一些视觉突出的元素
      // highlight: {
      //   badge: 'NEW',
      //   backgroundColor: '#f0f7ff',
      //   border: '2px dashed #1677ff',
      // },
      // 可以添加激励信息
      // incentive: {
      //   text: 'Get 7-day premium access after completing the survey!',
      //   icon: '🎁',
      // },
    },
    // === Deprecated roles ===
    // {
    //   icon: '/img/icons/2024-10-05-img-28-content-worker-writer.png',
    //   proModeModuleName: 'Content Creator',
    //   featureText_1: (
    //     <>
    //       ✒️ <b>Creative Content Producer</b>: Skilled in creating engaging and unique content
    //     </>
    //   ),
    //   featureText_2: (
    //     <>
    //       🎥 <b>Multimedia Production Expert</b>: Proficient in various content formats, including text, images, audio,
    //       and video
    //     </>
    //   ),
    //   featureText_3: (
    //     <>
    //       🔍 <b>User Needs Insights</b>: Deeply understands audience needs and creates valuable content
    //     </>
    //   ),
    //   docOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.TO_DEPRECATED_ROLE_02_CONTENT_WORKER}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_06_CONTENT_WRITING}`,
    //   webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.TO_DEPRECATED_ROLE_02_CONTENT_WORKER}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_06_CONTENT_WRITING}`,
    // },
    // {
    //   icon: '/img/icons/2024-10-05-img-29-social-media-influencer.png',
    //   proModeModuleName: t.get(EProMode_v4_role_labels[EProMode_v4_role.ROLE_05_XIAOHONGSHU_PLATFORM]),
    //   featureText_1: (
    //     <>
    //       📱 <b>Social Media Native</b>: Familiar with various platforms and skilled in leveraging platform features to
    //       spread content
    //     </>
    //   ),
    //   featureText_2: (
    //     <>
    //       🎤 <b>Personal Brand Builder</b>: Establishes personal brand influence through unique content and style
    //     </>
    //   ),
    //   featureText_3: (
    //     <>
    //       📈 <b>Business Value Creator</b>: Converts traffic into business value, achieving content monetization
    //     </>
    //   ),
    //   docOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_05_XIAOHONGSHU_PLATFORM}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_07_WRITING_POST_AGENT}`,
    //   webAppOpenLink: `${webAppUrl}/app/proMode?version=v4&role=${EProMode_v4_role.ROLE_05_XIAOHONGSHU_PLATFORM}&tabPane_uuid=${EProMode_v4_module_uuid.MODULE_07_WRITING_POST_AGENT}`,
    // },
  ];

  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  const proModePageRoles_zh_next: IOneFeature[] = [
    {
      icon: '/img/icons/2024-07-15-img-3-freelancer.png',
      proModeModuleName: '自由职业者',
      description: '做自己的老板：发挥创意特长，自由安排时间，掌控职业发展。',
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

  if (locale === 'zh') {
    return [...homePageRoles_zh, ...proModePageRoles_zh];
  }

  return [...homePageRoles_en, ...proModePageRoles_en];
};
