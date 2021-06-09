import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreUniqueComponent } from './livre-unique.component';

describe('LivreUniqueComponent', () => {
  let component: LivreUniqueComponent;
  let fixture: ComponentFixture<LivreUniqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivreUniqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivreUniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
