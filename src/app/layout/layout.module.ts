import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout.component";
import { Header } from "./header/header.component";
import { Footer } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';


@NgModule({
    declarations: [LayoutComponent, Header, Footer],
    imports: [
        RouterModule,
        CommonModule,
        NzDropDownModule,
        NzModalModule
    ],
    exports: [
        LayoutComponent,
        Header,
        Footer
    ]
})

export class LayoutModule { }