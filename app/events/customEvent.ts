import { Injectable } from "@angular/core";
import * as Rx from 'rxjs';


@Injectable()
export class customEvents{
    
    subject : Rx.Subject<any>;
    isLoggin : Rx.Subject<any>;

    constructor() {
        console.log("Event creation");
        this.subject = new  Rx.Subject();
        this.isLoggin = new  Rx.Subject();
    }

}