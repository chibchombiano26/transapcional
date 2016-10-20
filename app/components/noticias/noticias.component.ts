import { Component} from "@angular/core";
import {firebaseService} from "../../services/index";
import {util} from "../../util/util";
import {customEvents} from "../../events/customEvent";
import {Page} from "ui/page";

var firebase = require("nativescript-plugin-firebase");


@Component({
  selector: "noticias",
  templateUrl: "components/noticias/noticias.html",
  styleUrls: ["components/noticias/noticias-common.css"]
})
export class NoticiasComponent {
    private counter: number;
    public news : Array<any> = [];
    public _util = new util();

    constructor(private _firebaseService: firebaseService, private _customEvents : customEvents, private page: Page) {
        this.loadNews();
        this.page.actionBarHidden = false;
        this.page.actionBar.title = "Noticias";

        // _customEvents.subject.subscribe({
        //     next: (v) => 
        //     console.log('observerB: ' + v)
        // });

        // setInterval(()=>{
        //     this._customEvents.subject.next("Test");
        // }, 3000);
    }


    loadNews(){
        this._firebaseService.getData("portafolio").then((result)=>{
            this.news = this._util.objectToArray(result);
        })


        /*firebase.addChildEventListener((newElement)=>{
            this.news.push(newElement.value);
        }, "/portafolio");*/
    }

    public onItemTap(args) {
        console.log("------------------------ ItemTapped: " + args.index);
    }
}