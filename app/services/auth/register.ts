import { Injectable } from "@angular/core";
import {User} from "../../models/index";
var http = require("http");


@Injectable()
export class RegisteService {

 login(user:User) : Promise<any> {
 
      let _data = {
            "client_id": "zO8W3NvBiUMrqTwEAo6w9tYefEPCWm9n",
            "username": "futbolito152@gmail.com",
            "password": "iguazo262",
            "id_token": null,
            "connection": "transapcional",
            "grant_type": "password",
            "scope": "openid",
            "device": null
      };


      let promise = new Promise((res, err)=>{

            http.request({
                url: "https://hefesoftsas.auth0.com/oauth/ro",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify(_data)
            }).then((response) => {
                // result = response.content.toJSON();
               console.log(response);
            }, (e) => {
                 console.log(e);
            });

      })

      return promise;

 }

  
  register(user:User) : Promise<any> {      
    
      let _data = {
          "client_id": "zO8W3NvBiUMrqTwEAo6w9tYefEPCWm9n",
          "email": "futbolito1528@gmail.com",
          "password": "iguazo262",
          "connection": "transapcional"
      };


      let promise = new Promise((res, err)=>{

            http.request({
                url: "https:///hefesoftsas.auth0.com/dbconnections/signup",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify(_data)
            }).then((response) => {
                // result = response.content.toJSON();
               console.log(response);
            }, (e) => {
                 console.log(e);
            });


      })

      return promise;

  }
}