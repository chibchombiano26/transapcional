import { Profile } from '../../models/profile';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Page } from "ui/page";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/platform";
import { Router } from "@angular/router";
import { firebaseService } from "../../services/index";
import { customEvents } from "../../events/customEvent";

@Component({
    selector: "login",
    templateUrl: "components/login/login.html",
    styleUrls: ["components/login/login-common.css", "components/login/login.css"]
})

export class LoginComponent implements OnInit {
    user: User;
    isLoading = false;

    constructor(private _firebaseService: firebaseService, private _customEvents: customEvents, private page: Page, private _router: Router) {
        this.user = new User();
        this.user.email = "avilap@gmail.com";
        this.user.password = "123456";

        // _customEvents.subject.subscribe({
        //     next: (v) => console.log('observerA: ' + v)
        // });
    }
    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    submit() {

        this._firebaseService.login(this.user).then((result) => {
            console.log(result);
            this._customEvents.isLoggin.next("Loggin");
            this.isLoading = false;
            this._router.navigate(["/noticias"])
        });
    }
}