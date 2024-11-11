/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { registerLocaleData } from '@angular/common';
import localeCs from '@angular/common/locales/cs';
import { ApplicationConfig } from '@angular/core';

registerLocaleData(localeCs, 'cs');

export const appConfig: ApplicationConfig = {
  providers: [],
};
