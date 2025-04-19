import { ELocale } from '../../../gpt-ai-flow-common/enum-app/ELocale';

export const pricingLocaleDict: Record<ELocale, { [key: string]: string }> = {
  [ELocale.EN]: {
    免费使用桌面软件所有功能: 'Use all features of desktop software for free',
    自备大模型密钥: 'Bring your own large model key',
    官方提供大模型支持: 'Official model support (OpenAI, Anthropic Claude, DeepSeek etc.)',
    人设系统: 'Character system',
    '无 AI 工作流支持': 'No AI workflow support',
    '初期免费使用 AI 工作流支持': 'Free AI workflow support in the early stage',
    '所有 AI 工作流模块无限使用次数':
      'Unlimited usage of all AI workflow modules (Little Red Book, LinkedIn, X (Twitter), Facebook etc.)',
    使用多少支付多少: 'Pay as you use',
    定制化需求模块支持: 'Custom demand module support',
    '一次购买，终身使用': 'One-time purchase, lifetime use',

    // Duty Genie
    关税精灵: 'Tariff Genie Module - Intelligent Tariff Query and Tracking Tool',
    '你希望获得专业的关税查询服务，并享受全面的通关资讯支持':
      'You want to receive professional tariff query services and enjoy comprehensive customs clearance information support',
    关税精灵_功能:
      'Tariff Genie is an efficient and convenient tariff query and recommendation tool that helps you quickly obtain accurate tariff information and optimize cross-border trade costs.',
    关税精灵_功能_1_key: 'HTS Tariff Query',
    关税精灵_功能_1_value: 'Directly retrieve corresponding tariff rates through HTS codes',
    关税精灵_功能_2_key: 'Intelligent HTS Recommendation',
    关税精灵_功能_2_value: 'Input product information, automatically recommend the most matching HTS codes and tariffs',
    关税精灵_功能_3_key: 'China-US Tariff Tracking',
    关税精灵_功能_3_value:
      'Monitor tariff changes on routes from China to the United States in real-time, and obtain the latest policies promptly',
  },
  [ELocale.ZH]: {
    免费使用桌面软件所有功能: ' 免费使用桌面软件所有功能',
    自备大模型密钥: ' 自备大模型密钥',
    官方提供大模型支持: ' 官方提供大模型支持 (OpenAI, Anthropic Claude, DeepSeek 等)',
    人设系统: ' 人设系统',
    '无 AI 工作流支持': '无 AI 工作流支持',
    '初期免费使用 AI 工作流支持': '初期免费使用 AI 工作流支持',
    '所有 AI 工作流模块无限使用次数': '所有 AI 工作流模块无限使用次数 (小红书、领英、推特、脸书等)',
    使用多少支付多少: '使用多少支付多少',
    定制化需求模块支持: '定制化需求模块支持',
    '一次购买，终身使用': '一次购买，终身使用',

    // Duty Genie
    关税精灵: '关税精灵模块 - 智能关税查询与追踪工具',
    '你希望获得专业的关税查询服务，并享受全面的通关资讯支持': '你希望获得专业的关税查询服务，并享受全面的通关资讯支持',
    关税精灵_功能: '关税精灵是一款高效便捷的关税查询与推荐工具，帮助您快速获取准确的关税信息，优化跨境贸易成本。',
    关税精灵_功能_1_key: 'HTS 关税查询',
    关税精灵_功能_1_value: '通过 HTS 编码直接检索对应关税税率',
    关税精灵_功能_2_key: '智能 HTS 推荐',
    关税精灵_功能_2_value: '输入产品信息, 自动推荐最匹配的HTS编码及关税',
    关税精灵_功能_3_key: '中美关税追踪',
    关税精灵_功能_3_value: '实时监控中国到美国路线的关税变动，及时获取最新政策',
  },
};
