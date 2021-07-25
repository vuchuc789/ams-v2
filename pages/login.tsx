import React from 'react';
import { AppLayout } from 'components';
import { Button, Card } from 'antd';
import styles from 'styles/Login.module.scss';
import { FacebookFilled } from '@ant-design/icons';

const Login: React.FC = () => {
  return (
    <AppLayout className={styles.login}>
      <Card title="Login">
        <Button type="primary" shape="round" icon={<FacebookFilled />}>
          Login with Facebook
        </Button>
      </Card>
    </AppLayout>
  );
};

export default Login;
