import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TopBarComponent } from './top-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Store, StoreModule } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthDialogService } from '../auth-dialog/auth-dialog.service';
import { ResponseUserDto } from '../../api/models';
import { OverlayContainer } from '@angular/cdk/overlay';
import * as authActions from '../../store/auth/auth.actions';
import { resetUserTeams } from '../../store/user-teams/user-teams.actions';

class MockAuthDialogService {
  openDialog = jasmine.createSpy('openDialog');
}

const mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select', 'pipe']);

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;
  let authDialogService: AuthDialogService;
  let store: Store;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TopBarComponent,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        StoreModule.forRoot({}),
        NoopAnimationsModule,
      ],
      providers: [
        { provide: AuthDialogService, useClass: MockAuthDialogService },
        { provide: Store, useValue: mockStore },
        { provide: OverlayContainer, useClass: OverlayContainer },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authDialogService = TestBed.inject(AuthDialogService);
    store = TestBed.inject(Store);
    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
    component.authUser$ = of(null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show login button when there is no auth user', done => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const loginButton = fixture.debugElement.query(By.css('[data-test="login-button"]'));
      expect(loginButton).not.toBeNull();
      done();
    });
  });

  it('should show user avatar and menu when there is an auth user', done => {
    const mockUser: ResponseUserDto = {
      email: 'test@test.ru',
      access_token: '123',
      refresh_token: '123',
    };
    component.authUser$ = of(mockUser);
    spyOn(component, 'logoutHandler').and.callThrough();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const userAvatar = fixture.debugElement.query(By.css('[data-test="user-avatar"]'));
      expect(userAvatar).toBeTruthy();

      userAvatar.triggerEventHandler('click', { button: 0 });
      fixture.detectChanges();

      const menuPanel = overlayContainerElement.querySelector('.mat-mdc-menu-panel');
      expect(menuPanel).toBeTruthy();

      const profileButton = fixture.debugElement.query(By.css('[data-test="profile-button"]'));
      expect(profileButton).not.toBeNull();
      expect(profileButton.nativeElement.textContent).toContain(
        component.componentText.menu.profile
      );

      const settingsButton = fixture.debugElement.query(By.css('[data-test="settings-button"]'));
      expect(settingsButton).not.toBeNull();
      expect(settingsButton.nativeElement.textContent).toContain(
        component.componentText.menu.settings
      );

      const logoutButton = fixture.debugElement.query(By.css('[data-test="logout-button"]'));
      expect(logoutButton).not.toBeNull();
      expect(logoutButton.nativeElement.textContent).toContain(component.componentText.menu.exit);

      logoutButton.triggerEventHandler('click', null);

      expect(component.logoutHandler).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(authActions.logout());
      expect(store.dispatch).toHaveBeenCalledWith(resetUserTeams());
      done();
    });
  });

  it('should call openDialog on authDialogService when click button is clicked', done => {
    spyOn(component, 'clickButtonHandler').and.callThrough();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('[data-test="login-button"]'));
      button.triggerEventHandler('click', { button: 0 });
      fixture.detectChanges();

      expect(component.clickButtonHandler).toHaveBeenCalled();
      expect(authDialogService.openDialog).toHaveBeenCalled();
      done();
    });
  });
});
