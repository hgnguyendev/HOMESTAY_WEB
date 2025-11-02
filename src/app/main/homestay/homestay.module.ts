import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Homestay } from "./homestay.component";
import { CommonModule } from "@angular/common";
import { HomestayShared } from "./shared/homestay-shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeSharedModule } from "../home/_shared/home-shared.module";

const routes: Routes = [
    {
        path: '',
        component: Homestay
    }
]

@NgModule({
    declarations: [Homestay],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HomeSharedModule,
        HomestayShared
    ],
    exports: [
    ]
})

export class HomestayModule { }