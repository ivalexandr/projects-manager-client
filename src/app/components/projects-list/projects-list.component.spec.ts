import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsListComponent } from './projects-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { IProjectInTeam } from '../../graphql/models/project-in-team';
import { CreateProjectDialogService } from '../create-project-dialog/create-project-dialog.service';

const mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select', 'pipe']);

describe('ProjectsListComponent', () => {
  let component: ProjectsListComponent;
  let fixture: ComponentFixture<ProjectsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProjectsListComponent,
        MatButtonModule,
        MatListModule,
        MatIconModule,
        MatProgressSpinnerModule,
      ],
      providers: [CreateProjectDialogService, { provide: Store, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be displayed spinner when isLoading is true', () => {
    component.projectsIsLoading$ = of(true);

    fixture.detectChanges();

    const spinerContainer = fixture.debugElement.query(By.css('.projects-list-spinner'));
    expect(spinerContainer).toBeTruthy();
    expect(spinerContainer.query(By.css('.mat-mdc-progress-spinner'))).toBeTruthy();
  });

  it('should be displayd list of projects when isLoading is false', () => {
    const dateNow = new Date(Date.now());
    const mockProjects = [
      { id: '1', title: 'Проект 1', createdAt: dateNow, description: 'Описание проекта 1' },
      { id: '2', title: 'Проект 2', createdAt: dateNow, description: 'Описание проекта 2' },
    ] as IProjectInTeam[];
    component.projectsIsLoading$ = of(false);
    component.projects$ = of(mockProjects);
    fixture.detectChanges();

    const listOfProjects = fixture.debugElement.query(By.css('.projects-list-self__list'));

    expect(listOfProjects).toBeTruthy();
    expect(listOfProjects.children[0]).toBeTruthy();
    expect(listOfProjects.children[1]).toBeTruthy();
    expect(listOfProjects.children[0].nativeElement.textContent).toContain(mockProjects[0].title);
    expect(listOfProjects.children[1].nativeElement.textContent).toContain(mockProjects[1].title);
    expect(listOfProjects.children[0].nativeElement.textContent).toContain(
      mockProjects[0].description
    );
    expect(listOfProjects.children[1].nativeElement.textContent).toContain(
      mockProjects[1].description
    );
  });
});
