import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
  IonCardContent,
} from '@ionic/angular/standalone';
import { HttpService } from '../service/http.service';

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
    IonCardContent,
  ],
})
export class CadastroPlantioComponent implements OnInit {
  lotes = [
    {
      id: 1,
      nome: 'Lote 1',
      especie: 'Milho',
      condicao: 'Úmido',
      solo: 'Arenoso',
      status: 'Em andamento',
    },
    {
      id: 2,
      nome: 'Lote 2',
      especie: 'Soja',
      condicao: 'Seco',
      solo: 'Argiloso',
      status: 'Em andamento',
    },
    {
      id: 3,
      nome: 'Lote 3',
      especie: 'Trigo',
      condicao: 'Temperado',
      solo: 'Humoso',
      status: 'Finalizada',
    },
  ];

  loteSelecionado: any = null;
  especie = '';
  cadastroPlantio = '';
  condicao = '';
  solo = '';
  statusColheita = '';
  colheitaFinalizada = false;
  temperaturaAmbiente: number = 0;
  temperaturaSolo: number = 0;
  umidadeAmbiente: number = 0;
  umidadeSolo: number = 0;
  phSolo: number = 0;
  precipitacao: number = 0;
  indiceUV: number = 0;
  nomeEspecie = '';
  valorGastos: number = 0;
  areaPlantada: number = 0;

  constructor(
    private httpService: HttpService,
    private router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() { }

  async enviarDados() {
    var usuarioCodigo = localStorage.getItem("idUser")
    if (
      !this.cadastroPlantio ||
      this.nomeEspecie.length == 0 ||
      this.temperaturaSolo === null ||
      this.umidadeAmbiente === null ||
      this.umidadeSolo === null ||
      this.phSolo === null ||
      this.indiceUV === null ||
      this.areaPlantada === null ||
      this.valorGastos === null ||
      this.temperaturaAmbiente === null
    ) {
      this.exibirToast('Preencha todos os campos obrigatórios!', 'danger');
      return;
    }
    const dados = {
      fazendaNome: this.cadastroPlantio,
      especieNome: this.nomeEspecie,
      areaPlantada: this.areaPlantada,
      custoEsperado: this.valorGastos,
      status: "EM_CRESCIMENTO",
      temperaturaAmbiente: this.temperaturaAmbiente,
      temperaturaSolo: this.temperaturaSolo,
      umidadeAmbiente: this.umidadeAmbiente,
      umidadeSolo: this.umidadeSolo,
      phSolo: this.phSolo,
      indiceUV: this.indiceUV,
      idUsuario: Number(usuarioCodigo)
    };

    this.httpService
      .post('plantacoes', dados)
      .then((response) => {

        let lotesSalvos = sessionStorage.getItem("lotes");

        let array = lotesSalvos ? JSON.parse(lotesSalvos) : [];

        array.push(response);

        sessionStorage.setItem("lotes", JSON.stringify(array));
        this.exibirToast("Dados enviados com sucesso!", "success")

        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        const mensagemErro = error?.message || "Erro desconhecido";
        this.exibirToast(`Erro ao enviar os dados! Erro: ${mensagemErro}`, "danger");

      });

  }

  async exibirToast(mensagem: string, cor: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom',
      color: cor,
    });
    await toast.present();
  }
}
