import { Component,OnInit} from "@angular/core";
import {WPService,firebaseService} from "../../services/index";
import {ObservableArray} from "data/observable-array";
import {Producto} from "../productos/producto";
import {DetalleProducto} from "./detalleproducto";
import {util} from "../../util/util";
import {Page} from "ui/page";
import {customEvents} from "../../events/customEvent";
 


@Component({
  selector: "detalle-producto",
  templateUrl: "components/detalleProducto/detalleproducto.html",
  providers: [WPService]
})

export class DetalleProductoComponent implements OnInit {
    
    public _util = new util();
    public detalleProducto:  DetalleProducto;
    constructor(private _firebaseService: firebaseService,private wpService: WPService,private page: Page, private _customEvents : customEvents) {
        
        
    }
    loadNews(){   
            console.log(this._firebaseService.productoSeleccionado.Name);
             this._firebaseService.getQuery("DetalleProducto/" + this._firebaseService.productoSeleccionado.DetalleProducto,10).then((result)=>{
            //var q = this._util.objectToArray(result);
            console.log(result);
            this.detalleProducto = result.value;
            this._firebaseService.detalleSeleccionado =this.detalleProducto; 
            this._customEvents.subject.next(this.detalleProducto.Lista);
            console.log(this.detalleProducto.Lista);
            
        });
            
        
    }
 ngOnInit() {
  //this.isLoading = true;
  //this._groceryListService.load()
    //.subscribe(loadedGroceries => {
      //loadedGroceries.forEach((groceryObject) => {
        //this.groceryList.unshift(groceryObject);
      //});
        this.page.actionBarHidden = false;
        this.page.actionBar.title = this._firebaseService.productoSeleccionado.Name;
      this.loadNews();
    //});
}


}