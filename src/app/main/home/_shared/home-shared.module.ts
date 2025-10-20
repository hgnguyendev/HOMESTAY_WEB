import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomestayOutstanding } from "./homestay-outstanding/homestay-outstanding.component";
import { ServiceIntroduction } from "./service-introduction/service-introduction.component";
import { ListServiceIntroduction } from "./list-service-introduction/list-service-introduction.component";
import { CardHomestay } from "./card-homestay/card-homestay.component";

@NgModule({
    declarations: [HomestayOutstanding,ServiceIntroduction,ListServiceIntroduction,CardHomestay],
    imports: [
        CommonModule
    ],
    exports: [
        HomestayOutstanding,
        ServiceIntroduction,
        ListServiceIntroduction,
        CardHomestay
    ]
})

export class HomeSharedModule { }