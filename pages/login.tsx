import { useCallback, useEffect } from 'react';
import { AppLayout } from 'components';
import { Button, Card } from 'antd';
import styles from 'styles/Login.module.scss';
import { FacebookFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithFacebook } from 'actions';
import type { RootState } from 'interfaces';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isLoggingIn = useSelector((state: RootState) => state.auth.isLoggingIn);

  const isLoggedIn = useSelector(
    (state: RootState) => !!state.auth.accessToken,
  );

  const onLogin = useCallback(() => {
    dispatch(loginWithFacebook({ loginIfNotDone: true }));
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

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
      </Card>
    </AppLayout>
  );
};

export default Login;
