import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScrollbarDirective } from '../scrollbar.directive';
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
  IonInput,
  IonSelectOption,
  IonGrid,
  IonCardHeader,
  IonRow,
  IonCardContent

} from '@ionic/angular/standalone';

@Component({
  selector: 'app-cadastro-plantio',
  templateUrl: './cadastro-plantio.component.html',
  styleUrls: ['./cadastro-plantio.component.scss'],
  imports: [ 
    IonApp,
    IonGrid,
    ScrollbarDirective,
    IonSelect,
    FormsModule,
    IonSelectOption,
    IonRow, 
    IonTitle,
    IonCardHeader,
    IonInput,
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
export class CadastroPlantioComponent  implements OnInit {
  lotes = [
    { id: 1, nome: 'Lote 1', especie: 'Milho', condicao: 'Úmido', solo: 'Arenoso', status: 'Em andamento' },
    { id: 2, nome: 'Lote 2', especie: 'Soja', condicao: 'Seco', solo: 'Argiloso', status: 'Em andamento' },
    { id: 3, nome: 'Lote 3', especie: 'Trigo', condicao: 'Temperado', solo: 'Humoso', status: 'Finalizada' },
  ];

  loteSelecionado: any = null;
  especie = '';
  condicao = '';
  solo = '';
  statusColheita = '';
  colheitaFinalizada = false;

  onLoteChange(event: any) { }
  constructor() { }
  ngOnInit() {}

}
