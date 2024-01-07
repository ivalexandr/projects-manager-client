import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TeamChatMessagesService } from '../../graphql/services/team-chat-messages.service';
import * as teamChatMessagesActions from './team-chat-messages.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class TeamChatMessagesEffects {
  getTeamChatMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamChatMessagesActions.getTeamChatMessages),
      switchMap(action =>
        this.teamChatMessagesService
          .getTeamChatMessages(action.chatId, action.lastMessageId, action.limit)
          .pipe(
            map(({ data }) =>
              teamChatMessagesActions.getTeamChatMessagesSuccess({
                messages: data.getMessagesForChat,
              })
            ),
            catchError(err =>
              of(teamChatMessagesActions.getTeamChatMessagesFailure({ error: err.message }))
            )
          )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly teamChatMessagesService: TeamChatMessagesService
  ) {}
}
