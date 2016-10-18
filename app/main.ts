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
import {firebaseService} from "./services/firebase/client";
import {auth0Service} from "./services/index";
import {
  TNSFontIconPipe, TNSFontIconPurePipe, TNSFontIconService
} from 'nativescript-ng2-fonticon/nativescript-ng2-fonticon';



let _onsesignal = new onsesignal();
_onsesignal.initalize();


@NgModule({    
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,      
        ...routableComponents,
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
    providers:[customEvents,firebaseService,auth0Service,
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