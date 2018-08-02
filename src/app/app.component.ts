import { Component } from '@angular/core';
import {ModalController, Platform, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from '../pages/login/login';
import {UtilsProvider} from "../providers/utils/utils";
import {ReviewModalPage} from "../pages/review-modal/review-modal";
import {ConfirmBookingPage} from "../pages/confirm-booking/confirm-booking";
import { Storage } from '@ionic/storage';
import {VendorHomePage} from "../pages/vendor-home/vendor-home";
import {SelectionHomePage} from "../pages/selection-home/selection-home";
import {SidemenuPage} from "../pages/sidemenu/sidemenu";
import {VendorSidemenuPage} from "../pages/vendor-sidemenu/vendor-sidemenu";
import {UserData} from "../providers/models";
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
              modalCtrl: ModalController,
              private storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      storage.get('userData').then((val: UserData) => {
        console.log('User Data', val);
        if(val){
          if(val.type && val.device_token && val.email && val.profile){
            if(val.type === 'vendor'){
              utils.setUtilsData(val);
              utils.setPage(VendorHomePage);
              this.rootPage = VendorSidemenuPage;
            }else if(val.type === 'client'){
              utils.setUtilsData(val);
              utils.setPage(SelectionHomePage);
              this.rootPage = SidemenuPage;
            }
          }else {
            this.rootPage = LoginPage;
          }
        }
      });
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
          data.packDat = JSON.parse(data.packDat);
          switch(data.act) {
            case "review": {
              console.log("Review");
              const modal = modalCtrl.create(ReviewModalPage, { data: data});
              modal.present();
              break;
            }
            case "confirm": {
              console.log("B");
              const modal = modalCtrl.create('ConfirmBookingPage', { data: data});
              modal.present();
              break;
            }
            case "info":{
              console.log("Booking Info");
              utils.presentAlert(data.packDat.text, "Thank You!");
              break;
            }
            case "C": {
              console.log("C");
              break;
            }
            case "D": {
              console.log("D");
              break;
            }
            default: {
              console.log("Default choice");
              break;
            }
          }

          if(data.wasTapped){
            let toast = this.toastCtrl.create({
              message: data.message,
              duration: 3000,
              position: 'top'
            });

            toast.present();

            //Notification was received on device tray and tapped by the user.
            //alert( JSON.stringify(data) );
          }else{
            let toast = this.toastCtrl.create({
              message: data.message,
              duration: 3000,
              position: 'top'
            });
            toast.present();
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
