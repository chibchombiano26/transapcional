import { Injectable } from "@angular/core";
import {User} from "../../models/index";
var http = require("http");


@Injectable()
export class auth0Service {

    clientId:string = "zO8W3NvBiUMrqTwEAo6w9tYefEPCWm9n";


    constructor() {
    }



    login(user:User) : Promise<any> {
    
        let _data = {
                
                "client_id": this.clientId,
                "username": user.email,
                "password": user.password,            
                "connection": "transapcional",
                "grant_type": "password",
                "scope": "openid"            
        };


        let promise = new Promise((res, err)=>{

                http.request({
                    url: "https://hefesoftsas.auth0.com/oauth/ro",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    content: JSON.stringify(_data)
                }).then((response) => {                    
                    let code = response.content.toJSON().statusCode;
                    if(code==200){
                        let result = response.content.toJSON();
                        res(result.access_token);
                    }
                    else{
                        rej(response.content.toJSON());
                    }
                }, (e) => {
                    err(e);
                });

        })

        return promise;

    }

    getProfile(token){
        let promise = new Promise((res,rej)=>{
            http.request({
                url: "https://hefesoftsas.auth0.com/userinfo",
                method: "GET",
                headers: { "authorization": "Bearer " + token }                
            }).then((response) => {                
               res(response.content.toJSON());
            }, (e) => {
                 rej(e);
            });
        })

        return promise;
    }

    getUser(user:User){
        
        let promise = new Promise((res, rej)=>{

            this.login(user).then((token)=>{
                this.getProfile(token).then((profile)=>{
                    res(profile);
                })
            })

        })

        return promise;
    }

  
  register(user:User) : Promise<any> {      
    
      let _data = {
          "client_id": "zO8W3NvBiUMrqTwEAo6w9tYefEPCWm9n",
          "email": user.email,
          "password": user.password,
          "connection": "transapcional"
      };


      let promise = new Promise((res, rej)=>{

            http.request({
                url: "https://hefesoftsas.auth0.com/dbconnections/signup",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify(_data)
            }).then((response) => {         
                let code = response.content.toJSON().statusCode;
                if(code==200){
                    res(response.content.toJSON());
                }
                else{
                    rej(response.content.toJSON());
                }       
               
            }, (e) => {
                 rej(e);
            });


      })

      return promise;

  }
}