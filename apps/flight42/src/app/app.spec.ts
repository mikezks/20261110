import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { App } from './app';

describe('Workshop shell', () => {
  it('renders the home route inside the workshop shell', async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting(), provideRouter(routes)],
    });
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/home');
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('h2')?.textContent).toContain('Welcome to Flights 42');
    expect(element.querySelector('[role=main]')).not.toBeNull();
  });
});
