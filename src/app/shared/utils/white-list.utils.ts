import {HttpRequest} from '@angular/common/http';

export class WhiteListUtils {

  static isWhiteListed(request: HttpRequest<any>, blackList: Array<any>): boolean {
    const index = blackList.findIndex(item => {
      const isValidUrl = request.url.includes(item.url);
      const isValidMethod = item.method.findIndex(method => {
        return method === '*' || method === request.method;
      }) !== -1;

      return isValidUrl && isValidMethod;
    });
    return index === -1;
  }
}
