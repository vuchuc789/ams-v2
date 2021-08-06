import {
  FACEBOOK_API_VERSION,
  FACEBOOK_LOGIN_SCOPES,
  FACEBOOK_USER_INFO_FIELDS,
} from '@constants';

const facebookApiUrl = `https://graph.facebook.com/${FACEBOOK_API_VERSION}`;

export class FacebookService {
  private accessToken: string = '';
  private static instance: FacebookService | undefined;

  private constructor() {}

  public static getInstance() {
    if (!FacebookService.instance && !!FB) {
      FacebookService.instance = new FacebookService();
    }

    return FacebookService.instance;
  }

  public getLoginStatus(): Promise<fb.StatusResponse> {
    return new Promise((resolve) => {
      FB.getLoginStatus(({ status, authResponse }) => {
        if (status === 'connected') {
          this.accessToken = authResponse.accessToken;
        }

        resolve({ status, authResponse });
      });
    });
  }

  public login(): Promise<fb.StatusResponse> {
    return new Promise((resolve) => {
      FB.login(
        (response) => {
          resolve(response);
        },
        { scope: FACEBOOK_LOGIN_SCOPES.join(',') },
      );
    });
  }

  public async getUserInfo(): Promise<{ [key: string]: unknown }> {
    const response = await fetch(
      `${facebookApiUrl}/me?fields=${FACEBOOK_USER_INFO_FIELDS.join(',')}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );

    return await response.json();
  }
}
