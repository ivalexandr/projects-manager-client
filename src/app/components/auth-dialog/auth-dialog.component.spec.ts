import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthDialogComponent } from './auth-dialog.component';
import { AuthDialogService } from './auth-dialog.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogContent,
  MatDialogTitle,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Store } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { CreateUserDto, LoginUserDto } from '../../api/models';
import * as authActions from '../../store/auth/auth.actions';

const mockDialogRef = {
  close: jasmine.createSpy('close'),
};

describe('AuthDialogComponent', () => {
  let component: AuthDialogComponent;
  let fixture: ComponentFixture<AuthDialogComponent>;
  let authDialogService: AuthDialogService;
  let overlayContainer: OverlayContainer;
  let overlayElement: HTMLElement;
  let store: Store;
  const mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select', 'pipe']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AuthDialogComponent,
        MatButtonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        NoopAnimationsModule,
        MatDialogContent,
        MatDialogTitle,
        MatDialogActions,
        MatDialogClose,
        ReactiveFormsModule,
      ],
      providers: [
        AuthDialogService,
        OverlayContainer,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: Store, useValue: mockStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthDialogComponent);
    component = fixture.componentInstance;
    authDialogService = TestBed.inject(AuthDialogService);
    overlayContainer = TestBed.inject(OverlayContainer);
    overlayElement = overlayContainer.getContainerElement();
    store = TestBed.inject(Store);

    fixture.detectChanges();
  });

  afterEach(() => {
    authDialogService.closeDialog();
    mockStore.dispatch.calls.reset();
    mockStore.select.calls.reset();
    mockStore.pipe.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open when the openDialog method is enabled', done => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      authDialogService.openDialog();
      const authDialogComponent = overlayElement.querySelector('.mat-mdc-dialog-component-host');
      expect(authDialogComponent).toBeTruthy();
      done();
    });
  });

  it('should change form when click on changeRegisterForm button', fakeAsync(() => {
    spyOn(component, 'changeRegisterForm').and.callThrough();
    spyOn(component.isRegisterForm, 'update').and.callThrough();

    const title = fixture.debugElement.query(By.css('.mat-mdc-dialog-title'))
      .nativeElement as HTMLHeadingElement;

    expect(title.textContent).toContain(component.componentText.login.title);

    const changeRegisterFormButton = fixture.debugElement.query(
      By.css('[data-test="change-register-form"]')
    );

    changeRegisterFormButton.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();

    expect(component.changeRegisterForm).toHaveBeenCalled();
    expect(component.isRegisterForm.update).toHaveBeenCalled();
    expect(title.textContent).toContain(component.componentText.register.title);
    expect(changeRegisterFormButton.nativeElement.textContent).toContain(
      component.componentText.register.enter
    );
  }));

  it('should submit login form when form is valid and should reset form', fakeAsync(() => {
    spyOn(component, 'submitLoginForm').and.callThrough();
    spyOn(component.loginForm, 'reset').and.callThrough();

    const dataLoginMock: LoginUserDto = {
      email: 'test@test.ru',
      password: 'Qwertyui123!',
    };

    component.loginForm.setValue(dataLoginMock);
    fixture.detectChanges();

    expect(component.loginForm.valid).toBeTrue();

    const loginForm = fixture.debugElement.query(By.css('form'));
    loginForm.triggerEventHandler('ngSubmit', null);
    tick();
    fixture.detectChanges();

    expect(component.submitLoginForm).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(authActions.setLoginData(dataLoginMock));
    expect(store.dispatch).toHaveBeenCalledWith(authActions.login());
    expect(component.loginForm.reset).toHaveBeenCalled();
  }));

  it('should not submit login form when form is invalid', fakeAsync(() => {
    spyOn(component, 'submitLoginForm').and.callThrough();
    spyOn(component.loginForm, 'reset').and.callThrough();
    const dataLoginMock: LoginUserDto = {
      email: 'test.ru',
      password: 'Qwertyui123!',
    };

    component.loginForm.patchValue(dataLoginMock);
    expect(component.loginForm.valid).toBeFalse();

    const loginForm = fixture.debugElement.query(By.css('form'));
    loginForm.triggerEventHandler('ngSubmit', null);
    tick();
    fixture.detectChanges();

    expect(component.submitLoginForm).toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(component.loginForm.reset).not.toHaveBeenCalled();
  }));

  it('should submit register form when form is valid and should reset form', fakeAsync(() => {
    spyOn(component, 'submitRegisterForm').and.callThrough();
    spyOn(component.registerForm, 'reset').and.callThrough();

    const dataRegisterMock: CreateUserDto = {
      email: 'test@test.ru',
      password: 'Qwertyui123!',
    };
    component.registerForm.setValue({
      ...dataRegisterMock,
      repeatPassword: dataRegisterMock.password,
    });
    expect(component.registerForm.valid).toBeTrue();

    const title = fixture.debugElement.query(By.css('.mat-mdc-dialog-title'))
      .nativeElement as HTMLHeadingElement;

    const changeRegisterFormButton = fixture.debugElement.query(
      By.css('[data-test="change-register-form"]')
    );

    changeRegisterFormButton.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();

    expect(title.textContent).toContain(component.componentText.register.title);

    const registerForm = fixture.debugElement.query(By.css('form'));
    registerForm.triggerEventHandler('ngSubmit', null);
    tick();
    fixture.detectChanges();

    expect(component.submitRegisterForm).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(authActions.setRegisterData(dataRegisterMock));
    expect(store.dispatch).toHaveBeenCalledWith(authActions.register());
    expect(component.registerForm.reset).toHaveBeenCalled();
  }));

  it('should not submit register form when form is invalid', fakeAsync(() => {
    spyOn(component, 'submitRegisterForm').and.callThrough();
    spyOn(component.registerForm, 'reset').and.callThrough();
    const dataRegisterMock: CreateUserDto = {
      email: 'test@test.ru',
      password: '123',
    };

    const changeRegisterFormButton = fixture.debugElement.query(
      By.css('[data-test="change-register-form"]')
    );
    const title = fixture.debugElement.query(By.css('.mat-mdc-dialog-title'))
      .nativeElement as HTMLHeadingElement;
    changeRegisterFormButton.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    expect(title.textContent).toContain(component.componentText.register.title);

    component.registerForm.patchValue({
      ...dataRegisterMock,
      repeatPassword: dataRegisterMock.password,
    });
    component.registerForm.updateValueAndValidity();
    fixture.detectChanges();

    expect(component.registerForm.valid).toBeFalse();

    const registerForm = fixture.debugElement.query(By.css('form'));
    registerForm.triggerEventHandler('ngSubmit', null);
    tick();
    fixture.detectChanges();

    expect(component.submitRegisterForm).toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(component.registerForm.reset).not.toHaveBeenCalled();
  }));
});
