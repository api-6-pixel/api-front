import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
import { HttpService } from '../service/http.service';
import { body } from 'ionicons/icons';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atualizacao',
  templateUrl: './atualizacao.component.html',
  styleUrls: ['./atualizacao.component.scss'],
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
export class AtualizacaoComponent implements OnInit {
  constructor(
    public http:HttpService,
    public toastController:ToastController,
    public router:Router
  ) { }

  ngOnInit() {}

  lotes = [
    { id: 1, nome: 'Milho', especie: 'Milho', condicao: 'Úmido', solo: 'Arenoso', status: 'Em andamento' },
    { id: 2, nome: 'Soja', especie: 'Soja', condicao: 'Seco', solo: 'Argiloso', status: 'Em andamento' },
    { id: 3, nome: 'Trigo', especie: 'Trigo', condicao: 'Temperado', solo: 'Humoso', status: 'Finalizada' },
  ];

  loteSelecionado: any = null;
  especie = '';
  condicao = '';
  solo = '';
  statusColheita = '';
  colheitaFinalizada = false;
  plantacaoId:number = 0;
  temperaturaAmbiente: number = 0;
  temperaturaSolo: number = 0;
  umidadeAmbiente: number = 0;
  umidadeSolo: number = 0;
  phSolo: number = 0;
  precipitacao: number = 0;
  indiceUV: number = 0;

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

  capturarValor(event:any){
    this.plantacaoId = event?.target?.value  
  }

  async enviarDados() {
    if (!this.plantacaoId || this.temperaturaAmbiente === null || this.temperaturaSolo === null || 
        this.umidadeAmbiente === null || this.umidadeSolo === null || this.phSolo === null || 
        this.indiceUV === null) {
      
      this.exibirToast("Preencha todos os campos obrigatórios!", "danger");
      return;
    }

    const dados = {
      plantacaoId: this.plantacaoId,
      temperaturaAmbiente: this.temperaturaAmbiente,
      temperaturaSolo: this.temperaturaSolo,
      umidadeAmbiente: this.umidadeAmbiente,
      umidadeSolo: this.umidadeSolo,
      phSolo: this.phSolo,
      indiceUV: this.indiceUV,
    };

    try {
      const response = await this.http.post("atualizacoes", dados);
      this.exibirToast("Dados enviados com sucesso!", "success");

      this.router.navigate(['/dashboard']);
    } catch (error:any) {

      const mensagemErro = error?.message || "Erro desconhecido";
      this.exibirToast(`Erro ao enviar os dados! Erro: ${mensagemErro}`, "danger");
    }
  }


  async exibirToast(mensagem: string, cor: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000, 
      position: "bottom",
      color: cor, 
    });
    await toast.present();
  }
}

