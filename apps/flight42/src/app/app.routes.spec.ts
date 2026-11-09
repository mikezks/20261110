import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { FlightEdit } from './booking/features/flight-edit/flight-edit';

describe('Workshop routes', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [provideRouter(routes, withComponentInputBinding()), provideHttpClientTesting()],
  }));

  it('redirects the start page, lazy loads booking and handles unknown urls', async () => {
    const harness = await RouterTestingHarness.create('/');
    expect(TestBed.inject(Router).url).toBe('/home');
    expect(harness.routeNativeElement?.textContent).toContain('Welcome to Flights 42');
    await harness.navigateByUrl('/booking');
    expect(TestBed.inject(Router).url).toBe('/booking/flight-search');
    expect(harness.routeNativeElement?.textContent).toContain('Flight Search');
    await harness.navigateByUrl('/missing');
    expect(harness.routeNativeElement?.textContent).toContain('Not Found');
    TestBed.inject(HttpTestingController).verify();
  });

  it('converts route ids and loads the selected flight into the existing editor', async () => {
    const harness = await RouterTestingHarness.create();
    const http = TestBed.inject(HttpTestingController);
    const navigation = harness.navigateByUrl('/booking/flight-edit/22', FlightEdit);
    const request = await vi.waitFor(() => http.expectOne(req => req.params.get('id') === '22'));
    request.flush({ id: 22, from: 'Hamburg', to: 'Graz', date: '2026-11-09T10:00:00Z', delayed: false });
    const editor = await navigation;
    await harness.fixture.whenStable();
    expect(editor.id()).toBe(22);
    expect(harness.routeNativeElement?.querySelector<HTMLInputElement>('#edit-from')?.value).toBe('Hamburg');
    expect(harness.routeNativeElement?.querySelector('h2')?.textContent).toContain('Flight Edit');
    http.verify();
  });
});
