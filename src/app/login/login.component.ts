import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonTitle, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonHeader, IonToolbar, IonButton, IonButtons, IonCard, IonCol, IonFooter, IonInput, IonModal, IonPopover, IonRow, IonThumbnail,  IonGrid, IonToggle,IonCardTitle } from '@ionic/angular/standalone';
import { ToastModule } from 'primeng/toast';
import { 
  lockClosedOutline,
  personOutline
} from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    IonToggle,
    NgClass,
    NgFor,
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

export class LoginComponent  implements OnInit {

  constructor() { 
        addIcons({
          personOutline,
          lockClosedOutline
        });
  }

  ngOnInit() {}

}
