import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from '../pages/login/login';
declare var FCMPlugin;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform,  public toastCtrl: ToastController,statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


      if (typeof FCMPlugin != 'undefined'){
        FCMPlugin.onNotification((data)=>{
          if(data.wasTapped){
            let toast = this.toastCtrl.create({
              message: data.sendername+'\n'+ data.message,
              duration: 3000,
              position: 'top'
            });

            toast.present();

            //Notification was received on device tray and tapped by the user.
            //alert( JSON.stringify(data) );
          }else{
            let toast = this.toastCtrl.create({
              message: data.sendername+'\n'+ data.message,
              duration: 3000,
              position: 'top'
            });

            toast.present();

          }

        })
      }


    });
  }
}
