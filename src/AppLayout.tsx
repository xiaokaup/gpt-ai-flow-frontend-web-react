import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Layout, Menu, MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { saveLocalAction } from './store/actions/localActions';
import { IReduxRootState } from './store/reducer';

import { ELocale } from './gpt-ai-flow-common/enum-app/ELocale';
import { useLocalSettings } from './gpt-ai-flow-common/hooks/useLocalSettings';
import IStoreStorageFile, {
  IStoreStorage_settings_local,
} from './gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { getT } from './gpt-ai-flow-common/i18nProvider/localesFrontendFactory';
import { EStripePrice_nickname } from './gpt-ai-flow-common/enum-app/EStripe';

import { useBaseUrl } from './hooks/useBaseUrl';

const { Header, Content, Footer } = Layout;

interface Layout_input {
  isAuthenticated: boolean;
  stripePriceNicknames_from_allSbuscriptions: EStripePrice_nickname[];
  children: React.ReactNode;
}

const AppMenu = (props: {
  isAuthenticated: boolean;
  stripePriceNicknames_from_allSbuscriptions: EStripePrice_nickname[];
}) => {
  const { isAuthenticated, stripePriceNicknames_from_allSbuscriptions } = props;

  const dispatch = useDispatch();

  const localSettingsFromStore: IStoreStorage_settings_local = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorageFile.IStoreStorage_settings_local_default;
  });
  const { localSettings } = useLocalSettings({
    localSettingsFromStorage: localSettingsFromStore,
    onLocalSettingsChange(newItem: IStoreStorage_settings_local) {
      const newLocalSettings = { ...localSettings, ...newItem };
      dispatch<any>(saveLocalAction(newLocalSettings));
    },
  });
  const { locale } = localSettings;
  const t = getT(locale);

  const [baseUrl] = useBaseUrl({ locale });

  const handleSwithLanguage = (nextLocal: ELocale) => {
    const newLocalSettings = { ...localSettings, locale: nextLocal };
    dispatch<any>(saveLocalAction(newLocalSettings));
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  const items: MenuProps['items'] = [
    {
      key: 'en',
      label: (
        <div onClick={() => handleSwithLanguage(ELocale.EN)}>
          <span role="img" aria-label="English">
            🇺🇸
          </span>
          &nbsp;{t.get(ELocale.EN)}
        </div>
      ),
    },
    {
      key: 'zh',
      label: (
        <div onClick={() => handleSwithLanguage(ELocale.ZH)}>
          <span role="img" aria-label="Chinese">
            🇨🇳
          </span>
          &nbsp;{t.get(ELocale.ZH)}
        </div>
      ),
    },
  ];

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      className="flex justify-center"
      // defaultSelectedKeys={['1']}
    >
      <Menu.Item key="official-website">
        <Link to={'https://www.gptaiflow.com' + baseUrl}>{t.get('Official website')}</Link>
      </Menu.Item>

      <Menu.Item key="proMode-doc">
        <Link to={'https://www.gptaiflow.com' + `${baseUrl}/docs/application-scenarios/overview`}>
          {t.get('Documentation')}
        </Link>
      </Menu.Item>

      {!isAuthenticated && (
        <>
          <Menu.Item key="1">
            <Link to="/app/login">{t.get('Login')}</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/app/signUp">{t.get('Sign Up')}</Link>
          </Menu.Item>
        </>
      )}
      {isAuthenticated && (
        <>
          <Menu.Item key="3">
            <Link to="/app/info">{t.get('User')}</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/app/proMode/features">{t.get('ProMode')}</Link>
          </Menu.Item>
        </>
      )}

      <Menu.Item key="news">
        <Link to="/app/news">{t.get('Top News')}</Link>
      </Menu.Item>

      <Menu.Item key="switch-language">
        <Dropdown menu={{ items }}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            {t.get(locale)}&nbsp;🌐&nbsp;
            <DownOutlined style={{ position: 'relative', top: 1 }} />
          </a>
        </Dropdown>
      </Menu.Item>
      {isAuthenticated && (
        <Menu.Item key="subscriptionInfo" style={{ position: 'absolute', top: '.5rem', right: '1rem' }}>
          <a href="/app/info#subscription">
            {stripePriceNicknames_from_allSbuscriptions.length === 0 && (
              // <div className="flex items-center bg-gray-100">
              <div className="flex items-center bg-transparent">
                <img
                  src="/static/icons/2024-07-06-img-1-free/free-512x512.png"
                  alt="image"
                  className="w-[36px] h-[36px] mr-2"
                />
                <span className="font-bold text-gray-500">{t.get('Free_version')}</span>
              </div>
            )}
            {stripePriceNicknames_from_allSbuscriptions.includes(EStripePrice_nickname.STARTAI_TOOLS) && (
              // <div className="flex items-center bg-blue-200">
              <div className="flex items-center bg-transparent">
                <img
                  src="/static/icons/2024-07-06-img-2-tool/tool-512x512.png"
                  alt="image"
                  className="w-[36px] h-[36px] mr-2"
                />
                <span className="font-bold text-blue-500">{t.get('Tools_version')}</span>
              </div>
            )}
            {stripePriceNicknames_from_allSbuscriptions.includes(EStripePrice_nickname.STARTAI_LIFETIME_TOOLS) && (
              // <div className="flex items-center bg-yellow-100">
              <div className="flex items-center bg-transparent">
                <img
                  src="/static/icons/2024-07-06-img-4-lifetime/lifetime-512x512.png"
                  alt="image"
                  className="w-[36px] h-[36px] mr-2"
                />
                <span className="font-bold text-yellow-500">{t.get('Lifetime_version')}</span>
              </div>
            )}
            {stripePriceNicknames_from_allSbuscriptions.includes(EStripePrice_nickname.STARTAI_MODEL) && (
              // <div className="flex items-center bg-green-100">
              <div className="flex items-center bg-transparent">
                <img
                  src="/static/icons/2024-07-06-img-3-model/cube-512x512.png"
                  alt="image"
                  className="w-[36px] h-[36px] mr-2"
                />
                <span className="font-bold text-green-600">{t.get('Model_version')}</span>
              </div>
            )}
          </a>
        </Menu.Item>
      )}
    </Menu>
  );
};

