import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponentesComponent } from './register-componentes.component';

describe('RegisterComponentesComponent', () => {
  let component: RegisterComponentesComponent;
  let fixture: ComponentFixture<RegisterComponentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
