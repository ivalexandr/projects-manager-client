import { Component, OnDestroy, OnInit } from '@angular/core';
import { pageAnimations } from '../../common/animations';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, DatePipe, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { TAppStore } from '../../app.config';
import {
  getTeamChatMessages,
  resetTeamChatMessages,
} from '../../store/team-chat-mesasges/team-chat-messages.actions';
import {
  selectAllTeamChatMessages,
  selectTeamChatMessagesIsLoading,
} from '../../store/team-chat-mesasges/team-chat-messages.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChatService } from '../../services/chat.service';

export interface ITeamChatForm {
  content: AbstractControl<string>;
}

@Component({
  selector: 'app-team-chat',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
    MatProgressSpinnerModule,
    DatePipe,
  ],
  templateUrl: './team-chat.component.html',
  styleUrl: './team-chat.component.scss',
  animations: [pageAnimations],
})
export class TeamChatComponent implements OnInit, OnDestroy {
  teamChatMessages$ = this.store.pipe(select(selectAllTeamChatMessages));
  isLoading$ = this.store.pipe(select(selectTeamChatMessagesIsLoading));

  chatForm = new FormGroup<ITeamChatForm>({
    content: new FormControl('', { nonNullable: true }),
  });

  constructor(
    private readonly location: Location,
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store<TAppStore>,
    private readonly chatService: ChatService
  ) {}

  componentsText = {
    back: 'Назад',
    noMessage: 'Нет сообщений...',
    form: {
      message: 'Введите сообщение',
      send: 'Отправить',
    },
  };

  get content() {
    return this.chatForm.controls.content;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if ('id' in params) {
        const chatId = params['id'] as string;
        this.store.dispatch(getTeamChatMessages({ chatId }));
        this.chatService.connect(chatId);
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetTeamChatMessages());
    this.chatService.disconnect();
  }

  submitHandler() {
    if (this.chatForm.valid) {
      this.chatService.sendMessage(this.content.value);
      this.chatForm.reset();
    }
  }

  backButtonHandler() {
    this.location.back();
  }
}
