import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Search } from "./search.component";
import { CommonModule } from "@angular/common";
import { HomeSharedModule } from "../../_shared/home-shared.module";

const routes: Routes = [
    {
        path: '',
        component: Search
    }
]

@NgModule({
    declarations: [Search],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HomeSharedModule
    ],
    exports: []
})

export class SearchModule { }