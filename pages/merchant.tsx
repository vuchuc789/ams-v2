import { notifyError } from 'actions';
import { AppLayout, LoginRequired } from 'components';
import { debounce } from 'helpers';
import { AsyncDispatch } from 'interfaces';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAdpiaMerchant } from 'services';
import { Input, Space, Card, Typography, Image, Collapse } from 'antd';

const { Title, Link } = Typography;
const { Meta } = Card;
const { Panel } = Collapse;

const Merchant: React.FC = () => {
  const [merchantId, setMerchantId] = useState('');
  const [merchant, setMerchant] = useState<{
    logo?: string;
    site_name?: string;
    site_url?: string;
    commission?: string;
    programs?: { [key: string]: unknown }[];
  }>({});
  const dispatch = useDispatch<AsyncDispatch>();

  const debounced = useMemo(
    () =>
      debounce((merchantId: string) => {
        if (!merchantId) {
          setMerchant({});
          return;
        }

        getAdpiaMerchant(merchantId)
          .then((data) => {
            setMerchant(data.merchant);
          })
          .catch((e) => {
            dispatch(notifyError(e.message || 'Fail to search'));
          });
      }, 300),
    [dispatch],
  );

  useEffect(() => {
    if (merchantId) {
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
            value={merchantId}
            onChange={(e) => {
              setMerchantId(e.target.value);
            }}
            placeholder="shopee"
            style={{ width: '50%' }}
          />
          <Space style={{ marginLeft: '6.5rem' }}>
            {['shopee', 'tiki', 'lazada', 'sendo', 'grabvn', 'agoda'].map(
              (val, i) => (
                <Link
                  onClick={() => {
                    setMerchantId(val);
                  }}
                  key={i}
                >
                  {val}
                </Link>
              ),
            )}
          </Space>
          {!!merchant.logo && (
            <Card
              style={{ width: '10rem' }}
              cover={
                <Image
                  src={merchant.logo}
                  alt="merchant logo"
                  preview={false}
                />
              }
              hoverable
              onClick={() => {
                if (!merchant.site_url) {
                  return;
                }

                window.open(merchant.site_url, '_blank');
              }}
            >
              <Meta
                title={merchant.site_name || ''}
                description={merchant.commission || ''}
              />
            </Card>
          )}
          {Array.isArray(merchant.programs) && (
            <Collapse>
              {merchant.programs.map(
                ({ pgm_com = '', pgm_desc = '', pgm_name = '' }, i) => (
                  <Panel header={`${pgm_name} - ${pgm_com}`} key={i}>
                    <p
                      dangerouslySetInnerHTML={{ __html: pgm_desc as string }}
                    />
                  </Panel>
                ),
              )}
            </Collapse>
          )}
        </Space>
      </AppLayout>
    </LoginRequired>
  );
};

export default Merchant;
