import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonTitle, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonHeader, IonToolbar, IonButton, IonButtons, IonCard, IonCol, IonFooter, IonInput, IonModal, IonPopover, IonRow, IonThumbnail, IonGrid, IonToggle, IonCardTitle, LoadingController, ToastController } from '@ionic/angular/standalone';
import { ToastModule } from 'primeng/toast';
import {
    lockClosedOutline,
    personOutline
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { HttpService } from '../service/http.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [
        IonToggle,
        NgClass,
        NgFor,
        FormsModule,
        NgIf,
        IonRouterOutlet,
        IonHeader,
        IonContent,
        IonFooter,
        IonToolbar,
        IonSplitPane,
        IonCardTitle,
        LoginComponent,
        IonGrid,
        IonMenu,
        IonApp,
        IonList,
        IonCard,
        IonRow,
        IonCol,
        IonItem,
        IonButtons,
        IonButton,
        IonThumbnail,
        IonInput,
        IonIcon,
        IonTitle,
        IonLabel,
        IonPopover,
        IonModal,
        RouterLink,
        RouterLinkActive,
        ReactiveFormsModule,
        ToastModule,
    ],
})

export class LoginComponent implements OnInit {
    email: string = '';
    senha: string = '';

    constructor(
        private http: HttpService,
        private router: Router,
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController
    ) {
        addIcons({
            personOutline,
            lockClosedOutline
        });
    }

    ngOnInit() {
        localStorage.removeItem("token")
        localStorage.removeItem("idUser")
    }


    redirectToCadastroUser() {
        this.router.navigate(['cadastrousuario'], {
            queryParams: { showMenu: 'true' }
        });
    }


    setAcessoTrue() {
        localStorage.setItem("acesso", "true");
    }


    async tryLogin() {
        const loading = await this.loadingCtrl.create({
            message: 'Aguarde...',
            spinner: 'crescent'
        });

        await loading.present();

        const body = {
            nomeUsuario: this.email,
            senha: this.senha
        };

        this.http.post("auth/login", body)
            .then(async (response: any) => {
                await loading.dismiss();
                localStorage.setItem("idUser", response.idUsuario);
                localStorage.setItem("token", response.token);
                localStorage.setItem("funcao", response.funcao)
                await this.router.navigate(['folder/inbox']);
            })
            .catch(async (error: any) => {
                await loading.dismiss();
                const toast = await this.toastCtrl.create({
                    message: 'E-mail ou senha incorretos!',
                    duration: 2000,
                    color: 'danger'
                });
                toast.present();
            });
    }
}