import { inject, ResourceRef, Service, Signal } from '@angular/core';
import { Flight, FlightFilter, initialFlightFilter } from '../model/flight';
import { HttpClient, HttpParams, httpResource } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { BASE_URL } from '../app.provider';

@Service({
  autoProvided: true
})
export class FlightService {
  private readonly http = inject(HttpClient);
  private readonly url = inject(BASE_URL);
  firstname = 'James';

  saveFlight(flight: Flight): Observable<Flight> {
    return this.http.post<Flight>(this.url + '/flight', flight);
  }

  saveFlightAsPromise(flight: Flight): Promise<Flight> {
    return firstValueFrom(this.saveFlight(flight));
  }

  createFlightResource(query: Signal<FlightFilter | undefined>): ResourceRef<Flight[]> {
    return httpResource<Flight[]>(() => query()
      ? { url: `${ this.url }/flight`, params: { ...query() } }
      : undefined,
      { defaultValue: [] });
  }

  setName(name: string): void {
    this.firstname = name;
  }
}
