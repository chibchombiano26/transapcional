import { Profile } from './models';
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
import {
  TNSFontIconPipe, TNSFontIconPurePipe, TNSFontIconService
} from 'nativescript-ng2-fonticon/nativescript-ng2-fonticon';


// class DataItem {
//     constructor(public id: number, public name: string, public Navigate: string) { }
// }

@Component({
    selector: "my-app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.css"]
    
})
@Injectable()
export class AppComponent extends Observable {
    _util = new util();
    public profile: Profile;
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
        this.myItems.push(new DetalleProducto("Noticias", "noticias", null, "noticias","fa-newspaper-o"));
        this.myItems.push(new DetalleProducto("Productos", "productos", null, "productos","fa-product-hunt"));
        this.myItems.push(new DetalleProducto("Salir", "", null, "salir","fa-sign-out"));
    }

    event() {
        let thiz = this;
        setTimeout(function () {
            if (thiz._customEvents.subject) {
                console.log("Main subscribed");
                thiz._customEvents.subject.subscribe({
                    next: (v) => {
                        console.log('Fired from main menu: ' + v)
                        thiz.myItems = new Array<DetalleProducto>();
                        let z2 = thiz._util.objectToArray(v);
                        for (var n = 0; n <= z2.length - 1; n++) {
                            thiz.myItems.push(new DetalleProducto(z2[n].Name, z2[n].Template, z2[n].Lista, "detalle",z2[n].Icon));
                        }
                    }
                });
                thiz._customEvents.isLoggin.subscribe({
                    next: (v) => {
                        console.log('Hola loggin: ' + v)
                    }
                });
                if (thiz._firebaseService.isLoggin == true)
                {
                    thiz._router.navigate(["/noticias"]);
                }

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
        else if(navigate == "salir"){
            this._router.navigate(["/"]);
            this._firebaseService.isLoggin = false;
            this._firebaseService.logout();

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
        this.drawer.toggleDrawerState();
    }


}