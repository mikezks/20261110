import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BASE_URL } from './app.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    {
      provide: BASE_URL,
      useValue: 'http://i.was.hacked'
    }
  ],
};
