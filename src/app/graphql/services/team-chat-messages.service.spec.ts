import { TestBed } from '@angular/core/testing';

import { TeamChatMessagesService } from './team-chat-messages.service';

describe('TeamChatMessagesService', () => {
  let service: TeamChatMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamChatMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
