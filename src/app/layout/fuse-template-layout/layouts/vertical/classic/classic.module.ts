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
import {QuickChatModule} from '../../../common/quick-chat/quick-chat.module';
import {SearchModule} from '../../../common/search/search.module';
import {ShortcutsModule} from '../../../common/shortcuts/shortcuts.module';
import {UserModule} from '../../../common/user/user.module';
import {SharedModule} from 'app/shared/shared.module';
import {ClassicLayoutComponent} from 'app/layout/fuse-template-layout/layouts/vertical/classic/classic.component';

@NgModule({
  declarations: [
    ClassicLayoutComponent
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
    ClassicLayoutComponent
  ]
})
export class ClassicLayoutModule {
}
