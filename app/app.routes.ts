import {LoginComponent} from "./components/index";

export var routableComponents = [];

export const routes = [
    routeEntry({ path: "", component: LoginComponent }),

];

function routeEntry(data) {
    routableComponents.push(data.component)
    return data;
}