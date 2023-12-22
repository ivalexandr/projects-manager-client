import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AvatarComponent } from '../../share/components/avatar/avatar.component';
import { SidebarAnimationDirective } from '../../share/directives/sidebar-animation.directive';
import { ButtonRotateDirective } from '../../share/directives/button-rotate.directive';
import { Store, select } from '@ngrx/store';
import { TAppStore } from '../../app.config';
import { selectAuthUser } from '../../store/auth/auth.selectors';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { getUserTeams } from '../../store/user-teams/user-teams.actions';
import { selectAllUserTeams } from '../../store/user-teams/user-teams.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    AvatarComponent,
    SidebarAnimationDirective,
    ButtonRotateDirective,
    AsyncPipe,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.scss',
})
export class LeftPanelComponent implements OnInit {
  isHideSidebar = signal(false);
  @Output() hideSidebar = new EventEmitter(false);

  authUser$ = this.store.pipe(select(selectAuthUser));
  userTeams$ = this.store.pipe(select(selectAllUserTeams));

  componentText = {
    createTeam: 'Создать команду',
    myTeams: 'Мои команды',
  };

  constructor(private readonly store: Store<TAppStore>) {}

  ngOnInit(): void {
    this.authUser$.subscribe(user => {
      if (user) {
        this.store.dispatch(getUserTeams());
      }
    });
  }

  clickArrowBack() {
    this.isHideSidebar.update(state => !state);
    this.hideSidebar.emit();
  }
}
