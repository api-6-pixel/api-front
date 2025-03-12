import { Component, OnInit } from '@angular/core';
import { 
  IonApp, 
  IonSplitPane, 
  IonMenu, 
  IonContent, 
  IonList, 
  IonCheckbox,
  IonRadio,
  IonInput,
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
  IonFab,
  
  IonCard,
  IonMenuButton,
  IonButtons,
  IonToolbar,
  IonHeader,
  IonImg,
  IonFabButton,
  IonRow

} from '@ionic/angular/standalone';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  imports: [
    IonApp, 
    IonRow,
    IonCard,  
    IonCheckbox,
    IonRadio,
    IonInput,
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
    IonFab,
IonFabButton,
    IonHeader,
    IonImg
],

})
export class CadastroComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
