import {Component} from "@angular/core";
import {auth0Service} from "./services/auth/index";
import {User} from "./models/index";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
    providers :[auth0Service],
})
export class AppComponent {
    public counter: number = 16;

    constructor(private aut0 : auth0Service) {
        
    }

    public get message(): string {
        if (this.counter > 0) {
            return this.counter + " taps left";
        } else {
            return "Hoorraaay! \nYou are ready to start building!";
        }
    }
    
    public onTap() {
        this.counter--;
        let _user = new User();
        _user.email = "";
        _user.password = "";

        this.aut0.login(_user);
    }
}
