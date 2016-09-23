import {Component, ElementRef, OnInit, ViewChild,NgZone,ChangeDetectorRef } from "@angular/core";
import { View } from "ui/core/view";
import { RadSideDrawer } from "nativescript-telerik-ui/sidedrawer";
import { Page } from "ui/page";
import sideDrawerModule = require('nativescript-telerik-ui/sidedrawer');
import { ActionItem } from "ui/action-bar";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-telerik-ui/sidedrawer/angular";  
import {TextField} from "ui/text-field";
import {Router} from "@angular/router";
import {WPService} from "../../services/index";
var observable = require('data/observable');
var ObservableArray = require('data/observable-array').ObservableArray;
var fetchModule = require('fetch');
var http = require("http");

@Component({
  selector: "noticias",
    templateUrl: "components/noticias/noticias.html",
  styleUrls: ["components/noticias/noticias-common.css", "components/noticias/noticias.css"],
  providers: [WPService]
})

export class NoticiasComponent implements OnInit {
   @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: SideDrawerType;
    public pages:Array<Object>;
  //groceryList: Array<Grocery> = [];
  grocery: string = "";
  isLoading = false;
  listLoaded = false;
  showPage = true;
  

  constructor(private _wpService: WPService,private _zone: NgZone,private _changeDetectionRef: ChangeDetectorRef,
              private _router: Router) {
      // List all pages here         
         this.pages = [
            {name:"Productos"},
            {name:"Noticias"},
            {name:"Salir"},
        ]; 
  }

      ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
        this._wpService.getNews().then((profile)=>{
            //Information of the user
            //profile.query.results;
            console.log(profile);
            this.isLoading = false;
            
            
        });
    }

    public openDrawer() {
        this.drawer.toggleDrawerState();
        this.showPage = !this.showPage;
    }

    buttonTap(args: Object) {
       this._router.navigate(["/producto"]);
    }

ngOnInit() {
  //this.isLoading = true;
  //this._groceryListService.load()
    //.subscribe(loadedGroceries => {
      //loadedGroceries.forEach((groceryObject) => {
        //this.groceryList.unshift(groceryObject);
      //});
      this.isLoading = false;
      this.listLoaded = true;
    //});
}
  //add() {
  //if (this.grocery.trim() === "") {
    //alert("Enter a grocery item");
    //return;
 // }

  // Dismiss the keyboard
 // let textField = <TextField>this.groceryTextField.nativeElement;
  //textField.dismissSoftInput();
  

  //this._groceryListService.add(this.grocery)
   // .subscribe(
     // groceryObject => {
       // this.groceryList.unshift(groceryObject);
        //this.grocery = "";
      //},
      //() => {
        //alert({
         // message: "An error occurred while adding an item to your list.",
          //okButtonText: "OK"
        //});
        //this.grocery = "";
      //}
    //)
//}
// delete(grocery: Grocery) {
//     this._groceryListService.delete(grocery.id)
//       .subscribe(() => {
//         // Running the change detection in a zone ensures that change
//         // detection gets triggered if needed.
//         this._zone.run(() => {
//           var index = this.groceryList.indexOf(grocery);
//           this.groceryList.splice(index, 1);
//         });
//       });
//   }

// share() {
//   let list = [];
//   for (let i = 0, size = this.groceryList.length; i < size ; i++) {
//     list.push(this.groceryList[i].name);
//   }
//   let listString = list.join(", ").trim();
//   socialShare.shareText(listString);
// }

}