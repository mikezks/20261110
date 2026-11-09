import { Service } from '@angular/core';

@Service()
export class ConfigService {
  readonly icao = false;
  readonly baseUrl = 'https://demo.angulararchitects.io/api';
}
