import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterPanelComponent } from './center-panel.component';
import { Store } from '@ngrx/store';
import { ResponseUserDto } from '../../api/models';
import { of } from 'rxjs';

const mockStore = {
  pipe: jasmine.createSpy().and.returnValue(
    of({
      email: 'test@test.ru',
      access_token: '1234',
      refresh_token: '12334',
    } as ResponseUserDto)
  ),
};

describe('CenterPanelComponent', () => {
  let component: CenterPanelComponent;
  let fixture: ComponentFixture<CenterPanelComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CenterPanelComponent],
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(CenterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
