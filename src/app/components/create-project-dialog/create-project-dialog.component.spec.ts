import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CreateProjectDialogComponent } from './create-project-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogContent,
  MatDialogTitle,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CreateProjectDialogService } from './create-project-dialog.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ICreateProjectInput } from '../../graphql/inputs/create-project.input';
import * as projectInTeamActions from '../../store/projects-in-team/projects-in-team.actions';
import { By } from '@angular/platform-browser';

describe('CreateProjectDialogComponent', () => {
  let component: CreateProjectDialogComponent;
  let fixture: ComponentFixture<CreateProjectDialogComponent>;
  const mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select', 'pipe']);
  let createProjectDialogService: CreateProjectDialogService;
  let overlayContainer: OverlayContainer;
  let overlayElement: HTMLElement;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CreateProjectDialogComponent,
        MatDialogContent,
        MatDialogTitle,
        MatDialogActions,
        MatDialogClose,
        MatButtonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        RouterTestingModule,
      ],
      providers: [
        CreateProjectDialogService,
        OverlayContainer,
        { provide: Store, useValue: mockStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProjectDialogComponent);
    component = fixture.componentInstance;
    createProjectDialogService = TestBed.inject(CreateProjectDialogService);
    overlayContainer = TestBed.inject(OverlayContainer);
    store = TestBed.inject(Store);
    overlayElement = overlayContainer.getContainerElement();

    fixture.detectChanges();
  });

  afterEach(() => {
    createProjectDialogService.closeDialog();
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
      createProjectDialogService.openDialog();
      const createProjectDialog = overlayElement.querySelector('.mat-mdc-dialog-component-host');
      expect(createProjectDialog).toBeTruthy();
      done();
    });
  });

  it('should submit create project form when form is valid and should reset form', fakeAsync(() => {
    spyOn(component, 'submitHandler').and.callThrough();
    spyOn(component.createProjectForm, 'reset').and.callThrough();

    const createProjectMock: ICreateProjectInput = {
      teamId: '/',
      title: 'Проект',
      description: 'Описание проекта',
    };

    component.createProjectForm.setValue({
      title: createProjectMock.title,
      description: createProjectMock.description,
    });
    fixture.detectChanges();

    expect(component.createProjectForm.valid).toBeTrue();

    const createProjectForm = fixture.debugElement.query(By.css('form'));

    createProjectForm.triggerEventHandler('ngSubmit', null);
    tick();
    fixture.detectChanges();

    expect(component.submitHandler).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      projectInTeamActions.createProjectInTeam({ input: createProjectMock })
    );
    expect(component.createProjectForm.reset).toHaveBeenCalled();
  }));

  it('should not submit create project form when form is invalid', fakeAsync(() => {
    spyOn(component, 'submitHandler').and.callThrough();
    spyOn(component.createProjectForm, 'reset').and.callThrough();

    const createProjectMock: ICreateProjectInput = {
      teamId: '/',
      title: 'Пр',
      description: 'Описание проекта',
    };

    component.createProjectForm.setValue({
      title: createProjectMock.title,
      description: createProjectMock.description,
    });
    fixture.detectChanges();

    expect(component.createProjectForm.invalid).toBeTrue();

    const createProjectForm = fixture.debugElement.query(By.css('form'));

    createProjectForm.triggerEventHandler('ngSubmit', null);
    tick();
    fixture.detectChanges();

    expect(component.submitHandler).toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalledWith(
      projectInTeamActions.createProjectInTeam({ input: createProjectMock })
    );
    expect(component.createProjectForm.reset).not.toHaveBeenCalled();
  }));
});
