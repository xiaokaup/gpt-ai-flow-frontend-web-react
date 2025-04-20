// 模拟 HTS 查询 API 服务
// 实际项目中应替换为真实的 API 调用

import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { queryHtsCodes_for_dutyGenie_from_backend } from '../../../../gpt-ai-flow-common/Module_v5/TBackendExternalSource_for_dutyGenie';
import { ELocale } from '../../../../gpt-ai-flow-common/enum-app/ELocale';
import { IHTSCodeItem } from '../../../../gpt-ai-flow-common/interface-app/5_external/IExternalResources_for_app';
import TCryptoJSFile from '../../../../gpt-ai-flow-common/tools/TCrypto-web';
import { EModule_name } from '../../../../gpt-ai-flow-common/enum-app/EModule';
import { ELLM_name, ELLM_IMAGE_name } from '../../../../gpt-ai-flow-common/enum-backend/ELLM';

// 模拟数据库
const htsDatabase = {
  8471300100: {
    htsCode: '8471300100',
    description:
      'Portable automatic data processing machines, not exceeding 10 kg, consisting of at least a central processing unit, keyboard and display',
    chapter: 'Chapter 84 - Nuclear Reactors, Boilers, Machinery And Mechanical Appliances; Parts Thereof',
    effectiveDate: '2022-01-01',
    unit: 'No.',
    generalRate: '35%',
    mfnRate: 'Free',
    section301Tariff: '25%',
    specialPrograms: [
      { name: 'USMCA', rate: 'Free', countries: '墨西哥, 加拿大' },
      { name: 'GSP', rate: 'Free', countries: '发展中国家' },
    ],
    tariffHistory: [
      {
        date: '2018-07-06',
        action: '301条款第一轮加征关税',
        oldRate: '0%',
        newRate: '25%',
        description: '根据301调查结果，美国对中国原产的电子产品加征25%关税',
      },
      {
        date: '2019-05-10',
        action: '关税豁免申请开放',
        description: '美国贸易代表办公室开放针对该产品的关税豁免申请',
      },
      {
        date: '2022-01-01',
        action: 'HTS编码更新',
        description: '根据HS2022协调制度更新，编码描述有细微调整',
      },
    ],
  },
  6104430000: {
    htsCode: '6104430000',
    description: "Women's or girls' dresses, knitted or crocheted, of synthetic fibers",
    chapter: 'Chapter 61 - Articles Of Apparel And Clothing Accessories, Knitted Or Crocheted',
    effectiveDate: '2022-01-01',
    unit: 'Doz. Kg',
    generalRate: '72%',
    mfnRate: '16%',
    section301Tariff: '7.5%',
    specialPrograms: [
      { name: 'USMCA', rate: 'Free', countries: '墨西哥, 加拿大' },
      { name: 'CAFTA-DR', rate: 'Free', countries: '多米尼加, 萨尔瓦多等' },
    ],
    tariffHistory: [
      {
        date: '2018-09-24',
        action: '301条款第二轮加征关税',
        oldRate: '0%',
        newRate: '10%',
        description: '美国对中国原产的纺织品加征10%关税',
      },
      {
        date: '2019-05-10',
        action: '关税税率调整',
        oldRate: '10%',
        newRate: '25%',
        description: '美国将第二轮301关税税率从10%上调至25%',
      },
      {
        date: '2020-01-15',
        action: '第一阶段经贸协议签署',
        oldRate: '25%',
        newRate: '7.5%',
        description: '根据中美第一阶段经贸协议，关税税率从25%下调至7.5%',
      },
    ],
  },
  9506910030: {
    htsCode: '9506910030',
    description: 'Exercise equipment, gym/fitness center type',
    chapter: 'Chapter 95 - Toys, Games And Sports Equipment; Parts And Accessories Thereof',
    effectiveDate: '2022-01-01',
    unit: 'No.',
    generalRate: '40%',
    mfnRate: '4.6%',
    section301Tariff: '0%',
    specialPrograms: [
      { name: 'USMCA', rate: 'Free', countries: '墨西哥, 加拿大' },
      { name: 'AU', rate: 'Free', countries: '澳大利亚' },
    ],
    tariffHistory: [
      {
        date: '2018-09-24',
        action: '301条款第三轮加征关税',
        oldRate: '0%',
        newRate: '10%',
        description: '美国对中国原产的健身器材加征10%关税',
      },
      {
        date: '2019-05-10',
        action: '关税税率调整',
        oldRate: '10%',
        newRate: '25%',
        description: '美国将第三轮301关税税率从10%上调至25%',
      },
      {
        date: '2020-03-20',
        action: '新冠疫情关税豁免',
        oldRate: '25%',
        newRate: '0%',
        description: '由于新冠疫情，美国对健身器材实施临时关税豁免',
      },
    ],
  },
};

// 模拟API延迟
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 搜索HTS编码
export const searchHtsCodes = async (htsCodes: string[], userAccessToken: string, locale: ELocale) => {
  // console.log('htsCodes:', htsCodes);

  const llmOptions = {
    llmName: ELLM_name.DEEPSEEK_V3,
    llmImageName: ELLM_IMAGE_name.DEFAULT,
    llmSecret: '',
    llmTemperature: 0,
  };
  const results: IHTSCodeItem[] = await queryHtsCodes_for_dutyGenie_from_backend(
    { htsCodes, llmOptions, contextType: EModule_name.DUTY_GENIE_01_CHECK_HTS_CODE },
    userAccessToken,
    locale,
    CONSTANTS_GPT_AI_FLOW_COMMON,
    TCryptoJSFile.encrypt_v2(CONSTANTS_GPT_AI_FLOW_COMMON.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string),
  );

  // === @DEPRECATED-old - start ===
  // // 模拟API延迟
  // await delay(1500);

  // // 查询结果
  // const results = htsCodes.map((code) => {
  //   // 检查是否存在于数据库
  //   if (htsDatabase[code]) {
  //     return htsDatabase[code];
  //   }

  //   // 如果不存在，返回一个基本结构但标记为"未找到"
  //   return {
  //     htsCode: code,
  //     description: '未找到该HTS编码的信息',
  //     chapter: 'N/A',
  //     effectiveDate: 'N/A',
  //     generalRate: 'N/A',
  //     mfnRate: 'N/A',
  //     section301Tariff: 'N/A',
  //     notFound: true,
  //   };
  // });
  // === @DEPRECATED-old - end ===

  // console.log('results from searchHtsCodes:', results);

  return results || []; // @TOFIX:  do we really need `|| []`
};

// 获取HTS编码详情
export const getHtsDetail = async (htsCode) => {
  await delay(800);
  return htsDatabase[htsCode] || null;
};

// 获取最近更新的关税信息
export const getRecentTariffUpdates = async () => {
  await delay(1000);

  return [
    {
      date: '2023-09-15',
      title: '美国对中国部分产品关税豁免延期',
      description: '美国贸易代表办公室宣布对352项中国产品的关税豁免延期至2023年底',
      affectedCategories: ['医疗设备', '电子产品', '机械设备'],
    },
    {
      date: '2023-08-01',
      title: '美国对太阳能电池板实施新关税政策',
      description: '美国商务部宣布对来自东南亚的太阳能电池板实施新的关税措施',
      affectedCategories: ['太阳能产品', '可再生能源设备'],
    },
    {
      date: '2023-07-12',
      title: '中美关税谈判新进展',
      description: '中美双方代表就部分产品关税调整进行新一轮谈判',
      affectedCategories: ['农产品', '汽车零部件', '消费电子'],
    },
  ];
};
