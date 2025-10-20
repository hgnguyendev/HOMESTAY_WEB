import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ServiceHomestay } from "./service-homestay.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
    {
        path: '',
        component: ServiceHomestay
    }
]

@NgModule({
    declarations: [ServiceHomestay],
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ],
    exports: [],
})

export class ServiceHomestayModule { }