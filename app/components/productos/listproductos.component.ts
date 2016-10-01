import { Component} from "@angular/core";
import {WPService,firebaseService} from "../../services/index";
import {util} from "../../util/util";
import {ObservableArray} from "data/observable-array";
import { LISTVIEW_DIRECTIVES } from 'nativescript-telerik-ui/listview/angular';

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
    public news : Array<any> = [];
    public _util = new util();

    constructor(private _firebaseService: firebaseService,private wpService: WPService) {
        
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

onItemSelected(args) {

    // var selectedItems = this.listView.getSelectedItems();
    // var selectedTitles = "Selected items: ";
    // for (var i = 0; i < selectedItems.length; i++) {
    //     console.log(selectedItems[i].Name);
    // }
    console.log("hola 1") 
    

    
}


    loadNews(){
        this._firebaseService.getData("Productos").then((result)=>{
            this.news = this._util.objectToArray(result);
            console.log(this.news);
        })
    }

    public onItemTap(args) {
        console.log("------------------------ ItemTapped: " + args.index);
    }
}