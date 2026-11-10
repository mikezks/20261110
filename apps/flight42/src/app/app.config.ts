import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideCheckNoChangesConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    /* provideCheckNoChangesConfig({
      exhaustive: true,
      interval: 3_000
    }) */
  ],
};
