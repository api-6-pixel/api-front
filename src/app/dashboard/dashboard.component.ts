import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import {
  IonApp,
  IonSplitPane,
  IonInput,
  IonMenu,
  IonContent,
  IonList,
  IonBadge,
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
import { addIcons } from 'ionicons';
import {
  mailOutline, mailSharp, barChartOutline,
  paperPlaneOutline, paperPlaneSharp,
  heartOutline, heartSharp,
  archiveOutline, archiveSharp,
  trashOutline, trashSharp,
  warningOutline, warningSharp, chevronForwardCircleOutline, chevronForwardOutline,
  chevronBackOutline,
  leafOutline, personCircleOutline, personOutline, documentTextOutline,
  personAddOutline,
  peopleCircle,
  exitOutline,
  helpCircleOutline,
  warning
} from 'ionicons/icons';
import {
  ChartConfiguration,
  Tick,
  Chart,
  registerables,
  ChartOptions
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { PopoverConteudoComponent } from './popover-conteudo.component';
Chart.register(...registerables, annotationPlugin);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    DatePipe,
    IonApp,
    IonGrid,
    IonInput,
    IonPopover,
    IonBadge,
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

export class DashboardComponent implements OnInit {
  dailyDataSaude = [
    { status: "RUIM", data: "2025-05-15" },
    { status: "ACEITÁVEL", data: "2025-05-16" },
    { status: "IDEAL", data: "2025-05-14" },
    { status: "RUIM", data: "2025-05-12" },
    { status: "ACEITÁVEL", data: "2025-05-10" },
    { status: "IDEAL", data: "2025-05-18" },
  ];

  variaveis: any;
  constructor(public router: Router, public http: HttpService, private popoverController: PopoverController) {
    addIcons({
      helpCircleOutline,
      mailOutline,
      barChartOutline,
      warning,
      personAddOutline,
      mailSharp,
      paperPlaneOutline,
      paperPlaneSharp,
      heartOutline,
      chevronForwardCircleOutline, chevronForwardOutline, chevronBackOutline,
      heartSharp,
      exitOutline,
      archiveOutline,
      archiveSharp,
      trashOutline,
      trashSharp,
      warningOutline,
      warningSharp,
      leafOutline,
      personCircleOutline,
      personOutline,
      documentTextOutline
    });
  }
  lotes: any[] = [];
  exibeDashBoard: boolean = false;
  dataSelecionado: any;
  loteSelecionado: any;
  loteSelecionadoId: number = 0;
  dataAtual: string = '';

  today = new Date();
  tetoGastos: number = 0;
  mostrarModal = false;
  melhoriasSugeridas: string[] = [];
  exibeFiltroUsuario: any = false;


  dailyDataSaudeMelhoria: any;

  saude: any;

  labelsMap: Record<number, string> = {
    1: 'Baixo',
    2: 'Médio',
    3: 'Alto'
  };

  growthData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Crescimento',
        data: [2, 3, 2, 1, 1, 3],
        backgroundColor: 'rgba(102, 187, 106, 0.2)',
        borderColor: '#66BB6A',
        borderWidth: 2,
        fill: true,

        tension: 0.04
      }
    ]
  };




  // No seu componente TS
  growthOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return `Crescimento: ${this.labelsMap[value]}`;
          }
        }
      }
    },
    scales: {
      y: {
        min: 1,
        max: 3,
        title: {
          display: true,
          text: 'Nível de Crescimento'
        },
        ticks: {
          stepSize: 1,
          callback: (value: any) => this.labelsMap[value] || value
        }
      },
      x: {
        title: {
          display: true,
          text: 'Meses'
        }
      }
    }
  };



  financeData = {
    labels: ['Lote 1', 'Lote 2', 'Lote 3'],
    datasets: [
      {
        label: 'Receita (R$)',
        data: [15000, 22000, 18000],
        backgroundColor: 'rgba(102, 187, 106, 0.2)',
        borderColor: '#66BB6A',
        borderWidth: 2,
        fill: true
      }
    ]
  };


  public financialOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      }
      // annotation removido
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: this.tetoGastos + 10
      }
    }
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

  dailyData: any;
  usuarios: any[] = []


  ngOnInit() {


    this.http.get("usuarios").then(x => {
      this.usuarios = x;
      const funcao = localStorage.getItem("funcao")
      if (funcao?.toUpperCase().trim() == "ADMIN") {
        this.exibeFiltroUsuario = true
        return;
      }
      this.onUsuarioChange({ detail: { value: localStorage.getItem('idUser') } })
    })

    this.dataAtual = new Date().toLocaleDateString();

    const loteString = sessionStorage.getItem("lotes");

    if (loteString) {
      try {
        const loteData = JSON.parse(loteString);

        if (Array.isArray(loteData)) {
          this.lotes = loteData;
        } else {
          this.lotes = [loteData];
        }
      } catch (e) {
        console.error("Erro ao analisar os dados do sessionStorage:", e);
      }
    }
  }

  onLoteChange(event: any) {
    const loteId = event.detail.value;

    const selectedLote = this.lotes.find((l: { id: any }) => l.id === loteId);
    if (selectedLote) {
      this.loteSelecionado = selectedLote;
      this.loteSelecionadoId = loteId
    }
  }

  onUsuarioChange(event: any) {
    this.lotes = this.usuarios.filter(x => x.id == event.detail.value)[0].plantacao;
  }

  async exibirDashboard() {
    this.exibeDashBoard = true;

    const body = {
      meses_projecao: Number(this.dataSelecionado),
      fazenda_nome: this.loteSelecionado?.fazendaNome
    };

    const response = await this.http.postApiIa("projetar_crescimento/v1", body);

    // 2. Buscar melhorias
    const melhorias: any[] = await this.http.get(`feedback/plantacao/melhoria/${this.loteSelecionadoId}`);
    this.dailyDataSaudeMelhoria = melhorias;

    // 3. Buscar status diário
    const statusList: any[] = await this.http.get("feedback/plantacao/status");
    this.dailyDataSaude = statusList.map((item: any) => ({
      status: item.status,
      data: item.data
    }));

    // 4. Tabela de faixas por propriedade
    const classificacoes: any = {
      "Umidade solo": [
        { nome: 'RUIM', valor: '< 20 ou > 80' },
        { nome: 'ACEITÁVEL', valor: '20–40 ou 60–80' },
        { nome: 'IDEAL', valor: '40–60' }
      ],
      "Temperatura ambiente": [
        { nome: 'RUIM', valor: '< 10 ou > 35' },
        { nome: 'ACEITÁVEL', valor: '10–15 ou 30–35' },
        { nome: 'IDEAL', valor: '15–30' }
      ],
      "Temperatura solo": [
        { nome: 'RUIM', valor: '< 5 ou > 35' },
        { nome: 'ACEITÁVEL', valor: '5–15 ou 30–35' },
        { nome: 'IDEAL', valor: '15–30' }
      ],
      "Umidade ambiente": [
        { nome: 'RUIM', valor: '< 30 ou > 90' },
        { nome: 'ACEITÁVEL', valor: '30–50 ou 80–90' },
        { nome: 'IDEAL', valor: '50–80' }
      ],
      "Indice UV": [
        { nome: 'RUIM', valor: '< 200 ou > 1200' },
        { nome: 'ACEITÁVEL', valor: '200–400 ou 1000–1200' },
        { nome: 'IDEAL', valor: '400–1000' }
      ],
      "PH Solo": [
        { nome: 'RUIM', valor: '< 5.5 ou > 8.0' },
        { nome: 'ACEITÁVEL', valor: '5.5–6.0 ou 7.5–8.0' },
        { nome: 'IDEAL', valor: '6.0–7.5' }
      ]
    };

    this.variaveis = melhorias.map((melhoria, index) => {
      const nomePropriedade = melhoria.propriedade;
      const melhorar = melhoria.melhorar;
      const statusAtual = statusList[index]?.status || 'DESCONHECIDO';
      const statusData = statusList[index]?.data
      const faixas = classificacoes[nomePropriedade] || [];

      const precisaMelhorar = melhorar;

      let dataFormatada = '';
      if (statusData) {
        const dataObj = new Date(statusData);
        dataFormatada = dataObj.toLocaleDateString('pt-BR');
      }


      return {
        nome: nomePropriedade,
        alerta: precisaMelhorar,
        status: melhoria.status,
        valorAtual: melhoria.valorAtual,
        data: dataFormatada,
        statuses: faixas.map((faixa: any) => ({
          nome: faixa.nome === statusAtual ? `✅ ${faixa.nome}` : faixa.nome,
          valor: faixa.valor
        }))
      };
    });




    this.dailyData = await this.http.postApiIa("status_mensal/v1", {
      "fazendaNome": this.loteSelecionado.fazendaNome,
      "mes": new Date().getMonth() + 1
    });


    this.tetoGastos = response.teto_gastos;


    const growthDataMapped = response.crescimento.map((nivel: string, index: number) => {

      if (nivel === "Baixo") return 1;
      if (nivel === "Médio") return 2;
      return 3;
    });

    this.financeData = {
      labels: response.meses,
      datasets: [
        {
          label: 'Gastos Projetados (R$)',
          data: response.gastos_projetados.map((p: number) => (p / 100) * response.teto_gastos),
          backgroundColor: 'rgba(33, 150, 243, 0.2)',
          borderColor: '#2196F3',
          borderWidth: 2,
          fill: true
        }
      ]
    };

    this.growthData = {
      labels: response.meses,
      datasets: [
        {
          label: 'Crescimento',
          data: growthDataMapped,
          backgroundColor: 'rgba(102, 187, 106, 0.2)',
          borderColor: '#66BB6A',
          borderWidth: 2,
          fill: true,
          tension: 0.04
        }
      ]
    };


  }

  enviarParaCadastroPlantio() {
    this.router.navigate(['/atualizacao']);
  }

  async abrirPopover(ev: any, propriedade: string) {
    const popover = await this.popoverController.create({
      component: PopoverConteudoComponent,
      componentProps: {
        mensagem: this.getDescricaoMelhoria(propriedade),
      },
      event: ev,
      translucent: true,
    });
    await popover.present();
  }

  getDescricaoMelhoria(propriedade: string): string {
    switch (propriedade) {
      case 'Umidade solo':
        return 'Ideal: 40–60%. Aceitável: 20–40% ou 60–80%. Ruim: <20% ou >80%';
      case 'Temperatura ambiente':
        return 'Ideal: 15–30°C. Aceitável: 10–15°C ou 30–35°C. Ruim: <10°C ou >35°C';
      case 'Temperatura solo':
        return 'Ideal: 15–30°C. Aceitável: 5–15°C ou 30–35°C. Ruim: <5°C ou >35°C';
      case 'Umidade ambiente':
        return 'Ideal: 50–80%. Aceitável: 30–50% ou 80–90%. Ruim: <30% ou >90%';
      case 'Indice UV':
        return 'Ideal: 400–1000. Aceitável: 200–400 ou 1000–1200. Ruim: <200 ou >1200';
      case 'PH Solo':
        return 'Ideal: 6.0–7.5. Aceitável: 5.5–6.0 ou 7.5–8.0. Ruim: <5.5 ou >8.0';
      default:
        return 'Sem dados de referência';
    }
  }


  getStatusDescricao(propriedade: string): string {
    const tabela: Record<string, string> = {
      'Umidade solo': 'RUIM: <20% ou >80% | ACEITÁVEL: 20–40% ou 60–80% | IDEAL: 40–60%',
      'Temperatura ambiente': 'RUIM: <10°C ou >35°C | ACEITÁVEL: 10–15°C ou 30–35°C | IDEAL: 15–30°C',
      'Temperatura solo': 'RUIM: <5°C ou >35°C | ACEITÁVEL: 5–15°C ou 30–35°C | IDEAL: 15–30°C',
      'Umidade ambiente': 'RUIM: <30% ou >90% | ACEITÁVEL: 30–50% ou 80–90% | IDEAL: 50–80%',
      'Indice UV': 'RUIM: <200 ou >1200 | ACEITÁVEL: 200–400 ou 1000–1200 | IDEAL: 400–1000',
      'PH Solo': 'RUIM: <5.5 ou >8.0 | ACEITÁVEL: 5.5–6.0 ou 7.5–8.0 | IDEAL: 6.0–7.5',
    };

    return tabela[propriedade] || 'Sem informações';
  }


  getBadgeColor(status: string): string {
    switch (status.toUpperCase()) {
      case 'RUIM': return 'danger';
      case 'ACEITÁVEL': return 'warning';
      case 'IDEAL': return 'success';
      default: return 'medium';
    }
  }

  getColorForStatus(status: string): string {
    return this.getBadgeColor(status);
  }

  getIconColor(status: string): string {
    switch (status.toUpperCase()) {
      case 'RUIM': return 'danger';
      case 'ACEITÁVEL': return 'warning';
      case 'IDEAL': return 'success';
      default: return 'medium';
    }
  }


}

