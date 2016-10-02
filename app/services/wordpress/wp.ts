import { Injectable } from "@angular/core";
var observable = require('data/observable');
var ObservableArray = require('data/observable-array').ObservableArray;
var fetchModule = require('fetch');
import {Producto} from "../../components/productos/producto";
var http = require("http");

@Injectable()
export class WPService {
    public productoSeleccionado: Producto;
    feedItems = new ObservableArray();
    postUrl:string = "http://web-1.wordress.d7817b8c.cont.dockerapp.io/wp-json/wp/v2/posts?fields[name]=";
    posts:string = "http://web.wordress.aa29d523.svc.dockerapp.io/category/productos/feed/";


    constructor() {
    }
    
    getPost(name){
        let promise = new Promise((res,rej)=>{
            http.request({
                url: this.posts,
                method: "GET",                                
            }).then((response) => {                
               res(
                   response.content.toJSON()
                   );
            }, (e) => {
                 rej(e);
            });
        })

        return promise;
    }

        getNews(){
        let promise = new Promise((res,rej)=>{
            http.request({
                url: "http://rss2json.com/api.json?rss_url=http://www.portafolio.co/rss/economia",
                method: "GET",                                
            }).then((response) => {
                                
               res(response.content);

            }, (e) => {
                 rej(e);
            });
        })

        return promise;
    }

    getnoticias() {
	console.log('CALLING LOAD');
	//handle caching
	

	return fetch('http://www.portafolio.co/rss/economia', {
	})
	.then(this.handleErrors)
	.then((response) => {
		return response.content.toJSON();
	}).then(function(data) {
		console.log('number of rss entries: '+data.query.results.item.length);
		data.query.results.item.forEach(function(feedItem) {
			this.feedItems.push({
						title: feedItem.title,
						link: feedItem.link,
						description: feedItem.description
					}
			);
		
		});
	});

}
 handleErrors(response) {
	if (!response.ok) {
		console.log(JSON.stringify(response));
		throw Error(response.statusText);
	}
	return response;
}

    
}