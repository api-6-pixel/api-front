import { Component } from '@angular/core';
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
export class DashboardComponent {
  constructor(public router: Router, public http: HttpService) {}

  exibeDashBoard: boolean = false;
  dataSelecionado: any;
  loteSelecionado: any;
  tetoGastos: any;

  private labelsMap: Record<number, string> = {
    1: 'Baixo',
    2: 'Médio',
    3: 'Alto'
  };

  private monthsMap: Record<string, string> = {
    "January": "Jan",
    "February": "Fev",
    "March": "Mar",
    "April": "Abr",
    "May": "Mai",
    "June": "Jun",
    "July": "Jul",
    "August": "Ago",
    "September": "Set",
    "October": "Out",
    "November": "Nov",
    "December": "Dez"
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
          text: 'Receita (R$)'  
        },
        ticks: {
          callback: (value: number) => `R$ ${value}`, 
        }
      },
      x: {
        title: {
          display: true,
          text: 'Lotes' 
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

  async exibirDashboard() {
    this.exibeDashBoard = true;
    const body = {
      meses_projecao: Number(this.dataSelecionado),
      teto_gastos: 100
    };
  
    const response = await this.http.postApiIa("projetar_crescimento/v1", body);
  
    const labelData = response.meses.map((item: any) => this.monthsMap[item] || item);
    const financeData = response.gastos_projetados.map((item: any) => item);
  
  
    const growthDataMapped = response.crescimento.map((item: any) => {
      if (item === "Alto") return 3;  
      if (item === "Médio") return 2;  
      if (item === "Baixo") return 1;  
      return 0; // Valor padrão
    });
  
    this.financeData = {
      labels: labelData,  
      datasets: [
        {
          label: 'Receita (R$)',  
          data: financeData,  
          backgroundColor: 'rgba(102, 187, 106, 0.2)',  
          borderColor: '#66BB6A',  
          borderWidth: 2,  
          fill: true  
        }
      ]
    };

    this.growthData = {
      labels: labelData,  
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
  
  enviarParaCadastroPlantio() {
    this.router.navigate(['/atualizacao']);
  }
}
