import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface IAppConfig {
  apiEndpoint: string;
  apiEndpointAgent: string;
  socketIoEndpoint: string;
  awsBucketImages: string;
  awsBucketUrl: string;
}

@Injectable()
export class AppConfig {
  static settings: IAppConfig;

  constructor(private http: HttpClient) { }

  load() {
    const jsonFile = `assets/config/config.json`;
    return new Promise<void>((resolve, reject) => {
      this.http
        .get(jsonFile)
        .toPromise()
        .then((response: any) => {
          AppConfig.settings = response as IAppConfig;
          resolve();
        })
        .catch((response: any) => {
          reject(
            `Could not load file '${jsonFile}': ${JSON.stringify(response)}`
          );
        });
    });
  }
}
