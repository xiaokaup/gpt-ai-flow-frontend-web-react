import { IOneFeature } from './interface';

export const Card_without_click = (props: { item: IOneFeature; imgBaseUrl: string }) => {
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
