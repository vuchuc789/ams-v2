import { notifyError } from 'actions';
import { AppLayout, LoginRequired } from 'components';
import { AsyncDispatch } from 'interfaces';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMerchants } from 'services';

const Merchant: React.FC = () => {
  const dispatch = useDispatch<AsyncDispatch>();
  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const data = await getMerchants();
      } catch (e) {
        dispatch(notifyError(e.message || 'Fail to get merchants'));
      }
    };

    asyncFunc();
  }, [dispatch]);
  return (
    <LoginRequired>
      <AppLayout>
        <div>merchant</div>
      </AppLayout>
    </LoginRequired>
  );
};

export default Merchant;
