import { TestBed } from '@angular/core/testing';
import {of} from 'rxjs';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let httpClientSpy: {post: jasmine.Spy};
  let service: HttpService;


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

it('should call HTTP post in post method', () => {
  httpClientSpy.post.and.returnValue(of('testval'));
  service.post('https://some.url', {}).subscribe(res => {
    expect(res as any).toBe('testval');
    expect(httpClientSpy.post.calls.count()).toBe(1);
  }, fail)
});
});