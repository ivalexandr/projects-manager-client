import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationStart, Router, RouterLink } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { TAppStore } from '../../app.config';
import {
  selectActiveTeamAccess,
  selectIsActiveTeamAccessLoading,
} from '../../store/team-accesses/team-accesses.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, NgIf } from '@angular/common';
import { environment } from '../../../environments/environment';
import { AvatarComponent } from '../../share/components/avatar/avatar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { ProjectsListComponent } from '../../components/projects-list/projects-list.component';
import { pageAnimations } from '../../common/animations';
import { AnimationBuilder, animate, style } from '@angular/animations';
import { filter } from 'rxjs';
import { MembersListComponent } from '../../components/members-list/members-list.component';
import {
  getTeamAccessesForTeam,
  reseteamAccessesForTeam,
} from '../../store/team-accesses-for-team/team-accesses-for-team.actions';
import {
  getProjectsInTeam,
  resetProjectsInTeams,
} from '../../store/projects-in-team/projects-in-team.actions';
import { getTeamAccess } from '../../store/team-accesses/team-accesses.actions';

@Component({
  selector: 'app-user-team',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatTabsModule,
    MatButtonModule,
    AvatarComponent,
    ProjectsListComponent,
    MembersListComponent,
    AsyncPipe,
    NgIf,
    RouterLink,
  ],
  templateUrl: './user-team.component.html',
  styleUrl: './user-team.component.scss',
  animations: [pageAnimations],
})
export class UserTeamComponent implements OnInit, AfterViewInit {
  @ViewChild('pageContainer') pageContainer!: ElementRef;

  destroyRef$ = inject(DestroyRef);
  isActiveTeamAccessLoading$ = this.store.pipe(select(selectIsActiveTeamAccessLoading));
  activeTeamAccess$ = this.store.pipe(select(selectActiveTeamAccess));

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
    private readonly animationBuilder: AnimationBuilder,
    private readonly router: Router
  ) {}

  get uploadLink() {
    return `${environment.uploadApi}/`;
  }

  ngOnInit(): void {
    this.activatedRouter.params.pipe(takeUntilDestroyed(this.destroyRef$)).subscribe(params => {
      const id = params['id'] as string;
      this.store.dispatch(getTeamAccess({ teamId: id }));
      this.store.dispatch(getProjectsInTeam({ teamId: id }));
      this.store.dispatch(getTeamAccessesForTeam({ teamId: id }));
    });
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationStart),
        takeUntilDestroyed(this.destroyRef$)
      )
      .subscribe(() => {
        this.store.dispatch(resetProjectsInTeams());
        this.store.dispatch(reseteamAccessesForTeam());
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
}
