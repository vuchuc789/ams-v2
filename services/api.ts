import { LOGIN_TYPE } from '@constants';
import { PageResponse } from 'interfaces';
import { ResponseData } from 'server/interfaces';

export const checkUser = async (
  token: string,
  loginType: LOGIN_TYPE,
): Promise<void> => {
  await fetch(`/api/user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'x-auth-type': loginType.toString(),
    },
  });
};

export const getPages = async (
  token: string,
  loginType?: LOGIN_TYPE,
): Promise<PageResponse['pages']> => {
  if (typeof loginType === 'undefined') {
    throw new Error('login type is undefined');
  }

  const res = await fetch('/api/page', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'x-auth-type': loginType.toString(),
    },
  });

  const { data, status, message }: ResponseData<PageResponse> =
    await res.json();

  if (status === 'error') {
    throw new Error(message);
  }

  if (!data?.pages) {
    throw new Error('Something went wrong');
  }

  return data.pages;
};

export const addPage = async (
  name: string,
  token: string,
  loginType?: LOGIN_TYPE,
): Promise<{ name: string; slug: string }> => {
  if (typeof loginType === 'undefined') {
    throw new Error('login type is undefined');
  }

  const res = await fetch('/api/page', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'x-auth-type': loginType.toString(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  const { status, message, data } = await res.json();

  if (status === 'error') {
    throw new Error(message);
  }

  return data;
};

export const getPage = async (
  slug: string,
  token: string,
  loginType?: LOGIN_TYPE,
): Promise<{ content: string }> => {
  if (typeof loginType === 'undefined') {
    throw new Error('login type is undefined');
  }

  const res = await fetch(`/api/page/${slug}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'x-auth-type': loginType.toString(),
    },
  });

  const { status, message, data } = await res.json();

  if (status === 'error') {
    throw new Error(message);
  }

  return data;
};

export const savePage = async (
  slug: string,
  content: string,
  token: string,
  loginType?: LOGIN_TYPE,
) => {
  if (typeof loginType === 'undefined') {
    throw new Error('login type is undefined');
  }

  const res = await fetch(`/api/page/${slug}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'x-auth-type': loginType.toString(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  const { status, message } = await res.json();

  if (status === 'error') {
    throw new Error(message);
  }
};
