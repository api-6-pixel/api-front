import { Routes } from '@angular/router';
import { CadastroPlantioComponent } from './cadastro-plantio/cadastro-plantio.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {

    path: 'home',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },

  {
    path:'dashboard',
    loadComponent: () =>
        import('./dashboard/dashboard.component').then((m) => m.DashboardComponent)
  },
  {
    path:'atualizacao',
    loadComponent:() =>
      import('./atualizacao/atualizacao.component').then((m)=>m.AtualizacaoComponent)
  },
  {
    path:'cadastro',
    loadComponent:() =>
      import('./cadastro-plantio/cadastro-plantio.component').then((m)=>m.CadastroPlantioComponent)
  }
];
