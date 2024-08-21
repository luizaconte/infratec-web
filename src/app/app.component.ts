import {DOCUMENT} from '@angular/common';
import {Platform} from '@angular/cdk/platform';
import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import * as moment from 'moment';

import config from 'devextreme/core/config';
import {loadMessages, locale} from 'devextreme/localization';
import ptMessages from 'devextreme/localization/messages/pt.json';
import RELocalization from '../assets/dev-express/rich-edit-language/dx-rich.pt-BR.json';

import {MatIconRegistry} from '@angular/material/icon';
import {NavigationService} from './layout/fuse-template-layout/core/navigation/navigation.service';


config({
  editorStylingMode: 'filled',
  defaultCurrency: 'BRL'
});

@Component({
  selector: 'infratec-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
              private platform: Platform,
              private renderer: Renderer2,
              private route: ActivatedRoute,
              private iconRegistry: MatIconRegistry,
              private navigationService: NavigationService,
              @Inject(DOCUMENT) private document: Document) {

    locale('pt-BR');
    loadMessages(ptMessages);
    loadMessages({'pt-BR': RELocalization});
    moment.locale('pt-BR');

    this.iconRegistry.setDefaultFontSetClass('material-icons-outlined');

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }

  }

  ngOnInit(): void {
    this.navigationService.navigation$;
  }

}
