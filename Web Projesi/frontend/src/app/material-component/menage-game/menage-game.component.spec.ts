import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenageGameComponent } from './menage-game.component';

describe('MenageGameComponent', () => {
  let component: MenageGameComponent;
  let fixture: ComponentFixture<MenageGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenageGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenageGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
