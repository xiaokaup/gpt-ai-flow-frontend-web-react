import React from 'react';

import { Layout } from 'antd';

import { EStripePrice_nickname } from './gpt-ai-flow-common/enum-app/EStripe';

import { AppMenu } from './AppMenu';

const { Header, Content, Footer } = Layout;

interface Layout_input {
  isAuthenticated: boolean;
  stripePriceNicknames_from_allSbuscriptions: EStripePrice_nickname[];
  children: React.ReactNode;
}

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
        <a target="_blank" href="https://www.xiaokaup.me/" style={{ color: '#000' }}>
          Xiaokaup
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
        <a target="_blank" href="https://www.xiaokaup.me/" style={{ color: '#000' }}>
          Xiaokaup
        </a>
      </Footer>
    </Layout>
  );
};
