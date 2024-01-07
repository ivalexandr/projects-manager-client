import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { io, Socket } from 'socket.io-client';
import { TAppStore } from '../app.config';
import { selectAuthUser } from '../store/auth/auth.selectors';
import { first } from 'rxjs';
import { ITeamChatMessage } from '../graphql/models/team-chat-message';
import { addTeamChatMessage } from '../store/team-chat-mesasges/team-chat-messages.actions';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private url = 'ws://localhost:3000/team-chat';
  private socket!: Socket;
  constructor(private readonly store: Store<TAppStore>) {}

  connect(chatId: string) {
    const user$ = this.store.pipe(select(selectAuthUser));

    user$.pipe(first(u => !!u)).subscribe(authUser => {
      if (authUser?.access_token) {
        this.socket = io(this.url, {
          transports: ['websocket'],
          query: {
            token: authUser.access_token,
            chatId,
          },
        });

        this.socket.connect();
      }
    });

    this.onMessage();
  }

  sendMessage(content: string) {
    this.socket.emit('chatToServer', { content });
  }

  disconnect() {
    this.socket.disconnect();
  }

  private onMessage() {
    if (this.socket) {
      this.socket.on('chatToClient', (message: ITeamChatMessage) => {
        this.store.dispatch(addTeamChatMessage({ message }));
      });
    }
  }
}
