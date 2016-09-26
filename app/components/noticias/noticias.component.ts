import { Component, ElementRef, ViewChild, Injectable, OnInit, ChangeDetectorRef } from "@angular/core";
import { View } from "ui/core/view";
import { RadSideDrawer } from "nativescript-telerik-ui/sidedrawer";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import sideDrawerModule = require('nativescript-telerik-ui/sidedrawer');
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-telerik-ui/sidedrawer/angular";
import {WPService,firebaseService} from "../../services/index";
import {util} from "../../util/util";
var firebase = require("nativescript-plugin-firebase");

class DataItem {
    constructor(public id: number, public name: string) { }
}

@Component({
  selector: "noticias",
  templateUrl: "components/noticias/noticias.html",
  styleUrls: ["components/noticias/noticias-common.css"],
  providers: [WPService, firebaseService]
})
@Injectable()
export class NoticiasComponent extends Observable implements OnInit {
    
    public myItems: Array<DataItem>;
    private counter: number;
    public news : Array<any> = [];
    public _util = new util();

    constructor(private _firebaseService: firebaseService, private page: Page, private _changeDetectionRef: ChangeDetectorRef) {
        super();

        this.myItems = [];
        this.counter = 0;
        for (var i = 0; i < 50; i++) {
            this.myItems.push(new DataItem(i, "data item " + i));
            this.counter = i;
        }        
        this.loadNews();
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

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: SideDrawerType;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    ngOnInit() {
        this.set("mainContentText", "SideDrawer for NativeScript can be easily setup in the XML definition of your page by defining main- and drawer-content. The component"
            + " has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.");
    }

    public openDrawer() {
        this.drawer.showDrawer();
    }

}