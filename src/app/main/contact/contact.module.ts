import { NgModule } from "@angular/core";
import { Contact } from "./contact.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";

const routes: Routes = [
    {
        path: '',
        component: Contact
    }
]

@NgModule({
    declarations: [Contact],
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ],
    exports: []
})

export class ContactModule { }