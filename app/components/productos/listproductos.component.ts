import { Component, OnInit } from "@angular/core";
import { firebaseService } from "../../services/index";
import { util } from "../../util/util";
import { ObservableArray } from "data/observable-array";
import { Producto } from "./producto";
import { Router } from "@angular/router";
import { customEvents } from "../../events/customEvent";
import { Page } from "ui/page";

@Component({
    selector: "list-productos",
    templateUrl: "components/productos/listproductos.html",
    styleUrls: ["./app.css"],

})

export class ListProductosComponent implements OnInit {
    private counter: number;
    public lstproductos: Array<Producto> = [];
    public _util = new util();

    constructor(private _firebaseService: firebaseService, private _router: Router, private _customEvents: customEvents,
        private page: Page) {

        this.loadProducts();
        this.page.actionBar.title = "Productos";
        this.page.actionBarHidden = false;
        
    }

    ngOnInit() {
        this.page.backgroundImage = "";
    }

    loadProducts() {
        if (this._firebaseService.lstproductos && this._firebaseService.lstproductos.length > 0) {
            this.lstproductos = this._firebaseService.lstproductos;
        }
        else {
            this._firebaseService.getData("Productos").then((result) => {
                this.lstproductos = this._util.objectToArray(result);
                this._firebaseService.lstproductos = this._util.objectToArray(result);
            })

        }

    }

    public onItemTap(args) {
        
        console.log("------------------------ ItemTapped: " + args.index);
        this._firebaseService.productoSeleccionado = this.lstproductos[args.index];
        this._firebaseService.getQuery("DetalleProducto/" + this._firebaseService.productoSeleccionado.DetalleProducto, 10).then((result) => {
            //var q = this._util.objectToArray(result);
            this._firebaseService.detalleSeleccionadoProducto = result.value;
            this._firebaseService.detalleSeleccionado = result.value;
            this._customEvents.subject.next(this._firebaseService.detalleSeleccionadoProducto.Lista);

            this._router.navigate(["/detalle/" + this._firebaseService.productoSeleccionado.Name])
        });
    }
}