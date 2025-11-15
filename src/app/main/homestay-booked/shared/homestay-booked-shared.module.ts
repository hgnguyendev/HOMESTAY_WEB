import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ModalDetailsInvoice } from "./modal-details-invoice/modal-details-invoice.component";

@NgModule({
    declarations: [ModalDetailsInvoice],
    imports: [
        CommonModule
    ],
    exports: [
        ModalDetailsInvoice
    ]
})

export class HomestayBookedSharedModule { }