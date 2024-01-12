import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeftPanelComponent } from './left-panel.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ResponseUserDto } from '../../api/models';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { ITeam } from '../../graphql/models/team';
import { ITeamAccess } from '../../graphql/models/team-access';
import { TeamAccessStatus } from '../../graphql/enums/team-access-status.enum';

const mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select', 'pipe']);

describe('LeftPanelComponent', () => {
  let component: LeftPanelComponent;
  let fixture: ComponentFixture<LeftPanelComponent>;
  let hideSidebarSpy: jasmine.Spy;

  const mockUser: ResponseUserDto = {
    email: 'test@test.ru',
    access_token: '1234',
    refresh_token: '43344',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LeftPanelComponent,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        RouterModule.forRoot([]),
      ],
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(LeftPanelComponent);
    component = fixture.componentInstance;

    component.authUser$ = of(null);
    component.teamAccesses$ = of([]);
    component.teamAccessesIsLoading$ = of(false);

    hideSidebarSpy = spyOn(component.hideSidebar, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clickArrowBack should toggle sidebar state and emit an event', done => {
    component.authUser$ = of(mockUser);
    spyOn(component, 'clickArrowBack').and.callThrough();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.isHideSidebar()).toBe(false);

      const arrowBackButton = fixture.debugElement.query(By.css('[data-test="arrow-back-button"]'));
      arrowBackButton.triggerEventHandler('click', { button: 0 });

      expect(component.clickArrowBack).toHaveBeenCalled();
      expect(component.isHideSidebar()).toBe(true);
      expect(hideSidebarSpy).toHaveBeenCalled();
      done();
    });
  });

  it('Should display the panel if the user exists', done => {
    component.authUser$ = of(mockUser);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const sidebar = fixture.debugElement.query(By.css('.sidebar'));
      expect(sidebar).toBeTruthy();
      done();
    });
  });

  it('Should display spinner when loading', done => {
    component.authUser$ = of(mockUser);
    component.teamAccessesIsLoading$ = of(true);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const sidebarBodySpinner = fixture.debugElement.query(By.css('.sidebar-body-spinner'));
      expect(sidebarBodySpinner).toBeTruthy();

      const matSpinner = sidebarBodySpinner.query(By.css('.mat-mdc-progress-spinner'));
      expect(matSpinner).toBeTruthy();
      done();
    });
  });

  it('Should display a list of commands after loading', done => {
    const mockTeams: ITeamAccess[] = [
      {
        id: '1234',
        status: TeamAccessStatus.ACTIVE,
        team: {
          name: 'Team 1',
          avatar: 'asdasd.jpg',
        } as ITeam,
      } as ITeamAccess,
      {
        id: '56789',
        status: TeamAccessStatus.ACTIVE,
        team: {
          name: 'Team 2',
          avatar: 'asdasd.jpg',
        } as ITeam,
      } as ITeamAccess,
    ];
    component.authUser$ = of(mockUser);
    component.teamAccesses$ = of(mockTeams);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const sidebarBodyList = fixture.debugElement.query(By.css('.sidebar-body-list'));
      expect(sidebarBodyList).toBeTruthy();

      const matList = sidebarBodyList.query(By.css('.mat-mdc-list'));
      expect(matList).toBeTruthy();
      expect(matList.children.length).toBe(2);
      expect(matList.children[0].nativeElement.textContent).toContain(mockTeams[0].team.name);
      expect(matList.children[1].nativeElement.textContent).toContain(mockTeams[1].team.name);
      done();
    });
  });
});
