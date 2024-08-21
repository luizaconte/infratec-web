import {environment} from '../../../environments/environment';

export class EndpointUtils {

  private authUrl: string = environment.authUrl;
  private baseUrl: string = environment.baseUrl;

  ApiBaseUrl = {
    AUTH: {
      AUTORIZAR: `${this.authUrl}/autorizar`,
      LOGIN: `${this.authUrl}/login`,
      LOGOUT: `${this.authUrl}/logout`,
      REFRESH: `${this.authUrl}/atualizar`,
    },
  }

}
