import { loginWithFacebook } from 'actions';
import { AsyncDispatch, RootState } from 'interfaces';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from 'styles/Initialization.module.scss';
import { Spin } from 'antd';

interface LoginRequiredProps {
  children: React.ReactNode;
}

export const LoginRequired: React.FC<LoginRequiredProps> = ({ children }) => {
  const dispatch = useDispatch<AsyncDispatch>();
  const router = useRouter();

  const isLoggedIn = useSelector(
    (state: RootState) => !!state.auth.accessToken,
  );

  const isLoggingIn = useSelector((state: RootState) => state.auth.isLoggingIn);

  const [isChecked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    if (!isChecked && !isLoggedIn && !isLoggingIn) {
      dispatch(loginWithFacebook({ loginIfNotDone: false }));
      setChecked(true);
    }

    if (isChecked && !isLoggedIn && !isLoggingIn) {
      router.push('/login');
    }
  }, [dispatch, isChecked, isLoggingIn, isLoggedIn, router]);

  return !isLoggedIn ? (
    <div className={styles.initContainer}>
      <Spin size="large" />
    </div>
  ) : (
    <>{children}</>
  );
};
