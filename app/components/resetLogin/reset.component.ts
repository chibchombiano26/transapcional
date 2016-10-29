import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Page } from "ui/page";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/platform";
import { Router } from "@angular/router";
import { firebaseService } from "../../services/index";


@Component({

    selector: "reset",
    templateUrl: "components/resetLogin/reset.html",
    styleUrls: ["components/resetLogin/reset-common.css", "components/resetLogin/reset.css"]
})

export class ResetComponent implements OnInit {
    user: User;
    isLoading = false;

    constructor(private _firebaseService: firebaseService, private page: Page, private _router: Router) {
        this.user = new User();
        this.user.email = "avilap@gmail.com";
    }
    ngOnInit() {

        this.page.actionBarHidden = true;
    }

    submit() {
        this.isLoading = true;
        this._firebaseService.resetPassword(this.user.email).then((result) => {
            
            
        });
        this.isLoading = false;
        this._router.navigate([""]);
    }
}