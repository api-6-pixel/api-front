
import { Component, Input, OnInit } from '@angular/core';
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
  termoId: any[] = [];
  @Input() check: any;
  descricao: string = '';
  itensObrigatorios: any[] = [];
  itensOpcionais: any[] = [];
  aceito: boolean = false;
  respostas: { [codigoItem: number]: boolean } = {};
  usuarioCodigo: any;
  respostaVersionada: any;
  constructor(
    private modalCtrl: ModalController,
    private http: HttpService,
    public toastController: ToastController
  ) { }


  ngOnInit() {
  this.usuarioCodigo = localStorage.getItem('idUser') || "0";
  const params = new HttpParams().set('usuarioCodigo', this.usuarioCodigo);

  this.http.get('historico/aceitos', { params }).then((data: any) => {
    this.respostaVersionada = data.map((item: any) => item.aceito);
  });

  this.http.get('historico/ativo', { params }).then((data: any) => {
    this.termoId = data.termoId;
    this.descricao = data.descricao;
    this.itensObrigatorios = data.obrigatorios;
    this.itensOpcionais = data.opcionais;
    this.aceito = data.aceito;

    const todosItens = [...this.itensObrigatorios, ...this.itensOpcionais];
    this.respostas = {};

    todosItens.forEach((item, index) => {
      this.respostas[item.codigo] = this.check !== false
        ? this.check
        : this.respostaVersionada[index]; 
    });

    this.termoId = todosItens.map(item => item.codigo);
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
  const codigoUsuario = localStorage.getItem("idUser");

  // Concatena os itens obrigatórios e opcionais na ordem
  const todosItens = [...(this.itensObrigatorios || []), ...(this.itensOpcionais || [])];

  // Cria o array de respostas em ordem, com true ou false
  const respostasArray = todosItens.map(item => !!this.respostas[item.codigo]);

  const termosAceitos = {
    usuarioCodigo: Number(codigoUsuario),
    termoItemCodigo: this.termoId,
    respostas: respostasArray, // <-- Aqui está o array com true/false
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
