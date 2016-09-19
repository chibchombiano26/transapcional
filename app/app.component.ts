import {Component} from "@angular/core";
import {RegisteService} from "./services/auth/index";
import {User} from "./models/index";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
    providers :[RegisteService],
})
export class AppComponent {
    public counter: number = 16;

    constructor(private register : RegisteService) {
        
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

        this.register.login(_user);
    }
}
