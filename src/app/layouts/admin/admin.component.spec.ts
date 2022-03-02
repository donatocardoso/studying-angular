import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminLayoutComponent } from './admin.component';

describe('AdminLayoutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AdminLayoutComponent],
    }).compileComponents();
  });

  it('should create the home', () => {
    const fixture = TestBed.createComponent(AdminLayoutComponent);
    const home = fixture.componentInstance;
    expect(home).toBeTruthy();
  });

  it(`should have as title 'alurapic'`, () => {
    const fixture = TestBed.createComponent(AdminLayoutComponent);
    const home = fixture.componentInstance;
    expect(home.title).toEqual('alurapic');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AdminLayoutComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'alurapic home is running!'
    );
  });
});
