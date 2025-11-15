import { NgModule } from "@angular/core";
import { HomestayBooked } from "./homestay-booked.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NzModalModule } from "ng-zorro-antd/modal";
import { HomestayBookedSharedModule } from "./shared/homestay-booked-shared.module";

const routes: Routes = [
    {
        path: '',
        component: HomestayBooked
    }
]

@NgModule({
    declarations: [HomestayBooked],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        NzModalModule,
        HomestayBookedSharedModule
    ],
    exports: []
})


export class HomestayBookedModule { }