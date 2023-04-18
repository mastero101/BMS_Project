/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Register_postgredbComponent } from './register_postgredb.component';

describe('Register_postgredbComponent', () => {
  let component: Register_postgredbComponent;
  let fixture: ComponentFixture<Register_postgredbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register_postgredbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register_postgredbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
