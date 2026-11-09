import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { PassengerEdit } from './passenger-edit';

const passenger = { id: 7, firstName: 'Ada', name: 'Smith', bonusMiles: 500, passengerStatus: 'A' };

const address = { street: 'Main Street 1', postalCode: '8010', city: 'Graz', country: 'Austria' };
function fillAddress(root: HTMLElement): void {
  for (const [id, value] of Object.entries({
    'address-street': address.street, 'address-postal-code': address.postalCode,
    'address-city': address.city, 'address-country': address.country,
  })) {
    const input = root.querySelector<HTMLInputElement>(`#${id}`)!;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }
}

describe('Passenger editor', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [
    provideHttpClientTesting(),
    provideRouter([{ path: 'checkin/passenger/edit/:id', component: PassengerEdit }], withComponentInputBinding()),
  ] }));

  it('loads a route id, logs edits locally and restores server data on reload', async () => {
    const http = TestBed.inject(HttpTestingController);
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const harness = await RouterTestingHarness.create();
    const navigation = harness.navigateByUrl('/checkin/passenger/edit/7', PassengerEdit);
    (await vi.waitFor(() => http.expectOne(req => req.params.get('id') === '7'))).flush({ ...passenger });
    await navigation;
    await harness.fixture.whenStable();
    const root = harness.routeNativeElement!;
    fillAddress(root);
    const input = root.querySelector<HTMLInputElement>('#passenger-firstName')!;
    expect(input.value).toBe('Ada');
    input.value = 'Grace'; input.dispatchEvent(new Event('input'));
    await harness.fixture.whenStable();
    root.querySelector<HTMLFormElement>('form')!.requestSubmit();
    await harness.fixture.whenStable();
    expect(log).toHaveBeenCalledWith({ ...passenger, firstName: 'Grace', address });
    http.expectNone(req => req.method !== 'GET');
    const reload = Array.from(root.querySelectorAll<HTMLButtonElement>('button')).find(b => b.textContent?.trim() === 'Reload')!;
    reload.click();
    (await vi.waitFor(() => http.expectOne(req => req.params.get('id') === '7'))).flush({ ...passenger });
    await harness.fixture.whenStable();
    expect(root.querySelector<HTMLInputElement>('#passenger-firstName')?.value).toBe('Ada');
    expect(root.querySelector<HTMLInputElement>('#address-street')?.value).toBe('');
    expect(root.querySelector<HTMLButtonElement>('button[type="submit"]')?.disabled).toBe(true);
    http.verify(); log.mockRestore();
  });

  it('shows loading failures and recovers on the next id', async () => {
    const http = TestBed.inject(HttpTestingController);
    const harness = await RouterTestingHarness.create();
    const failed = harness.navigateByUrl('/checkin/passenger/edit/7', PassengerEdit);
    (await vi.waitFor(() => http.expectOne(req => req.params.get('id') === '7'))).flush('Unavailable', { status: 503, statusText: 'Unavailable' });
    await failed; await harness.fixture.whenStable();
    expect(harness.routeNativeElement?.textContent).toContain('could not be loaded');
    expect(harness.routeNativeElement?.querySelector('form')).toBeNull();
    const next = harness.navigateByUrl('/checkin/passenger/edit/8', PassengerEdit);
    (await vi.waitFor(() => http.expectOne(req => req.params.get('id') === '8'))).flush({ ...passenger, id: 8, firstName: 'Alan' });
    await next; await harness.fixture.whenStable();
    expect(harness.routeNativeElement?.querySelector<HTMLInputElement>('#passenger-firstName')?.value).toBe('Alan');
    http.verify();
  });
  it('propagates required and custom last-name errors to Save', async () => {
    const http = TestBed.inject(HttpTestingController);
    const harness = await RouterTestingHarness.create();
    const navigation = harness.navigateByUrl('/checkin/passenger/edit/7', PassengerEdit);
    (await vi.waitFor(() => http.expectOne(req => req.params.get('id') === '7'))).flush({ ...passenger });
    await navigation; await harness.fixture.whenStable();
    const root = harness.routeNativeElement!;
    fillAddress(root);
    const name = root.querySelector<HTMLInputElement>('#passenger-name')!;
    const save = root.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    for (const [value, invalid] of [['', true], ['Jones', true], ['smith', true], ['Smith', false], ['Mustermann', false]] as const) {
      name.value = value; name.dispatchEvent(new Event('input'));
      await harness.fixture.whenStable();
      expect(save.disabled).toBe(invalid);
      if (value === '') expect(root.textContent).toContain('Please enter a last name.');
      if (value === 'Jones') expect(root.textContent).toContain('The entered last name is not allowed.');
    }
    http.verify();
  });

  it('shares nested address values and validation with the parent without a nested form', async () => {
    const http = TestBed.inject(HttpTestingController);
    const harness = await RouterTestingHarness.create();
    const navigation = harness.navigateByUrl('/checkin/passenger/edit/7', PassengerEdit);
    (await vi.waitFor(() => http.expectOne(req => req.params.get('id') === '7'))).flush({ ...passenger });
    await navigation; await harness.fixture.whenStable();
    const root = harness.routeNativeElement!;
    expect(root.querySelectorAll('form')).toHaveLength(1);
    const save = root.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    const street = root.querySelector<HTMLInputElement>('#address-street')!;
    expect(save.disabled).toBe(true);
    expect(root.textContent).not.toContain('Please enter a street.');
    street.dispatchEvent(new Event('blur'));
    await harness.fixture.whenStable();
    expect(root.textContent).toContain('Please enter a street.');
    fillAddress(root);
    await harness.fixture.whenStable();
    expect(save.disabled).toBe(false);
    const postalCode = root.querySelector<HTMLInputElement>('#address-postal-code')!;
    postalCode.value = '80'; postalCode.dispatchEvent(new Event('input')); postalCode.dispatchEvent(new Event('blur'));
    await harness.fixture.whenStable();
    expect(save.disabled).toBe(true);
    expect(root.textContent).toContain('Use at least three characters.');
    http.verify();
  });

});
