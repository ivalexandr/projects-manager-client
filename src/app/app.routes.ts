import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { createTeamGuard } from './guards/create-team.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'create-team',
    loadComponent: () =>
      import('./pages/create-team-page/create-team-page.component').then(
        m => m.CreateTeamPageComponent
      ),
    canActivate: [createTeamGuard],
  },
];
