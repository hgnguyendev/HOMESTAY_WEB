import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomestayOutstanding } from "./homestay-outstanding/homestay-outstanding.component";
import { ServiceIntroduction } from "./service-introduction/service-introduction.component";
import { ListServiceIntroduction } from "./list-service-introduction/list-service-introduction.component";
import { CardHomestay } from "./card-homestay/card-homestay.component";
import { DetailsHomestay } from "./details-homestay/details-homestay.component";
import { Overview } from "./overview/overview.component";
import { Facilities } from "./facilities/facilities.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [HomestayOutstanding, ServiceIntroduction, ListServiceIntroduction, CardHomestay, DetailsHomestay, Overview,Facilities],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        HomestayOutstanding,
        ServiceIntroduction,
        ListServiceIntroduction,
        CardHomestay,
        DetailsHomestay,
        Overview,
        Facilities
    ]
})

export class HomeSharedModule { }