import { ELocale } from '../../../gpt-ai-flow-common/enum-app/ELocale';

export const pricingLocaleDict: Record<ELocale, { [key: string]: string }> = {
  [ELocale.EN]: {
    免费使用桌面软件所有功能: 'Use all features of desktop software for free',
    自备大模型密钥: 'Bring your own large model key',
    官方提供大模型支持: 'Official model support',
    人设系统: 'Character system',
    '无 AI 工作流支持': 'No AI workflow support',
    '所有 AI 工作流模块无限使用次数 (职场、小红书平台、领英平台、产品经理)':
      'Unlimited usage of all AI workflow modules (Workplace, social platform, LinkedIn platform, Product Manager)',
    使用多少支付多少: 'Pay as you use',
    定制化需求模块支持: 'Custom demand module support',
    '一次购买，终身使用': 'One-time purchase, lifetime use',
  },
  [ELocale.ZH]: {
    免费使用桌面软件所有功能: ' 免费使用桌面软件所有功能',
    自备大模型密钥: ' 自备大模型密钥',
    官方提供大模型支持: ' 官方提供大模型支持',
    人设系统: ' 人设系统',
    '无 AI 工作流支持': '无 AI 工作流支持',
    '所有 AI 工作流模块无限使用次数 (职场、小红书平台、领英平台、产品经理)':
      '所有 AI 工作流模块无限使用次数 (职场、小红书平台、领英平台、产品经理)',
    使用多少支付多少: '使用多少支付多少',
    定制化需求模块支持: '定制化需求模块支持',
    '一次购买，终身使用': '一次购买，终身使用',
  },
};
