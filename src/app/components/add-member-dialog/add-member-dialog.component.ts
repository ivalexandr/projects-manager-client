import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { TeamRole } from '../../graphql/enums/team-role.enum';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { TAppStore } from '../../app.config';
import { inviteUserToTeam } from '../../store/team-accesses-for-team/team-accesses-for-team.actions';
import { selectActiveTeamAccess } from '../../store/team-accesses/team-accesses.selectors';
import { AddMemberDialogService } from './add-member-dialog.service';

export interface IAddMemberForm {
  username: AbstractControl<string>;
  role: AbstractControl<string>;
}

@Component({
  selector: 'app-add-member-dialog',
  standalone: true,
  imports: [MatDialogModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './add-member-dialog.component.html',
  styleUrl: './add-member-dialog.component.scss',
})
export class AddMemberDialogComponent {
  activeTeamAccess = this.store.selectSignal(selectActiveTeamAccess);

  constructor(
    private readonly store: Store<TAppStore>,
    private readonly addMemberDialogService: AddMemberDialogService
  ) {}

  form = new FormGroup<IAddMemberForm>({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    role: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  get teamRoleValues() {
    return Object.values(TeamRole);
  }

  get teamRole() {
    return TeamRole;
  }

  get formInvalid() {
    return this.form.invalid;
  }

  get username() {
    return this.form.controls.username;
  }

  get role() {
    return this.form.controls.role;
  }

  componentText = {
    title: 'Добавить нового участника',
    form: {
      username: 'Введите никнейм пользователя',
      chooseRole: 'Выберите роль в команде для пользователя',
      added: 'Добавить',
    },
    role: {
      LEADER: 'Лидер',
      MODERATOR: 'Модератор',
      PARTICIPANT: 'Участник',
    },
  };

  submitFormHandler() {
    if (this.form.valid) {
      this.store.dispatch(
        inviteUserToTeam({
          create: {
            teamId: this.activeTeamAccess()!.team.id,
            username: this.username.value,
            teamRole: this.role.value as TeamRole,
          },
        })
      );
      this.form.reset();
      this.addMemberDialogService.closeDialog();
    }
  }
}
