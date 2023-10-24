import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { Link } from 'react-router-dom';

import { globalRoutesPrefix } from './AppRoutes';
import { ELocale } from './gpt-ai-flow-common/enum-app/ELocale';

import translate from './i18nProvider/translate';
import { useLocalInfo } from './hooks/useLocalInfo';
import { saveLocalAction } from './store/actions/localActions';
import { useDispatch } from 'react-redux';

const { Header, Content, Footer } = Layout;

interface Layout_input {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const AppMenu = (props: { isAuthenticated: boolean }) => {
  const { isAuthenticated } = props;

  const dispatch = useDispatch();

  const { localData } = useLocalInfo();
  const { locale } = localData;

  const handleSwithLanguage = (nextLocal: ELocale) => {
    const newLocalData = { ...localData, locale: nextLocal };
    dispatch(saveLocalAction(newLocalData) as any);
    window.location.reload();
  };

  const items: MenuProps['items'] = [
    {
      key: 'en',
      label: (
        <div onClick={() => handleSwithLanguage(ELocale.EN)}>
          <span role="img" aria-label="English">
            🇺🇸
          </span>
          &nbsp;{translate('ENGLISH')}
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
          &nbsp;{translate('CHINESE')}
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
        <Link to="https://www.gptaiflow.com/">官网</Link>
      </Menu.Item>
      {!isAuthenticated && (
        <>
          <Menu.Item key="1">
            <Link to={`${globalRoutesPrefix}/login`}>登录</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={`${globalRoutesPrefix}/signUp`}>注册</Link>
          </Menu.Item>
        </>
      )}
      {isAuthenticated && (
        <>
          <Menu.Item key="3">
            <Link to={`${globalRoutesPrefix}/proMode`}>专业模式</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to={`${globalRoutesPrefix}/info`}>用户</Link>
          </Menu.Item>
        </>
      )}
      <Menu.Item key="proMode-doc">
        <Link to="https://www.gptaiflow.com/docs/application-scenarios/introduction">文档</Link>
      </Menu.Item>
      {/* <Menu.Item key="switch-language">
        <Dropdown menu={{ items }}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            {translate(locale.toLocaleUpperCase())}
            &nbsp;
            <DownOutlined style={{ position: 'relative', top: 1 }} />
          </a>
        </Dropdown>
      </Menu.Item> */}
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
      <Content style={{ padding: '20px 50px' }}>
        <div className="site-layout-content">{children}</div>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: 'center' }}>Copyright © 2023 GPT AI Flow</Footer>
    </Layout>
  );
};

export const AppLayoutCenter = (props: Layout_input) => {
  const { isAuthenticated, children } = props;

  return (
    <Layout className="layout_container" style={{ background: '#fff' }}>
      {/* Header */}
      <Header>
        <div className="logo" />
        <AppMenu isAuthenticated={isAuthenticated} />
      </Header>

      {/* Body/Content */}
      <Content style={{ padding: '20px 50px' }}>
        <div
          className="site-layout-content"
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
      <Footer style={{ textAlign: 'center' }}>Copyright © 2023 GPT AI Flow</Footer>
    </Layout>
  );
};
