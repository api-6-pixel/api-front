import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { ScrollbarDirective } from '../scrollbar.directive';
@Component({
  selector: 'app-atualizacao',
  templateUrl: './atualizacao.component.html',
  styleUrls: ['./atualizacao.component.scss'],
  imports: [ 
      IonApp,
      IonGrid,
      ScrollbarDirective  ,
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
export class AtualizacaoComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

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

  onLoteChange(event: any) {
    const loteId = event.detail.value;
    const lote = this.lotes.find(l => l.id === loteId);
    if (lote) {
      this.especie = lote.especie;
      this.condicao = lote.condicao;
      this.solo = lote.solo;
      this.statusColheita = lote.status;
      this.colheitaFinalizada = lote.status === 'Finalizada';
    }
  }

  finalizarColheita(event: any) {
    this.colheitaFinalizada = event.detail.checked;
    this.statusColheita = this.colheitaFinalizada ? 'Finalizada' : 'Em andamento';
  }
}
