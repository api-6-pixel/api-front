import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { NgIf,NgFor } from '@angular/common';
import { 
  IonApp, 
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
  IonCardContent

} from '@ionic/angular/standalone';
import { ScrollbarDirective } from '../scrollbar.directive';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [ 
    IonApp,
    IonGrid,
    ScrollbarDirective  ,
    IonSelect,
    IonSelectOption,
    IonRow, 
    IonTitle,
    ChartModule,
    ButtonModule,
    IonCardHeader,
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

export class DashboardComponent {
  exibeDashBoard:boolean = false;
  growthData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Produção (kg)',
        data: [500, 800, 1200, 1500, 1800, 2200],
        backgroundColor: 'rgba(102, 187, 106, 0.2)',
        borderColor: '#66BB6A', 
        borderWidth: 2,
        fill: true  
      }
    ]
  };
  

  financeData = {
    labels: ['Lote 1', 'Lote 2', 'Lote 3'],
    datasets: [
      {
        label: 'Receita (R$)',
        backgroundColor: '#66BB6A',
        data: [15000, 22000, 18000]
      }
    ]
  };

  soilData = {
    labels: ['Fertilizantes', 'Irrigação', 'Correção de pH'],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  exibirDashboard(){
    this.exibeDashBoard = true;
  }
}