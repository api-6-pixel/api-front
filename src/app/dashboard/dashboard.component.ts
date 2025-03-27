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
  constructor(public router: Router, public http: HttpService) {}
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
      teto_gastos: this.tetoGastos
    };

    const response = await this.http.postApiIa("projetar_crescimento/v1", body);

    const labelData = response.meses.map((item: any) => this.monthsMap[item] || item);


    
    
    let acumulado = 0;
    let aux_gastos_projetados = [];
    aux_gastos_projetados.push(response.gastos_projetados[0])
    
    aux_gastos_projetados.push(response.gastos_projetados[response.gastos_projetados.length - 1])
    alert(aux_gastos_projetados)
    const financeDataMapped = aux_gastos_projetados.map((percentual: number) => {
      acumulado += (percentual / 100) * this.tetoGastos;
      return acumulado;
  });
/*
    let acumulado = 0;
      const financeDataMapped = response.gastos_projetados.map((percentual: number) => {
        acumulado += (percentual / 100) * this.tetoGastos;
        return acumulado;
    });
*/
    // Normalizando gastos para criar uma relação entre crescimento e gastos
    const maxGasto = Math.max(...financeDataMapped);
    
    const growthDataMapped = financeDataMapped.map((value: number) => {
        const normalized = value / maxGasto; 
        if (normalized > 0.7) return 1; // Muito gasto → crescimento ruim
        if (normalized > 0.4) return 2; // Gasto médio → crescimento médio
        return 3; // Pouco gasto → crescimento alto
    });

    let aux = [];
    aux.push(labelData[0]);  // Primeiro elemento
    aux.push(labelData[labelData.length - 1]);  // Último elemento
    
    alert(aux);
    
    alert(aux)
    // Configuração do gráfico de gastos projetados
    this.financeData = {
      labels: aux.map(item=>item),
      datasets: [
        {
          label: 'Gastos Projetados (R$)',
          data: financeDataMapped,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: '#FF6384',
          borderWidth: 2,
          fill: true
        }
      ]
    };

    // Configuração do gráfico de crescimento
    this.growthData = {
      labels: aux.map(item=>item),
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

    // Ajuste da escala do eixo Y para exibir os valores corretamente formatados em reais
    this.financeOptions = {
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
}
  enviarParaCadastroPlantio() {
    this.router.navigate(['/atualizacao']);
  }
}

