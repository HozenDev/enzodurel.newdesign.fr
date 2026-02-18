import { TestBed } from '@angular/core/testing';

import { Exppro } from './exppro';

describe('Exppro', () => {
  let service: Exppro;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Exppro);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
