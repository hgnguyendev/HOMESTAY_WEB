import { NgModule } from "@angular/core";
import { PaymentResult } from "./payment-result.component";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: '', component: PaymentResult }
];

@NgModule({
    declarations: [PaymentResult],
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ],
    exports: []
})

export class PaymentResultModule { }