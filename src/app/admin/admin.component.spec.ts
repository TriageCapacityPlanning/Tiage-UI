import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let httpServiceSpy: {post: jasmine.Spy};
  let component: AdminComponent;

  beforeEach(() => {
    httpServiceSpy = jasmine.createSpyObj('HttpService', ['post']);
    component = new AdminComponent(httpServiceSpy as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
