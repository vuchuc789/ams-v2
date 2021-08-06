import type { RootState } from 'interfaces';
import { useSelector } from 'react-redux';

export const useIsLoggedIn = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => !!state.authReducer.isLoggingIn,
  );

  return isLoggedIn;
};
