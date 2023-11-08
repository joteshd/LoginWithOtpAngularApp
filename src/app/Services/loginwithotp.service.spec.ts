import { TestBed } from '@angular/core/testing';

import { LoginwithotpService } from './loginwithotp.service';

describe('LoginwithotpService', () => {
  let service: LoginwithotpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginwithotpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
