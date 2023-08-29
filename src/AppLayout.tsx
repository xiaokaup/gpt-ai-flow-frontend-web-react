import React, { useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useUserInfo } from './hooks/useUserInfo';

const { Header, Content, Footer } = Layout;

interface Layout_input {
  children: React.ReactNode;
}

const AppMenu = (props: { isAuthenticated: boolean }) => {
  const { isAuthenticated } = props;
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
            <Link to="/login">登录</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/signUp">注册</Link>
          </Menu.Item>
        </>
      )}
      {isAuthenticated && (
        <>
          <Menu.Item key="3">
            <Link to="/proMode">专业模式</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/info">用户</Link>
          </Menu.Item>
        </>
      )}
      <Menu.Item key="proMode-doc">
        <Link to="https://www.gptaiflow.com/docs/proudct/proMode-presentation">文档</Link>
      </Menu.Item>
    </Menu>
  );
};

export const AppLayout = (props: Layout_input) => {
  const { children } = props;

  const { isAuthenticated } = useUserInfo();

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
  const { children } = props;

  const { isAuthenticated } = useUserInfo();

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
