import { RootState } from 'interfaces';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

interface LoginRequiredProps {
  children: React.ReactNode;
}

export const LoginRequired: React.FC<LoginRequiredProps> = ({ children }) => {
  const isLoggedIn = useSelector(
    (state: RootState) => !!state.auth.accessToken,
  );

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  return <>{isLoggedIn && <>{children}</>}</>;
};
