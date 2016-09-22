import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {Page} from "ui/page";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/platform";
import {auth0Service, WPService} from "../../services/index";
import {Router} from "@angular/router";

@Component({
    selector: "login",
    templateUrl: "components/login/login.html",
    providers: [auth0Service, WPService],
    styleUrls: ["components/login/login-common.css", "components/login/login.css"]
    
}) 

export class LoginComponent implements OnInit 
{
    user: User;
     isLoading = false;
    constructor(private auth0 : auth0Service, private wp:WPService, private page: Page,private _router: Router) {
        this.user = new User();
        this.user.email = "futbolito152@gmail.com";
        this.user.password = "iguazo262";
    }
    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    submit() {
            this.isLoading = true;
            this.auth0.getUser(this.user).then((profile)=>{
            //Information of the user
            console.log(profile);
            
            this.isLoading = false;
            this._router.navigate(["/noticias"])
            
        });
}


}