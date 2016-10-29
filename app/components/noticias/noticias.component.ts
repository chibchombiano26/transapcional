import { Component,OnInit } from "@angular/core";
import { firebaseService } from "../../services/index";
import { util } from "../../util/util";
import { customEvents } from "../../events/customEvent";
import { ListViewEventData } from "nativescript-telerik-ui/listview";
import { Page } from "ui/page";
import { LISTVIEW_DIRECTIVES } from 'nativescript-telerik-ui/listview/angular';
import { ActivatedRoute, Router } from '@angular/router';
var utilityModule = require("utils/utils");



@Component({
    selector: "noticias",
    templateUrl: "components/noticias/noticias.html",
    styleUrls: ["./app.css"]
})
export class NoticiasComponent implements OnInit {
    private _paramSubcription1: any;
    private counter: number;
    public news: Array<any> = [];
    public _util = new util();
    isLoading = false;

    constructor(private _firebaseService: firebaseService, private _customEvents: customEvents, private page: Page,private _activatedRoute: ActivatedRoute) {
        this.loadNews();
        this.page.actionBarHidden = false;
        this.page.actionBar.title = "Noticias";
    }


    loadNews() {
        this.isLoading = true;
        if (this._firebaseService.lstNews && this._firebaseService.lstNews.length > 0)
        {
            this.news = this._firebaseService.lstNews;
            this.isLoading = false;
        }
        else
        {
            this.loadNewsRefresh();
        }
    }

    loadNewsRefresh() {
        this.isLoading = true;
        this._firebaseService.GetDataLimit("portafolioRss", 20).then((result) => {
            this.news = this._util.objectToArray(result);
            this._firebaseService.lstNews =this._util.objectToArray(result); 
            this.isLoading = false;
        })
    }

    public onItemTap(args) {
        console.log("------------------------ ItemTapped: " + args.index);
        utilityModule.openUrl(this.news[args.index].Link);
    }

   ngOnInit() {
       this.page.backgroundImage = "";

    let entityName: string;
    this._paramSubcription1 = this._activatedRoute.params.subscribe(params => {
      entityName = params['id'];
      if (entityName)
      {
          this.loadNewsRefresh();
      }
      else
      {
        this.loadNews();
      }
      
    }
    );
  }


    public onPullToRefreshInitiated(args: ListViewEventData) {
        this.loadNewsRefresh();
        var listView = args.object;
        listView.notifyPullToRefreshFinished();
    }
}