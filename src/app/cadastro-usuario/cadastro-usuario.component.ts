import { Component, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ScrollbarDirective } from '../scrollbar.directive';
import { ModalTermoUsuarioComponent } from '../modal-termo-usuario/modal-termo-usuario.component';
import { HttpService } from '../service/http.service';
import { ToastController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss'],
  imports: [
    IonicModule,            
    ScrollbarDirective,
    FormsModule,
    NgFor,
    NgIf,
  ],
})
export class CadastroUsuarioComponent implements OnInit {
  nome:string="";
  senha:string="";
  cpf:string="";
  email:string="";
  usuarioNome:string="";
  funcao:string="";
  abriu:boolean = false;
  constructor(private modalCtrl: ModalController,private http:HttpService, public toastController: ToastController
  ) {}

  ngOnInit() {}

  
  async openModal() {
    this.abriu = true;
    const modal = await this.modalCtrl.create({
      component: ModalTermoUsuarioComponent,
    });
  
    await modal.present();
  
    const { data } = await modal.onDidDismiss();
  
    if (data) {
  
      if (data.accepted === false) {
        localStorage.setItem("termo","recusou")
        console.log('Usuário recusou os termos');
      } else if (data.accepted === true) {
        console.log('Usuário aceitou os termos');
      } else {
        console.log('Modal fechado sem ação definida');
      }
    }
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




  
  
  enviando = false; 




  enviarDados() {
    const termo = localStorage.getItem("termo");
    if (termo === "recusou" || this.abriu === false || this.enviando) {
      return;
    }
  
    if (!this.usuarioNome || !this.email || !this.senha || !this.cpf) {
      this.exibirToast("Por favor, preencha todos os campos obrigatórios.", "danger");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.exibirToast("Por favor, insira um e-mail válido.", "warning");
      return;
    }
  
    const body = {
      nome: this.usuarioNome,
      email: this.email,
      senha: this.senha,
      documento: this.cpf,
      funcao: "USUARIO"
    };
  
    this.enviando = true;
  
    this.http.post("usuarios", body)
      .then((response: any) => {
        const idUsuario = response.id; 
  
        this.exibirToast("Cadastro realizado com sucesso!", "success");
        console.log("Usuário cadastrado com ID:", idUsuario);
  
        const termos = localStorage.getItem("termos");
        if (termos) {
          const termosAceitos = JSON.parse(termos);
  
          termosAceitos.usuarioCodigo = idUsuario;
  
          this.http.post("historico/aceite", termosAceitos)
            .then(() => {
              this.exibirToast("Termos aceitos!", "success");
            })
            .catch((error: any) => {
              console.log(error);
            });
        } else {
          console.log("Nenhum termo encontrado no localStorage");
        }
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
        this.enviando = false;
      });
  }
  


}
