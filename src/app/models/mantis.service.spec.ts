import { TestBed, inject } from '@angular/core/testing';

import { MantisService } from './mantis.service';

describe('MantisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MantisService]
    });
  });

  it('should be created', inject([MantisService], (service: MantisService) => {
    expect(service).toBeTruthy();
  }));
});
