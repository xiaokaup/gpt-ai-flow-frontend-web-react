import React from "react";
import { Layout, Menu } from "antd";

const { Header, Content, Footer } = Layout;

interface Layout_input {
  children: React.ReactNode;
}

export const AppLayout = (props: Layout_input) => {
  const { children } = props;

  return (
    <Layout className="layout_container">
      {/* Header */}
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">About</Menu.Item>
          <Menu.Item key="3">Contact</Menu.Item>
        </Menu>
      </Header>

      {/* Body/Content */}
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">{children}</div>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};
