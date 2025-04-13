import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollbarDirective } from '../scrollbar.directive';

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
  termoObrigatorio1 = false;
  termoObrigatorio2 = false;
  termoOpcional1 = false;
  termoOpcional2 = false;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit(): void {}

  podeConcordar(): boolean {
    return this.termoObrigatorio1 && this.termoObrigatorio2;
  }


  concordar() {
    const termosAceitos = {
      obrigatorios: {
        termo1: this.termoObrigatorio1,
        termo2: this.termoObrigatorio2,
      },
      opcionais: {
        termo1: this.termoOpcional1,
        termo2: this.termoOpcional2,
      },
      consentidoEm: new Date().toISOString(),
    };

    localStorage.setItem("termos",JSON.stringify(termosAceitos))
  
    this.modalCtrl.dismiss({
      accepted: true,
      termos: termosAceitos,
    });
  }
  

  recusar() {
    this.modalCtrl.dismiss({
      accepted: false,
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
