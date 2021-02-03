import { HttpService } from './http.service';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

describe('HttpService', () => {
  let httpClientSpy: {post: jasmine.Spy};
  let service: HttpService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new HttpService(httpClientSpy as any);
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
