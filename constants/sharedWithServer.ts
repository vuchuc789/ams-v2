import { FACEBOOK_API_VERSION } from './api';

export enum LOGIN_TYPE {
  FACEBOOK,
}

export const FACEBOOK_URL = `https://graph.facebook.com/${FACEBOOK_API_VERSION}`;

export const SLUG_MAX_LENGTH = 1536;
