import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UploadFileClass } from '../../common/upload-file.class';
import { MatButtonModule } from '@angular/material/button';
import { pageAnimations } from '../../common/animations';
import { AvatarComponent } from '../../share/components/avatar/avatar.component';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { TAppStore } from '../../app.config';
import * as createTeamActions from '../../store/create-team/create-team.actions';
import { ICreateTeamInput } from '../../graphql/inputs/create-team.input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';

interface ICreateTeamForm {
  avatar: AbstractControl<string>;
  banner: AbstractControl<string>;
  name: AbstractControl<string>;
  description: AbstractControl<string>;
  isPublic: AbstractControl<boolean>;
}

@Component({
  selector: 'app-create-team-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    AvatarComponent,
    NgIf,
    MatSlideToggleModule,
  ],
  templateUrl: './create-team-page.component.html',
  styleUrl: './create-team-page.component.scss',
  animations: [pageAnimations],
})
export class CreateTeamPageComponent extends UploadFileClass {
  createTeamForm = new FormGroup<ICreateTeamForm>({
    avatar: new FormControl('', { nonNullable: true }),
    banner: new FormControl('', { nonNullable: true }),
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(12), Validators.minLength(3)],
    }),
    description: new FormControl('', { nonNullable: true }),
    isPublic: new FormControl(true, { nonNullable: true }),
  });

  componentText = {
    title: 'Создание команды',
    teamForm: {
      name: 'Название команды',
      description: 'Описание команды',
      isPublic: 'Публичная команда',
      avatar: 'Загрузка аватарки',
      banner: 'Загрузка баннера',
      create: 'Создать команду',
    },
    errors: {
      required: 'Поле обязательно',
      minTeamName: 'Название команды должно быть не менее 3 символов',
      maxTeamName: 'Название команды не должно превышать 12 символов',
    },
  };

  constructor(
    private readonly store: Store<TAppStore>,
    private readonly router: Router
  ) {
    super();
  }

  get avatarCreateTeamForm() {
    return this.createTeamForm.controls.avatar;
  }

  get bannerCreateTeamForm() {
    return this.createTeamForm.controls.banner;
  }

  get nameCreateTeamForm() {
    return this.createTeamForm.controls.name;
  }

  get descriptionCreateTeamForm() {
    return this.createTeamForm.controls.description;
  }

  get isPublicCreateTeamForm() {
    return this.createTeamForm.controls.isPublic;
  }

  get createTeamFormInvalid() {
    return this.createTeamForm.invalid;
  }

  uploadAvatarHandler(event: Event) {
    super.uploadFile(event, this.avatarCreateTeamForm);
  }

  uploadBannerHandler(event: Event) {
    super.uploadFile(event, this.bannerCreateTeamForm);
  }

  submitForm() {
    if (this.createTeamForm.valid) {
      const createTeam: ICreateTeamInput = {
        name: this.nameCreateTeamForm.value,
        description: this.descriptionCreateTeamForm.value,
        avatar: this.avatarCreateTeamForm.value,
        banner: this.bannerCreateTeamForm.value,
        isPublic: this.isPublicCreateTeamForm.value,
      };
      this.store.dispatch(createTeamActions.setCreateTeamData({ team: createTeam }));
      this.store.dispatch(createTeamActions.createTeam());
      this.createTeamForm.reset();
      this.router.navigate(['/']);
    }
  }
}
