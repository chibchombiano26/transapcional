import { Component} from "@angular/core";
import {WPService,firebaseService} from "../../services/index";
import {util} from "../../util/util";
var firebase = require("nativescript-plugin-firebase");


@Component({
  selector: "list-productos",
  templateUrl: "components/productos/listproductos.html",
  providers: [WPService, firebaseService]
})
export class ListProductosComponent {
    private counter: number;
    public news : Array<any> = [];
    public _util = new util();

    constructor(private _firebaseService: firebaseService,private wpService: WPService) {
        
        this.loadNews();

        //this.loadNews();

        // _customEvents.subject.subscribe({
        //     next: (v) => console.log('observerB: ' + v)
        // });

        // setInterval(()=>{
        //     this._customEvents.subject.next("Test");
        // }, 3000);
    }


    loadNews(){
        this._firebaseService.getData("Productos").then((result)=>{
            this.news = this._util.objectToArray(result);
            console.log(this.news);
        })
    }

    public onItemTap(args) {
        console.log("------------------------ ItemTapped: " + args.index);
    }
}