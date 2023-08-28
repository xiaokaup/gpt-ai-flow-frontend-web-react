import React, { useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useUserInfo } from './hooks/useUserInfo';

const { Header, Content, Footer } = Layout;

interface Layout_input {
  children: React.ReactNode;
}

export const AppLayout = (props: Layout_input) => {
  const { children } = props;

  const { isAuthenticated } = useUserInfo();

  return (
    <Layout className="layout_container">
      {/* Header */}
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          // defaultSelectedKeys={['1']}
        >
          {!isAuthenticated && (
            <>
              <Menu.Item key="1">
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/signUp">Sign up</Link>
              </Menu.Item>
            </>
          )}
          {isAuthenticated && (
            <Menu.Item key="3">
              <Link to="/info">info</Link>
            </Menu.Item>
          )}
        </Menu>
      </Header>

      {/* Body/Content */}
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">{children}</div>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: 'center' }}>Copyright © 2023 GPT AI Flow</Footer>
    </Layout>
  );
};
