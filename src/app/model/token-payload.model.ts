/* tslint:disable:variable-name */
import {Usuarios} from "./usuarios.model";

export class TokenPayload {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  scope: string;
  user: Usuarios;

  constructor(data: any) {
    if (data) {
      this.accessToken = data.accessToken;
      this.refreshToken = data.refreshToken;
      this.tokenType = data.tokenType;
      this.expiresIn = data.expiresIn;
      this.scope = data.scope;
      this.user = data.user;
    }
  }
}
