import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollbarDirective } from '../scrollbar.directive';
import { HttpService } from '../service/http.service';
import { body } from 'ionicons/icons';

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
  aceito:boolean = false;
  respostas: { [codigoItem: number]: boolean } = {};

  constructor(
    private modalCtrl: ModalController,
    private http: HttpService,
    public toastController: ToastController
  ) {}

  ngOnInit() {

    this.http.get('historico/ativo?termoItemCodigo=1').then((data: any) => {
      this.termoId = data.termoId;
      this.descricao = data.descricao;
      this.itensObrigatorios = data.obrigatorios;
      this.itensOpcionais = data.opcionais;
      this.aceito = data.aceito; 
      if(this.aceito){
        [...this.itensObrigatorios, ...this.itensOpcionais].forEach((item) => {
          this.respostas[item.codigo] = true;
        });
      }
      
      else{
      [...this.itensObrigatorios, ...this.itensOpcionais].forEach((item) => {
        this.respostas[item.codigo] = false;
      });
    }});
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
   var codigoUsuario =  localStorage.getItem("idUser");

    const termosAceitos = {
      usuarioCodigo: Number(codigoUsuario),  
      termoItemCodigo: this.termoId,
      respostas: this.respostas,  // Envia todas as respostas (true/false)
    };

    localStorage.setItem('termos', JSON.stringify(termosAceitos));

    this.http.post("historico/aceite", termosAceitos).then((response: any) => {
      this.exibirToast("Termos aceitos!", "success");
    }).catch((error: any) => {
      this.exibirToast("Erro ao aceitar os termos!", "danger");
    });

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
  
    var codigoUsuario =  localStorage.getItem("idUser");
    const termosAceitos = {
      usuarioCodigo: Number(codigoUsuario),
      termoItemCodigo: this.termoId,
      respostas: respostasRecusadas,
    };
  
    localStorage.setItem('termos', JSON.stringify(termosAceitos));
  
    this.http.post("historico/aceite", termosAceitos).then((response: any) => {
      this.exibirToast("Termos recusados!", "success");
    }).catch((error: any) => {
      this.exibirToast("Erro ao recusar os termos!", "danger");
    });
  

    
    this.modalCtrl.dismiss({
      accepted: false,
      termos: termosAceitos,
    });
  }
  
  

  close() {
    this.modalCtrl.dismiss();
  }
}
