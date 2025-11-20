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
                path: 'booked',
                loadChildren: () => import('./homestay-booked/homestay-booked.module').then((m) => m.HomestayBookedModule)
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

