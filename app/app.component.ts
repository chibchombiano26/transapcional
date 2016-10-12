import { Component, ElementRef, ViewChild, Injectable, OnInit, ChangeDetectorRef } from "@angular/core";
import { View } from "ui/core/view";
import { RadSideDrawer } from "nativescript-telerik-ui/sidedrawer";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";

import sideDrawerModule = require('nativescript-telerik-ui/sidedrawer');
import { Observable } from "data/observable";
import {DetalleProducto} from "./components/detalleProducto/detalleproducto";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-telerik-ui/sidedrawer/angular";
import {customEvents} from "./events/customEvent";
import {Router} from "@angular/router";
import { RouterExtensions } from 'nativescript-angular/router';
import {firebaseService} from "./services/index";
import {util} from "./util/util";

// class DataItem {
//     constructor(public id: number, public name: string, public Navigate: string) { }
// }

@Component({
    selector: "my-app",
    templateUrl: "./app.component.html",
    styleUrls: ["./main.css"]
})
@Injectable()
export class AppComponent extends Observable {
    _util = new util();
    public myItems: Array<DetalleProducto>;
    private counter: number;

    constructor(private _customEvents: customEvents, private page: Page, private _changeDetectionRef: ChangeDetectorRef,
        private _router: Router, private _firebaseService: firebaseService, private routerExtensions: RouterExtensions) {
        super();

        this.cargaMenu();
        this.event();
    }

    cargaMenu() {
        this.myItems = [];
        this.counter = 0;
        this.myItems.push(new DetalleProducto("Noticias", "noticias", null, "noticias"));
        this.myItems.push(new DetalleProducto("Productos", "productos", null, "productos"));
        this.myItems.push(new DetalleProducto("Salir", "", null, ""));
    }

    event() {
        let thiz = this;
        setTimeout(function () {
            if (thiz._customEvents.subject) {
                console.log("Main subscribed");
                thiz._customEvents.subject.subscribe({
                    next: (v) => {
                        console.log('Fired from main menu: ' + v)
                        thiz.myItems = [];
                        let z2 = thiz._util.objectToArray(v);
                        for (var n = 0; n <= z2.length - 1; n++) {
                            thiz.myItems.push(new DetalleProducto(z2[n].Name, z2[n].Template, z2[n].Lista, "detalle"));
                        }
                        
                    }
                });
            }
            else {
                thiz.event();
            }

        }, 3000);

    }
    public goBack() {
        if (this._router.routerState.snapshot.url.indexOf('detalle') >= 0  && this._firebaseService.detalleSeleccionado != this._firebaseService.detalleSeleccionadoProducto ) {
            this._firebaseService.detalleSeleccionado = this._firebaseService.detalleSeleccionadoProducto;
            this._customEvents.subject.next(this._firebaseService.detalleSeleccionadoProducto.Lista);
            this.routerExtensions.back();
        }
        else if (this._router.routerState.snapshot.url.indexOf('detalle') >= 0 && this._firebaseService.detalleSeleccionado == this._firebaseService.detalleSeleccionadoProducto) {
            this.cargaMenu();
            this._router.navigate(["/productos"]);
        }
        else if (this._router.routerState.snapshot.url.indexOf('producto')) {
            this._router.navigate(["/noticias"]);

        }
        else {
            this.routerExtensions.back();
        }
    }

    public onItemTap(args) {
        var navigate: string;
        this.drawer.toggleDrawerState();
        navigate = this.myItems[args.index].Navigate;
        if (navigate == "detalle") {
            
            this._firebaseService.detalleSeleccionado = this.myItems[args.index];
            if (this._firebaseService.detalleSeleccionado.Lista) {
                this._customEvents.subject.next(this._firebaseService.detalleSeleccionado.Lista);
            }
            this._router.navigate(["/detalle/" + this._firebaseService.detalleSeleccionado.Name]);
            
        }
        else {
            this._router.navigate(["/" + navigate]);
        }
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: SideDrawerType;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    // ngOnInit() {
    //     this.set("mainContentText", "SideDrawer for NativeScript can be easily setup in the XML definition of your page by defining main- and drawer-content. The component"
    //         + " has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.");
    // }

    public openDrawer() {
        this.drawer.showDrawer();
    }


}