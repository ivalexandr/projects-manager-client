import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AvatarComponent } from '../../share/components/avatar/avatar.component';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [MatCardModule, AvatarComponent, DatePipe],
  templateUrl: './team-card.component.html',
  styleUrl: './team-card.component.scss',
})
export class TeamCardComponent {
  @Input() name!: string;
  @Input() avatar!: string;
  @Input() leader!: string;
  @Input() banner!: string;
  @Input() description!: string;
  @Input() createdAt!: Date;

  componentText = {
    createdAt: 'Дата создания',
    noBanner: 'Баннера нет',
  };

  get bannerUrl() {
    return `${environment.uploadApi}/${this.banner}`;
  }
}
