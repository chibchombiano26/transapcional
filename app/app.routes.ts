import {NoticiasComponent} from './components/noticias/noticias.component';
import {LoginComponent} from "./components/index";

export var routableComponents = [];

export const routes = [
    routeEntry({ path: "", component: LoginComponent }),
    routeEntry({ path: "noticias", component: NoticiasComponent })
];

function routeEntry(data) {
    routableComponents.push(data.component)
    return data;
}