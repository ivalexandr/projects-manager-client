import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCardComponent } from './team-card.component';
import { AvatarComponent } from '../../share/components/avatar/avatar.component';
import { MatCardModule } from '@angular/material/card';
import { ITeam } from '../../graphql/models/team';
import { IUser } from '../../graphql/models/user';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

describe('TeamCardComponent', () => {
  let component: TeamCardComponent;
  let fixture: ComponentFixture<TeamCardComponent>;
  let mockTeam: ITeam;
  let datePipe: DatePipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamCardComponent, MatCardModule, AvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamCardComponent);
    component = fixture.componentInstance;
    datePipe = new DatePipe('en-RU');

    mockTeam = {
      id: '123',
      avatar: '12334-2313.jpg',
      banner: '213454-43244.jpg',
      createdAt: new Date(Date.now()),
      isPublic: true,
      leader: {
        username: 'username',
      } as IUser,
      description: 'test description',
      name: 'Test name',
    } as ITeam;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all submitted text', done => {
    component.team = mockTeam;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const teamCard = fixture.debugElement.query(By.css('.mat-mdc-card'));
      expect(teamCard).toBeTruthy();

      const teamCardTitle = teamCard.query(By.css('.mat-mdc-card-title'));
      expect(teamCardTitle).toBeTruthy();
      expect(teamCardTitle.nativeElement.textContent).toContain(mockTeam.name);

      const teamCardSubtitle = teamCard.query(By.css('.mat-mdc-card-subtitle'));
      expect(teamCardSubtitle).toBeTruthy();
      expect(teamCardSubtitle.nativeElement.textContent).toContain(mockTeam.leader.username);

      const teamCardBannerImg = teamCard.query(By.css('[data-test="banner-img"]'));
      expect(teamCardBannerImg).toBeTruthy();
      expect((teamCardBannerImg.nativeElement as HTMLImageElement).src).toContain(mockTeam.banner);

      const teamCardContent = teamCard.query(By.css('.team-card__content'));
      expect(teamCardContent).toBeTruthy();
      expect(teamCardContent.children[0].nativeElement.textContent).toContain(mockTeam.description);
      expect(teamCardContent.children[1].nativeElement.textContent).toContain(
        component.componentText.createdAt
      );
      expect((teamCardContent.children[2].nativeElement as HTMLTimeElement).dateTime).toContain(
        mockTeam.createdAt.toDateString()
      );
      expect(teamCardContent.children[2].nativeElement.textContent).toContain(
        datePipe.transform(mockTeam.createdAt, 'dd.MM.yyyy')
      );

      done();
    });
  });
});
