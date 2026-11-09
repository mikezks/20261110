import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { PassengerEdit } from './passenger-edit';

const passenger = { id: 7, firstName: 'Ada', name: 'Smith', bonusMiles: 500, passengerStatus: 'A' };

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
    const input = root.querySelector<HTMLInputElement>('#passenger-firstName')!;
    expect(input.value).toBe('Ada');
    input.value = 'Grace'; input.dispatchEvent(new Event('input'));
    await harness.fixture.whenStable();
    root.querySelector<HTMLFormElement>('form')!.requestSubmit();
    await harness.fixture.whenStable();
    expect(log).toHaveBeenCalledWith({ ...passenger, firstName: 'Grace' });
    http.expectNone(req => req.method !== 'GET');
    const reload = Array.from(root.querySelectorAll<HTMLButtonElement>('button')).find(b => b.textContent?.trim() === 'Reload')!;
    reload.click();
    (await vi.waitFor(() => http.expectOne(req => req.params.get('id') === '7'))).flush({ ...passenger });
    await harness.fixture.whenStable();
    expect(root.querySelector<HTMLInputElement>('#passenger-firstName')?.value).toBe('Ada');
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

});
