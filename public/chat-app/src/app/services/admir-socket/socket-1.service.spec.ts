import { TestBed } from '@angular/core/testing';

import { Socket1Service } from './socket-1.service';

describe('Socket1Service', () => {
  let service: Socket1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Socket1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
