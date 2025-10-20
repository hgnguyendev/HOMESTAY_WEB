import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout.component";
import { Header } from "./header/header.component";
import { Footer } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [LayoutComponent, Header, Footer],
    imports: [
        RouterModule,
        CommonModule
    ],
    exports: [
        LayoutComponent,
        Header,
        Footer
    ]
})

export class LayoutModule { }