import React, { useMemo, useState } from 'react';
import { Dropdown, Layout, Menu } from 'antd';
import styles from 'styles/AppLayout.module.scss';
import Image from 'next/image';
import logo from 'public/logo.png';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import Head from 'next/head';

const { Header, Sider, Content } = Layout;

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const AppLayout: React.FC<Props> = ({ children, className }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const dropdownMenu = useMemo(() => {
    return (
      <Menu>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            3rd menu item
          </a>
        </Menu.Item>
      </Menu>
    );
  }, []);

  return (
    <>
      <Head>
        <title>AMS v2</title>
      </Head>
      <Layout className={styles.appLayout}>
        <Sider collapsible collapsed={collapsed} trigger={null}>
          <div className={styles.logo}>
            <Image
              src={logo}
              width={70}
              height={40}
              alt="Affiliate Marketing Logo"
            />
            <h2 hidden={collapsed}>Affiliate Marketing</h2>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<MenuOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<MenuOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<MenuOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <div className={styles.leftHeader}>
              {collapsed ? (
                <MenuUnfoldOutlined
                  className={styles.icon}
                  onClick={() => {
                    setCollapsed(false);
                  }}
                />
              ) : (
                <MenuFoldOutlined
                  className={styles.icon}
                  onClick={() => {
                    setCollapsed(true);
                  }}
                />
              )}
            </div>
            <div className={styles.rightHeader}>
              <Dropdown overlay={dropdownMenu} placement="bottomLeft">
                <MenuOutlined className={styles.icon} />
              </Dropdown>
            </div>
          </Header>
          <Content
            className={
              className ? `${styles.content} ${className}` : styles.content
            }
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
