import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { TAppStore } from '../../app.config';
import * as userTeamsActions from '../../store/user-teams/user-teams.actions';
import {
  selectActiveTeam,
  selectIsActiveTeamLoading,
} from '../../store/user-teams/user-teams.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, NgIf } from '@angular/common';
import { environment } from '../../../environments/environment';
import { AvatarComponent } from '../../share/components/avatar/avatar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { ProjectsListComponent } from '../../components/projects-list/projects-list.component';
import { pageAnimations } from '../../common/animations';
import { AnimationBuilder, animate, style } from '@angular/animations';

@Component({
  selector: 'app-user-team',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatTabsModule,
    MatButtonModule,
    AvatarComponent,
    ProjectsListComponent,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './user-team.component.html',
  styleUrl: './user-team.component.scss',
  animations: [pageAnimations],
})
export class UserTeamComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('pageContainer') pageContainer!: ElementRef;

  destroyRef$ = inject(DestroyRef);
  activeTeamIsLoading$ = this.store.pipe(select(selectIsActiveTeamLoading));
  activeTeam$ = this.store.pipe(select(selectActiveTeam));

  componentText = {
    leader: 'Лидер команды',
    chat: 'Командный чат',
    tabs: {
      projects: 'Проекты',
      members: 'Список участников',
      statistics: 'Статистика',
      edit: 'Редактировать команду',
    },
  };

  constructor(
    private readonly activatedRouter: ActivatedRoute,
    private readonly store: Store<TAppStore>,
    private readonly animationBuilder: AnimationBuilder
  ) {}

  get uploadLink() {
    return `${environment.uploadApi}/`;
  }

  ngOnInit(): void {
    this.activatedRouter.params.pipe(takeUntilDestroyed(this.destroyRef$)).subscribe(params => {
      const id = params['id'] as string;
      this.store.dispatch(userTeamsActions.getUserTeam({ teamId: id }));
    });
  }

  ngAfterViewInit(): void {
    this.activatedRouter.params.pipe(takeUntilDestroyed(this.destroyRef$)).subscribe(() => {
      this.runAnimation();
    });
  }

  runAnimation() {
    const factory = this.animationBuilder.build([
      style({ opacity: 0 }),
      animate('.5s', style({ opacity: 1 })),
    ]);

    const player = factory.create(this.pageContainer?.nativeElement);
    player.play();
  }

  ngOnDestroy(): void {
    this.store.dispatch(userTeamsActions.resetUserTeam());
  }
}
