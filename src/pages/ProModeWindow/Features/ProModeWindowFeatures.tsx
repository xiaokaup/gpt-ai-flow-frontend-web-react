import { useState } from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import { ELocale } from '../../../gpt-ai-flow-common/enum-app/ELocale';
import { getT_with_i18next } from '../../../gpt-ai-flow-common/i18nProvider/localesFrontendFactory_v2';
import { ProModeWindowFeatures_cards } from './ProModeWindowFeatures_cards';

interface IProModeWindowFeatures {
  locale: ELocale;
}
export const ProModeWindowFeatures = (props: IProModeWindowFeatures) => {
  const { locale } = props;

  const t = getT_with_i18next(locale);

  const [proMode_showForm, setProMode_showForm] = useState<'both' | 'role' | 'module'>('both');
  // const [proMode_showForm, setProMode_showForm] = useState<string>('module');

  return (
    <div
      id="features"
      className="w-full"
      style={{
        padding: '1rem',
        margin: '1rem auto',
      }}
    >
      <div className="md:w-2/3 lg:w-1/2" style={{ padding: '0 2rem' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-secondary"
        >
          <path
            fillRule="evenodd"
            d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
            clipRule="evenodd"
          />
        </svg>

        {locale === ELocale.EN && (
          <>
            <h2 className="my-8 text-2xl font-bold text-gray-700 dark:text-white md:text-4xl">
              Smart AI, Making Your Self-Media Marketing Easier
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our AI tools provide you with a powerful platform to automate content generation, analyze audience data,
              and optimize your self-media strategy.
            </p>
          </>
        )}
        {locale === ELocale.ZH && (
          <>
            <h2 className="my-8 text-2xl font-bold text-gray-700 dark:text-white md:text-4xl">
              智能AI，让您的自媒体营销更轻松
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              我们的AI工具为您提供了一个强大的平台，帮助您自动化内容生成、分析受众数据并优化您的自媒体战略。
            </p>
          </>
        )}
      </div>
      <div className="select_for_role_or_module flex justify-center hidden">
        <Radio.Group
          size="large"
          options={[
            {
              label: t.get('Role'),
              value: 'role',
            },
            {
              label: t.get('Module'),
              value: 'module',
            },
          ]}
          onChange={({ target: { value } }: RadioChangeEvent) => {
            console.log('radio checked', value);
            setProMode_showForm(value);
          }}
          value={proMode_showForm}
          optionType="button"
          buttonStyle="solid"
        />
      </div>

      <ProModeWindowFeatures_cards
        locale={locale}
        // features_type={proMode_showForm}
      />
    </div>
  );
};
