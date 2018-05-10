import { TestBed, inject } from '@angular/core/testing';

import { AgendaResolverService } from './agenda-resolver.service';

describe('AgendaResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgendaResolverService]
    });
  });

  it('should be created', inject([AgendaResolverService], (service: AgendaResolverService) => {
    expect(service).toBeTruthy();
  }));
});
