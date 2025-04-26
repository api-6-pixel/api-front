import { Component, OnInit } from '@angular/core';
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
  IonText,
  IonCardContent
} from '@ionic/angular/standalone';
import { ScrollbarDirective } from '../scrollbar.directive';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    IonApp,
    IonGrid,
    IonInput,
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
  constructor(public router: Router, public http: HttpService) { }
  lotes: any[] = [];
  exibeDashBoard: boolean = false;
  dataSelecionado: any;
  loteSelecionado: any;
  tetoGastos: any;

  private labelsMap: Record<number, string> = {
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
        fill: true
      }
    ]
  };

  growthOptions = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Crescimento'
        },
        ticks: {
          callback: (value: number) => this.labelsMap[value] || value,
          stepSize: 1,
          min: 1,
          max: 3
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

  financeOptions = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Gastos Projetados (R$)'
        },
        ticks: {
          callback: (value: number) => `R$ ${value.toLocaleString('pt-BR')}`
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


  ngOnInit() {
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
    }
  }

  async exibirDashboard() {
    this.exibeDashBoard = true;
    const body = {
      meses_projecao: Number(this.dataSelecionado),
      fazenda_nome: this.loteSelecionado?.fazendaNome
    };

    const response = await this.http.postApiIa("projetar_crescimento/v1", body);
    this.dailyData = await this.http.postApiIa("status_mensal/v1", {
      "fazendaNome": this.loteSelecionado.fazendaNome,
      "mes": new Date().getMonth() + 1
    });

    this.tetoGastos = response.teto_gastos;

    const growthDataMapped = response.crescimento.map((nivel: string) => {
      if (nivel === "Baixo") return 1;
      if (nivel === "Médio") return 2;
      return 3;
    });

    // Gráfico final
    this.financeData = {
      labels: response.meses,
      datasets: [
        {
          label: 'Gastos Projetados (R$)',
          data: response.gastos_projetados.map((p: number) => (p / 100) * response.teto_gastos), // só faz o cálculo do teto
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
          fill: true
        }
      ]
    };
  }

  private obterDiasDoMes() {
    const now = new Date();
    var date = new Date(now.getFullYear(), now.getMonth(), 1);
    var days = [];
    while (date.getMonth() === now.getMonth()) {
      days.push(new Date(date).getDate());
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  enviarParaCadastroPlantio() {
    this.router.navigate(['/atualizacao']);
  }
}

