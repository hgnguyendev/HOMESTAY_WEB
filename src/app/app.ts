import { registerLocaleData } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import en from '@angular/common/locales/en';
import vi from '@angular/common/locales/vi';
import { AppConfig } from './_configs/app-config';

registerLocaleData(en);
registerLocaleData(vi);

export function initializeAppGlobal(appConfig: AppConfig) {
  return () => appConfig.load();
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('MANAGE_HOMESTAY_WEB');
}
