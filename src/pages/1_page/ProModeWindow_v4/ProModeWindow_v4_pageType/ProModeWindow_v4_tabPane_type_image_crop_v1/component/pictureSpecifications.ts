type SocialMediaPictureSpecifications = {
  name: string;
  pictureSpecifications: {
    [pictureType: string]: {
      width: number;
      height: number;
      aspect: number;
    };
  };
}[];

type TreeNode = {
  value: string;
  title: any; // 'any' type can be used to allow JSX in the title
  children?: TreeNode[];
};

export const socialMediaPictureSpecifications: SocialMediaPictureSpecifications = [
  {
    name: 'xiaohongshu',
    pictureSpecifications: {
      profile: {
        width: 400,
        height: 400,
        aspect: 1,
      },
      cover_portrait: {
        width: 1242,
        height: 1660,
        aspect: 1242 / 1660,
      },
      cover_landscape: {
        width: 800,
        height: 600,
        aspect: 800 / 600,
      },
      background: {
        width: 1000,
        height: 800,
        aspect: 1000 / 800,
      },
      image_portrait: {
        width: 900,
        height: 1200,
        aspect: 900 / 1200,
      },
      image_square: {
        width: 1080,
        height: 1080,
        aspect: 1,
      },
      image_landscape: {
        width: 1200,
        height: 900,
        aspect: 1200 / 900,
      },
    },
  },
];

export const transformData_for_treeSelect = (data: SocialMediaPictureSpecifications): TreeNode[] => {
  return data.map((platform) => ({
    value: platform.name,
    title: platform.name,
    children: Object.entries(platform.pictureSpecifications).map(([type, spec]) => ({
      value: JSON.stringify({
        type,
        width: spec.width,
        height: spec.height,
        aspect: spec.aspect,
      }),
      title: `${type} - ${spec.width}x${spec.height}, Aspect: ${spec.aspect.toFixed(2)}`,
    })),
  }));
};
