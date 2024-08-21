import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {FuseMediaWatcherService} from '@fuse/services/media-watcher';
import {FuseNavigationService, FuseVerticalNavigationComponent} from '@fuse/components/navigation';
import {Navigation} from 'app/layout/fuse-template-layout/core/navigation/navigation.types';
import {NavigationService} from 'app/layout/fuse-template-layout/core/navigation/navigation.service';
import {UserService} from 'app/layout/fuse-template-layout/core/user/user.service';
import {EndpointUtils} from '../../../../../shared/utils/endpoint.utils';
import {EmpresaService} from '../../../../../shared/services/empresa.service';
import packageJson from '../../../../../../../package.json';

@Component({
  selector: 'sia-layout',
  templateUrl: './sia-layout.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./sia-layout.component.scss']
})
export class SiaLayoutComponent implements OnInit, OnDestroy {

  picture = new EndpointUtils().ApiAberturaEmpresas.LOGO_ENTIDADE;
  empresaName: string;

  isScreenSmall: boolean;
  navigation: Navigation;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  frontVersion: string = packageJson.version;
  apiVersion: string = '-';

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _navigationService: NavigationService,
    private _userService: UserService,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _fuseNavigationService: FuseNavigationService,
    private empresaService: EmpresaService
  ) {
    this.empresaService.name$.subscribe(name => {
      this.empresaName = name
    });
    this.empresaService.get$(new EndpointUtils().ApiAberturaEmpresas.PING).subscribe(result => {
      this.apiVersion = result.serverVersion;
    })
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }


  ngOnInit(): void {
    // Subscribe to navigation data
    this._navigationService.navigation$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((navigation: Navigation) => this.navigation = navigation);

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({matchingAliases}) => {
        this.isScreenSmall = !matchingAliases.includes('md');
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle navigation
   *
   * @param name
   */
  toggleNavigation(name: string): void {
    const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

    if (navigation) {
      navigation.toggle();
    }
  }
}
