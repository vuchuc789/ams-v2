import { ADPIA_AFFILIATE_API } from '@constants';

export const getMerchant = async (merchantId: string) => {
  const response = await fetch(
    `${ADPIA_AFFILIATE_API}/merchant/get_merchants_valid/?mid=${merchantId}`,
    {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
    },
  );

  const jsonResponse = await response.json();

  return jsonResponse.data?.detail?.[0] || [];
};

export const getPromotions = async (
  merchantId: string,
  accessToken: string,
) => {
  const response = await fetch(
    `${ADPIA_AFFILIATE_API}/affiliate/get_promo_code/?mid=${merchantId}`,
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

export const getOrders = async (accessToken: string) => {
  const currentYear = new Date().getFullYear();

  const response = await fetch(
    `${ADPIA_AFFILIATE_API}/affiliate/get_conversions/?sdate=${currentYear}0101&edate=${currentYear}1231`,
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

  return jsonResponse.data?.data || [];
};
