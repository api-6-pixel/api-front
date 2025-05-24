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
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

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
  lotes: any[] = [];
  loteSelecionado: any = null;
  especie = '';
  condicao = '';
  solo = '';
  statusColheita = '';
  colheitaFinalizada = false;
  plantacaoId: number = 0;
  fazendaNome: string = '';
  temperaturaAmbiente: number = 0;
  temperaturaSolo: number = 0;
  umidadeAmbiente: number = 0;
  umidadeSolo: number = 0;
  phSolo: number = 0;
  precipitacao: number = 0;
  indiceUV: number = 0;

  constructor(
    public http: HttpService,
    public toastController: ToastController,
    public router: Router
  ) { }

  teste() {


  }

  ngOnInit() {
    this.http.get("usuarios").then(x => {
      this.lotes = x.filter((z:any) => z.id == localStorage.getItem('idUser'))[0].plantacao;
    })
  }

  onLoteChange(event: any) {
    const loteId = event.detail.value;

    const selectedLote = this.lotes.find((l: { id: any }) => l.id === loteId);
    if (selectedLote) {
      this.loteSelecionado = selectedLote;
      this.plantacaoId = selectedLote.id;
      this.fazendaNome = selectedLote.fazendaNome;
      this.especie = selectedLote.especieNome;
      this.solo = selectedLote.tipoSolo;
      this.statusColheita = selectedLote.status;
    }
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
      fazendaNome: this.fazendaNome,
      temperaturaAmbiente: this.temperaturaAmbiente,
      temperaturaSolo: this.temperaturaSolo,
      umidadeAmbiente: this.umidadeAmbiente,
      umidadeSolo: this.umidadeSolo,
      phSolo: this.phSolo,
      indiceUV: this.indiceUV,
    };


    this.http.post("atualizacoes", dados).then((response) => {
      this.exibirToast("Dados enviados com sucesso!", "success")
      this.router.navigate(['/dashboard']);
    }
    ).catch((error) => {
      const mensagemErro = error?.message || "Erro desconhecido";
      this.exibirToast(`Erro ao enviar os dados! Erro: ${mensagemErro}`, "danger");
    });

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
