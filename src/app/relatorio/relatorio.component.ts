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
      .then(x => this.downloadExcel(x, "lote"))
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
}
