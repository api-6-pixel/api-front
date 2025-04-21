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
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollbarDirective } from '../scrollbar.directive';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UsuarioDTO } from 'src/app/interfaces/usuario-model';

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
    NgFor,
    NgIf,
    IonCard,
    IonCardContent,
    IonText
  ],
})


export class MeuPerfilComponent  implements OnInit {
  private baseUrl = environment.api; 
  

  usuarioData: UsuarioDTO | undefined;

  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit() {
    this.carregarUsuario();
  }

  irParaEditarPerfil() {
    this.router.navigate(['/editar-perfil']);
  }

  carregarUsuario() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      'Access-Control-Allow-Origin': '*'
    })

    const idUsuario = 1; // ou pegue esse ID de um AuthService, token JWT, localStorage etc.
    this.http.get<UsuarioDTO>(`${this.baseUrl}/usuarios/${idUsuario}`, {headers})
      .subscribe({
        next: (res) => {
          this.usuarioData = res;
        }
      });
    }
  
  //getUsuarioLogado() {
    //return this.http.get(`${this.baseUrl}/idUsuario`);

}