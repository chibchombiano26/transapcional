// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { routes, routableComponents } from "./app.routes";
import {LoginComponent} from "./components/index";
import { SIDEDRAWER_DIRECTIVES, TKMainContentDirective, TKDrawerContentDirective } from 'nativescript-telerik-ui/sidedrawer/angular';
import { AppComponent } from "./app.component";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NgModule } from "@angular/core";
import {onsesignal} from './vendors/onesignal';
import {customEvents} from "./events/customEvent";
import { LISTVIEW_DIRECTIVES } from 'nativescript-telerik-ui/listview/angular';

let _onsesignal = new onsesignal();
_onsesignal.initalize();


@NgModule({    
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,      
        ...routableComponents,
           SIDEDRAWER_DIRECTIVES,
           LISTVIEW_DIRECTIVES
    ],
    imports: 
    [
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forRoot(routes)
    ],
    providers:[customEvents]
})
class AppComponentModule {}

platformNativeScriptDynamic().bootstrapModule(AppComponentModule);