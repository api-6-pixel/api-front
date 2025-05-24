import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { HttpService } from '../service/http.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss'],
  imports: [
    IonApp,
    IonGrid,
    IonInput,
    IonText,
    IonSelect,
    IonSelectOption,
    IonRow,
    IonTitle,
    IonButton,
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
export class RelatorioComponent implements OnInit {
  exibeFiltroUsuario: any = false;
  usuarios: any[] = []
  lotes: any[] = []
  loteSelecionado: any = {};

  constructor(private http: HttpService) { }

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
  }

  onUsuarioChange(event: any) {
    this.lotes = this.usuarios.filter(x => x.id == event.detail.value)[0].plantacao;
  }

  onLoteChange(event: any) {
    const loteId = event.detail.value;
    const selectedLote = this.lotes.find((l: { id: any }) => l.id === loteId);
    if (selectedLote) {
      this.loteSelecionado = selectedLote;
    }
  }

  filtrar() {
    this.http.get("relatorio/" + localStorage.getItem("idUser") + "/plantacao/" + this.loteSelecionado.id, { responseType: 'arraybuffer' })
      .then(x => this.downloadExcel(x, "dados_atualizacoes"))
  }

  downloadExcel(data: ArrayBuffer, name: string): void {
    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name + '.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  exportarProjecao(type: 'gastos' | 'crescimento') {
    const body = {
      meses_projecao: 5,
      fazenda_nome: this.loteSelecionado?.fazendaNome
    };

    this.http.postApiIa("projetar_crescimento/v1", body).then(data => {
      if (type == 'gastos') {
        const response = data.meses.map((month: string, index: number) => ({
          Mes: month,
          Valor: (data.gastos_projetados[index] / 100) * data.teto_gastos
        }));
        this.exportAsExcelFile(response, 'projecao_gastos');
        return;
      }

      if (type == 'crescimento') {
        const response = data.meses.map((month: string, index: number) => ({
          Mes: month,
          Crescimento: data.crescimento[index]
        }));
        this.exportAsExcelFile(response, 'projecao_crecimento');
      }
    });
  }

  exportAsExcelFile(data: any[], fileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, `${fileName}.xlsx`);
  }
}
