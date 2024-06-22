import { IGetT_frontend_output } from '../../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

type SocialMediaPictureSpecifications = {
  name: string;
  pictureSpecifications: {
    name: string;
    width: number;
    height: number;
    aspect: number;
  }[];
}[];

type TreeNode = {
  value: string;
  title: any; // 'any' type can be used to allow JSX in the title
  children?: TreeNode[];
};

export const socialMediaPictureSpecifications: SocialMediaPictureSpecifications = [
  {
    name: 'xiaohongshu',
    pictureSpecifications: [
      {
        name: 'profile',
        width: 400,
        height: 400,
        aspect: 1,
      },
      {
        name: 'cover_portrait',
        width: 1242,
        height: 1660,
        aspect: 1242 / 1660,
      },
      {
        name: 'cover_landscape',
        width: 800,
        height: 600,
        aspect: 800 / 600,
      },
      {
        name: 'background',
        width: 1000,
        height: 800,
        aspect: 1000 / 800,
      },
      {
        name: 'image_portrait',
        width: 900,
        height: 1200,
        aspect: 900 / 1200,
      },
      {
        name: 'image_square',
        width: 1080,
        height: 1080,
        aspect: 1,
      },
      {
        name: 'image_landscape',
        width: 1200,
        height: 900,
        aspect: 1200 / 900,
      },
    ],
  },
  {
    name: 'wechat',
    pictureSpecifications: [
      {
        name: 'profile',
        width: 240,
        height: 240,
        aspect: 1,
      },
      {
        name: 'public_account_cover',
        width: 900,
        height: 383,
        aspect: 900 / 383,
      },
      {
        name: 'public_account_small_image',
        width: 200,
        height: 200,
        aspect: 1,
      },
      {
        name: 'public_account_QR_code_business_card',
        width: 600,
        height: 600,
        aspect: 1,
      },
      {
        name: 'public_account_content_guide_image',
        width: 1080,
        height: 300,
        aspect: 1080 / 300,
      },
      {
        name: 'video_account_cover_portrait',
        width: 1080,
        height: 1260,
        aspect: 1080 / 1260,
      },
      {
        name: 'video_account_cover_landscape',
        width: 1080,
        height: 608,
        aspect: 1080 / 608,
      },
      {
        name: 'mini_program_cover',
        width: 520,
        height: 416,
        aspect: 520 / 416,
      },
      {
        name: 'wechat_moment_cover',
        width: 1280,
        height: 1184,
        aspect: 1280 / 1184,
      },
    ],
  },
  {
    name: 'tiktok',
    pictureSpecifications: [
      {
        name: 'profile',
        width: 400,
        height: 400,
        aspect: 1,
      },
      {
        name: 'personal_homepage_background_image',
        width: 1125,
        height: 633,
        aspect: 1125 / 633,
      },
      {
        name: 'tiktok_cover_portrait_3_4',
        width: 1242,
        height: 1660,
        aspect: 1242 / 1660,
      },
      {
        name: 'tiktok_cover_portrait_9_16',
        width: 1080,
        height: 1920,
        aspect: 1080 / 1920,
      },
      {
        name: 'titok_cover_landscape_16_9',
        width: 1080,
        height: 608,
        aspect: 1080 / 608,
      },
    ],
  },
  {
    name: 'weibo',
    pictureSpecifications: [
      {
        name: 'weibo_homepage_cover',
        width: 980,
        height: 300,
        aspect: 980 / 300,
      },
      {
        name: 'weibo_haedline_cover',
        width: 980,
        height: 560,
        aspect: 980 / 560,
      },
      {
        name: 'weibo_spotlight_image',
        width: 540,
        height: 260,
        aspect: 540 / 260,
      },
      {
        name: 'weibo_long_image',
        width: 800,
        height: 2000,
        aspect: 800 / 2000,
      },
    ],
  },
  {
    name: 'bilibili',
    pictureSpecifications: [
      {
        name: 'bilibili_video_cover',
        width: 1280,
        height: 800,
        aspect: 1280 / 800,
      },
    ],
  },
  {
    name: 'kuaishou',
    pictureSpecifications: [
      {
        name: 'kuaishou_video_cover',
        width: 1280,
        height: 800,
        aspect: 1280 / 800,
      },
    ],
  },
  {
    name: 'zhihu',
    pictureSpecifications: [
      {
        name: 'zhihu_article_cover',
        width: 1280,
        height: 800,
        aspect: 1280 / 800,
      },
    ],
  },
  {
    name: 'regular_size',
    pictureSpecifications: [
      {
        name: 'regular_size_square',
        width: 400,
        height: 400,
        aspect: 1,
      },
      {
        name: 'regular_size_3_4',
        width: 1080,
        height: 1440,
        aspect: 1080 / 1440,
      },
      {
        name: 'regular_size_4_3',
        width: 1440,
        height: 1080,
        aspect: 1440 / 1080,
      },
      {
        name: 'regular_size_16_9',
        width: 1080,
        height: 1920,
        aspect: 1080 / 1920,
      },
    ],
  },
];

export const treeSelectDefaultValue = JSON.stringify({
  name: 'image_landscape',
  width: 1200,
  height: 900,
  aspect: 1200 / 900,
});

export const transformData_for_treeSelect = (
  t: IGetT_frontend_output,
  data: SocialMediaPictureSpecifications,
): TreeNode[] => {
  return data.map((platform) => ({
    value: platform.name,
    title: t.get(platform.name),
    children: platform.pictureSpecifications.map((item) => ({
      value: JSON.stringify({
        name: item.name,
        width: item.width,
        height: item.height,
        aspect: item.aspect,
      }),
      // title: `${t.get(item.name)} - ${item.width}x${item.height}, Aspect: ${item.aspect.toFixed(2)}`,
      title: `${t.get(platform.name)}: ${t.get(item.name)} - ${item.width}x${item.height}`,
    })),
  }));
};
