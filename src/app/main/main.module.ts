import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main.component";
import { LayoutModule } from "../layout/layout.module";

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
            },
            {
                path: 'homestay',
                loadChildren: () => import('./homestay/homestay.module').then((m) => m.HomestayModule)
            },
            {
                path: 'service',
                loadChildren: () => import('./service-homestay/service-homestay.module').then((m) => m.ServiceHomestayModule)
            },
            {
                path: 'contact',
                loadChildren: () => import('./contact/contact.module').then((m) => m.ContactModule)
            }
        ]
    }
]

@NgModule({
    declarations: [MainComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        LayoutModule,
    ],
    providers: [],
    exports: []
})

export class MainModule { }

