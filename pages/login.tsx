import React, { useCallback } from 'react';
import { AppLayout } from 'components';
import { Button, Card } from 'antd';
import styles from 'styles/Login.module.scss';
import { FacebookFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithFacebook } from 'actions';
import type { RootState } from 'interfaces';

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const isLoggingIn = useSelector(
    (state: RootState) => state.authReducer.isLoggingIn,
  );

  const onLogin = useCallback(() => {
    dispatch(loginWithFacebook({ loginIfNotDone: true }));
  }, [dispatch]);

  return (
    <AppLayout className={styles.login}>
      <Card title="Login">
        <Button
          type="primary"
          shape="round"
          icon={<FacebookFilled />}
          onClick={onLogin}
          loading={isLoggingIn}
        >
          Login with Facebook
        </Button>
        <Button
          onClick={() => {
            FB.logout((res) => {
              console.log(res);
            });
          }}
        >
          Logout
        </Button>
      </Card>
    </AppLayout>
  );
};

export default Login;
