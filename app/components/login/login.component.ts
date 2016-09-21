import {Component} from '@angular/core';
import {User} from '../../models/user';
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/platform";
import {auth0Service, WPService} from "../../services/index";

@Component({
    selector: "login",
    templateUrl: "components/login/login.html",
    providers: [auth0Service, WPService],
    styleUrls: ["components/login/login-common.css", "components/login/login.css"]
    
}) 

export class LoginComponent
{
    user: User;
    constructor(private auth0 : auth0Service, private wp:WPService) {
        this.user = new User();
        this.user.email = "futbolito152@gmail.com";
        this.user.password = "iguazo262";
    }

    submit() {
            this.auth0.getUser(this.user).then((profile)=>{
            //Information of the user
            console.log(profile);
        });
}


}