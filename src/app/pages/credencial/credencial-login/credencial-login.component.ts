import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';

import {finalize} from 'rxjs/operators';

import {AuthCredential} from '../../../model/credential.model';

import {ToastUtils} from '../../../shared/utils/toast.utils';

import {AuthService} from '../../../core/services/auth.service';

import {RouteUtils} from '../../../shared/utils/route.utils';

@Component({
    selector: 'infratec-credencial-login',
    templateUrl: './credencial-login.component.html',
    styles: [`
        dx-button {
            height: 40px
        }

        a {
            cursor: pointer;
            text-decoration: none;
            font-size: 12px !important;
        }

        a:hover {
            text-decoration: underline;
        }
    `
    ]
})
export class CredencialLoginComponent implements OnInit {


    credential: AuthCredential = new AuthCredential();

    passwordMode = 'password';

    passwordButton: any;

    showLoading = false;

    constructor(private router: Router, private authService: AuthService) {
    }

    get isMobile(): boolean {
        const htmlClasses = document.querySelector('html').classList;
        return htmlClasses.contains('dxAndroidMobilePlatform') || htmlClasses.contains('dxMacOSMobilePlatform');
    }

    ngOnInit(): void {
        if (this.authService.isLoggedIn) {
            this.router.navigate([RouteUtils.INICIO]);
        }
        this.passwordButton = {
            icon: 'far fa-eye',
            stylingMode: 'text',
            hint: 'Mostrar/Esconder',
            onClick: (event) => {
                event.component.option('icon', this.passwordMode === 'text' ? 'far fa-eye' : 'far fa-eye-slash');
                this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
            }
        };
    }

    login(): void {
        this.toggleLoading();
        this.authService.login$(this.credential).pipe(
            finalize(() => this.toggleLoading())
        ).subscribe({
            next: () => this.router.navigate([RouteUtils.INICIO]),
            error: (error) => {
                if ((error.status === 0) || (error.status === 401) || (error.status === 404)) {
                    ToastUtils.error(error.error.error);
                }
            }
        });
    }


    private toggleLoading() {
        this.showLoading = !this.showLoading;
    }
}

