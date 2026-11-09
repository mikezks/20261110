import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { page } from 'vitest/browser';
import { createTestFlight } from '../../../testing/create-test-flight';
import { provideTestConfig } from '../../../testing/provide-test-config';
import { FlightSearch } from './flight-search';

describe('FlightSearch', () => {
  let fixture: ComponentFixture<FlightSearch>;
  let ctrl: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [FlightSearch],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTestConfig(),
        provideRouter([]),
      ],
    });
    fixture = TestBed.createComponent(FlightSearch);
    ctrl = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
  });

  afterEach(() => {
    ctrl.verify();
    vi.restoreAllMocks();
  });

  it('creates the component without loading flights', () => {
    expect(fixture.componentInstance).toBeTruthy();
    ctrl.expectNone(() => true);
  });

  it('disables Search until both fields contain a value', async () => {
    const button = page.getByRole('button', { name: 'Search', exact: true });
    await page.getByLabelText('From:', { exact: true }).fill('');
    await expect.element(button).toBeDisabled();

    await page.getByLabelText('From:', { exact: true }).fill('Hamburg');
    await page.getByLabelText('To:', { exact: true }).fill('   ');
    await expect.element(button).toBeDisabled();

    await page.getByLabelText('To:', { exact: true }).fill('London');
    await expect.element(button).toBeEnabled();
    ctrl.expectNone(() => true);
  });

  it('loads and renders matching flights after Search', async () => {
    await page.getByLabelText('To:', { exact: true }).fill('London');
    ctrl.expectNone(() => true);
    await page.getByRole('button', { name: 'Search', exact: true }).click();

    const request = await vi.waitFor(() =>
      ctrl.expectOne('/flight?from=Hamburg&to=London'),
    );
    expect(request.request.method).toBe('GET');
    request.flush([createTestFlight(1, 'Hamburg', 'London')]);
    await fixture.whenStable();

    await expect.element(page.getByRole('heading', {
      name: 'HAM - London City Airport', exact: true,
    })).toBeVisible();
  });

  it('shows a loading error and retries the same search', async () => {
    await page.getByRole('button', { name: 'Search', exact: true }).click();
    const first = await vi.waitFor(() =>
      ctrl.expectOne('/flight?from=Hamburg&to=Graz'),
    );
    first.flush('Unavailable', { status: 503, statusText: 'Unavailable' });
    await fixture.whenStable();
    await expect.element(page.getByRole('alert')).toHaveTextContent('Flights could not be loaded. Please try again.');

    await page.getByRole('button', { name: 'Retry', exact: true }).click();
    const retry = await vi.waitFor(() =>
      ctrl.expectOne('/flight?from=Hamburg&to=Graz'),
    );
    retry.flush([createTestFlight(2, 'Hamburg', 'Graz')]);
    await fixture.whenStable();
    await expect.element(page.getByRole('heading', { name: 'HAM - Graz (GRZ)' })).toBeVisible();
    await expect.element(page.getByRole('alert')).not.toBeInTheDocument();
  });

  it('delegates Edit to the router with the selected flight id', async () => {
    const router = TestBed.inject(Router);
    const navigate = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    await page.getByRole('button', { name: 'Search', exact: true }).click();
    const request = await vi.waitFor(() =>
      ctrl.expectOne('/flight?from=Hamburg&to=Graz'),
    );
    request.flush([createTestFlight(7, 'Hamburg', 'Graz')]);
    await fixture.whenStable();
    await page.getByRole('button', { name: 'Edit', exact: true }).click();
    expect(navigate).toHaveBeenCalledExactlyOnceWith(['/booking/flight-edit', 7]);
  });
});
