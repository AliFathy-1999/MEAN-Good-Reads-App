import { TestBed } from '@angular/core/testing';

import { UserAuthorService } from './user-author.service';

describe('UserAuthorService', () => {
  let service: UserAuthorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuthorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
