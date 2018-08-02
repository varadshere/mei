import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";
import * as moment from "moment";

/**
 * Generated class for the ConfirmBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-booking',
  templateUrl: 'confirm-booking.html',
})
export class ConfirmBookingPage {
  data: any;
  text: string;
  clientData: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private utils: UtilsProvider,
              private viewCtrl: ViewController) {
    this.data = navParams.get('data');
    this.text = this.data.packDat.text;
    this.utils.getProfile({
      "username":this.data.packDat.client_username,
      "email": this.data.packDat.client_email,
      "type": "client"
    }).then(result => {
      if(result){
        this.clientData = result;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmBookingPage');
  }

  cancel() {
    let infoNotificationData = {
      vendor_id: this.data.packDat.vendor_id,
      client_id: this.data.packDat.client_id,
      date: this.data.packDat.date,
      text: 'Your booking with ' + this.utils.profile.first_name + ' ' + this.utils.profile.last_name + ' on '+ this.data.packDat.date + ' is cancel'
    };
    let datatoSend = {
      "client_id": this.data.packDat.client_id,
      "vendor_id": this.data.packDat.vendor_id,
      "flag": "false",
      "date": this.data.packDat.date
    };
    let cb = this.utils.confirmBooking(datatoSend).then((result) => {
      if (result) {
        if (this.clientData.device_token) {
          this.utils.sendNotification('info', infoNotificationData, 'Your booking is canceled', this.clientData.device_token).then((result) => {
            console.log(`Booking canceled: ${result}`);
          });
        }
        this.viewCtrl.dismiss();
      }
    });
  }

  confirm() {
    let infoNotificationData = {
      vendor_id: this.data.packDat.vendor_id,
      client_id: this.data.packDat.client_id,
      date: this.data.packDat.date,
      text: 'Your booking is confirm with ' + this.utils.profile.first_name + ' ' + this.utils.profile.last_name + ' on '+ this.data.packDat.date
    };
    let datatoSend = {
      "client_id": this.data.packDat.client_id,
      "vendor_id": this.data.packDat.vendor_id,
      "flag": "true",
      "date": this.data.packDat.date
    };
    let cb = this.utils.confirmBooking(datatoSend).then((result) => {
      if (result) {
        if (this.clientData.device_token) {
          this.utils.sendNotification('info', infoNotificationData, 'Your booking is confirmed', this.clientData.device_token).then((result) => {
            console.log(`Booking confirmed: ${result}`);
          });
        }
        this.viewCtrl.dismiss();
      }
    });
  }
}
