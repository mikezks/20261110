import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'city',
})
export class CityPipe implements PipeTransform {
  transform(value: string, fmt: 'short' | 'long' = 'long'): string {
    let short = '';
    let long = '';

    switch (value) {
      case 'Paris':
        short = 'CDG';
        long = 'Charles de Gaulle Airport';
        break;
      case 'London':
        short = 'LCY';
        long = 'London City Airport';
        break;
      case 'Berlin':
        short = 'BER';
        long = 'Flughafen Berlin Brandenburg - Willy Brandt';
        break;
      case 'Graz':
        short = 'GRZ';
        long = 'Flughafen Graz Thalerhof';
        break;
      case 'Hamburg':
        short = 'HAM';
        long = ' Hamburg Airport Helmut Schmidt';
        break;
      default:
        short = long = value;
    }

    if (fmt === 'short') {
      return short;
    }

    return long;
  }
}
