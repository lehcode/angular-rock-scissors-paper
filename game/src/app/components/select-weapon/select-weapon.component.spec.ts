import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWeaponComponent } from './select-weapon.component';

describe('SelectWeaponComponent', () => {
  let component: SelectWeaponComponent;
  let fixture: ComponentFixture<SelectWeaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectWeaponComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
