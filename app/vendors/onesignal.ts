var application = require("application");
var TnsOneSignal = require("nativescript-onesignal");
declare var com;

export class onsesignal{

    initalize(){
        
        if (application.android) {
            application.on(application.launchEvent, function(ApplicationEventData) {

        try {
            com.onesignal.OneSignal.startInit(application.android.context).init();
            console.error('Connected with onsesignal');

        } catch (error) {
            console.error('error', error)
        }

        })
     }


    }


}