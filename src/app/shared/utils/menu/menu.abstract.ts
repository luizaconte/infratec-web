import {FuseNavigationItem} from '../../../../@fuse/components/navigation';

export abstract class MenuAbstract {
  abstract get menu(): FuseNavigationItem | FuseNavigationItem[];
}
