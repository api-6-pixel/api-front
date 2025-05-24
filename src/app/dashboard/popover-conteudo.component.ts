import { Component, Input, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { NgIf, NgFor } from '@angular/common';
import {
  IonApp,
  IonSplitPane,
  IonInput,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
  IonButton,
  IonCol,
  IonTitle,
  IonMenuButton,
  IonButtons,
  IonToolbar,
  IonHeader,
  IonCard,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonCardHeader,
  IonRow,
  IonModal,
      IonPopover,

  IonText,
  IonCardContent,
  IonCardTitle,
  PopoverController
} from '@ionic/angular/standalone';
import { ScrollbarDirective } from '../scrollbar.directive';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-popover-conteudo',
  templateUrl: './popover-conteudo.component.html',
  styleUrls: ['./popover-conteudo.component.scss'],
    imports: [
    IonApp,
    IonGrid,
    IonInput,
        IonPopover,

    IonCardTitle,
    ScrollbarDirective,
    FormsModule,
    IonText,
    IonSelect,
    IonSelectOption,
    IonRow,
    IonTitle,
    ChartModule,
    ButtonModule,
    IonCardHeader,
    IonModal,
    IonIcon,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
    IonButton,
    IonCol,
    IonMenuButton,
    IonTitle,
    IonButtons,
    IonToolbar,
    IonHeader,
    NgFor,
    NgIf,
    IonCard,
    IonCardContent
  ],
})
export class PopoverConteudoComponent {
  @Input() mensagem!: string;
}
