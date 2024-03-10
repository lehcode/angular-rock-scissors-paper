import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRulesDisplayComponent } from './game-rules-display.component';

describe('GameRulesDisplayComponent', () => {
  let component: GameRulesDisplayComponent;
  let fixture: ComponentFixture<GameRulesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameRulesDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameRulesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
