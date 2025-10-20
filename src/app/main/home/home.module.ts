import { NgModule } from "@angular/core";
import { Home } from "./home.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeSharedModule } from "./_shared/home-shared.module";
import { SearchModule } from "./components/search/search.module";

const routes: Routes = [
    {
        path: '', component: Home, children: [
            { path: 'search', loadChildren: () => import('./components/search/search.module').then((m) => m.SearchModule) }
        ]
    }
]

@NgModule({
    declarations: [Home],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HomeSharedModule
    ],
    exports: []
})

export class HomeModule { }