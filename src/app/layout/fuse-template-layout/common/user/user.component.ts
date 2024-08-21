import {DomSanitizer} from '@angular/platform-browser';
import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

import {ConstantUtils} from '../../../../shared/utils/constant.utils';

import {AuthService} from '../../../../core/services/auth.service';
import {FileServerService} from '../../../../shared/services/file-server.service';
import {PayloadService} from '../../../../core/services/payload.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  encapsulation: ViewEncapsulation.None,
  exportAs: 'user'
})
export class UserComponent implements OnInit {

  @Input() showAvatar: boolean = true;

  userName: string;
  userLogin: string;

  image: any;

  constructor(
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private payloadService: PayloadService,
    private fileServerService: FileServerService
  ) {
  }


  ngOnInit(): void {
    this.userName = this.payloadService.username();
    this.userLogin = this.payloadService.user;
    this.image = ConstantUtils.NOT_PHOTO;
  }

  private loadUserImage(photo) {
    this.fileServerService.downloadFile$(photo).subscribe({
      next: file => {
        const reader = new FileReader();
        reader.readAsDataURL(file.body);
        reader.onload = (readerEvent: any) => this.image = this.sanitizer.bypassSecurityTrustResourceUrl(readerEvent.target.result);
      },
      error: () => this.image = ConstantUtils.NOT_PHOTO
    });
  }

  signOut(): void {
    this.authService.logout$.subscribe();
  }
}
