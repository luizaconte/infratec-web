/* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */

export class AuthCredential {
  username: string;
  password: string;

  certificate: any;
  data: any;
  signature: any;

  clear() {
    this.password = null;
    this.certificate = null;
    this.data = null;
    this.signature = null;
  }
}

export class AuthKey {
  bearer: string;
}

export class AuthToken {
  accessToken: string;
  refreshToken: string;
}
