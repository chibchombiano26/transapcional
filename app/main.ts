// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { routes, routableComponents } from "./app.routes";
import {LoginComponent} from "./components/index";
import { SIDEDRAWER_DIRECTIVES, TKMainContentDirective, TKDrawerContentDirective } from 'nativescript-telerik-ui/sidedrawer/angular';
import { AppComponent } from "./app.component";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NgModule } from "@angular/core";
import { LISTVIEW_DIRECTIVES } from 'nativescript-telerik-ui/listview/angular';
import {customEvents} from "./events/customEvent";
import {firebaseService} from "./services/firebase/client";





// import * as applicationModule from "application";
// import * as frescoModule from "nativescript-fresco";
// import * as elementRegistryModule from 'nativescript-angular/element-registry';
// if (applicationModule.android) {
//     applicationModule.on("launch", () => {
//         frescoModule.initialize();
//     });
// elementRegistryModule.registerElement("FrescoDrawee", () => frescoModule.FrescoDrawee);
// }
import {
  TNSFontIconPipe, TNSFontIconPurePipe, TNSFontIconService
} from 'nativescript-ng2-fonticon/nativescript-ng2-fonticon';



@NgModule({    
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,      
        ...routableComponents,
        LISTVIEW_DIRECTIVES,
           SIDEDRAWER_DIRECTIVES,
           TNSFontIconPipe, TNSFontIconPurePipe
    ],
    imports: 
    [
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forRoot(routes)
    ],
    providers:[customEvents,firebaseService,
    {
      provide: TNSFontIconService,
      useFactory: () => {
        return new TNSFontIconService({
          'fa': 'font-awesome.css',
          'ion': 'ionicons.css'
        });
      }
    }]
    
})
class AppComponentModule {}

platformNativeScriptDynamic().bootstrapModule(AppComponentModule);