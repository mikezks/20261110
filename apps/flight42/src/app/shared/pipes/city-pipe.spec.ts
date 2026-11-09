import { TestBed } from '@angular/core/testing';
import { ConfigService } from '../config-service';
import { CityPipe } from './city-pipe';

describe('CityPipe', () => {
  it('formats known cities and keeps unknown names', () => {
    const pipe = TestBed.runInInjectionContext(() => new CityPipe());
    expect(pipe.transform('Hamburg', 'short')).toBe('HAM');
    expect(pipe.transform('Graz')).toBe('Graz (GRZ)');
    expect(pipe.transform('Paris', 'long')).toBe('Charles de Gaulle Airport');
    expect(pipe.transform('Unknown', 'short')).toBe('Unknown');
  });

  it('uses configured icao codes without changing long names', () => {
    TestBed.configureTestingModule({ providers: [{ provide: ConfigService, useValue: { icao: true } }] });
    const pipe = TestBed.runInInjectionContext(() => new CityPipe());
    expect(pipe.transform('Hamburg', 'short')).toBe('EDDH');
    expect(pipe.transform('London', 'short')).toBe('EGLC');
    expect(pipe.transform('Paris', 'long')).toBe('Charles de Gaulle Airport');
    expect(pipe.transform('Unknown', 'short')).toBe('Unknown');
  });
});
