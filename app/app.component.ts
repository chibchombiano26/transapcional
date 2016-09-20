import { Component } from "@angular/core";

@Component({
    selector: "my-app",
    template: "<page-router-outlet></page-router-outlet>",
})

export class AppComponent {
}


/*
import {Component} from "@angular/core";
import {auth0Service, WPService} from "./services/index";
import {User} from "./models/index";
import {HtmlView} from "ui/html-view";
import {DatePicker} from "ui/date-picker";


@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
    providers: [auth0Service, WPService],
    
})
export class AppComponent {

    public htmlString: string;
    public counter: number = 16;

    constructor(private auth0 : auth0Service, private wp:WPService) {
        this.htmlString = '<span><h1>HtmlView demo in <font color="blue">NativeScript</font> App</h1></span>';
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
        
        _user.email = "futbolito152@gmail.com";
        _user.password = "iguazo262";

        /*this.auth0.getUser(_user).then((profile)=>{
            //Information of the user
            console.log(profile);
        })*/

        //this.auth0.register(_user);

        /*
        this.wp.getPost("corporate-black").then((post)=>{
            this.htmlString = post[0].content.rendered;
        })
    }
}
*/
