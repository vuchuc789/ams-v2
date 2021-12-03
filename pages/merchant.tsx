import { AppLayout, LoginRequired } from 'components';

const Merchant: React.FC = () => {
  return (
    <LoginRequired>
      <AppLayout>
        <div>merchant</div>
      </AppLayout>
    </LoginRequired>
  );
};

export default Merchant;
