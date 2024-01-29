import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Store, select } from '@ngrx/store';
import { TAppStore } from '../../app.config';
import {
  selectAllTeamAccessesForTeam,
  selectIsLoadingTeamAccessesForTeam,
} from '../../store/team-accesses-for-team/team-accesses-for-team.selectors';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TeamRole } from '../../graphql/enums/team-role.enum';
import { selectActiveTeamAccess } from '../../store/team-accesses/team-accesses.selectors';
import { MatButtonModule } from '@angular/material/button';
import { AddMemberDialogService } from '../add-member-dialog/add-member-dialog.service';
import { MatIconModule } from '@angular/material/icon';
import { removeTeamAccess } from '../../store/team-accesses-for-team/team-accesses-for-team.actions';

@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [MatListModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule, AsyncPipe],
  templateUrl: './members-list.component.html',
  styleUrl: './members-list.component.scss',
})
export class MembersListComponent {
  teamAccessesIsLoading$ = this.store.pipe(select(selectIsLoadingTeamAccessesForTeam));
  teamAccesses$ = this.store.pipe(select(selectAllTeamAccessesForTeam));
  teamAccessActive$ = this.store.pipe(select(selectActiveTeamAccess));

  constructor(
    private readonly store: Store<TAppStore>,
    private addMemberDialogService: AddMemberDialogService
  ) {}

  get teamRole() {
    return TeamRole;
  }

  get teamRoleValues() {
    return Object.values(TeamRole);
  }

  componentText = {
    status: {
      PENDING: 'Ожидание',
      ACTIVE: 'Активный',
      INACTIVE: 'Неактивный',
      DECLINED: 'Отклонен',
    },
    button: 'Добавить участника команды',
    role: {
      LEADER: 'Лидер',
      MODERATOR: 'Модератор',
      PARTICIPANT: 'Участник',
    },
  };

  addMemberClickHandler() {
    this.addMemberDialogService.openDialog();
  }

  removeButtonHandler(teamAccessId: string) {
    this.store.dispatch(removeTeamAccess({ teamAccessId }));
  }
}
