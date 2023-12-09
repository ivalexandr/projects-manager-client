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
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { CreateUserDto, LoginUserDto } from '../../api/models';
import * as authActions from '../../store/auth/auth.actions';

export interface IAuthForm {
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

  authForm = new FormGroup<IAuthForm>({
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
      validators: [this.matchPasswordsValidator()],
      nonNullable: true,
    }),
  });

  get isInvalidForm() {
    return this.authForm.invalid;
  }

  get emailFromForm() {
    return this.authForm.controls.email;
  }

  get passwordFromForm() {
    return this.authForm.controls.password;
  }
  get repeatPasswordFromForm() {
    return this.authForm.controls.repeatPassword;
  }

  constructor(private readonly store: Store) {}

  matchPasswordsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.isRegisterForm()) {
        return null;
      }
      const password = control.parent?.get('password') as AbstractControl;
      const repeatPassword = control as AbstractControl;

      return password &&
        repeatPassword &&
        password.value !== repeatPassword.value
        ? { passwordMismatch: true }
        : null;
    };
  }

  changeRegisterForm() {
    this.isRegisterForm.update((state) => {
      state &&
        this.repeatPasswordFromForm.removeValidators([Validators.required]);
      !state &&
        this.repeatPasswordFromForm.addValidators([Validators.required]);
      this.repeatPasswordFromForm.updateValueAndValidity();
      return !state;
    });
  }

  visiblePassword() {
    this.isVisibilityPassword.update((state) => !state);
  }

  visibleRepeatPassword() {
    this.isVisibilityRepeatPassword.update((state) => !state);
  }

  submitAuthFormHandler() {
    if (this.authForm.valid) {
      if (this.isRegisterForm()) {
        const user: CreateUserDto = {
          email: this.emailFromForm.value,
          password: this.passwordFromForm.value,
        };
        this.store.dispatch(authActions.setRegisterData(user));
        this.store.dispatch(authActions.register());
        this.authForm.reset();
      } else {
        const user: LoginUserDto = {
          email: this.emailFromForm.value,
          password: this.passwordFromForm.value,
        };
        this.store.dispatch(authActions.setLoginData(user));
        this.store.dispatch(authActions.login());
        this.authForm.reset();
      }
    }
  }
}
