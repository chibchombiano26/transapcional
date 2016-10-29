import { Injectable, OnInit } from "@angular/core";
var firebase = require("nativescript-plugin-firebase");
import { Producto } from "../../components/productos/producto";
import { DetalleProducto } from "../../components/detalleProducto/detalleproducto";
var vibrator = require("nativescript-vibrate");
import { User } from "../../models/index";
import { Router } from "@angular/router";
import { customEvents } from "../../events/customEvent";
import dialogs = require("ui/dialogs");


@Injectable()
export class firebaseService implements OnInit {
    public productoSeleccionado: Producto;
    public detalleSeleccionado: DetalleProducto;
    public detalleSeleccionadoProducto: DetalleProducto;
    public isLoggin: boolean;
    public count: number = 0;
    public lstproductos: Array<Producto> = [];
    public lstNews: Array<any> = [];
    constructor(private _customEvents: customEvents) {

        this.initFirebase();
    }

    login(user: User): Promise<any> {
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

    ngOnInit() {

    }

    logout() {
        firebase.logout();
    }

    resetPassword(email: string) {
        let promise = new Promise((res, rej) => {
            firebase.resetPassword({
                email: email
            }).then(
                function () {
                    dialogs.alert("Por favor, revise su correo electronico, para reestrablecer su contraseña");

                },
                function (errorMessage) {
                    dialogs.alert("ha ocurrido un error reestrableciendo su contraseña, intentelo nuevamente, verifique el  correo electronico ingresado");
                }
                )
        })
        return promise;
    }


    initFirebase() {
        let thiz = this;
        firebase.init({
            url: 'https://transapcional-6a346.firebaseio.com',
            onAuthStateChanged: function (data) { // optional but useful to immediately re-logon the user when he re-visits your app
                console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
                if (data.loggedIn) {
                    console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
                    thiz.isLoggin = true;


                }
                else {
                    this.isLoggin = false;
                }

            }

        }).then(
            (instance) => {
                console.log("firebase.init done");


            },
            (error) => {
                console.log("firebase.init error: " + error);
            }
            );
        firebase.addOnMessageReceivedCallback((message: any) => {
            if (message.body) {
                vibrator.vibration(500);
                dialogs.alert(message.body);
            }
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

    GetDataLimit(table, limit): Promise<any> {

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
                    },
                    limit: {
                        type: firebase.QueryLimitType.LAST,
                        value: limit
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