import { Component, OnInit } from '@angular/core';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonText,
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
  IonInput,
  IonSelectOption,
  IonGrid,
  IonCardHeader,
  IonRow,
  IonCardContent,
} from '@ionic/angular/standalone';

import { ToastController } from '@ionic/angular';
import { DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollbarDirective } from '../scrollbar.directive';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioDTO } from '../interfaces/usuario-model';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss'],
  imports: [
    IonApp,
    IonGrid,
    ScrollbarDirective,
    IonSelect,
    FormsModule,
    IonSelectOption,
    IonRow,
    IonTitle,
    IonCardHeader,
    IonInput,
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
    IonText,
    IonCardContent,
    DatePipe

  ],
})
export class EditarPerfilComponent implements OnInit {
  usuarioData!: UsuarioDTO;

  constructor(private usuarioService: UsuarioService, private toastController: ToastController) { }

  ngOnInit() {
    this.carregarUsuario()
  }

  carregarUsuario() {
    this.usuarioService.obterUsuario(5)
      .subscribe({
        next: (res) => {
          this.usuarioData = res;
        }
      });
  }

  atualizarUsuario() {
    const invalido = Object.keys(this.usuarioData).some((v, i) => !v)
    if (invalido) {
      this.exibirToast("Preencha todos os campos obrigatórios!", "danger");
      return;
    }
    this.usuarioService.atualizarUsuario(5, this.usuarioData)
      .subscribe({
        next: () => this.exibirToast("Dados enviados com sucesso!", "success"),
        error: _ => this.exibirToast(`Erro ao enviar os dados!`, "danger")
      });
  }

  exibirToast(mensagem: string, cor: string) {
    this.toastController.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom',
      color: cor,
    })
      .then(x => x.present());
  }
}
