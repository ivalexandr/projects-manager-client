import { Component, Input } from '@angular/core';
import { IProjectInTeam } from '../../graphql/models/project-in-team';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [MatButtonModule, MatListModule, MatIconModule, DatePipe],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss',
})
export class ProjectsListComponent {
  @Input() projects!: IProjectInTeam[];
  componentText = {
    create: 'Создать проект',
    createdAt: 'Дата создания',
  };
}
