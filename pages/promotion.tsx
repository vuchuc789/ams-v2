import { notifyError } from 'actions';
import { AppLayout, LoginRequired } from 'components';
import { debounce } from 'helpers';
import { AsyncDispatch, RootState } from 'interfaces';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdpiaPromotions } from 'services';
import { Input, Space, Row, Col, Card, Tree, Spin } from 'antd';

const Promotion: React.FC = () => {
  const { accessToken, loginType } = useSelector(
    (state: RootState) => state.auth,
  );

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

  return (
    <LoginRequired>
      <AppLayout>
        <Space
          style={{ padding: '1rem 1rem 0', width: '100%' }}
          direction="vertical"
        >
          <Input
            addonBefore="Merchant ID"
            addonAfter={
              <Spin
                size="small"
                spinning={isLoading}
              >{`${promotions.length} results`}</Spin>
            }
            onChange={(e) => {
              setLoading(true);
              debounced(e.target.value);
            }}
            placeholder="shopee"
            style={{ width: '50%' }}
          />
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
                <Col key={i} xs={24} sm={12} md={8} lg={6} xl={4}>
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
