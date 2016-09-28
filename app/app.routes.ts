import {NoticiasComponent} from './components/noticias/noticias.component';
import {ListProductosComponent} from './components/productos/listproductos.component';
import {LoginComponent} from "./components/index";

export var routableComponents = [];

export const routes = [
    routeEntry({ path: "", component: LoginComponent }),
    routeEntry({ path: "noticias", component: NoticiasComponent }),
    routeEntry({ path: "productos", component: ListProductosComponent })
];

function routeEntry(data) {
    routableComponents.push(data.component)
    return data;
}