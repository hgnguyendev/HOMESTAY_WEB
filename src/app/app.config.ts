import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideMessaging } from '@angular/fire/messaging';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { getMessaging } from 'firebase/messaging';
import { provideMarkdown } from 'ngx-markdown';
import { AppConfig } from './_configs/app-config';
import { environment } from './_enviroments/enviroment';
import { AppService } from './_services/app.service';
import { BaseService } from './_services/base.service';
import { SwalService } from './_services/swal.service';
import { UserService } from './_services/users.service';
import { initializeAppGlobal } from './app';
import { routes } from './app.routes';
import { AuthGuard } from './_guards/auth-guard';
import { UploadService } from './_services/upload.service';
import { CommentsService } from './_services/comments.service';

const canUseFCM = () => {
  return typeof window !== 'undefined'
    && (window.isSecureContext || location.hostname === 'localhost');
};

// export function jwtOptionsFactory(angularFireAuth: AngularFireAuth) {
//   return {
//     tokenGetter: async () => {
//       return new Promise((resolve, reject) => {
//         const subscription = angularFireAuth.user.subscribe((currentUser) => {
//           if (!currentUser) {
//             resolve('');
//           }

//           subscription.unsubscribe();
//           currentUser?.getIdToken(false).then((token) => {
//             resolve(token);
//           });
//         });
//       });
//     },
//     allowedDomains: environment.angularJwt.whitelistedDomains,
//     disallowedRoutes: environment.angularJwt.blacklistedDomains,
//   };
// }

// export function jwtOptionsFactory(af: AngularFireAuth) {
//   return {
//     tokenGetter: () => af.currentUser.then(u => u ? u.getIdToken(false) : ''),
//     allowedDomains: environment.angularJwt.whitelistDomains,
//     disallowedRoutes: environment.angularJwt.blacklistedDomains,
//   };
// }

export function jwtOptionsFactory(angularFireAuth: AngularFireAuth) {
  return {
    tokenGetter: async () => {
      return new Promise((resolve, reject) => {
        const subscription = angularFireAuth.user.subscribe((currentUser) => {
          if (!currentUser) {
            resolve('');
          }

          subscription.unsubscribe();
          currentUser?.getIdToken(false).then((token) => {
            resolve(token);
          });
        });
      });
    },
    allowedDomains: environment.angularJwt.whitelistDomains,
    disallowedRoutes: environment.angularJwt.blacklistedDomains,
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection(),
    provideRouter(routes),
    provideAnimations(),
    AppConfig,
    BaseService,
    AppService,
    UserService,
    SwalService,
    AuthGuard,
    UploadService,
    CommentsService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppGlobal,
      deps: [AppConfig],
      multi: true,
    },
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    ...(canUseFCM() ? [provideMessaging(() => getMessaging())] : []),
    // provideMessaging(() => getMessaging()),
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
      JwtModule.forRoot({
        jwtOptionsProvider: {
          provide: JWT_OPTIONS,
          useFactory: jwtOptionsFactory,
          deps: [AngularFireAuth],
        }
      })
    ),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    provideMarkdown({ loader: HttpClient })
  ]
};
