import { Provider } from '@angular/core';
import { ConfigService } from '../shared/config-service';

export function provideTestConfig(): Provider {
  return {
    provide: ConfigService,
    useValue: {
      baseUrl: '',
      icao: false,
    },
  };
}
