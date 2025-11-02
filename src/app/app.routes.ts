import { Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth-guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./_auth/auth.module').then((m) => m.AuthModule),

    },
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    },
    {
        path: 'payment-result',
        loadChildren: () => import('./payment/payment-result/payment-result.module').then((m) => m.PaymentResultModule)
    }
];
