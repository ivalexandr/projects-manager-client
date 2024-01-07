import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_TEAM_CHAT_MESSAGES } from '../queries/get-team-chat-messages';
import { ITeamChatMessage } from '../models/team-chat-message';

@Injectable({
  providedIn: 'root',
})
export class TeamChatMessagesService {
  constructor(private readonly apollo: Apollo) {}

  getTeamChatMessages(chatId: string, lasMessageId?: string, limit?: number) {
    return this.apollo.query<{ getMessagesForChat: ITeamChatMessage[] }>({
      query: GET_TEAM_CHAT_MESSAGES,
      variables: { chatId, lasMessageId, limit },
      fetchPolicy: 'network-only',
    });
  }
}
