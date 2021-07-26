import React, { useCallback } from 'react';
import { AppLayout } from 'components';
import { Button, Card } from 'antd';
import styles from 'styles/Login.module.scss';
import { FacebookFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { loginWithFacebook } from 'actions';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const onLogin = useCallback(() => {
    dispatch(loginWithFacebook);
  }, [dispatch]);

  return (
    <AppLayout className={styles.login}>
      <Card title="Login">
        <Button
          type="primary"
          shape="round"
          icon={<FacebookFilled />}
          onClick={onLogin}
        >
          Login with Facebook
        </Button>
      </Card>
    </AppLayout>
  );
};

export default Login;
