import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserLayout } from './app.component';

describe('UserLayout', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [UserLayout],
    }).compileComponents();
  });

  it('should create the home', () => {
    const fixture = TestBed.createComponent(UserLayout);
    const home = fixture.componentInstance;
    expect(home).toBeTruthy();
  });

  it(`should have as title 'alurapic'`, () => {
    const fixture = TestBed.createComponent(UserLayout);
    const home = fixture.componentInstance;
    expect(home.title).toEqual('alurapic');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(UserLayout);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'alurapic home is running!'
    );
  });
});
