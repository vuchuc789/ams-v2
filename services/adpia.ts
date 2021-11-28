import { ADPIA_AFFILIATE_API } from '@constants';

export const getMerchants = async () => {
  const response = await fetch(
    `${ADPIA_AFFILIATE_API}/merchant/get_merchants_valid`,
    {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
    },
  );

  return await response.json();
};

export const getPromotions = async (
  merchantId: string,
  accessToken: string,
) => {
  const response = await fetch(
    `${ADPIA_AFFILIATE_API}/affiliate/get_promo_code?mid=${merchantId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${accessToken}`,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
    },
  );

  const jsonResponse = await response.json();

  return jsonResponse.data || [];
};
