import { Component, ElementRef, ViewChild, Injectable, OnInit, ChangeDetectorRef } from "@angular/core";
import { View } from "ui/core/view";

import { RadSideDrawer } from "nativescript-telerik-ui/sidedrawer";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import sideDrawerModule = require('nativescript-telerik-ui/sidedrawer');
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-telerik-ui/sidedrawer/angular";
import {customEvents} from "./events/customEvent";
import {Router} from "@angular/router";

class DataItem {
    constructor(public id: number, public name: string) { }
}

@Component({
    selector: "my-app",
    templateUrl: "./app.component.html",
    styleUrls : ["./main.css"]
})
@Injectable()
export class AppComponent extends Observable implements OnInit{

    public myItems: Array<DataItem>;
    private counter: number;
    
    constructor(private _customEvents: customEvents, private page: Page, private _changeDetectionRef: ChangeDetectorRef,private _router: Router) {       
        super();

        this.myItems = [];
        this.counter = 0;
        this.myItems.push(new DataItem(1, "Noticias"));
        this.myItems.push(new DataItem(2, "Productos"));
        this.myItems.push(new DataItem(2, "Salir"));

        

        this.event();
    }


    event(){
        let thiz = this;
        setTimeout(function() {            
            if(thiz._customEvents.subject){
                console.log("Main subscribed");
                thiz._customEvents.subject.subscribe({
                    next: (v) => console.log('Fired from main menu: ' + v)
                });
            }
            else{
                thiz.event();
            }
            
        }, 3000);
        
    }

    public onItemTap(args) {
        if (args.index == 1)
        {
            this._router.navigate(["/productos"])
        }
        else
        {
            this._router.navigate(["/noticias"])
        }
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