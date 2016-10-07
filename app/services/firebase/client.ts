import {Injectable,OnInit} from "@angular/core";
var firebase = require("nativescript-plugin-firebase");
import {Producto} from "../../components/productos/producto";
import {DetalleProducto} from "../../components/detalleProducto/detalleproducto";

@Injectable()
export class firebaseService implements OnInit {
    public productoSeleccionado: Producto;
    public detalleSeleccionado: DetalleProducto;
    constructor() {        
         
        this.initFirebase();
    }

    ngOnInit() {}


    initFirebase() {
        firebase.init({
            url: 'https://transapcional-6a346.firebaseio.com'
        }).then(
            (instance) => {
                console.log("firebase.init done");                
            },
            (error) => {
                console.log("firebase.init error: " + error);
            }
        );
    }

    getData(table) : Promise<any> {

        let promise = new Promise((res, rej) => {
            firebase.query(
                ((result) => {                                        
                    res(result.value);
                }),
                "/" + table, 
                {
                    singleEvent: true,
                    orderBy: {
                        type: firebase.QueryOrderByType.KEY
                    }
                }
            );

        })

        return promise;

    }

    getQuery(table, limit){
        return firebase.query(
            ((result) => {                    
                console.log(result);
            }),
            "/" + table, 
            {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.KEY
                },
                limit: {
                    type: firebase.QueryLimitType.LAST,
                    value: limit
                }
            }
        );
    }

    getQuerybyid(table, limit){
        return firebase.query(
            ((result) => {                    
                console.log(result);
            }),
            "/" + table, 
            {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.KEY
                },
                limit: {
                    type: firebase.QueryLimitType.LAST,
                    value: limit
                }
            }
        );
    }

}