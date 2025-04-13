import { Component, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ScrollbarDirective } from '../scrollbar.directive';
import { ModalTermoUsuarioComponent } from '../modal-termo-usuario/modal-termo-usuario.component';

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
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalTermoUsuarioComponent,
    });
    return await modal.present();
  }
}
