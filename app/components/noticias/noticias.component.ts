import { Component, ViewContainerRef, TemplateRef } from "@angular/core";
import { firebaseService } from "../../services/index";
import { util } from "../../util/util";
import { customEvents } from "../../events/customEvent";
import { ListViewEventData } from "nativescript-telerik-ui/listview";
import { Page } from "ui/page";
import { LISTVIEW_DIRECTIVES } from 'nativescript-telerik-ui/listview/angular';
var utilityModule = require("utils/utils");


var firebase = require("nativescript-plugin-firebase");


@Component({
    selector: "noticias",
    templateUrl: "components/noticias/noticias.html",
    styleUrls: ["./app.css"],
    providers: [LISTVIEW_DIRECTIVES, ViewContainerRef, TemplateRef]
})
export class NoticiasComponent {
    private counter: number;
    public news: Array<any> = [];
    public _util = new util();

    constructor(private _firebaseService: firebaseService, private _customEvents: customEvents, private page: Page) {
        this.loadNews();
        this.page.actionBarHidden = false;
        this.page.actionBar.title = "Noticias";

        // _customEvents.subject.subscribe({
        //     next: (v) => 
        //     console.log('observerB: ' + v)
        // });

        // setInterval(()=>{
        //     this._customEvents.subject.next("Test");
        // }, 3000);
    }


    loadNews() {
        this._firebaseService.GetDataLimit("portafolioRss", 20).then((result) => {
            this.news = this._util.objectToArray(result);
        })


        /*firebase.addChildEventListener((newElement)=>{
            this.news.push(newElement.value);
        }, "/portafolio");*/
    }

    public onItemTap(args) {
        console.log("------------------------ ItemTapped: " + args.index);
        utilityModule.openUrl(this.news[args.itemIndex].Link);
    }


    public onPullToRefreshInitiated(args: ListViewEventData) {
        this.loadNews();
        var listView = args.object;
        listView.notifyPullToRefreshFinished();
    }
}