import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResultDisplayComponent } from './game-result-display.component';

describe('GameResultDisplayComponent', () => {
  let component: GameResultDisplayComponent;
  let fixture: ComponentFixture<GameResultDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameResultDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameResultDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
