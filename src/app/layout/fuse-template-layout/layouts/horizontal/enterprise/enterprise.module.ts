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
import {MessagesModule} from 'app/layout/fuse-template-layout/common/messages/messages.module';
import {NotificationsModule} from 'app/layout/fuse-template-layout/common/notifications/notifications.module';
import {QuickChatModule} from 'app/layout/fuse-template-layout/common/quick-chat/quick-chat.module';
import {SearchModule} from 'app/layout/fuse-template-layout/common/search/search.module';
import {ShortcutsModule} from 'app/layout/fuse-template-layout/common/shortcuts/shortcuts.module';
import {UserModule} from 'app/layout/fuse-template-layout/common/user/user.module';
import {SharedModule} from 'app/shared/shared.module';
import {EnterpriseLayoutComponent} from 'app/layout/fuse-template-layout/layouts/horizontal/enterprise/enterprise.component';

@NgModule({
  declarations: [
    EnterpriseLayoutComponent
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
    QuickChatModule,
    SearchModule,
    ShortcutsModule,
    UserModule,
    SharedModule
  ],
  exports: [
    EnterpriseLayoutComponent
  ]
})
export class EnterpriseLayoutModule {
}
