import { notifyError } from 'actions';
import { AppLayout, LoginRequired } from 'components';
import { debounce } from 'helpers';
import { AsyncDispatch, RootState } from 'interfaces';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdpiaPromotions } from 'services';
import { Input, Space, Row, Col, Card, Tree, Spin, Typography } from 'antd';

const { Title, Link } = Typography;

const Promotion: React.FC = () => {
  const { accessToken, loginType } = useSelector(
    (state: RootState) => state.auth,
  );

  const [merchantId, setMerchantId] = useState('');
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch<AsyncDispatch>();

  const debounced = useMemo(
    () =>
      debounce((merchantId: string) => {
        if (!merchantId) {
          setPromotions([]);
          return;
        }

        getAdpiaPromotions(merchantId, accessToken, loginType)
          .then((data) => {
            setPromotions(data.promotions);
          })
          .catch((e) => {
            dispatch(notifyError(e.message || 'Fail to search'));
          })
          .finally(() => {
            setLoading(false);
          });
      }, 300),
    [accessToken, loginType, dispatch],
  );

  useEffect(() => {
    if (merchantId) {
      setLoading(true);
      debounced(merchantId);
    }
  }, [debounced, merchantId]);

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
          <Title level={2}>Search promotions by merchant</Title>
          <Input
            addonBefore="Merchant ID"
            addonAfter={
              <Spin
                size="small"
                spinning={isLoading}
              >{`${promotions.length} results`}</Spin>
            }
            value={merchantId}
            onChange={(e) => {
              setMerchantId(e.target.value);
            }}
            placeholder="shopee"
            style={{ width: '50%' }}
          />
          <Space style={{ marginLeft: '6.5rem' }}>
            {['tiki', 'shopee', 'lazada', 'sendo'].map((val, i) => (
              <Link
                onClick={() => {
                  setMerchantId(val);
                }}
                key={i}
              >
                {val}
              </Link>
            ))}
          </Space>
          <Row gutter={[16, 16]}>
            {promotions.map(
              (
                {
                  mid = '',
                  title = '',
                  code = '',
                  desc = '',
                  end_date = '',
                  url = '',
                },
                i,
              ) => (
                <Col key={i} sm={24} md={12} lg={8} xl={6}>
                  <Card
                    title={`${mid.charAt(0).toUpperCase()}${mid.slice(
                      1,
                    )} - ${title}`}
                    hoverable
                    extra={
                      url ? (
                        <a
                          href={decodeURIComponent(url)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          More
                        </a>
                      ) : null
                    }
                  >
                    <Tree
                      treeData={[
                        {
                          key: `${i}-0`,
                          title: 'Code',
                          children: [{ key: `${i}-0-0`, title: code }],
                        },
                      ]}
                      defaultExpandAll={!!code}
                    />
                    <Tree
                      treeData={[
                        {
                          key: `${i}-1`,
                          title: 'End date',
                          children: [{ key: `${i}-1-0`, title: end_date }],
                        },
                      ]}
                      defaultExpandAll={!!end_date}
                    />
                    <Tree
                      treeData={[
                        {
                          key: `${i}-2`,
                          title: 'Description',
                          children: [{ key: `${i}-2-0`, title: desc }],
                        },
                      ]}
                    />
                  </Card>
                </Col>
              ),
            )}
          </Row>
        </Space>
      </AppLayout>
    </LoginRequired>
  );
};

export default Promotion;
