import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimationsAsync(),
        provideBrowserGlobalErrorListeners(),
        provideHttpClient(),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
        provideRouter(routes),
        provideZoneChangeDetection({ eventCoalescing: true })
    ]
};
