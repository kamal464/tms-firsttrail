import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOfficesComponent } from './company-offices.component';

describe('CompanyOfficesComponent', () => {
  let component: CompanyOfficesComponent;
  let fixture: ComponentFixture<CompanyOfficesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyOfficesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
