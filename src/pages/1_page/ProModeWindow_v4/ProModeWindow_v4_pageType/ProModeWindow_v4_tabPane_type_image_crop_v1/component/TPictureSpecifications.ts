import { IGetT_frontend_output } from 'gpt-ai-flow-common/i18nProvider/ILocalesFactory';

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
      title: `${t.get(item.name)} - ${item.width}x${item.height}, Aspect: ${item.aspect.toFixed(2)}`,
      // title: `${t.get(item.name)} - ${item.width}x${item.height}`,
    })),
  }));
};
