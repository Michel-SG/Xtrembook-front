import { TestBed } from '@angular/core/testing';

import { CommandeValideeService } from './commande-validee.service';

describe('CommandeValideeService', () => {
  let service: CommandeValideeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandeValideeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
