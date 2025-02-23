import { TestBed } from '@angular/core/testing';

import { ParceiroService } from './parceiro.service';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ParceiroService', () => {
  let service: ParceiroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ]
    });
    service = TestBed.inject(ParceiroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
