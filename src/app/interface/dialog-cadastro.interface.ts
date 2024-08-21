import {ICadastroBase} from '../layout/cadastro-base-layout/cadastro/cadastro-base/cadastro-base.component';

import {IBase} from '../layout/cadastro-base-layout/cadastro/cadastro-base.interface';

export interface IDialogCadastro {
  cadastroBase: ICadastroBase;
  dadosBase: IBase;
}
