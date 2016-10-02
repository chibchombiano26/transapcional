import { Component,OnInit} from "@angular/core";
import {WPService,firebaseService} from "../../services/index";
import {util} from "../../util/util";
import {ObservableArray} from "data/observable-array";
import {Producto} from "../productos/producto";


@Component({
  selector: "detalle-producto",
  templateUrl: "components/productos/listproductos.html",
  providers: [WPService, firebaseService]
})

export class DetalleProductoComponent implements OnInit {
    private page;  
    constructor(private _firebaseService: firebaseService,private wpService: WPService) {
        
        
    }
    loadNews(){   
            console.log("hola");
            console.log(this.wpService.productoSeleccionado.Name);
            
        
    }
 ngOnInit() {
  //this.isLoading = true;
  //this._groceryListService.load()
    //.subscribe(loadedGroceries => {
      //loadedGroceries.forEach((groceryObject) => {
        //this.groceryList.unshift(groceryObject);
      //});
      this.loadNews();
    //});
}


}