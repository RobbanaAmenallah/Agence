import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropretiesComponent } from './propreties.component';

describe('PropretiesComponent', () => {
  let component: PropretiesComponent;
  let fixture: ComponentFixture<PropretiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropretiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropretiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
