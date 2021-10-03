import { AppLayout, LoginRequired } from 'components';

const Profile: React.FC = () => {
  return (
    <LoginRequired>
      <AppLayout>Profile</AppLayout>;
    </LoginRequired>
  );
};

export default Profile;
