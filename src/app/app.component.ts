import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
// Importações do PrimeNG
import { ToastModule } from 'primeng/toast';
import { IonApp, IonTitle, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonHeader, IonToolbar, IonButton, IonButtons, IonCard, IonCol, IonFooter, IonInput, IonModal, IonPopover, IonRow, IonThumbnail, IonToggle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  mailOutline, mailSharp, barChartOutline,
  paperPlaneOutline, paperPlaneSharp, 
  heartOutline, heartSharp, 
  archiveOutline, archiveSharp, 
  trashOutline, trashSharp, 
  warningOutline, warningSharp,chevronForwardCircleOutline, chevronForwardOutline, 
  chevronBackOutline,
  leafOutline, personCircleOutline, personOutline, documentTextOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    IonToggle,
    NgClass,
    NgFor,
    NgIf,
    IonRouterOutlet,
    IonHeader,
    IonContent,
    IonFooter,
    IonToolbar,
    IonSplitPane,
    IonMenu,
    IonList,
    IonCard,
    IonRow,
    IonCol,
    IonItem,
    IonButtons,
    IonButton,
    IonThumbnail,
    IonInput,
    IonIcon,
    IonTitle,
    IonLabel,
    IonPopover,
    IonModal,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    ToastModule,
  ],
})
export class AppComponent {
  menus: any[] = [];
  children: any[] = [];
  menuSelected = '';
  childrenSelected = '';

  title = '';
  username: string = '';
  theme: string = '';
  badge: number = 0;

  //Menu Hover
  isOpenMenu = false;

  //SubMenu Hover
  isOpenChildren = false;

  //CHANGE PASSWORD
  isModalChangePassword = false;

  constructor() {
    addIcons({
      mailOutline, 
      barChartOutline,
      mailSharp, 
      paperPlaneOutline, 
      paperPlaneSharp, 
      heartOutline, 
      chevronForwardCircleOutline, chevronForwardOutline,chevronBackOutline,
      heartSharp, 
      archiveOutline, 
      archiveSharp, 
      trashOutline, 
      trashSharp, 
      warningOutline, 
      warningSharp,
      leafOutline,
      personCircleOutline,
      personOutline,
      documentTextOutline
    });
  }
  

  async ngOnInit() {
  
    this.menus = [
      {
        caption:"PERFIL",
        link:'meu-perfil',
        icon:'person-outline'
      },
      {
        caption: 'DASHBOARD',
        link: 'dashboard',
        icon: 'bar-chart-outline', 
      },
      {
        caption:"CADASTRO PLANTIO",
        link:'cadastro',
        icon:'document-text-outline'
      },
      {
        caption:"ATUALIZAÇÃO PLANTIO",
        link:'atualizacao',
        icon:'leaf-outline'
      },
    ];
  }
  


 

  openMenu(isOpen: boolean) {
    if (!this.isOpenChildren) {
      this.isOpenMenu = isOpen;
    }
  }






  


}
