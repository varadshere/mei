import { Component } from '@angular/core';
import {ModalController, Platform, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from '../pages/login/login';
import {utils} from "ng2-cordova-oauth/utility";
import {UtilsProvider} from "../providers/utils/utils";
import {ReviewModalPage} from "../pages/review-modal/review-modal";
declare var FCMPlugin;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform,
              public toastCtrl: ToastController,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              utils: UtilsProvider,
              modalCtrl: ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      if (typeof FCMPlugin != 'undefined'){
        FCMPlugin.getToken((token) =>{
          utils.device_token = token;
        }, (err) => {

        });
      }

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
            const modal = modalCtrl.create('ReviewModalPage');
            modal.present();
          }
          console.log('data');
          console.log(data);

        }, (msg)=>{
          console.log('msg');
          console.log(msg);
        }, (err) =>{
          console.log('err');
          console.log(err);
        })
      }


    });
  }
}
