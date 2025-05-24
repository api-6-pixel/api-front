
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
  funcaoSelecionada:string="";
  abriu:boolean = false;
  check:boolean = false;

  constructor(private modalCtrl: ModalController,private http:HttpService, public toastController: ToastController
  ) {}

  ngOnInit() {}

  
  async openModal() {
    this.abriu = true;
    const modal = await this.modalCtrl.create({
      component: ModalTermoUsuarioComponent,
      componentProps: { check: this.check }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {

      if (data.accepted === false) {
        this.check = true;
        localStorage.setItem("termo", "recusou")
        console.log('Usuário recusou os termos');
      } else if (data.accepted === true) {
        this.check = true;

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
      nomeUsuario: this.usuarioNome,
      email: this.email,
      senha: this.senha,
      documento: this.cpf,
      funcaoSelecionada: this.funcaoSelecionada
    };

    this.enviando = true;

    this.http.post("usuarios", body)
      .then((response: any) => {
        const idUsuario = response.id;

        this.exibirToast("Cadastro realizado com sucesso!", "success");

        const termos = localStorage.getItem("termos");
        if (termos) {
          const termosAceitos = JSON.parse(termos);
          const aceitos = termosAceitos.respostas;
          const codigos = termosAceitos.termoItemCodigo;

          const promessas = [];

          for (let i = 0; i < codigos.length; i++) {
            const codigo = codigos[i];
            const termoObj = {
              aceito: aceitos[i],
              termoItemCodigo: codigos[0],
              usuarioCodigo: idUsuario
            };

            promessas.push(this.http.post("historico/aceite", termoObj));
          }

          // Aguarda todas as requisições terminarem
          Promise.all(promessas)
  
        const termos = localStorage.getItem("termos");
        if (termos) {
          const termosAceitos = JSON.parse(termos);
 
          if(this.check == true){

          }
 
 
          const termosObj = {
            "aceito":termosAceitos.respostas[1],

            "termoItemCodigo":termosAceitos.termoItemCodigo,
              "usuarioCodigo":idUsuario,
          };
          termosAceitos.usuarioCodigo = idUsuario;
  
          this.http.post("historico/aceite", termosObj)
            .then(() => {
              this.exibirToast("Termos aceitos!", "success");
            })
            .catch((error: any) => {
              console.error("Erro ao aceitar termos:", error);
            });
        } else {
          console.log("Nenhum termo encontrado no localStorage");
        }
      })
      .catch((error: any) => {
        console.error("Erro ao cadastrar usuário:", error);
      })
      .finally(() => {
        this.enviando = false;
      });
  }


}