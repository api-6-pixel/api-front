import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
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
  }
];
