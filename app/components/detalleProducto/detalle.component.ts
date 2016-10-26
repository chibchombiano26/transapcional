import { Component, OnInit, } from "@angular/core";
import {firebaseService} from "../../services/index";
import {ObservableArray} from "data/observable-array";
import {Producto} from "../productos/producto";
import {DetalleProducto} from "./detalleproducto";
import {util} from "../../util/util";
import {Page} from "ui/page";
import {customEvents} from "../../events/customEvent";
import {Router, Params} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import {WebView, LoadEventData} from "ui/web-view";



@Component({
  selector: "detalle-producto",
  templateUrl: "components/detalleProducto/detalleproducto.html"
})

export class DetalleProductoComponent implements OnInit {
  private _paramSubcription: any;
  public _util = new util();
  public detalleProducto: DetalleProducto;
  constructor(private _firebaseService: firebaseService, private page: Page, private _customEvents: customEvents, 
  private _router: Router, private _activatedRoute: ActivatedRoute) {


  }
  loadNews() {
    console.log(this._firebaseService.productoSeleccionado.Name);
    this.detalleProducto = this._firebaseService.detalleSeleccionado;


  }
  ngOnInit() {
    this.page.backgroundImage = "";
    
    let entityName: string;
    this._paramSubcription = this._activatedRoute.params.subscribe(params => {
      entityName = params['id']
      console.log(entityName)
      this.detalleProducto = this._firebaseService.detalleSeleccionado;
    }
    );

    this.page.actionBarHidden = false;
    this.page.actionBar.title = this._firebaseService.productoSeleccionado.Name;
    this.loadNews();
    //});
  }


}