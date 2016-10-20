import { Injectable, OnInit } from "@angular/core";
var firebase = require("nativescript-plugin-firebase");
import { Producto } from "../../components/productos/producto";
import { DetalleProducto } from "../../components/detalleProducto/detalleproducto";
var vibrator = require("nativescript-vibrate");
import {User} from "../../models/index";

@Injectable()
export class firebaseService implements OnInit {
    public productoSeleccionado: Producto;
    public detalleSeleccionado: DetalleProducto;
    public detalleSeleccionadoProducto: DetalleProducto;

    constructor() {

        this.initFirebase();
    }

    login(user:User): Promise<any> {
        let promise = new Promise((res, rej) => {
            firebase.login({
                type: firebase.LoginType.PASSWORD,
                email: user.email,
                password: user.password
            }).then((response) => {
                res(response);
            }, (e) => {
                rej(e);
            });
        })
        return promise;
    }

    ngOnInit() { }


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
        firebase.addOnMessageReceivedCallback((message: any) => {
            vibrator.vibration(500);
        });
    }



    getData(table): Promise<any> {

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

    getQuery(table, limit) {
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

    getQuerybyid(table, limit) {
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