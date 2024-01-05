import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Store, select } from '@ngrx/store';
import { TAppStore } from '../../app.config';
import {
  selectAllProjectsInTeam,
  selectProjectsInTeamIsLoading,
} from '../../store/projects-in-team/projects-in-team.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateProjectDialogService } from '../create-project-dialog/create-project-dialog.service';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    DatePipe,
    AsyncPipe,
  ],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss',
})
export class ProjectsListComponent {
  projectsIsLoading$ = this.store.pipe(select(selectProjectsInTeamIsLoading));
  projects$ = this.store.pipe(select(selectAllProjectsInTeam));

  componentText = {
    create: 'Создать проект',
    createdAt: 'Дата создания',
  };

  constructor(
    private readonly store: Store<TAppStore>,
    private readonly createProjectDialogService: CreateProjectDialogService
  ) {}

  createProjectHandler() {
    this.createProjectDialogService.openDialog();
  }
}
