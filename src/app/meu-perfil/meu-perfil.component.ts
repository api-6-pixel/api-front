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
  IonText
} from '@ionic/angular/standalone';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollbarDirective } from '../scrollbar.directive';
import { Router } from '@angular/router';
import { UsuarioDTO } from 'src/app/interfaces/usuario-model';
import { UsuarioService } from '../service/usuario.service';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.scss'],

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
    DatePipe,
    NgFor,
    NgIf,
    IonCard,
    IonCardContent,
    IonText
  ],
})


export class MeuPerfilComponent implements OnInit {
  usuarioData: UsuarioDTO = {
    id:0,
    documento: '',
    dataCriacao: '',
    nome: '',
    email: '',
    plantacao: [] as any[]
  };
  

  constructor(private usuarioService: UsuarioService,private http:HttpService, private router: Router) { }

  ngOnInit() {
    this.carregarUsuario();
  }

  irParaEditarPerfil() {
    this.router.navigate(['/editar-perfil']);
  }

  carregarUsuario() {
    var usuarioCodigo = localStorage.getItem('idUser')
    this.usuarioService.obterUsuario(Number(usuarioCodigo))
      .subscribe({
        next: (res) => {
          this.usuarioData = res;
          console.log(res)
        }
      });
  }

  
  confirmarExclusao() {
    const confirm = window.confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível.');
    if (confirm) {
      this.excluirConta();
    }
  }
  
  excluirConta() {
    if (window.confirm("Você quer mesmo deletar sua conta?")) {
      var usuarioCodigo = localStorage.getItem('idUser')
      this.usuarioService.deletarUsuario(Number(usuarioCodigo))
      .subscribe({
        next: (res) => {
          this.router.navigate(['/'])
        }
      });
    }
  }
  
  notificarUsuarios() {
    var usuarioCodigo = localStorage.getItem('idUser')
    const body = {}
    this.http.post("notificacoes",body)
  }
}
