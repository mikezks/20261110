import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FlightSearch } from './flight-search';

describe('FlightSearch', () => {
  it('creates the component', async () => {
    TestBed.configureTestingModule({ providers: [provideHttpClientTesting(), provideRouter([])] });
    const fixture = TestBed.createComponent(FlightSearch);

    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
