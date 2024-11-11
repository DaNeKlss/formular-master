/* eslint-disable @typescript-eslint/use-unknown-in-catch-callback-variable */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) => {
  // eslint-disable-next-line no-console, @typescript-eslint/no-confusing-void-expression
  console.error(err);
});
