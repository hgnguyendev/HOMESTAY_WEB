import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Messaging, getToken } from "@angular/fire/messaging";
import { Subject } from "rxjs";
import { environment } from '../_enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  _collapseNavbarSubject = new Subject<boolean>();
  collapseNavbar$ = this._collapseNavbarSubject.asObservable();

  _socketDataOrgSubject = new Subject<any>();
  socketDataOrg$ = this._socketDataOrgSubject.asObservable();

  constructor(
    private _httpClient: HttpClient,
    @Optional() private messaging?: Messaging,
  ) { }

  async requestPermission() {
    try {
      if (!this.messaging) return null;
      const token = await getToken(this.messaging, {
        vapidKey: environment.firebase.vapidKey
      });
      return token;
    } catch (err) {
      console.log("Error", err)
      return null;
    }
  }

  async downloadFile(url: string, filename: string) {
    try {
      // const data = await firstValueFrom(
      //   this._httpClient.get(url, { responseType: 'blob' })
      // );
      // saveAs(data, filename);

      this.downloadDirect(url, filename);
    } catch (err) {
      console.error('Download failed:', err);
    }
  }

  downloadDirect(url: string, filename?: string) {
    const a = document.createElement('a') as any;
    a.href = url;
    if (filename) a.download = filename;
    a.rel = 'noopener';
    a.target = '_blank';
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}
