import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AvatarComponent } from '../../share/components/avatar/avatar.component';
import { environment } from '../../../environments/environment';
import { DatePipe, NgIf } from '@angular/common';
import { ITeam } from '../../graphql/models/team';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [MatCardModule, AvatarComponent, DatePipe, NgIf],
  templateUrl: './team-card.component.html',
  styleUrl: './team-card.component.scss',
})
export class TeamCardComponent {
  @Input() team!: ITeam;

  componentText = {
    createdAt: 'Дата создания',
    noBanner: 'Баннера нет',
  };

  get bannerUrl() {
    return `${environment.uploadApi}/${this.team.banner}`;
  }
}
