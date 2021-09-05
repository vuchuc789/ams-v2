import React, { useEffect, useMemo } from 'react';
import { Avatar, Dropdown, Layout, Menu } from 'antd';
import styles from 'styles/AppLayout.module.scss';
import Image from 'next/image';
import logo from 'public/logo.png';
import Icon, {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
  HomeOutlined,
  LoginOutlined,
  ProfileOutlined,
  EditOutlined,
} from '@ant-design/icons';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import type { AsyncDispatch, RootState, SyncDispatch } from 'interfaces';
import { useRouter } from 'next/router';
import {
  ADD_TO_DROPDOWN,
  REMOVE_FROM_DROPDOWN,
  TOGGLE_SIDER,
} from '@constants';
import { logout } from 'actions';
import Link from 'next/link';

const { Header, Sider, Content } = Layout;

interface Props {
  children: React.ReactNode;
  className?: string;
}

interface SiderItem {
  path: string;
  title: string;
  icon: typeof Icon;
}

const siderItems: {
  authRequired: SiderItem[];
  noAuthRequired: SiderItem[];
} = {
  noAuthRequired: [
    { path: '/', title: 'Home', icon: HomeOutlined },
    { path: '/login', title: 'Login', icon: LoginOutlined },
  ],
  authRequired: [
    { path: '/profile', title: 'Profile', icon: ProfileOutlined },
    { path: '/editor', title: 'Editor', icon: EditOutlined },
  ],
};

const sortedPaths = [
  ...siderItems.noAuthRequired.map((item) => item.path),
  ...siderItems.authRequired.map((item) => item.path),
].sort((a, b) => b.length - a.length);

export const AppLayout: React.FC<Props> = ({ children, className }) => {
  const router = useRouter();
  const syncDispatch = useDispatch<SyncDispatch>();
  const asyncDispatch = useDispatch<AsyncDispatch>();

  const isLoggedIn = useSelector(
    (state: RootState) => !!state.auth.accessToken,
  );

  const collapsed = useSelector(
    (state: RootState) => state.mainLayout.siderCollapsed,
  );

  const dropdownData = useSelector(
    (state: RootState) => state.mainLayout.dropdownMenu,
  );

  const userAvatar = useSelector(
    (state: RootState) =>
      (
        state.userInfo?.picture as
          | { data: { url: string; width: number; height: number } }
          | undefined
      )?.data,
  );

  const userName = useSelector(
    (state: RootState) => state.userInfo?.name as string | undefined,
  );

  useEffect(() => {
    if (!isLoggedIn) {
      syncDispatch({
        type: ADD_TO_DROPDOWN,
        payload: {
          dropdownMenu: [
            {
              title: 'About affiliate marketing',
              action: () => {
                window.open(
                  'https://en.wikipedia.org/wiki/Affiliate_marketing',
                  '_blank',
                );
              },
            },
          ],
        },
      });
    } else {
      syncDispatch({
        type: ADD_TO_DROPDOWN,
        payload: {
          dropdownMenu: [
            {
              title: 'About affiliate marketing',
              action: () => {
                window.open(
                  'https://en.wikipedia.org/wiki/Affiliate_marketing',
                  '_blank',
                );
              },
            },
            {
              title: 'Logout',
              action: () => {
                asyncDispatch(logout());
              },
            },
          ],
        },
      });
    }

    return () => {
      syncDispatch({ type: REMOVE_FROM_DROPDOWN });
    };
  }, [syncDispatch, asyncDispatch, isLoggedIn, router]);

  const siderMenu = useMemo(() => {
    const items = isLoggedIn
      ? siderItems.authRequired
      : siderItems.noAuthRequired;

    const selectedKey = sortedPaths.find((prefix) =>
      router.pathname.startsWith(prefix),
    );

    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={selectedKey ? [selectedKey] : undefined}
        onSelect={({ key }) => {
          router.push(key as string);
        }}
      >
        {items.map(({ title, path, icon }) => {
          return (
            <Menu.Item key={path} icon={React.createElement(icon)}>
              {title}
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }, [isLoggedIn, router]);

  const dropdownMenu = useMemo(() => {
    return (
      <Menu>
        {dropdownData.map(({ title, action = () => {} }) => {
          if (title === '') {
            return <Menu.Divider />;
          }

          return (
            <Menu.Item key={title}>
              <a onClick={action}>{title}</a>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }, [dropdownData]);

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
          {siderMenu}
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <div>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: styles.icon,
                  onClick: () => {
                    syncDispatch({ type: TOGGLE_SIDER });
                  },
                },
              )}
            </div>
            <div>
              {!!userName && (
                <h4>
                  Hello,{' '}
                  <Link href="/profile">
                    <a>{userName}</a>
                  </Link>
                </h4>
              )}
              {!!userAvatar && <Avatar src={userAvatar.url} size="large" />}
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
