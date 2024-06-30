import { IOneFeature } from './ProModeWindowFeatures';

interface ICard_with_click {
  locale: string;
  baseUrl: string;
  imgBaseUrl: string;
  item: IOneFeature;
}
export const Card_with_click = (props: ICard_with_click) => {
  const {
    locale,
    baseUrl,
    imgBaseUrl,
    item: { icon, proModeModuleName, featureText_1, featureText_2, featureText_3, openLink },
  } = props;

  return (
    <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
      <a className="!no-underline" href={openLink.startsWith('/') ? baseUrl + openLink : openLink}>
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
          {openLink && openLink !== '#' && (
            <div className="hidden flex items-center justify-between group-hover:text-secondary">
              <span className="text-sm">
                {locale === 'en' && <>Learn More</>}
                {locale === 'zh' && <>了解更多</>}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              >
                <path
                  fillRule="evenodd"
                  d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      </a>
    </div>
  );
};
