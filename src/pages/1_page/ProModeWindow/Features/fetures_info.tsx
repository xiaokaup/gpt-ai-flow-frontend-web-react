import { webAppUrl } from './constant';
import { IOneFeature } from './interface';

export const getModules = (isHomePage: boolean, locale: string) => {
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
      openLink: '/app/proMode?tabPane_uuid=writingPostAgent',
    },
    {
      icon: '/img/icons/2024-07-14-img-1-workflow.png',
      proModeModuleName: '写作/审核帖子智能体 (beta)',
      featureText_1: (
        <>
          📝 <b>智能内容生成</b>，快速产出高质量的文本内容，匹配用户和市场需求
        </>
      ),
      featureText_2: (
        <>
          ✅ <b>实时内容审核</b>，确保内容合规性，提升内容安全标准
        </>
      ),
      featureText_3: (
        <>
          🔄 <b>持续学习与优化</b>，利用最新数据反馈不断改进内容质量与相关性
        </>
      ),
      openLink: '/app/proMode?tabPane_uuid=writingPostAgent',
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
      openLink: `${webAppUrl}/app/proMode?tabPane_uuid=communicationChain`,
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
      openLink: `${webAppUrl}/app/proMode?tabPane_uuid=writingCommentChain`,
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
      openLink: '/app/proMode?tabPane_uuid=writingPostAgent',
    },
    {
      icon: '/img/icons/2024-07-14-img-1-workflow.png',
      proModeModuleName: 'Writing/Review Post Agent (beta)',
      featureText_1: (
        <>
          📝 <b>Intelligent Content Generation</b>, quickly produce high-quality text content that matches user and
          market demands
        </>
      ),
      featureText_2: (
        <>
          ✅ <b>Real-time Content Review</b>, ensure content compliance and elevate content safety standards
        </>
      ),
      featureText_3: (
        <>
          🔄 <b>Continuous Learning and Optimization</b>, use the latest data feedback to constantly improve content
          quality and relevance
        </>
      ),
      openLink: '/app/proMode?tabPane_uuid=writingPostAgent',
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
      openLink: `${webAppUrl}/app/proMode?tabPane_uuid=communicationChain`,
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
      openLink: `${webAppUrl}/app/proMode?tabPane_uuid=writingCommentChain`,
    },
  ];
  const proModePageModules_en: IOneFeature[] = [
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
      openLink: `${webAppUrl}/app/proMode?tabPane_uuid=contentWritingChain`,
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
      openLink: `${webAppUrl}/app/proMode?tabPane_uuid=SEOChain`,
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
  ];
  const proModePageModules_zh: IOneFeature[] = [
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
      openLink: `${webAppUrl}/app/proMode?tabPane_uuid=contentWritingChain`,
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
      openLink: `${webAppUrl}/app/proMode?tabPane_uuid=SEOChain`,
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
