import { Injectable } from "@angular/core";
var http = require("http");



@Injectable()
export class WPService {

    postUrl:string = "http://web-1.wordress.d7817b8c.cont.dockerapp.io/wp-json/wp/v2/posts?fields[name]=";


    constructor() {
    }
    
    getPost(name){
        let promise = new Promise((res,rej)=>{
            http.request({
                url: this.postUrl + name,
                method: "GET",                                
            }).then((response) => {                
               res(response.content.toJSON());
            }, (e) => {
                 rej(e);
            });
        })

        return promise;
    }

    
}