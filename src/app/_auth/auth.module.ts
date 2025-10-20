import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthComponent } from "./auth.component";
import { Login } from "./login/login";
import { Register } from "./register/register";
import { ReactiveFormsModule } from '@angular/forms';
import { Opt } from "./opt/opt";


const routes: Routes = [
    { path: '', component: AuthComponent}
]

@NgModule({
    declarations: [AuthComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        Login,
        Register,
        Opt
    ],
    exports: []
})

export class AuthModule { }