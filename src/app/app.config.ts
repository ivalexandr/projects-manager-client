import { APP_INITIALIZER, ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

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
import {
  ITeamAccessReducer,
  teamAccessesReducer,
} from './store/team-accesses/team-accesses.reducer';
import { UserTeamsEffects } from './store/team-accesses/team-accsseses.effects';
import {
  ITeamsPaginatedReducer,
  teamPaginatedReducer,
} from './store/teams-paginated/teams-paginated.reducer';
import { TeamsPaginatedEffects } from './store/teams-paginated/teams-paginated.effects';
import { IMAGE_CONFIG, registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {
  IProjectsInTeamReducer,
  projectsInTeamReducer,
} from './store/projects-in-team/projects-in-team.reducer';
import { ProjectsInTeamEffects } from './store/projects-in-team/projects-in-team.effects';
import {
  ITeamChatMessagesReducer,
  teamChatMessagesReducer,
} from './store/team-chat-mesasges/team-chat-messages.reducer';
import { TeamChatMessagesEffects } from './store/team-chat-mesasges/team-chat-messages.effects';

registerLocaleData(localeRu);

export type TAppStore = {
  auth: TAuthReducer;
  createTeam: TCreateTeamReducer;
  teamAccesses: ITeamAccessReducer;
  teamsPaginated: ITeamsPaginatedReducer;
  projectsInTeam: IProjectsInTeamReducer;
  teamChatMessages: ITeamChatMessagesReducer;
};

const reducers: ActionReducerMap<TAppStore> = {
  auth: authReducer,
  createTeam: createTeamReducer,
  teamAccesses: teamAccessesReducer,
  teamsPaginated: teamPaginatedReducer,
  projectsInTeam: projectsInTeamReducer,
  teamChatMessages: teamChatMessagesReducer,
};

const effects = [
  AuthEffects,
  CraeteTeamEffects,
  UserTeamsEffects,
  TeamsPaginatedEffects,
  ProjectsInTeamEffects,
  TeamChatMessagesEffects,
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideAnimations(),
    provideHttpClient(),
    graphqlProvider,
    provideStore<TAppStore>(reducers),
    provideEffects(effects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitService: AppInitService) => () => appInitService.init(),
      deps: [AppInitService],
      multi: true,
    },
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true,
      },
    },
  ],
};
