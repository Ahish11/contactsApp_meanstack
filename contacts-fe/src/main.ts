
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import '@fontsource-variable/inter';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(withFetch()), // Add fetch-enabled HttpClient
  ],
}).catch((err) => console.error(err));
