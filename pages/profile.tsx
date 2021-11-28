import { AppLayout, LoginRequired } from 'components';
import { Row, Col, Avatar, Card, Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncDispatch, RootState, SyncDispatch } from 'interfaces';
import { updateAdpiaInfo } from 'services';
import { notifyError, notifySuccess } from 'actions';
import { SET_USER_INFO } from '@constants';
import { useEffect } from 'react';
import { toBinary } from 'helpers';

const { useForm } = Form;

const Profile: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const { accessToken, loginType } = useSelector(
    (state: RootState) => state.auth,
  );

  const dispatch = useDispatch<AsyncDispatch>();
  const syncDispatch = useDispatch<SyncDispatch>();

  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({
      id: userInfo.adpiaId || '',
      username: userInfo.adpiaUsername || '',
    });
  }, [form, userInfo]);

  return (
    <LoginRequired>
      <AppLayout>
        <div style={{ padding: '2rem' }}>
          <Row gutter={24} justify="center">
            <Col span={7}>
              <Card
                hoverable
                cover={
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '1rem 0 0',
                    }}
                  >
                    <Avatar
                      src={(userInfo.picture as any)?.data?.url}
                      size={50}
                    />
                  </div>
                }
              >
                <Card.Meta
                  title={userInfo.name as string}
                  description={userInfo.email as string}
                />{' '}
              </Card>
            </Col>
            <Col span={15}>
              <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                form={form}
                onFinish={async (val) => {
                  try {
                    const adpiaAccessToken = btoa(
                      `${val.username || ''}:${val.password || ''}`,
                    );

                    const adpiaInfo = await updateAdpiaInfo(
                      val.id,
                      val.username,
                      adpiaAccessToken,
                      accessToken,
                      loginType,
                    );

                    syncDispatch({ type: SET_USER_INFO, payload: adpiaInfo });

                    dispatch(notifySuccess('Updated successfully'));
                  } catch (e) {
                    dispatch(notifyError(e.message || 'Update failed'));
                  }
                }}
                autoComplete="off"
              >
                <Form.Item label="Adpia ID" name="id">
                  <Input />
                </Form.Item>
                <Form.Item label="Adpia Username" name="username">
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Adpia Password"
                  name="password"
                  extra="According to the policy of Adpia, we need your password to generate Adpia API access token. This password will not be stored."
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Update
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </AppLayout>
    </LoginRequired>
  );
};

export default Profile;
