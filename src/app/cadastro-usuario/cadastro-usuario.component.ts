
import { Component, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ScrollbarDirective } from '../scrollbar.directive';
import { ModalTermoUsuarioComponent } from '../modal-termo-usuario/modal-termo-usuario.component';
import { HttpService } from '../service/http.service';
import { ToastController } from '@ionic/angular/standalone';
import { HttpParams } from '@angular/common/http';

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

  nome: string = "";
  senha: string = "";
  cpf: string = "";
  email: string = "";
  usuarioNome: string = "";
  funcaoSelecionada: string = "";
  abriu: boolean = false;
  check: boolean = false;


  descricao: string = '';
  termoTitulo:string = "";
  termoDescricao:string = "";

  itensObrigatorios: any[] = [];
  itensOpcionais: any[] = [];
  aceito: boolean = false;
  respostas: { [codigoItem: number]: boolean } = {};
  usuarioCodigo: any;
  respostaVersionada: any;
  constructor(private modalCtrl: ModalController, private http: HttpService, public toastController: ToastController
  ) { }

  ngOnInit() { }


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



  async enviarDados(): Promise<void> {
     console.log("Pasddou if udrrt1")
    const termo = localStorage.getItem("termo");


    const idUsuarioLocal = localStorage.getItem("idUser");

    if (idUsuarioLocal) {
      const termosString = localStorage.getItem("termos");
      if (termosString) {
        const termosAceitos = JSON.parse(termosString);
        const aceitos = termosAceitos.respostas;
        const codigos = termosAceitos.termoItemCodigo;

        const promessas = [];

        for (let i = 0; i < aceitos.length; i++) {
          const codigo = codigos[i];
          const termoObj = {
            aceito: aceitos[i],
            termoItemCodigo: codigo,
            usuarioCodigo: Number(idUsuarioLocal)
          };
          promessas.push(this.http.post("historico/aceite", termoObj));
        }

        await Promise.all(promessas);

        if (this.check === true) {
          const termosObj = {
            aceito: termosAceitos.respostas[1],
            termoItemCodigo: termosAceitos.termoItemCodigo,
            usuarioCodigo: Number(idUsuarioLocal)
          };

          try {
            await this.http.post("historico/aceite", termosObj);
            this.exibirToast("Termos aceitos!", "success");

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
              funcao: this.funcaoSelecionada
            };


            const response: any = await this.http.post("usuarios", body);
            const idUsuario = response.id;
            this.exibirToast("Cadastro realizado com sucesso!", "success");






          } catch (error) {
            console.error("Erro ao aceitar termos:", error);
          }
        }

        return;
      } else {
        console.log("Nenhum termo encontrado no localStorage");
        return;
      }
    }
    console.log("Pasddou if udrrt")

    // Validação dos campos obrigatórios
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
      funcao: this.funcaoSelecionada
    };

    this.enviando = true;

    try {
      const response: any = await this.http.post("usuarios", body);
      const idUsuario = response.id;
      this.exibirToast("Cadastro realizado com sucesso!", "success");

      // Se houver termos, envia o aceite
      const termosString = localStorage.getItem("termos");
      if (termosString) {
        const termosAceitos = JSON.parse(termosString);
        const aceitos = termosAceitos.respostas;
        const codigos = termosAceitos.termoItemCodigo;

        const promessas = [];

        for (let i = 0; i <= aceitos.length; i++) {
          const codigo = codigos[i];
          const termoObj = {
            aceito: aceitos[i],
            termoItemCodigo: codigo,
            usuarioCodigo: idUsuario
          };
          promessas.push(this.http.post("historico/aceite", termoObj));
        }

        await Promise.all(promessas);

        if (this.check === true) {
          const termosObj = {
            aceito: termosAceitos.respostas[1],
            termoItemCodigo: termosAceitos.termoItemCodigo,
            usuarioCodigo: idUsuario
          };

          try {
            await this.http.post("historico/aceite", termosObj);
            this.exibirToast("Termos aceitos!", "success");
          } catch (error) {
            console.error("Erro ao aceitar termos:", error);
          }
        }
      } else {

        if (this.check == true) {
          console.log("ta aqui")
          //envia o request sem abrir o modal
          this.usuarioCodigo = localStorage.getItem('idUser') || "0";
          const params = new HttpParams().set('usuarioCodigo', this.usuarioCodigo);


          this.http.get('historico/ativo', { params }).then((data: any) => {
            this.itensObrigatorios = data.obrigatorios;
            this.itensOpcionais = data.opcionais;
            this.aceito = data.aceito;

            const todosItens = [...this.itensObrigatorios, ...this.itensOpcionais];
            this.respostas = {};


            if (this.check == true) {

              [...this.itensObrigatorios, ...this.itensOpcionais].forEach((item) => {
                
                 const termosObj = {
                aceito: true,
                termoItemCodigo: item.codigo,
                usuarioCodigo: idUsuario
              };

             this.http.post("historico/aceite", termosObj);
            this.exibirToast("Termos aceitos!", "success");
              });
            }
          });
        }
        console.log("Nenhum termo encontrado no localStorage");
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    } finally {
      this.enviando = false;
    }
  }



}