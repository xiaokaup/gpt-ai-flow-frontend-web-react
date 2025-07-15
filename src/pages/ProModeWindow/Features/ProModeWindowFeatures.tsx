import { useState } from 'react';
import { Alert, Radio, RadioChangeEvent } from 'antd';
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
      <div className="w-full" style={{ padding: '0 2rem' }}>
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
            <Alert
              message="🚧 System upgrade in progress, some services temporarily unavailable: The system is undergoing module optimization upgrades to provide more stable and efficient services. During this period, some functions may be temporarily unavailable."
              type="warning"
            />
            <h2 className="my-8 text-2xl font-bold text-gray-700 dark:text-white md:text-4xl">
              🌟 AI integration into life, simplicity at your fingertips.
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our intelligent tools seamlessly integrate AI technology into your daily life, easily handling work,
              study, or entertainment. From content creation to personal assistance, we simplify complex technology,
              allowing everyone to enjoy the convenience brought by AI, making technology truly serve life.
            </p>
          </>
        )}
        {locale === ELocale.ZH && (
          <>
            <Alert
              message="🚧 系统升级中，部分服务暂不可用: 系统进行模块优化升级，以提供更稳定、高效的服务。在此期间，部分功能可能暂时无法使用。"
              type="warning"
            />
            <h2 className="my-8 text-2xl font-bold text-gray-700 dark:text-white md:text-4xl">
              🌟 AI 融入生活，简单由你掌握
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              我们的智能工具让AI技术无缝融入您的日常生活，无论是工作、学习还是娱乐，都能轻松应对。从内容创作到个人助理，我们简化复杂技术，让每个人都能享受AI带来的便利，让科技真正为生活服务。
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