export const AppLayout = (props: Layout_input) => {
  const { isAuthenticated, stripePriceNicknames_from_allSbuscriptions, children } = props;

  return (
    <Layout className="layout_container" style={{ background: '#fff' }}>
      {/* Header */}
      <Header>
        <div className="logo" />

        <AppMenu
          isAuthenticated={isAuthenticated}
          stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
        />
      </Header>

      {/* Body/Content */}
      <Content>
        <div className="site-layout-content">{children}</div>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: 'center' }}>
        Copyright © {new Date().getFullYear()} GPT AI Flow Powered by{' '}
        <a target="_blank" href="https://www.flowverse.io/" style={{ color: '#000' }}>
          Flowverse
        </a>
      </Footer>
    </Layout>
  );
};

export const AppLayoutCenter = (props: Layout_input) => {
  const { isAuthenticated, stripePriceNicknames_from_allSbuscriptions, children } = props;

  return (
    <Layout className="layout_container h-full" style={{ background: '#fff' }}>
      {/* Header */}
      <Header>
        <div className="logo" />
        <AppMenu
          isAuthenticated={isAuthenticated}
          stripePriceNicknames_from_allSbuscriptions={stripePriceNicknames_from_allSbuscriptions}
        />
      </Header>

      {/* Body/Content */}
      <Content>
        <div
          className="site-layout-content h-full"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {children}
        </div>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: 'center' }}>
        Copyright © {new Date().getFullYear()} GPT AI Flow Powered by{' '}
        <a target="_blank" href="https://www.flowverse.io/" style={{ color: '#000' }}>
          Flowverse
        </a>
      </Footer>
    </Layout>
  );
};
