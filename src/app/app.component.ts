import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
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
  warningOutline, warningSharp, chevronForwardCircleOutline, chevronForwardOutline,
  chevronBackOutline,
  leafOutline, personCircleOutline, personOutline, documentTextOutline,
  personAddOutline,
  peopleCircle,
  exitOutline,
  documentOutline
} from 'ionicons/icons';
import { LoginComponent } from './login/login.component';

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
    LoginComponent,
    IonMenu,
    IonApp,
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
  showLogin = false;
  showMenu = false;
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

  constructor(private router: Router, private route: ActivatedRoute) {
    addIcons({
      mailOutline,
      barChartOutline,
      personAddOutline,
      mailSharp,
      paperPlaneOutline,
      paperPlaneSharp,
      heartOutline,
      chevronForwardCircleOutline, chevronForwardOutline, chevronBackOutline,
      heartSharp,
      exitOutline,
      archiveOutline,
      archiveSharp,
      trashOutline,
      trashSharp,
      warningOutline,
      warningSharp,
      leafOutline,
      personCircleOutline,
      personOutline,
      documentTextOutline,
      documentOutline
    });

    // Sempre que houver navegação, verificar se é para a página de login ou outra
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showLogin = event.urlAfterRedirects === '/';

        // Agora também vamos verificar o parâmetro para controlar o menu
        this.checkMenu();
      }
    });
  }

  async ngOnInit() {
    this.initializeMenus();
  }

  checkMenu() {
    this.route.queryParams.subscribe(params => {
      const acessoUsuario = params['showMenu'];

      if (acessoUsuario === 'true') {
        this.showMenu = true;
        this.menus = [{
          caption: "SAIR",
          link: '',
          icon: 'exit-outline'
        }];
      } else {
        this.showMenu = false;
        this.initializeMenus();
      }
    });
  }

  initializeMenus() {
    const acessoUsuario = localStorage.getItem('acesso');
    if (acessoUsuario === 'true') {
      this.menus = [{
        caption: "SAIR",
        link: '',
        icon: 'exit-outline'
      }];
    } else {
      this.menus = [
        {
          caption: "PERFIL",
          link: 'meu-perfil',
          icon: 'person-outline'
        },
        {
          caption: 'DASHBOARD',
          link: 'dashboard',
          icon: 'bar-chart-outline',
        },
        {
          caption: "CADASTRO PLANTIO",
          link: 'cadastro',
          icon: 'document-text-outline'
        },
        {
          caption: "ATUALIZAÇÃO PLANTIO",
          link: 'atualizacao',
          icon: 'leaf-outline'
        },
        {
          caption: "RELATORIOS",
          link: 'relatorio',
          icon: 'document-outline'
        },
        {
          caption: "SAIR",
          link: '',
          icon: 'exit-outline'
        },
      ];
    }
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();

    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }

    this.router.navigate(['/']);
  }

  openMenu(isOpen: boolean) {
    if (!this.isOpenChildren) {
      this.isOpenMenu = isOpen;
    }
  }
}
