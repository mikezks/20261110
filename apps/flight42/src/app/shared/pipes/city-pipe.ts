import { inject, Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '../config-service';

export type CityFormat = 'long' | 'short';

@Pipe({ name: 'city' })
export class CityPipe implements PipeTransform {
  private readonly config = inject(ConfigService);
  transform(value: string, fmt: CityFormat = 'long'): string {
    let short = '';
    let icao = '';
    let long = '';

    switch (value) {
      case 'Paris':
        icao = 'LFPG';
        short = 'CDG';
        long = 'Charles de Gaulle Airport';
        break;
      case 'London':
        icao = 'EGLC';
        short = 'LCY';
        long = 'London City Airport';
        break;
      case 'Berlin':
        icao = 'EDDB';
        short = 'BER';
        long = 'Flughafen Berlin Brandenburg - Willy Brandt';
        break;
      case 'Graz':
        icao = 'LOWG';
        short = 'GRZ';
        long = 'Graz (GRZ)';
        break;
      case 'Hamburg':
        icao = 'EDDH';
        short = 'HAM';
        long = 'Hamburg (HAM)';
        break;
      default:
        short = icao = long = value;
    }

    if (fmt === 'short') return this.config.icao ? icao : short;
    return long;
  }
}
