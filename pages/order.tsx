import { AppLayout, LoginRequired } from 'components';
import { AsyncDispatch, RootState } from 'interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Typography, Table } from 'antd';
import { useEffect, useState } from 'react';
import { getAdpiaOrders } from 'services';
import { notifyError } from 'actions';

const { Title, Text } = Typography;

const Promotion: React.FC = () => {
  const { accessToken, loginType } = useSelector(
    (state: RootState) => state.auth,
  );

  const dispatch = useDispatch<AsyncDispatch>();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAdpiaOrders(accessToken, loginType)
      .then(({ orders }) => {
        setOrders(orders);
      })
      .catch((e) => {
        dispatch(notifyError(e.message || 'Fail to load orders'));
      });
  }, [accessToken, loginType, dispatch]);

  return (
    <LoginRequired>
      <AppLayout>
        <Space
          style={{
            padding: '1rem',
            width: '100%',
            minHeight: '100%',
          }}
          direction="vertical"
        >
          <Title level={2}>Orders</Title>
          <Table
            columns={[
              {
                title: 'Merchant',
                dataIndex: 'offer_id',
                key: 'offer_id',
              },
              {
                title: 'Order ID',
                dataIndex: 'ocd',
                key: 'ocd',
              },
              {
                title: 'Product Name',
                dataIndex: 'pname',
                key: 'pname',
              },
              {
                title: 'Received Date',
                dataIndex: 'ymd',
                key: 'ymd',
              },
              {
                title: 'Amount',
                dataIndex: 'actual_amount',
                key: 'actual_amount',
              },
              {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
              },
              {
                title: 'Commission',
                dataIndex: 'commission',
                key: 'commission',
              },
            ]}
            dataSource={orders}
            summary={(pageData) => {
              let totalCommission = 0;

              pageData.forEach(({ commission }) => {
                totalCommission += commission;
              });

              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                    <Table.Summary.Cell index={3}></Table.Summary.Cell>
                    <Table.Summary.Cell index={4}></Table.Summary.Cell>
                    <Table.Summary.Cell index={5}></Table.Summary.Cell>
                    <Table.Summary.Cell index={6}>Total</Table.Summary.Cell>
                    <Table.Summary.Cell index={7}>
                      <Text type="danger">{totalCommission}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        </Space>
      </AppLayout>
    </LoginRequired>
  );
};

export default Promotion;
