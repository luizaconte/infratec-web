import {SimNaoSia} from '../../enum/sim-nao-sia.enum';

export class SimNaoUtils {

  static checkValue = (event): SimNaoSia => {
    return event ? SimNaoSia.SIM : SimNaoSia.NAO;
    // tslint:disable-next-line:semicolon
  };

  static valueChecked = (yesNo: SimNaoSia): boolean => {
    return yesNo === SimNaoSia.SIM;
    // tslint:disable-next-line:semicolon
  };
}
