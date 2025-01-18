import { useState, useEffect } from 'react';
import { Input } from 'antd';

import { ELocale } from '../../../gpt-ai-flow-common/enum-app/ELocale';
import { getT } from '../../../gpt-ai-flow-common/i18nProvider/localesFrontendFactory';

import { webAppUrl, docBaseUrl } from './constant';
import { IOneFeature } from './interface';
import { getRoles, getModules } from './constant_fetures';
import { Card_with_click } from './Card';

const { Search } = Input;

const getFeatures = (features_type: string, locale: ELocale) => {
  if (features_type === 'module') {
    return getModules(locale);
  }

  // 'role'
  return getRoles(locale);
};

interface IProModeWindowFeatures_module_input {
  locale: ELocale;
  // features_type: 'both' | 'role' | 'module';
}
export const ProModeWindowFeatures_cards = (props: IProModeWindowFeatures_module_input) => {
  const { locale } = props;

  const t = getT(locale);

  // console.log('features', features);
  const [searchInput, setSearchInput] = useState<string>('');
  const [roleFeaturesFiltered, setRoleFeaturesFiltered] = useState<IOneFeature[]>([]);
  const [moduleFeaturesFiltered, setModuleFeaturesFiltered] = useState<IOneFeature[]>([]);

  const _getTextFrom_IOneFeature_featureTextItem = (item: string | JSX.Element): string => {
    let results = '';

    if (typeof item === 'string') {
      results += item;
      return results;
    }

    if (typeof item.props.children === 'string') {
      results += item.props.children;
      return results;
    }

    if (Array.isArray(item.props.children)) {
      item.props.children.forEach((childItem: string | JSX.Element) => {
        results += _getTextFrom_IOneFeature_featureTextItem(childItem);
      });

      return results;
    }
  };

  const _getTextFrom_IOneFeature = (item: IOneFeature): string => {
    let results = '';

    results += item.proModeModuleName + ' ';

    results += _getTextFrom_IOneFeature_featureTextItem(item.description) + ' ';

    return results;
  };

  useEffect(() => {
    const roleFeatures = getFeatures('role', locale);
    const moduleFeatures = getFeatures('module', locale);

    if (!searchInput) {
      setRoleFeaturesFiltered(roleFeatures);
      setModuleFeaturesFiltered(moduleFeatures);
      return;
    }

    const searchInputLower = searchInput.toLowerCase();
    const roleFeaturesFiltered = roleFeatures.filter((item: IOneFeature) => {
      return _getTextFrom_IOneFeature(item).toLowerCase().includes(searchInputLower);
    });
    const moduleFeaturesFiltered = moduleFeatures.filter((item: IOneFeature) => {
      return _getTextFrom_IOneFeature(item).toLowerCase().includes(searchInputLower);
    });

    setRoleFeaturesFiltered(roleFeaturesFiltered);
    setModuleFeaturesFiltered(moduleFeaturesFiltered);
  }, [searchInput]);

  return (
    <>
      <div className="search my-4 px-10 flex justify-between">
        {locale === ELocale.ZH && <p>请选择专业模块，并开始使用:</p>}
        {locale === ELocale.EN && <p>Please select a professional module and begin using it:</p>}

        <Search
          size="large"
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
          style={{ width: 200 }}
        />
      </div>

      <div className="xl:px-20">
        <div className="text-xl font-bold px-5 mb-4">{t.get('Role')}</div>
        <div className="flex flex-wrap justify-center gap-4 xl:justify-start">
          {roleFeaturesFiltered.map((item) => {
            return (
              <Card_with_click
                key={item.proModeModuleName}
                item={item}
                locale={locale}
                baseUrl={webAppUrl}
                imgBaseUrl={docBaseUrl}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-20 xl:px-20">
        <div className="text-xl font-bold px-5 mb-4">{t.get('Module')}</div>
        <div className="flex flex-wrap justify-center gap-4 xl:justify-start">
          {moduleFeaturesFiltered.map((item) => {
            return (
              <Card_with_click
                key={item.proModeModuleName}
                item={item}
                locale={locale}
                baseUrl={webAppUrl}
                imgBaseUrl={docBaseUrl}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
