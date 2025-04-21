import { Component, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ScrollbarDirective } from '../scrollbar.directive';
import { ModalTermoUsuarioComponent } from '../modal-termo-usuario/modal-termo-usuario.component';
import { HttpService } from '../service/http.service';

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
  constructor(private modalCtrl: ModalController,private http:HttpService) {}

  ngOnInit() {}

  
  async openModal() {
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
  


  enviarDados(){
    var termo = localStorage.getItem("termo");
    if(termo == "recusou"){
      return;
    }
    const body = {
      nome:this.usuarioNome,
      email:this.email,
      senha:this.senha,
      documento:this.cpf
    }

    this.http.post("usuarios", body)
      .then((m) => console.log("ok"))
        .catch((error: any) => console.log(error)) 

  
  }
}
