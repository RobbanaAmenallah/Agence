import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ammar404Component } from './ammar404.component';

describe('Ammar404Component', () => {
  let component: Ammar404Component;
  let fixture: ComponentFixture<Ammar404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ammar404Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ammar404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
