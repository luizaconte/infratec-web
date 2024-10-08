import {Injectable} from '@angular/core';

import {AuthToken} from '../../model/credential.model';
import {TokenPayload} from '../../model/token-payload.model';

import {StorageUtils} from '../../shared/utils/storage.utils';
import {ConstantUtils} from '../../shared/utils/constant.utils';
import {SharedUtils} from "../../shared/utils/shared.utils";

@Injectable({
  providedIn: 'root'
})
export class PayloadService {

  username(abbrev = false): string {
    const payload = this.tokenPayload;
    if (payload.user.nome && payload.user.nome.length > 0) {
      if (abbrev) {
        const firstSpace = payload.user.nome.indexOf(' ');
        payload.user.nome = payload.user.nome.substring(0, firstSpace + 1);
      }
    } else {
      payload.user.nome = payload.user.login;
    }
    return payload.user.nome;
  }

  get user(): string {
    return this.tokenPayload.user.login;
  }

  get userId(): number {
    return Number(this.tokenPayload?.user.id ?? 0);
  }

  get accessToken(): string {
    return StorageUtils.valueSession<AuthToken>(ConstantUtils.STORAGE.TOKEN)?.accessToken;
  }

  get refreshToken(): string {
    return StorageUtils.valueSession<AuthToken>(ConstantUtils.STORAGE.TOKEN)?.refreshToken;
  }

  get payload(): TokenPayload {
    return SharedUtils.valueStorage(ConstantUtils.STORAGE.PAYLOAD, 'sessionStorage');
  }

  private get tokenPayload(): TokenPayload {
    return new TokenPayload(this.payload);
  }
}
