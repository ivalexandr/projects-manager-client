import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { CreateUserDto, LoginUserDto } from '../../api/models';
import * as authActions from '../../store/auth/auth.actions';
import { NgIf } from '@angular/common';

export interface ILoginForm {
  email: AbstractControl<string>;
  password: AbstractControl<string>;
}

export interface IRegisterForm {
  email: AbstractControl<string>;
  password: AbstractControl<string>;
  repeatPassword: AbstractControl<string>;
}

@Component({
  selector: 'app-auth-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    NgIf,
  ],
  templateUrl: './auth-dialog.component.html',
  styleUrl: './auth-dialog.component.scss',
})
export class AuthDialogComponent {
  isRegisterForm = signal(false);
  isVisibilityPassword = signal(false);
  isVisibilityRepeatPassword = signal(false);

  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])(?=.*\d).{8,}$/;

  componentText = {
    register: {
      title: 'Регистрация',
      email: 'Эл. почта',
      password: 'Пароль',
      repeatPass: 'Подтверждение пароля',
      register: 'Зарегистрироваться',
      isAccount: 'Уже есть аккаунт?',
      enter: 'Войти',
    },
    login: {
      title: 'Войти',
      email: 'Эл. почта',
      password: 'Пароль',
      enter: 'Войти',
      isNotAccount: 'Нет аккаунта?',
      register: 'Зарегистрироваться',
    },
    errors: {
      required: 'Поле обязательно',
      passwordMismatch: 'Пароли не совпадают',
      email: 'Адрес не валиден',
      passwordMust:
        'Пароль должен содержать только латинские буквы, состоять минимум из 8 символов иметь одну цифру и один специальный символ и одну заглавную букву',
    },
  };

  loginForm = new FormGroup<ILoginForm>({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  registerForm = new FormGroup<IRegisterForm>({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(this.passwordPattern),
        Validators.required,
      ],
      nonNullable: true,
    }),
    repeatPassword: new FormControl('', {
      validators: [this.matchPasswordsValidator(), Validators.required],
      nonNullable: true,
    }),
  });

  get isInvalidLoginForm() {
    return this.loginForm.invalid;
  }

  get isInvalidRegisterForm() {
    return this.registerForm.invalid;
  }

  get emailLoginForm() {
    return this.loginForm.controls.email;
  }

  get passwordLoginForm() {
    return this.loginForm.controls.password;
  }

  get emailRegisterForm() {
    return this.registerForm.controls.email;
  }

  get passwordRegisterForm() {
    return this.registerForm.controls.password;
  }

  get repeatPasswordRegisterFrom() {
    return this.registerForm.controls.repeatPassword;
  }

  get hasRegisterPasswordErrors() {
    return (
      this.passwordRegisterForm.hasError('minlength') ||
      this.passwordRegisterForm.hasError('maxlength') ||
      this.passwordRegisterForm.hasError('pattern')
    );
  }

  constructor(
    private readonly store: Store,
    private readonly dialogRef: MatDialogRef<AuthDialogComponent>
  ) {}

  matchPasswordsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.isRegisterForm()) {
        return null;
      }
      const password = control.parent?.get('password') as AbstractControl;
      const repeatPassword = control as AbstractControl;

      return password && repeatPassword && password.value !== repeatPassword.value
        ? { passwordMismatch: true }
        : null;
    };
  }

  changeRegisterForm() {
    this.isRegisterForm.update(state => !state);
  }

  visiblePassword() {
    this.isVisibilityPassword.update(state => !state);
  }

  visibleRepeatPassword() {
    this.isVisibilityRepeatPassword.update(state => !state);
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      const user: LoginUserDto = {
        email: this.emailLoginForm.value,
        password: this.passwordLoginForm.value,
      };
      this.store.dispatch(authActions.setLoginData(user));
      this.store.dispatch(authActions.login());
      this.loginForm.reset();
      this.dialogRef.close();
    }
  }

  submitRegisterForm() {
    if (this.registerForm.valid) {
      const user: CreateUserDto = {
        email: this.emailRegisterForm.value,
        password: this.passwordRegisterForm.value,
      };
      this.store.dispatch(authActions.setRegisterData(user));
      this.store.dispatch(authActions.login());
      this.registerForm.reset();
      this.dialogRef.close();
    }
  }
}
