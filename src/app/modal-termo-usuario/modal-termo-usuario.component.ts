
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollbarDirective } from '../scrollbar.directive';
import { HttpService } from '../service/http.service';
import { body } from 'ionicons/icons';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-modal-termo-usuario',
  standalone: true,
  templateUrl: './modal-termo-usuario.component.html',
  styleUrls: ['./modal-termo-usuario.component.scss'],
  imports: [
    IonicModule,
    ScrollbarDirective,
    FormsModule,
    NgIf,
    NgFor,
  ],
})
export class ModalTermoUsuarioComponent implements OnInit {
  termoId: number = 0;
  descricao: string = '';
  itensObrigatorios: any[] = [];
  itensOpcionais: any[] = [];
  aceito: boolean = false;
  respostas: { [codigoItem: number]: boolean } = {};
  usuarioCodigo: any;
  constructor(
    private modalCtrl: ModalController,
    private http: HttpService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.usuarioCodigo = localStorage.getItem('idUser') || "0"
    const params = new HttpParams().set('usuarioCodigo', this.usuarioCodigo);
    this.http.get('historico/ativo', { params }).then((data: any) => {
      this.termoId = data.termoId;
      this.descricao = data.descricao;
      this.itensObrigatorios = data.obrigatorios;
      this.itensOpcionais = data.opcionais;
      this.aceito = data.aceito;
    
      [...this.itensObrigatorios, ...this.itensOpcionais].forEach((item) => {
        this.respostas[item.codigo] = item.aceito;
      });
    });
    

  }

  podeConcordar(): boolean {
    // Verifica se todos os obrigatórios foram aceitos
    return this.itensObrigatorios.every(
      (item) => this.respostas[item.codigo]
    );
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

  concordar() {
    var codigoUsuario = localStorage.getItem("idUser");

    const termosAceitos = {
      usuarioCodigo: Number(codigoUsuario),
      termoItemCodigo: this.termoId,
      respostas: this.respostas,
    };

    localStorage.setItem('termos', JSON.stringify(termosAceitos));

    this.modalCtrl.dismiss({
      accepted: true,
      termos: termosAceitos,
    });
  }



  recusar() {
    const respostasRecusadas: { [codigo: number]: boolean } = { ...this.respostas };

    Object.keys(respostasRecusadas).forEach(codigo => {
      const codigoNumero = Number(codigo);
      respostasRecusadas[codigoNumero] = false;
    });

    var codigoUsuario = localStorage.getItem("idUser");
    const termosAceitos = {
      usuarioCodigo: Number(codigoUsuario),
      termoItemCodigo: this.termoId,
      respostas: respostasRecusadas,
    };

    localStorage.setItem('termos', JSON.stringify(termosAceitos));




    this.modalCtrl.dismiss({
      accepted: false,
      termos: termosAceitos,
    });
  }



  close() {
    this.modalCtrl.dismiss();
  }
}