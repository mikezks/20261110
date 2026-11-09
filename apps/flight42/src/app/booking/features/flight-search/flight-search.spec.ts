import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { page } from 'vitest/browser';
import { FlightSearch } from './flight-search';

describe('FlightSearch', () => {
  it('creates the component', async () => {
    TestBed.configureTestingModule({ providers: [provideHttpClientTesting(), provideRouter([])] });
    const fixture = TestBed.createComponent(FlightSearch);

    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('keeps formatting, filtering and card events after extracting components', async () => {
    TestBed.configureTestingModule({ providers: [provideHttpClientTesting(), provideRouter([])] });
    const http = TestBed.inject(HttpTestingController);
    const fixture = TestBed.createComponent(FlightSearch);
    (fixture.nativeElement as HTMLElement).setAttribute('data-testid', 'flight-search');
    await fixture.whenStable();
    const screen = page.getByTestId('flight-search');
    await screen.getByRole('button', { name: 'Search', exact: true }).click();
    const request = await vi.waitFor(() => http.expectOne(req => req.method === 'GET'));
    request.flush([
      { id: 1, from: 'Hamburg', to: 'Graz', date: '2026-11-09T10:00:00Z', delayed: false },
      { id: 2, from: 'Paris', to: 'London', date: '2026-11-09T11:00:00Z', delayed: true },
    ]);
    await fixture.whenStable();
    await expect.element(screen.getByRole('heading', { name: 'HAM - Graz (GRZ)' })).toBeVisible();
    await expect.element(screen.getByRole('heading', { name: 'CDG - London City Airport' })).toBeVisible();
    await screen.getByLabelText('Only delayed flights').click();
    await fixture.whenStable();
    const cards = () => (fixture.nativeElement as HTMLElement).querySelectorAll('app-flight-card');
    expect(cards().length).toBe(1);
    await screen.getByRole('button', { name: 'Select', exact: true }).click();
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Selected flights: 1');
    await screen.getByRole('button', { name: 'Remove', exact: true }).click();
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Selected flights: 0');
    await screen.getByLabelText('Only delayed flights').click();
    await fixture.whenStable();
    expect(cards().length).toBe(2);
    (cards()[0].querySelectorAll('button')[1] as HTMLButtonElement).click();
    await fixture.whenStable();
    await screen.getByLabelText('Only delayed flights').click();
    await fixture.whenStable();
    expect(cards().length).toBe(2);
    http.verify();
  });
});
