import { Component, ViewContainerRef,TemplateRef} from "@angular/core";
import {WPService,firebaseService} from "../../services/index";
import {util} from "../../util/util";
import {ObservableArray} from "data/observable-array";
import {Producto} from "./producto";
import { LISTVIEW_DIRECTIVES } from 'nativescript-telerik-ui/listview/angular';
import {Router} from "@angular/router";
import {customEvents} from "../../events/customEvent";
import {Page} from "ui/page";
var firebase = require("nativescript-plugin-firebase");


@Component({
  selector: "list-productos",
  templateUrl: "components/productos/listproductos.html",
  providers: [WPService,LISTVIEW_DIRECTIVES,ViewContainerRef,TemplateRef],
  styleUrls: ["./app.css"],
  
})

export class ListProductosComponent {
    private listView    
    private counter: number;
    public lstproductos : Array<Producto> = [];
    public _util = new util();

    constructor(private _firebaseService: firebaseService,private wpService: 
                WPService,private _router: Router,private _customEvents : customEvents,
                private page: Page) {
        
        this.loadNews();
        this.page.actionBar.title = "Productos";
        this.page.actionBarHidden = false;
    }

    loadNews(){
        this._firebaseService.getData("Productos").then((result)=>{
            this.lstproductos = this._util.objectToArray(result);
            console.log(this.lstproductos);
            
        })
    }

    public onItemTap(args) {
        console.log("------------------------ ItemTapped: " + args.itemIndex);
        this._firebaseService.productoSeleccionado =this.lstproductos[args.itemIndex]; 
        this.wpService.productoSeleccionado =this.lstproductos[args.itemIndex]; 
           this._firebaseService.getQuery("DetalleProducto/" + this._firebaseService.productoSeleccionado.DetalleProducto,10).then((result)=>{
            //var q = this._util.objectToArray(result);
            this._firebaseService.detalleSeleccionadoProducto = result.value;
            this._firebaseService.detalleSeleccionado = result.value;  
            this._customEvents.subject.next(this._firebaseService.detalleSeleccionadoProducto.Lista);
            
        this._router.navigate(["/detalle/" + this.wpService.productoSeleccionado.Name])
        });
    }
}