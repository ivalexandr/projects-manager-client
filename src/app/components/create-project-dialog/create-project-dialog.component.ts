import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogContent,
  MatDialogTitle,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CreateProjectDialogService } from './create-project-dialog.service';
import { Router } from '@angular/router';
import { TAppStore } from '../../app.config';
import { Store } from '@ngrx/store';
import { ICreateProjectInput } from '../../graphql/inputs/create-project.input';
import * as projectsInTeamActions from '../../store/projects-in-team/projects-in-team.actions';
import { selectActiveTeamAccess } from '../../store/team-accesses/team-accesses.selectors';

export interface ICreateProjectForm {
  title: AbstractControl<string>;
  description: AbstractControl<string>;
}

@Component({
  selector: 'app-create-project-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    NgIf,
  ],
  templateUrl: './create-project-dialog.component.html',
  styleUrl: './create-project-dialog.component.scss',
})
export class CreateProjectDialogComponent {
  activeTeamAccess = this.store.selectSignal(selectActiveTeamAccess);
  createProjectForm = new FormGroup<ICreateProjectForm>({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(40)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(100)],
    }),
  });

  componentText = {
    title: 'Создание проекта',
    form: {
      name: 'Название проекта',
      description: 'Описание проекта',
      create: 'Создать',
      descriptionMaxSymbols: 100,
    },
    errors: {
      required: 'Поле обязательно',
      nameLength: 'Название проекта должно быть от 3 до 40 символов',
      descriptionLength: 'Описание проекта должно быть от 10 до 100 символов',
    },
  };

  constructor(
    private readonly createProjectDialogService: CreateProjectDialogService,
    private readonly store: Store<TAppStore>,
    private readonly router: Router
  ) {}

  get title() {
    return this.createProjectForm.controls.title;
  }

  get description() {
    return this.createProjectForm.controls.description;
  }

  get formInvalid() {
    return this.createProjectForm.invalid;
  }

  submitHandler() {
    if (this.createProjectForm.valid) {
      const teamId = this.activeTeamAccess()?.team.id as string;
      const createProject: ICreateProjectInput = {
        teamId,
        title: this.title.value,
        description: this.description.value,
      };
      this.store.dispatch(projectsInTeamActions.createProjectInTeam({ input: createProject }));
      this.createProjectForm.reset();
      this.createProjectDialogService.closeDialog();
    }
  }
}
