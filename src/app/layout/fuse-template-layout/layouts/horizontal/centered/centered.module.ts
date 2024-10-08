import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {FuseFullscreenModule} from '@fuse/components/fullscreen';
import {FuseLoadingBarModule} from '@fuse/components/loading-bar';
import {FuseNavigationModule} from '@fuse/components/navigation';
import {MessagesModule} from '../../../common/messages/messages.module';
import {NotificationsModule} from '../../../common/notifications/notifications.module';
import {SearchModule} from 'app/layout/fuse-template-layout/common/search/search.module';
import {ShortcutsModule} from 'app/layout/fuse-template-layout/common/shortcuts/shortcuts.module';
import {UserModule} from 'app/layout/fuse-template-layout/common/user/user.module';
import {SharedModule} from 'app/shared/shared.module';
import {CenteredLayoutComponent} from 'app/layout/fuse-template-layout/layouts/horizontal/centered/centered.component';

@NgModule({
  declarations: [
    CenteredLayoutComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    FuseFullscreenModule,
    FuseLoadingBarModule,
    FuseNavigationModule,
    MessagesModule,
    NotificationsModule,
    SearchModule,
    ShortcutsModule,
    UserModule,
    SharedModule
  ],
  exports: [
    CenteredLayoutComponent
  ]
})
export class CenteredLayoutModule {
}
