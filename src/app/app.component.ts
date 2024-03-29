import { Component } from '@angular/core';
import {ModalController, Platform} from 'ionic-angular';
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
import {LocalNotifications} from "@ionic-native/local-notifications";

declare var FirebasePlugin;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              utils: UtilsProvider,
              modalCtrl: ModalController,
              localNotifications: LocalNotifications,
              private storage: Storage) {
    platform.ready().then(() => {
      console.log("Platform is ready");
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      storage.get('userData').then((val: UserData) => {
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

      //Firebase Plugin code
      if (typeof FirebasePlugin != "undefined"){
        FirebasePlugin.getToken((token) => {
          console.log("FCM token fetched");
          utils.device_token = token;
        }, (err) => {
          console.log("FCM token not generated; " + err);
        });

        FirebasePlugin.hasPermission(function(data){
          if(!data.isEnabled){
            FirebasePlugin.grantPermission();
          }
          console.log(data.isEnabled);
        });

        FirebasePlugin.onNotificationOpen((notification) => {
          console.log("Notification received");
          console.log(notification);

          notification.packDat = JSON.parse(notification.packDat);
              switch(notification.act) {
                case "review": {
                  console.log("Review");
                  const modal = modalCtrl.create(ReviewModalPage, { data: notification});
                  modal.present();
                  break;
                }
                case "confirm": {
                  console.log("B");
                  const modal = modalCtrl.create('ConfirmBookingPage', { data: notification});
                  modal.present();
                  break;
                }
                case "info":{
                  console.log("Booking Info");
                  utils.presentAlert(notification.packDat.text, "Thank You!");
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

        }, (msg)=>{
          console.log('msg notif.');
          console.log(msg);
        }, (data)=>{
          console.log('data notif.');
          console.log(data);
        }, (err) =>{
          console.log('err');
          console.log(err);
        });
      }

      //Local Notification code for Review
      if (platform.is('cordova')){
        localNotifications.on('click').subscribe((notification) =>{
          console.log("Local Notification clicked");
          console.log(notification);
          console.log("Review");
          const modal = modalCtrl.create(ReviewModalPage, { data: notification.data});
          modal.present();
        });
      }

    });
  }
}
