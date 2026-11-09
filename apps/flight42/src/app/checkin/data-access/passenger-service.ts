import { httpResource } from '@angular/common/http';
import { inject, Service, Signal } from '@angular/core';
import { ConfigService } from '../../shared/config-service';
import { initialPassenger, Passenger, PassengerFilter } from '../model/passenger';

@Service()
export class PassengerService {
  private readonly config = inject(ConfigService);

  findAsResource(filter: Signal<PassengerFilter | undefined>) {
    return httpResource<Passenger[]>(() => {
      const value = filter();
      return value ? {
        url: `${this.config.baseUrl}/passenger`,
        params: { firstName: value.firstname, name: value.lastname },
      } : undefined;
    }, { defaultValue: [] });
  }

  findByIdAsResource(id: Signal<number>) {
    return httpResource<Passenger>(
      () => id() > 0 ? { url: `${this.config.baseUrl}/passenger`, params: { id: id() } } : undefined,
      { defaultValue: { ...initialPassenger } },
    );
  }
}
