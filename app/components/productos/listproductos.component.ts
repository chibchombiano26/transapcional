import { Component} from "@angular/core";
import {WPService,firebaseService} from "../../services/index";
import {util} from "../../util/util";
import {ObservableArray} from "data/observable-array";
import {Producto} from "./producto";
import { LISTVIEW_DIRECTIVES } from 'nativescript-telerik-ui/listview/angular';
import {Router} from "@angular/router";

var firebase = require("nativescript-plugin-firebase");


@Component({
  selector: "list-productos",
  templateUrl: "components/productos/listproductos.html",
  providers: [WPService, firebaseService]
})

export class ListProductosComponent {
    private page;
    private listView    
    private counter: number;
    public lstproductos : Array<Producto> = [];
    public _util = new util();

    constructor(private _firebaseService: firebaseService,private wpService: WPService,private _router: Router) {
        
        this.loadNews();

        //this.loadNews();

        // _customEvents.subject.subscribe({
        //     next: (v) => console.log('observerB: ' + v)
        // });

        // setInterval(()=>{
        //     this._customEvents.subject.next("Test");
        // }, 3000);
    }

//     onPageLoaded(args) {
//    console.log("hola")
    
// }




    loadNews(){
        this._firebaseService.getData("Productos").then((result)=>{
            this.lstproductos = this._util.objectToArray(result);
            console.log(this.lstproductos);
            
        })
    }

    public onItemTap(args) {
        console.log("------------------------ ItemTapped: " + args.index);
        this._firebaseService.productoSeleccionado =this.lstproductos[args.index]; 
        this.wpService.productoSeleccionado =this.lstproductos[args.index]; 
        alert(this.lstproductos[args.index].Name);
        this._router.navigate(["/detalle"])
    }
}