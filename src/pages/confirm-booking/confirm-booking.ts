import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {UtilsProvider} from "../../providers/utils/utils";

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
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private utils: UtilsProvider,
              private viewCtrl: ViewController) {
    this.data = navParams.get('data');
    this.text = this.data.packDat.text;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmBookingPage');
  }

  cancel(){
    let datatoSend = {
      "client_id": this.data.packDat.client_id,
      "vendor_id": this.data.packDat.vendor_id,
      "flag":"false",
      "date": this.data.packDat.date
    };
    let cb = this.utils.confirmBooking(datatoSend).then((result) =>{
      if(result){
        this.viewCtrl.dismiss();
      }
    });
  }
  confirm(){
    let datatoSend = {
      "client_id": this.data.packDat.client_id,
      "vendor_id": this.data.packDat.vendor_id,
      "flag":"true",
      "date": this.data.packDat.date
    };
    let cb = this.utils.confirmBooking(datatoSend).then((result) =>{
      if(result){
        this.viewCtrl.dismiss();
      }
    });
  }
}
