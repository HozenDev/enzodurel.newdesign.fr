import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exppro } from './exppro';

describe('Exppro', () => {
  let component: Exppro;
  let fixture: ComponentFixture<Exppro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exppro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Exppro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
