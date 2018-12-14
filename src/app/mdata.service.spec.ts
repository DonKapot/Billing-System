import { TestBed, inject } from '@angular/core/testing';
import { Service } from './service';
import { Client } from './client';
import { Transaction } from './transaction';
import { MDataService } from './mdata.service';

describe('MDataService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MDataService]
    });
  });
	  it('should be created', inject([MDataService], (service: MDataService) => {
	    expect(service).toBeTruthy();
	  }));
});
