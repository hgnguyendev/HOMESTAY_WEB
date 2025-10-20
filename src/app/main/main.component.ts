import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { UserService } from "../_services/users.service";


@Component({
    standalone: false,
    templateUrl: 'main.component.html'
})

export class MainComponent {
    _authStateUnsubscription: any;

    constructor(
        private _angularFireAuth: AngularFireAuth,
        private _userService:UserService
    ) { }

    ngOnInit() {
        this._authStateUnsubscription = this._angularFireAuth.onAuthStateChanged(
            (authState) => {
                console.log("auth state",authState)
                if (!this._userService.isAuthenticating) {
                    if (authState) {
                        this._userService.getUserInfo();
                    } else {
                        this._userService.setCurrentInfo(null);
                    }
                }
            }
        );
    }
}