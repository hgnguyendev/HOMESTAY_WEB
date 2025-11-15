import { NgModule } from "@angular/core";
import { HomestayBooked } from "./homestay-booked.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";

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
        CommonModule
    ],
    exports: []
})


export class HomestayBookedModule { }