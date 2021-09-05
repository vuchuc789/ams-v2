import {
  FACEBOOK_LOGIN_SCOPES,
  FACEBOOK_URL,
  FACEBOOK_USER_INFO_FIELDS,
} from '@constants';

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
          const { status, authResponse } = response;
          if (status === 'connected') {
            this.accessToken = authResponse.accessToken;
          }

          resolve(response);
        },
        { scope: FACEBOOK_LOGIN_SCOPES.join(',') },
      );
    });
  }

  public async getUserInfo(): Promise<{ [key: string]: unknown }> {
    const response = await fetch(
      `${FACEBOOK_URL}/me?fields=${FACEBOOK_USER_INFO_FIELDS.join(',')}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );

    return await response.json();
  }

  public logout(): Promise<void> {
    return new Promise((resolve) => {
      FB.logout(() => {
        resolve();
      });
    });
  }
}
