import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'create-team',
    loadComponent: () =>
      import('./pages/create-team-page/create-team-page.component').then(
        m => m.CreateTeamPageComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'user-team/:id',
    loadComponent: () =>
      import('./pages/user-team/user-team.component').then(m => m.UserTeamComponent),
    canActivate: [authGuard],
  },
  {
    path: 'team-chat/:id',
    loadComponent: () =>
      import('./pages/team-chat/team-chat.component').then(m => m.TeamChatComponent),
    canActivate: [authGuard],
  },
];
