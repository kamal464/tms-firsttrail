import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitUiTextEditComponent } from './kit-ui-text-edit.component';

describe('KitUiTextEditComponent', () => {
  let component: KitUiTextEditComponent;
  let fixture: ComponentFixture<KitUiTextEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitUiTextEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KitUiTextEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
