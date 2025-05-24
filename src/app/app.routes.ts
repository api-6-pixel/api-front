import { Routes } from '@angular/router';

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
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardComponent)
  },
  {
    path: 'atualizacao',
    loadComponent: () =>
      import('./atualizacao/atualizacao.component').then((m) => m.AtualizacaoComponent)
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./cadastro-plantio/cadastro-plantio.component').then((m) => m.CadastroPlantioComponent)
  },
  {
    path: 'meu-perfil',
    loadComponent: () =>
      import('./meu-perfil/meu-perfil.component').then((m) => m.MeuPerfilComponent)
  },
  {
    path: 'editar-perfil',
    loadComponent: () =>
      import('./editar-perfil/editar-perfil.component').then((m) => m.EditarPerfilComponent)
  },
  {
    path: 'relatorio',
    loadComponent: () =>
      import('./relatorio/relatorio.component').then((m) => m.RelatorioComponent)
  },
  {
    path: 'cadastrousuario',
    loadComponent: () =>
      import('./cadastro-usuario/cadastro-usuario.component').then((m) => m.CadastroUsuarioComponent)
  }
];
