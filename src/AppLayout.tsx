import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Layout, Menu, MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { saveLocalAction } from './store/actions/localActions';
import { IReduxRootState } from './store/reducer';

import { ELocale } from './gpt-ai-flow-common/enum-app/ELocale';
import { useLocalSettings } from './gpt-ai-flow-common/hooks/useLocalSettings';
import IStoreStorageFile, { IStoreStorageLocalSettings } from './gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { getT } from './gpt-ai-flow-common/i18nProvider/localesFrontendFactory';

import { useBaseUrl } from './hooks/useBaseUrl';

const { Header, Content, Footer } = Layout;

interface Layout_input {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const AppMenu = (props: { isAuthenticated: boolean }) => {
  const { isAuthenticated } = props;

  const dispatch = useDispatch();

  const localSettingsFromStore: IStoreStorageLocalSettings = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorageFile.IStoreStorageLocalSettings_default;
  });
  const { localSettings } = useLocalSettings({
    localSettingsFromStorage: localSettingsFromStore,
    onLocalSettingsChange(newItem: IStoreStorageLocalSettings) {
      const newLocalSettings = { ...localSettings, ...newItem };
      dispatch(saveLocalAction(newLocalSettings) as any);
    },
  });
  const { locale } = localSettings;
  const t = getT(locale);

  const [baseUrl] = useBaseUrl({ locale });

  const handleSwithLanguage = (nextLocal: ELocale) => {
    const newLocalSettings = { ...localSettings, locale: nextLocal };
    dispatch(saveLocalAction(newLocalSettings) as any);
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
            <Link to="/login">{t.get('Login')}</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/signUp">{t.get('Sign Up')}</Link>
          </Menu.Item>
        </>
      )}
      {isAuthenticated && (
        <>
          <Menu.Item key="3">
            <Link to="/info">{t.get('User')}</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/proMode">{t.get('ProMode')}</Link>
          </Menu.Item>
        </>
      )}

      <Menu.Item key="news">
        <Link to="/news">{t.get('Top News')}</Link>
      </Menu.Item>

      <Menu.Item key="switch-language">
        <Dropdown menu={{ items }}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            {t.get(locale)}&nbsp;🌐&nbsp;
            <DownOutlined style={{ position: 'relative', top: 1 }} />
          </a>
        </Dropdown>
      </Menu.Item>
    </Menu>
  );
};

export const AppLayout = (props: Layout_input) => {
  const { isAuthenticated, children } = props;

  return (
    <Layout className="layout_container" style={{ background: '#fff' }}>
      {/* Header */}
      <Header>
        <div className="logo" />

        <AppMenu isAuthenticated={isAuthenticated} />
      </Header>

      {/* Body/Content */}
      <Content>
        <div className="site-layout-content">{children}</div>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: 'center' }}>
        Copyright © {new Date().getFullYear()} GPT AI Flow Powered by{' '}
        <a href="https://digitechjoy.com/" style={{ color: '#000' }}>
          DigitechJoy
        </a>
      </Footer>
    </Layout>
  );
};

export const AppLayoutCenter = (props: Layout_input) => {
  const { isAuthenticated, children } = props;

  return (
    <Layout className="layout_container h-full" style={{ background: '#fff' }}>
      {/* Header */}
      <Header>
        <div className="logo" />
        <AppMenu isAuthenticated={isAuthenticated} />
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
        <a href="https://digitechjoy.com/" style={{ color: '#000' }}>
          DigitechJoy
        </a>
      </Footer>
    </Layout>
  );
};
