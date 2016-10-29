import {NoticiasComponent} from './components/noticias/noticias.component';
import {ListProductosComponent} from './components/productos/listproductos.component';
import {DetalleProductoComponent} from './components/detalleProducto/detalle.component';
import {ResetComponent} from './components/resetLogin/reset.component';
import {LoginComponent} from "./components/index";

export var routableComponents = [];

export const routes = [
    routeEntry({ path: "", component: LoginComponent }),
    routeEntry({ path: "noticias", component: NoticiasComponent }),
    routeEntry({ path: "productos", component: ListProductosComponent }),
    routeEntry({ path: "detalle/:id", component: DetalleProductoComponent }),
    routeEntry({ path: "noticias/:id", component: NoticiasComponent }),
    routeEntry({ path: "reset", component: ResetComponent }),
];

function routeEntry(data) {
    routableComponents.push(data.component)
    return data;
}