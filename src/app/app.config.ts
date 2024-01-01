import { APP_INITIALIZER, ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { graphqlProvider } from './graphql.provider';
import { ActionReducerMap, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { TAuthReducer, authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppInitService } from './services/app-init.service';
import { TCreateTeamReducer, createTeamReducer } from './store/create-team/create-team.reducer';
import { CraeteTeamEffects } from './store/create-team/create-team.effects';
import { IUserTeamsReducer, userTeamsReducer } from './store/user-teams/user-teams.reducer';
import { UserTeamsEffects } from './store/user-teams/user-teams.effects';
import {
  ITeamsPaginatedReducer,
  teamPaginatedReducer,
} from './store/teams-paginated/teams-paginated.reducer';
import { TeamsPaginatedEffects } from './store/teams-paginated/teams-paginated.effects';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);

export type TAppStore = {
  auth: TAuthReducer;
  createTeam: TCreateTeamReducer;
  userTeams: IUserTeamsReducer;
  teamsPaginated: ITeamsPaginatedReducer;
};

const reducers: ActionReducerMap<TAppStore> = {
  auth: authReducer,
  createTeam: createTeamReducer,
  userTeams: userTeamsReducer,
  teamsPaginated: teamPaginatedReducer,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    graphqlProvider,
    provideStore<TAppStore>(reducers),
    provideEffects(AuthEffects, CraeteTeamEffects, UserTeamsEffects, TeamsPaginatedEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitService: AppInitService) => () => appInitService.init(),
      deps: [AppInitService],
      multi: true,
    },
  ],
};
