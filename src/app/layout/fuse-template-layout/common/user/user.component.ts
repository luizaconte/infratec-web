import {DomSanitizer} from '@angular/platform-browser';
import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

import {ConstantUtils} from '../../../../shared/utils/constant.utils';

import {AuthService} from '../../../../core/services/auth.service';
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
  ) {
  }


  ngOnInit(): void {
    this.userName = this.payloadService.username();
    this.userLogin = this.payloadService.user;
    this.image = ConstantUtils.NOT_PHOTO;
  }

  signOut(): void {
    this.authService.logout$.subscribe();
  }
}
