export class ConstantUtils {
  // Caminho padrão da imagem de usuários sem foto
  static readonly NOT_PHOTO = '../../../assets/images/no-avatar.svg';
  static readonly NOT_IMAGE = '../../assets/images/no-image.png';

  static STORAGE = {
    // Armazenamento de filtros / páginas em LocalStorage
    FILTER_VALUE: 'filterValueInt',
    // Alias para variável usado no SessionStorage, contendo informações do token do cookie
    PAYLOAD: '_pl_Int',
    // Armazena o tema atual selecionado
    TEMA: 'tema',
    // access e refresh
    TOKEN: '_tk_Int',
    NAVIGATION: 'navigation',
    CURRENT_NAVIGATION: 'c_navigation'
  };

}
